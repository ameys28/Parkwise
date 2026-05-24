// frontend/src/aws-config.js
// TODO: Replace all placeholder values with your actual AWS resource IDs
// Follow the instructions in backend/README.md to set up your AWS resources

const awsConfig = {
  Auth: {
    Cognito: {
      // TODO: Replace with your Cognito User Pool ID (e.g., "us-east-1_AbCdEfGhI")
      userPoolId: 'ap-south-1_8s6ArwUTs',

      // TODO: Replace with your Cognito App Client ID
      userPoolClientId: '2asp6p8qg05fmcqrk0rsnunskb',

      // TODO: Replace with your AWS region (e.g., "us-east-1")
      region: 'ap-south-1',
    },
  },
};

export default awsConfig;
