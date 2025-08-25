// XION blockchain integration service using React Hooks
import { useAbstraxionAccount, useAbstraxionSigningClient } from '@burnt-labs/abstraxion';
import { SigningStargateClient, StargateClient } from '@cosmjs/stargate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { xionConfig } from '../config/xion';
import 'react-native-get-random-values';

// ProjectData interface
export interface ProjectData {
  id: string;
  repositoryUrl: string;
  title: string;
  description: string;
  category: string;
  authorAddress: string;
  timestamp: number;
  verified: boolean;
}

// Additional interfaces for XION functionality
export interface XionAccount {
  address: string;
  publicKey?: string;
  isConnected: boolean;
  balance?: string;
}

export interface TransactionResult {
  hash: string;
  height: number;
  success: boolean;
  gasUsed?: number;
}

export interface ReclaimProofData {
  proof: any;
  verificationData: any;
  timestamp: number;
}

// Custom hook for XION service
export function useXionService() {
  const { 
    data: abstraxionAccount, 
    connect, 
    logout: abstraxionDisconnect,
    isConnecting: isAbstraxionConnecting 
  } = useAbstraxionAccount();
  const { client: abstraxionSigningClient } = useAbstraxionSigningClient();

  // Debug: Log what useAbstraxionAccount is returning
  console.log('🔍 useAbstraxionAccount hook state:', {
    hasData: !!abstraxionAccount,
    dataAddress: abstraxionAccount?.bech32Address,
    connectType: typeof connect,
    connectValue: connect,
    isConnecting: isAbstraxionConnecting,
    logoutType: typeof abstraxionDisconnect,
  });
  // Determine isConnected based on abstraxionAccount data
  const isConnected = !!abstraxionAccount?.bech32Address;

  // Convert abstraxion account to our XionAccount format
  const account: XionAccount | null = abstraxionAccount ? {
    address: abstraxionAccount.bech32Address,
    publicKey: abstraxionAccount.publicKey,
    isConnected: isConnected,
    balance: '0', // Will be fetched separately
  } : null;

  /**
   * Connect user account
   */
  const connectAccount = async (): Promise<XionAccount> => {
    try {
      console.log('🔐 Connecting XION account...');
      
      // Add defensive check for connect function
      if (typeof connect !== 'function') {
        console.error('DEBUG: Abstraxion `connect` function is not available. This indicates an issue with AbstraxionProvider setup or context.');
        console.error('DEBUG: connect value:', connect);
        console.error('DEBUG: useAbstraxionAccount hook returned:', { 
          data: abstraxionAccount, 
          connect, 
          logout: abstraxionDisconnect,
          isConnecting: isAbstraxionConnecting 
        });
        throw new Error('Wallet connection service not ready. Abstraxion `connect` function is missing.');
      }

      await connect();
      
      if (!abstraxionAccount) {
        throw new Error('Failed to connect account');
      }

      // Get balance
      const balance = await getAccountBalance(abstraxionAccount.bech32Address);

      const connectedAccount: XionAccount = {
        address: abstraxionAccount.bech32Address,
        publicKey: abstraxionAccount.publicKey,
        isConnected: true,
        balance: balance,
      };

      // Save account info
      await AsyncStorage.setItem('xion_account', JSON.stringify(connectedAccount));

      console.log('✅ XION account connected:', connectedAccount.address);
      return connectedAccount;
    } catch (error) {
      console.error('❌ Failed to connect XION account:', error);
      throw error;
    }
  };

  /**
   * Get current account
   */
  const getCurrentAccount = async (): Promise<XionAccount | null> => {
    if (account) {
      return account;
    }

    try {
      const savedAccount = await AsyncStorage.getItem('xion_account');
      if (savedAccount) {
        return JSON.parse(savedAccount) as XionAccount;
      }
      return null;
    } catch (error) {
      console.error('Failed to get current account:', error);
      return null;
    }
  };

  /**
   * Store project data on blockchain
   */
  const storeProjectData = async (projectData: ProjectData): Promise<string> => {
    if (!abstraxionSigningClient || !account) {
      throw new Error('XION service not connected');
    }

    try {
      console.log('📝 Storing project data on XION blockchain...', projectData);

      // Use the signing client from the hook
      const signingClient = abstraxionSigningClient;

      // Create transaction message for storing project data
      const msg = {
        typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
        value: {
          sender: account.address,
          contract: xionConfig.contractAddress,
          msg: Buffer.from(JSON.stringify({
            store_project: {
              project_data: projectData,
            }
          })),
          funds: [],
        },
      };

      // Sign and broadcast transaction
      const result = await signingClient.signAndBroadcast(
        account.address,
        [msg],
        'auto',
        `Store project: ${projectData.title}`
      );

      if (result.code !== 0) {
        throw new Error(`Transaction failed: ${result.rawLog}`);
      }

      console.log('✅ Project data stored successfully. TX Hash:', result.transactionHash);
      return result.transactionHash;
    } catch (error) {
      console.error('❌ Failed to store project data:', error);
      
      // Development fallback
      if (__DEV__) {
        console.warn('Using mock transaction hash for development');
        return `mock_tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      }
      
      throw error;
    }
  };

  /**
   * Get project data from blockchain
   */
  const getProjectData = async (projectId: string): Promise<ProjectData | null> => {
    try {
      console.log('📖 Retrieving project data from XION blockchain:', projectId);

      if (!xionConfig.contractAddress) {
        console.warn('No contract address configured');
        return null;
      }

      // Create query client
      const queryClient = await StargateClient.connect(xionConfig.rpcUrl);

      // Query smart contract
      const queryMsg = {
        get_project: {
          project_id: projectId,
        }
      };

      const result = await queryClient.queryContractSmart(
        xionConfig.contractAddress,
        queryMsg
      );

      if (result && result.project_data) {
        console.log('✅ Project data retrieved successfully');
        return result.project_data as ProjectData;
      }

      return null;
    } catch (error) {
      console.error('❌ Failed to retrieve project data:', error);
      
      // Return mock data for development
      if (__DEV__ && process.env.EXPO_PUBLIC_ENABLE_MOCK_DATA !== 'false') {
        return {
          id: projectId,
          repositoryUrl: 'https://github.com/example/repo',
          title: 'Mock Project',
          description: 'This is mock project data for development',
          category: 'DeFi',
          authorAddress: account?.address || 'mock_author',
          timestamp: Date.now(),
          verified: false,
        };
      }
      
      throw error;
    }
  };

  /**
   * Verify project with Reclaim Protocol integration
   */
  const verifyProject = async (projectId: string, reclaimProof?: ReclaimProofData): Promise<boolean> => {
    if (!abstraxionSigningClient || !account) {
      throw new Error('XION service not connected');
    }

    try {
      console.log('🔐 Verifying project with XION zkTLS and Reclaim Protocol:', projectId);

      // Use the signing client from the hook
      const signingClient = abstraxionSigningClient;

      // Create verification message
      const msg = {
        typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
        value: {
          sender: account.address,
          contract: xionConfig.contractAddress,
          msg: Buffer.from(JSON.stringify({
            verify_project: {
              project_id: projectId,
              reclaim_proof: reclaimProof ? {
                proof: reclaimProof.proof,
                verification_data: reclaimProof.verificationData,
                timestamp: reclaimProof.timestamp,
              } : null,
            }
          })),
          funds: [],
        },
      };

      // Sign and broadcast verification transaction
      const result = await signingClient.signAndBroadcast(
        account.address,
        [msg],
        'auto',
        `Verify project: ${projectId}`
      );

      const success = result.code === 0;
      
      if (success) {
        console.log('✅ Project verification successful. TX Hash:', result.transactionHash);
      } else {
        console.log('❌ Project verification failed:', result.rawLog);
      }

      return success;
    } catch (error) {
      console.error('❌ Failed to verify project:', error);
      
      // Development fallback
      if (__DEV__) {
        console.warn('Using mock verification result for development');
        return Math.random() > 0.3; // 70% success rate for testing
      }
      
      return false;
    }
  };

  /**
   * Submit Reclaim Protocol proof to XION blockchain
   */
  const submitReclaimProof = async (
    proof: any, 
    verificationData: any, 
    projectId?: string
  ): Promise<TransactionResult> => {
    if (!abstraxionSigningClient || !account) {
      throw new Error('XION service not connected');
    }

    try {
      console.log('📤 Submitting Reclaim proof to XION blockchain...');

      // Use the signing client from the hook
      const signingClient = abstraxionSigningClient;

      const msg = {
        typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
        value: {
          sender: account.address,
          contract: xionConfig.contractAddress,
          msg: Buffer.from(JSON.stringify({
            submit_reclaim_proof: {
              proof: proof,
              verification_data: verificationData,
              project_id: projectId,
              timestamp: Date.now(),
            }
          })),
          funds: [],
        },
      };

      const result = await signingClient.signAndBroadcast(
        account.address,
        [msg],
        'auto',
        'Submit Reclaim Protocol Proof'
      );

      return {
        hash: result.transactionHash,
        height: result.height,
        success: result.code === 0,
        gasUsed: result.gasUsed,
      };
    } catch (error) {
      console.error('❌ Failed to submit Reclaim proof:', error);
      throw error;
    }
  };

  /**
   * Get account balance
   */
  const getAccountBalance = async (address: string): Promise<string> => {
    try {
      if (!abstraxionSigningClient) return '0';
      
      const signingClient = abstraxionSigningClient;
      const balance = await signingClient.getBalance(address, 'uxion');
      return balance.amount;
    } catch (error) {
      console.error('Failed to get balance:', error);
      return '0';
    }
  };

  /**
   * Disconnect account
   */
  const disconnect = async (): Promise<void> => {
    try {
      await abstraxionDisconnect();
      await AsyncStorage.removeItem('xion_account');
      console.log('✅ Disconnected from XION');
    } catch (error) {
      console.error('❌ Failed to disconnect:', error);
      throw error;
    }
  };

  /**
   * Get network status
   */
  const getNetworkStatus = async (): Promise<any> => {
    try {
      const client = await StargateClient.connect(xionConfig.rpcUrl);
      const status = await client.status();
      
      return {
        chainId: status.nodeInfo.network,
        latestBlockHeight: status.syncInfo.latestBlockHeight,
        latestBlockTime: status.syncInfo.latestBlockTime,
        catching_up: status.syncInfo.catchingUp,
      };
    } catch (error) {
      console.error('❌ Failed to get network status:', error);
      throw error;
    }
  };

  /**
   * Check if service is ready
   */
  const isReady = (): boolean => {
    return abstraxionSigningClient !== null;
  };

  return {
    // State
    account,
    isConnected,
    isConnecting: isAbstraxionConnecting,
    
    // Methods
    connectAccount,
    getCurrentAccount,
    disconnect: abstraxionDisconnect,
    storeProjectData,
    getProjectData,
    verifyProject,
    submitReclaimProof,
    getNetworkStatus,
    isReady,
  };
}

// Export types
export type { XionConfig } from '../config/xion';