// frontend/src/aws-config.js
// TODO: Replace all placeholder values with your actual AWS resource IDs
// Follow the instructions in backend/README.md to set up your AWS resources

const awsConfig = {
  Auth: {
    Cognito: {
      // TODO: Replace with your Cognito User Pool ID (e.g., "us-east-1_AbCdEfGhI")
      userPoolId: 'YOUR_USER_POOL_ID',

      // TODO: Replace with your Cognito App Client ID
      userPoolClientId: 'YOUR_APP_CLIENT_ID',

      // TODO: Replace with your AWS region (e.g., "us-east-1")
      region: 'YOUR_AWS_REGION',
    },
  },
};

export default awsConfig;
