// XION blockchain integration service 

import { Abstraxion } from '@burnt-labs/abstraxion';
import { AbstractAccountId, AbstractAccountInfo } from '@burnt-labs/abstract-signers';
import { SigningStargateClient, StargateClient } from '@cosmjs/stargate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';

interface XionConfig {
  networkUrl: string;
  appId: string;
  contractAddress?: string;
  // Additional XION-specific configuration
  chainId: string;
  rpcUrl: string;
  restUrl: string;
  redirectUri?: string;
}

class XionServiceSimplified {
  private config: XionConfig;
  private isInitialized: boolean = false;
  private queryClient: StargateClient | null = null;
  private currentAccount: XionAccount | null = null;

  constructor(config: XionConfig) {
    this.config = config;
  }

  /**
   * Simplified initialization without Abstraxion
   */
  async initialize(): Promise<boolean> {
    try {
      console.log('🔗 Initializing simplified XION Service...');
      console.log('Config:', {
        chainId: this.config.chainId,
        rpcUrl: this.config.rpcUrl,
        contractAddress: this.config.contractAddress,
      });

      // Create query client for reading blockchain data
      console.log('🔧 Connecting to XION RPC...');
      this.queryClient = await StargateClient.connect(this.config.rpcUrl);
      console.log('✅ Connected to XION RPC');

      // Test the connection by getting chain ID
      console.log('🔍 Testing blockchain connection...');
      const chainId = await this.queryClient.getChainId();
      const height = await this.queryClient.getHeight();
      console.log('✅ Blockchain connection successful:', {
        chainId: chainId,
        height: height,
      });

      // Try to restore previous session
      const savedAccount = await this.getCurrentAccount();
      if (savedAccount && savedAccount.isConnected) {
        console.log('📱 Found saved account:', savedAccount.address);
        this.currentAccount = savedAccount;
      }

      this.isInitialized = true;
      console.log('🎉 Simplified XION Service initialized successfully');
      return true;

    } catch (error) {
      console.error('❌ Failed to initialize simplified XION service:', error);
      this.isInitialized = false;
      return false;
    }
  }

  /**
   * Mock wallet connection for development
   * In production, this would integrate with actual wallet providers
   */
  async connectAccount(): Promise<XionAccount> {
    if (!this.isInitialized) {
      throw new Error('XION service not initialized');
    }

    try {
      console.log('🔐 Connecting account (mock for development)...');
      
      // For development, create a mock account
      // In production, this would connect to actual wallet
      const mockAccount: XionAccount = {
        address: 'xion1mock' + Math.random().toString(36).substr(2, 38), // Mock address format
        publicKey: 'mock_public_key_' + Date.now(),
        isConnected: true,
        balance: '1000000', // Mock balance in uxion
      };

      // Save account info
      await AsyncStorage.setItem('xion_account', JSON.stringify(mockAccount));
      this.currentAccount = mockAccount;

      console.log('✅ Account connected (mock):', mockAccount.address);
      return mockAccount;

    } catch (error) {
      console.error('❌ Failed to connect account:', error);
      throw error;
    }
  }

  /**
   * Get current account
   */
  async getCurrentAccount(): Promise<XionAccount | null> {
    try {
      const savedAccount = await AsyncStorage.getItem('xion_account');
      if (savedAccount) {
        const account = JSON.parse(savedAccount) as XionAccount;
        this.currentAccount = account;
        return account;
      }
      return null;
    } catch (error) {
      console.error('Failed to get current account:', error);
      return null;
    }
  }

  /**
   * Store project data (simplified version)
   */
  async storeProjectData(projectData: ProjectData): Promise<string> {
    if (!this.isInitialized || !this.currentAccount) {
      throw new Error('XION service not initialized or not connected');
    }

    try {
      console.log('📝 Storing project data (mock)...', projectData);

      // In development, simulate storing data
      const mockTxHash = 'mock_tx_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      
      // In production, this would use SigningStargateClient to submit real transaction
      console.log('✅ Project data stored (mock). TX Hash:', mockTxHash);
      return mockTxHash;

    } catch (error) {
      console.error('❌ Failed to store project data:', error);
      throw error;
    }
  }

  /**
   * Get project data from blockchain
   */
  async getProjectData(projectId: string): Promise<ProjectData | null> {
    if (!this.isInitialized || !this.queryClient) {
      throw new Error('XION service not initialized');
    }

    try {
      console.log('📖 Retrieving project data:', projectId);

      if (!this.config.contractAddress) {
        console.warn('No contract address configured');
        return null;
      }

      // Query smart contract
      const queryMsg = {
        get_project: {
          project_id: projectId,
        }
      };

      const result = await this.queryClient.queryContractSmart(
        this.config.contractAddress,
        queryMsg
      );

      if (result && result.project_data) {
        console.log('✅ Project data retrieved');
        return result.project_data as ProjectData;
      }

      return null;
    } catch (error) {
      console.error('❌ Failed to retrieve project data:', error);
      // Return mock data for development
      if (process.env.EXPO_PUBLIC_ENABLE_MOCK_DATA !== 'false') {
        return {
          id: projectId,
          repositoryUrl: 'https://github.com/example/repo',
          title: 'Mock Project',
          description: 'This is mock project data for development',
          category: 'DeFi',
          authorAddress: this.currentAccount?.address || 'mock_author',
          timestamp: Date.now(),
          verified: false,
        };
      }
      throw error;
    }
  }

  /**
   * Verify project (simplified)
   */
  async verifyProject(projectId: string, reclaimProof?: ReclaimProofData): Promise<boolean> {
    if (!this.isInitialized || !this.currentAccount) {
      throw new Error('XION service not initialized or not connected');
    }

    try {
      console.log('🔐 Verifying project (mock):', projectId);
      
      // Mock verification for development
      const success = Math.random() > 0.3; // 70% success rate for testing
      
      console.log(success ? '✅ Project verification successful (mock)' : '❌ Project verification failed (mock)');
      return success;

    } catch (error) {
      console.error('❌ Failed to verify project:', error);
      return false;
    }
  }

  /**
   * Disconnect account
   */
  async disconnect(): Promise<void> {
    try {
      await AsyncStorage.removeItem('xion_account');
      this.currentAccount = null;
      console.log('✅ Disconnected from XION');
    } catch (error) {
      console.error('❌ Failed to disconnect:', error);
      throw error;
    }
  }

  /**
   * Check if service is ready
   */
  isReady(): boolean {
    return this.isInitialized && this.queryClient !== null;
  }

  /**
   * Get current connection status
   */
  isConnected(): boolean {
    return this.currentAccount !== null && this.currentAccount.isConnected;
  }

  /**
   * Get network status
   */
  async getNetworkStatus(): Promise<any> {
    if (!this.queryClient) {
      throw new Error('Query client not initialized');
    }

    try {
      const chainId = await this.queryClient.getChainId();
      const height = await this.queryClient.getHeight();
      
      return {
        chainId: chainId,
        latestBlockHeight: height.toString(),
        latestBlockTime: new Date().toISOString(),
        catching_up: false,
      };
    } catch (error) {
      console.error('❌ Failed to get network status:', error);
      throw error;
    }
  }
}

// ProjectData
interface ProjectData {
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
interface XionAccount {
  address: string;
  publicKey?: string;
  isConnected: boolean;
  balance?: string;
}

interface TransactionResult {
  hash: string;
  height: number;
  success: boolean;
  gasUsed?: number;
}

interface ReclaimProofData {
  proof: any;
  verificationData: any;
  timestamp: number;
}

class XionService {
  private config: XionConfig;
  private isInitialized: boolean = false;
  private abstraxion: Abstraxion | null = null;
  private signingClient: SigningStargateClient | null = null;
  private currentAccount: XionAccount | null = null;

  constructor(config: XionConfig) {
    this.config = config;
  }

  /**
   * Initialize XION Service with real Dave SDK
   */
  async initialize(): Promise<boolean> {
    try {
      console.log('🔗 Initializing XION Service with Dave SDK...');

      // Initialize Abstraxion (XION's authentication layer)
      this.abstraxion = new Abstraxion({
        dappId: this.config.appId,
        chainId: this.config.chainId,
        rpcUrl: this.config.rpcUrl,
        restUrl: this.config.restUrl,
        redirectUri: this.config.redirectUri || 'your-app://auth/callback',
        // Mobile-specific configuration
        isMobile: true,
        storage: AsyncStorage,
      });

      await this.abstraxion.initialize();

      // Try to restore previous session
      const savedAccount = await this.getCurrentAccount();
      if (savedAccount && savedAccount.isConnected) {
        await this.connectWithSavedAccount(savedAccount);
      }

      this.isInitialized = true;
      console.log('✅ XION Service initialized successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize XION service:', error);
      this.isInitialized = false;
      return false;
    }
  }

  /**
   * Connect user account 
   */
  async connectAccount(): Promise<XionAccount> {
    if (!this.isInitialized || !this.abstraxion) {
      throw new Error('XION service not initialized');
    }

    try {
      console.log('🔐 Connecting XION account...');

      // Use Abstraxion for walletless authentication
      await this.abstraxion.connect();
      
      // Get signing client
      this.signingClient = await this.abstraxion.getSigningClient();
      
      // Get account information
      const accounts = await this.signingClient.getAccounts();
      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const primaryAccount = accounts[0];
      
      // Get balance
      const balance = await this.getAccountBalance(primaryAccount.address);

      const account: XionAccount = {
        address: primaryAccount.address,
        publicKey: Buffer.from(primaryAccount.pubkey).toString('hex'),
        isConnected: true,
        balance: balance,
      };

      // Save account info
      await AsyncStorage.setItem('xion_account', JSON.stringify(account));
      this.currentAccount = account;

      console.log('✅ XION account connected:', account.address);
      return account;
    } catch (error) {
      console.error('❌ Failed to connect XION account:', error);
      throw error;
    }
  }

  /**
   * Get current account
   */
  async getCurrentAccount(): Promise<XionAccount | null> {
    try {
      const savedAccount = await AsyncStorage.getItem('xion_account');
      if (savedAccount) {
        const account = JSON.parse(savedAccount) as XionAccount;
        this.currentAccount = account;
        return account;
      }
      return null;
    } catch (error) {
      console.error('Failed to get current account:', error);
      return null;
    }
  }

  /**
   * Store project data 
   */
  async storeProjectData(projectData: ProjectData): Promise<string> {
    if (!this.isInitialized || !this.signingClient || !this.currentAccount) {
      throw new Error('XION service not initialized or not connected');
    }

    try {
      console.log('📝 Storing project data on XION blockchain...', projectData);

      // Create transaction message for storing project data
      const msg = {
        typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
        value: {
          sender: this.currentAccount.address,
          contract: this.config.contractAddress,
          msg: Buffer.from(JSON.stringify({
            store_project: {
              project_data: projectData,
            }
          })),
          funds: [],
        },
      };

      // Sign and broadcast transaction
      const result = await this.signingClient.signAndBroadcast(
        this.currentAccount.address,
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
      throw error;
    }
  }

  /**
   * Get project data 
   */
  async getProjectData(projectId: string): Promise<ProjectData | null> {
    if (!this.isInitialized) {
      throw new Error('XION service not initialized');
    }

    try {
      console.log('📖 Retrieving project data from XION blockchain:', projectId);

      // Create query client
      const queryClient = await StargateClient.connect(this.config.rpcUrl);

      // Query smart contract
      const queryMsg = {
        get_project: {
          project_id: projectId,
        }
      };

      const result = await queryClient.queryContractSmart(
        this.config.contractAddress!,
        queryMsg
      );

      if (result && result.project_data) {
        console.log('✅ Project data retrieved successfully');
        return result.project_data as ProjectData;
      }

      return null;
    } catch (error) {
      console.error('❌ Failed to retrieve project data:', error);
      throw error;
    }
  }

  /**
   * Verify project with Reclaim Protocol integration 
   */
  async verifyProject(projectId: string, reclaimProof?: ReclaimProofData): Promise<boolean> {
    if (!this.isInitialized || !this.signingClient || !this.currentAccount) {
      throw new Error('XION service not initialized or not connected');
    }

    try {
      console.log('🔐 Verifying project with XION zkTLS and Reclaim Protocol:', projectId);

      // Create verification message
      const msg = {
        typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
        value: {
          sender: this.currentAccount.address,
          contract: this.config.contractAddress,
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
      const result = await this.signingClient.signAndBroadcast(
        this.currentAccount.address,
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
      return false;
    }
  }

  /**
   * Submit Reclaim Protocol proof to XION blockchain
   */
  async submitReclaimProof(
    proof: any, 
    verificationData: any, 
    projectId?: string
  ): Promise<TransactionResult> {
    if (!this.isInitialized || !this.signingClient || !this.currentAccount) {
      throw new Error('XION service not initialized or not connected');
    }

    try {
      console.log('📤 Submitting Reclaim proof to XION blockchain...');

      const msg = {
        typeUrl: '/cosmwasm.wasm.v1.MsgExecuteContract',
        value: {
          sender: this.currentAccount.address,
          contract: this.config.contractAddress,
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

      const result = await this.signingClient.signAndBroadcast(
        this.currentAccount.address,
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
  }

  /**
   * Get account balance
   */
  private async getAccountBalance(address: string): Promise<string> {
    try {
      if (!this.signingClient) return '0';
      
      const balance = await this.signingClient.getBalance(address, 'uxion');
      return balance.amount;
    } catch (error) {
      console.error('Failed to get balance:', error);
      return '0';
    }
  }

  /**
   * Connect with saved account
   */
  private async connectWithSavedAccount(account: XionAccount): Promise<void> {
    try {
      if (this.abstraxion) {
        await this.abstraxion.connect();
        this.signingClient = await this.abstraxion.getSigningClient();
        this.currentAccount = account;
      }
    } catch (error) {
      console.error('Failed to connect with saved account:', error);
      // Clear invalid saved account
      await AsyncStorage.removeItem('xion_account');
    }
  }

  /**
   * Disconnect account
   */
  async disconnect(): Promise<void> {
    try {
      if (this.abstraxion) {
        await this.abstraxion.disconnect();
      }
      
      await AsyncStorage.removeItem('xion_account');
      this.currentAccount = null;
      this.signingClient = null;
      
      console.log('✅ Disconnected from XION');
    } catch (error) {
      console.error('❌ Failed to disconnect:', error);
      throw error;
    }
  }

  /**
   * Get network status
   */
  async getNetworkStatus(): Promise<any> {
    try {
      const client = await StargateClient.connect(this.config.rpcUrl);
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
  }

  /**
   * Check if service is ready 
   */
  isReady(): boolean {
    return this.isInitialized && this.abstraxion !== null;
  }

  /**
   * Get current connection status
   */
  isConnected(): boolean {
    return this.currentAccount !== null && this.currentAccount.isConnected;
  }
}


//  configuration contract
const xionConfig: XionConfig = {
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


// Export singleton instance (keeping your pattern)
export const xionService = new XionService(xionConfig);

// Export types 
export type { 
  ProjectData, 
  XionConfig, 
  XionAccount, 
  TransactionResult, 
  ReclaimProofData 
};