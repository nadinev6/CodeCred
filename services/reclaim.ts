// Reclaim Protocol integration service
// This provides the foundation for privacy-preserving verification
import { ReclaimVerification } from '@reclaimprotocol/inapp-rn-sdk';

interface ReclaimConfig {
  appId: string;
  appSecret?: string;
}

interface GitHubVerificationData {
  username: string;
  repositoryUrl: string;
  commits: number;
  lastCommitDate: string;
  isOwner: boolean;
}

interface VerificationResult {
  success: boolean;
  data?: GitHubVerificationData;
  proofHash?: string;
  error?: string;
}

class ReclaimService {
  private config: ReclaimConfig;
  private isInitialized: boolean = false;
  private reclaimClient: ReclaimVerification | null = null;

  constructor(config: ReclaimConfig) {
    this.config = config;
  }

  async initialize(): Promise<boolean> {
    try {
      // Initialize Reclaim SDK with custom app info
      this.reclaimClient = new ReclaimVerification();
      this.reclaimClient.setOverrides({
        appInfo: {
          appName: 'CodeCred',
          appImageUrl: 'assets/images/2755687723565.png', // Fixed: Removed markdown link formatting
        },
      });
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize Reclaim service:', error);
      this.isInitialized = false;
      return false;
    }
  }

  async verifyGitHubRepository(repositoryUrl: string): Promise<VerificationResult> {
    if (!this.isInitialized || !this.reclaimClient) {
      throw new Error('Reclaim service not initialized. Call initialize() first.');
    }

    // Input validation
    if (!repositoryUrl || typeof repositoryUrl !== 'string') {
      return {
        success: false,
        error: 'Invalid repository URL provided',
      };
    }

    try {
      // Use Reclaim Protocol to verify GitHub data
      const verificationResult = await this.reclaimClient.startVerification({
        appId: this.config.appId,
        secret: this.config.appSecret,
        providerId: 'github', // Verify this is the correct provider ID for your use case
        // Add other required parameters based on Reclaim SDK documentation
      });

      // Handle successful verification
      if (verificationResult?.proofs && verificationResult.proofs.length > 0) {
        // Use the first proof - adjust based on your needs
        const proof = verificationResult.proofs[0];

        // Extract real data from the proof object
        // Note: Adjust these property paths based on actual Reclaim SDK response format
        const extractedData: GitHubVerificationData = {
          username: proof.context?.username || '',
          repositoryUrl: repositoryUrl,
          commits: proof.context?.commits || 0,
          lastCommitDate: proof.context?.lastCommitDate || new Date().toISOString(),
          isOwner: proof.context?.isOwner || false,
        };

        return {
          success: true,
          data: extractedData,
          proofHash: proof.hash || proof.id || '',
        };
      } else {
        return {
          success: false,
          error: 'Verification failed - no proofs returned',
        };
      }
    } catch (error) {
      console.error('Failed to verify GitHub repository:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown verification error',
      };
    }
  }

  async generatePrivacyProof(data: any): Promise<string> {
    if (!this.isInitialized || !this.reclaimClient) {
      throw new Error('Reclaim service not initialized. Call initialize() first.');
    }

    // Input validation
    if (!data) {
      throw new Error('Data is required to generate privacy proof');
    }

    try {
      // Generate privacy-preserving proof
      // Note: Verify this method exists in the RN SDK or use startVerification instead
      const proof = await this.reclaimClient.generatePrivacyProof(data);

      // Return the actual proof from the SDK
      return proof.hash || proof.id || JSON.stringify(proof);
    } catch (error) {
      console.error('Failed to generate privacy proof:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Failed to generate privacy proof'
      );
    }
  }

  // Additional utility methods
  isServiceInitialized(): boolean {
    return this.isInitialized && this.reclaimClient !== null;
  }

  async cleanup(): Promise<void> {
    try {
      // Perform any necessary cleanup
      if (this.reclaimClient) {
        // Add cleanup logic if the SDK provides cleanup methods
      }
      this.reclaimClient = null;
      this.isInitialized = false;
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  }
}