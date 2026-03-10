// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import { signIn, signOut, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';

export const AuthContext = createContext();

/**
 * Extracts the user's role from the Cognito ID token.
 * The role is derived from the first entry of the `cognito:groups` claim.
 * Returns "resident" or "security" (or null if no group is found).
 */
async function getUserRole() {
  try {
    
const session = await fetchAuthSession();
console.log("FULL SESSION:", session);
    const groups = session.tokens?.idToken?.payload?.['cognito:groups'];
    if (Array.isArray(groups) && groups.length > 0) {
      return groups[0]; // e.g. "residents" or "security"
    }
    return null;
  } catch {
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
  });

  // Restore session on page reload
  useEffect(() => {
    (async () => {
      try {
        const cognitoUser = await getCurrentUser();
        const role = await getUserRole();
        setAuth({
          isAuthenticated: true,
          user: { username: cognitoUser.username, role },
        });
      } catch {
        // No active session — user is not logged in
        setAuth({ isAuthenticated: false, user: null });
      }
    })();
  }, []);

  const login = async (username, password) => {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });

      if (!isSignedIn) {
        if (nextStep?.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
          return {
            success: false,
            error: 'Your account requires a password reset. Go to AWS Cognito Console → Users → select your user → Actions → Reset password, then try again.',
          };
        }
        return { success: false, error: `Sign-in incomplete: ${nextStep?.signInStep}` };
      }

      const session = await fetchAuthSession({ forceRefresh: true });
      const groups = session.tokens?.idToken?.payload?.['cognito:groups'];

      let role = null;
      if (Array.isArray(groups)) {
        if (groups.includes('residents')) role = 'residents';
        if (groups.includes('security')) role = 'security';
      }

      setAuth({ isAuthenticated: true, user: { username, role } });
      return { success: true, role };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    try {
      await signOut();
    } catch {
      // Ignore sign-out errors
    }
    setAuth({ isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
