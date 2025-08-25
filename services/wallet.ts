// services/walletService.ts
import { SigningStargateClient, StargateClient } from '@cosmjs/stargate';
import { OfflineSigner } from '@cosmjs/proto-signing';
import { Linking, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// XION testnet configuration for Keplr
const XION_TESTNET_CONFIG = {
  chainId: 'xion-testnet-2',
  chainName: 'XION Testnet',
  rpc: 'https://rpc.xion-testnet-2.burnt.com:443',
  rest: 'https://api.xion-testnet-2.burnt.com',
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: 'xion',
    bech32PrefixAccPub: 'xionpub',
    bech32PrefixValAddr: 'xionvaloper',
    bech32PrefixValPub: 'xionvaloperpub',
    bech32PrefixConsAddr: 'xionvalcons',
    bech32PrefixConsPub: 'xionvalconspub',
  },
  currencies: [
    {
      coinDenom: 'XION',
      coinMinimalDenom: 'uxion',
      coinDecimals: 6,
      coinGeckoId: 'xion',
    },
  ],
  feeCurrencies: [
    {
      coinDenom: 'XION',
      coinMinimalDenom: 'uxion',
      coinDecimals: 6,
      coinGeckoId: 'xion',
      gasPriceStep: {
        low: 0.01,
        average: 0.025,
        high: 0.03,
      },
    },
  ],
  stakeCurrency: {
    coinDenom: 'XION',
    coinMinimalDenom: 'uxion',
    coinDecimals: 6,
    coinGeckoId: 'xion',
  },
};

export enum WalletStatus {
  NotInstalled = 'not_installed',
  Installed = 'installed',
  Connected = 'connected',
  Connecting = 'connecting',
  Error = 'error',
}

export interface WalletAccount {
  address: string;
  publicKey: Uint8Array;
  name?: string;
  algo: string;
}

export interface WalletInfo {
  name: string;
  status: WalletStatus;
  account?: WalletAccount;
  balance?: string;
}

class WalletService {
  private signingClient: SigningStargateClient | null = null;
  private queryClient: StargateClient | null = null;
  private currentWallet: WalletInfo | null = null;

  /**
   * Check if Keplr is installed and available
   */
  async checkKeplrAvailability(): Promise<WalletStatus> {
    try {
      // For mobile, check if we can open Keplr app
      if (Platform.OS !== 'web') {
        // Try to detect if Keplr mobile app is installed
        const keplrInstalled = await this.isKeplrMobileInstalled();
        return keplrInstalled ? WalletStatus.Installed : WalletStatus.NotInstalled;
      }

      // For web, check window.keplr
      if (typeof window !== 'undefined' && window.keplr) {
        return WalletStatus.Installed;
      }

      return WalletStatus.NotInstalled;
    } catch (error) {
      console.error('Error checking Keplr availability:', error);
      return WalletStatus.Error;
    }
  }

  /**
   * Check if Keplr mobile is installed
   */
  private async isKeplrMobileInstalled(): Promise<boolean> {
    try {
      const keplrUrl = Platform.OS === 'ios' 
        ? 'keplrmobile://open' 
        : 'intent://open#Intent;package=com.chainapsis.keplr;scheme=keplrmobile;end';
      
      const canOpen = await Linking.canOpenURL(keplrUrl);
      return canOpen;
    } catch {
      return false;
    }
  }

  /**
   * Guide user to install Keplr
   */
  async guideKeplrInstallation(): Promise<boolean> {
    try {
      const installUrl = Platform.OS === 'ios'
        ? 'https://apps.apple.com/us/app/keplr-wallet/id1567851089'
        : 'https://play.google.com/store/apps/details?id=com.chainapsis.keplr';

      Alert.alert(
        'Install Keplr Wallet',
        'Keplr is required to connect your wallet. Would you like to install it now?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Install',
            onPress: async () => {
              const canOpen = await Linking.canOpenURL(installUrl);
              if (canOpen) {
                await Linking.openURL(installUrl);
              } else {
                Alert.alert('Error', 'Cannot open app store. Please install Keplr manually.');
              }
            },
          },
        ]
      );

      return false; // User needs to install first
    } catch (error) {
      console.error('Error guiding Keplr installation:', error);
      return false;
    }
  }

  /**
   * Connect to Keplr wallet
   */
  async connectKeplr(): Promise<WalletInfo> {
    try {
      const status = await this.checkKeplrAvailability();
      
      if (status === WalletStatus.NotInstalled) {
        await this.guideKeplrInstallation();
        throw new Error('Keplr wallet not installed');
      }

      // For mobile, use deep linking to Keplr
      if (Platform.OS !== 'web') {
        return await this.connectKeplrMobile();
      }

      // For web, use window.keplr
      return await this.connectKeplrWeb();

    } catch (error) {
      console.error('Error connecting to Keplr:', error);
      throw error;
    }
  }

  /**
   * Connect Keplr on mobile via deep linking
   */
  private async connectKeplrMobile(): Promise<WalletInfo> {
    try {
      // Create connection request
      const connectionData = {
        chainId: XION_TESTNET_CONFIG.chainId,
        appName: 'CodeCred',
        callbackUrl: 'codecred://wallet-connected',
      };

      // Save connection request for when we return from Keplr
      await AsyncStorage.setItem('wallet_connection_request', JSON.stringify(connectionData));

      // Open Keplr with connection request
      const keplrUrl = Platform.OS === 'ios'
        ? `keplrmobile://connect?${new URLSearchParams(connectionData).toString()}`
        : `intent://connect?${new URLSearchParams(connectionData).toString()}#Intent;package=com.chainapsis.keplr;scheme=keplrmobile;end`;

      const canOpen = await Linking.canOpenURL(keplrUrl);
      if (!canOpen) {
        throw new Error('Cannot open Keplr app');
      }

      await Linking.openURL(keplrUrl);

      // For now, return a pending connection
      // In a real app, you'd listen for the callback URL
      return {
        name: 'Keplr Mobile',
        status: WalletStatus.Connecting,
      };

    } catch (error) {
      console.error('Error connecting Keplr mobile:', error);
      throw error;
    }
  }

  /**
   * Connect Keplr on web
   */
  private async connectKeplrWeb(): Promise<WalletInfo> {
    try {
      if (!window.keplr) {
        throw new Error('Keplr extension not found');
      }

      // Suggest chain to Keplr
      await window.keplr.experimentalSuggestChain(XION_TESTNET_CONFIG);

      // Enable chain
      await window.keplr.enable(XION_TESTNET_CONFIG.chainId);

      // Get offline signer
      const offlineSigner = window.keplr.getOfflineSigner(XION_TESTNET_CONFIG.chainId);

      // Get accounts
      const accounts = await offlineSigner.getAccounts();
      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const account = accounts[0];

      // Create signing client
      this.signingClient = await SigningStargateClient.connectWithSigner(
        XION_TESTNET_CONFIG.rpc,
        offlineSigner
      );

      // Get balance
      const balance = await this.signingClient.getBalance(account.address, 'uxion');

      const walletInfo: WalletInfo = {
        name: 'Keplr',
        status: WalletStatus.Connected,
        account: {
          address: account.address,
          publicKey: account.pubkey,
          name: 'Keplr Account',
          algo: account.algo,
        },
        balance: balance.amount,
      };

      // Save connection
      await AsyncStorage.setItem('connected_wallet', JSON.stringify(walletInfo));
      this.currentWallet = walletInfo;

      return walletInfo;

    } catch (error) {
      console.error('Error connecting Keplr web:', error);
      throw error;
    }
  }

  /**
   * Handle wallet connection callback (for mobile)
   */
  async handleWalletCallback(url: string): Promise<WalletInfo | null> {
    try {
      if (!url.startsWith('codecred://wallet-connected')) {
        return null;
      }

      // Parse callback URL for connection result
      const urlParams = new URLSearchParams(url.split('?')[1]);
      const success = urlParams.get('success') === 'true';
      const address = urlParams.get('address');
      const publicKey = urlParams.get('publicKey');

      if (!success || !address) {
        throw new Error('Wallet connection failed');
      }

      // Create query client to get balance
      this.queryClient = await StargateClient.connect(XION_TESTNET_CONFIG.rpc);
      const balance = await this.queryClient.getBalance(address, 'uxion');

      const walletInfo: WalletInfo = {
        name: 'Keplr Mobile',
        status: WalletStatus.Connected,
        account: {
          address: address,
          publicKey: publicKey ? new Uint8Array(Buffer.from(publicKey, 'hex')) : new Uint8Array(),
          name: 'Keplr Mobile Account',
          algo: 'secp256k1',
        },
        balance: balance.amount,
      };

      // Save connection
      await AsyncStorage.setItem('connected_wallet', JSON.stringify(walletInfo));
      this.currentWallet = walletInfo;

      return walletInfo;

    } catch (error) {
      console.error('Error handling wallet callback:', error);
      return null;
    }
  }

  /**
   * Get current wallet connection
   */
  async getCurrentWallet(): Promise<WalletInfo | null> {
    try {
      if (this.currentWallet) {
        return this.currentWallet;
      }

      const saved = await AsyncStorage.getItem('connected_wallet');
      if (saved) {
        this.currentWallet = JSON.parse(saved);
        return this.currentWallet;
      }

      return null;
    } catch (error) {
      console.error('Error getting current wallet:', error);
      return null;
    }
  }

  /**
   * Disconnect wallet
   */
  async disconnect(): Promise<void> {
    try {
      await AsyncStorage.removeItem('connected_wallet');
      await AsyncStorage.removeItem('wallet_connection_request');
      
      this.signingClient = null;
      this.queryClient = null;
      this.currentWallet = null;
      
      console.log('✅ Wallet disconnected');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      throw error;
    }
  }

  /**
   * Get signing client for transactions
   */
  getSigningClient(): SigningStargateClient | null {
    return this.signingClient;
  }

  /**
   * Sign and broadcast transaction
   */
  async signAndBroadcast(messages: any[], memo: string = ''): Promise<any> {
    if (!this.signingClient || !this.currentWallet?.account) {
      throw new Error('Wallet not connected');
    }

    try {
      const result = await this.signingClient.signAndBroadcast(
        this.currentWallet.account.address,
        messages,
        'auto',
        memo
      );

      if (result.code !== 0) {
        throw new Error(`Transaction failed: ${result.rawLog}`);
      }

      return result;
    } catch (error) {
      console.error('Error signing and broadcasting:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const walletService = new WalletService();
export type { WalletInfo, WalletAccount };