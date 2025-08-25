// XION blockchain configuration

export interface XionConfig {
  networkUrl: string;
  appId: string;
  contractAddress?: string;
  // Additional XION-specific configuration
  chainId: string;
  rpcUrl: string;
  restUrl: string;
  redirectUri?: string;
}

// XION configuration using environment variables
export const xionConfig: XionConfig = {
  // Updated to testnet-2 configuration
  networkUrl: process.env.EXPO_PUBLIC_RPC_ENDPOINT || 'https://rpc.xion-testnet-2.burnt.com:443',
  appId: process.env.EXPO_PUBLIC_RECLAIM_APP_ID || 'codecred-app',
  contractAddress: process.env.EXPO_PUBLIC_VERIFICATION_CONTRACT_ADDRESS, 
  
  // XION-specific configuration updated for testnet-2
  chainId: 'xion-testnet-2', // Updated to testnet-2
  rpcUrl: process.env.EXPO_PUBLIC_RPC_ENDPOINT || 'https://rpc.xion-testnet-2.burnt.com:443',
  restUrl: process.env.EXPO_PUBLIC_REST_ENDPOINT || 'https://api.xion-testnet-2.burnt.com',
  redirectUri: 'codecred://auth/callback',
};