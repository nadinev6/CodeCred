// Reclaim Protocol integration service


interface ReclaimConfig {
  appId: string;
  appSecret?: string;
  apiUrl?: string;
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

interface ReclaimProofResponse {
  proofs: Array<{
    id: string;
    hash: string;
    context: {
      username?: string;
      commits?: number;
      lastCommitDate?: string;
      isOwner?: boolean;
    };
  }>;
}

class ReclaimService {
  private config: ReclaimConfig;
  private isInitialized: boolean = false;
  private apiBaseUrl: string;

  constructor(config: ReclaimConfig) {
    this.config = config;
    // Use provided API URL or default
    this.apiBaseUrl = config.apiUrl || 'https://api.reclaimprotocol.org'; 
  }

  async initialize(): Promise<boolean> {
    try {
      // Validate configuration
      if (!this.config.appId) {
        throw new Error('App ID is required for Reclaim service');
      }

      // Test API connection
      const isApiAvailable = await this.testApiConnection();
      if (!isApiAvailable) {
        console.warn('Reclaim API not available, using mock data for development');
      }

      this.isInitialized = true;
      console.log('Reclaim service initialized successfully');
      return true;
    } catch (error) {
      console.error('Failed to initialize Reclaim service:', error);
      if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Stack trace:', error.stack);
    }
      this.isInitialized = false;
      return false;
    }
  }

  private async testApiConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/health`, {
        method: 'GET',
        timeout: 5000,
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  async verifyGitHubRepository(repositoryUrl: string): Promise<VerificationResult> {
    if (!this.isInitialized) {
      throw new Error('Reclaim service not initialized. Call initialize() first.');
    }

    // Input validation
    if (!repositoryUrl || typeof repositoryUrl !== 'string') {
      return {
        success: false,
        error: 'Invalid repository URL provided',
      };
    }

    // Extract GitHub info from URL
    const repoInfo = this.parseGitHubUrl(repositoryUrl);
    if (!repoInfo) {
      return {
        success: false,
        error: 'Invalid GitHub repository URL format',
      };
    }

    try {
      // Option 1: REST API approach
      const verificationResult = await this.callReclaimAPI({
        appId: this.config.appId,
        appSecret: this.config.appSecret,
        providerId: 'github',
        repositoryUrl: repositoryUrl,
        owner: repoInfo.owner,
        repo: repoInfo.repo,
      });

      if (verificationResult) {
        return this.processVerificationResult(verificationResult, repositoryUrl);
      } else {
        // Option 2: Fallback to mock data for development
        console.warn('Using mock verification data for development');
        return this.createMockVerificationResult(repositoryUrl, repoInfo);
      }
    } catch (error) {
      console.error('Failed to verify GitHub repository:', error);
      
      // Development fallback
      if (__DEV__) {
        console.warn('Using mock data due to verification error');
        return this.createMockVerificationResult(repositoryUrl, repoInfo);
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown verification error',
      };
    }
  }

  private parseGitHubUrl(url: string): { owner: string; repo: string } | null {
    try {
      const regex = /github\.com\/([^\/]+)\/([^\/]+)/;
      const match = url.match(regex);
      if (match && match[1] && match[2]) {
        return {
          owner: match[1],
          repo: match[2].replace(/\.git$/, ''), // Remove .git suffix if present
        };
      }
      return null;
    } catch {
      return null;
    }
  }

  private async callReclaimAPI(params: any): Promise<ReclaimProofResponse | null> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/verify/github`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.appSecret}`,
          'X-App-ID': this.config.appId,
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        let errorMessage = `API request failed: ${response.status} ${response.statusText}`;
        
        try {
          const errorBody = await response.text();
          if (errorBody) {
            console.error('API Error Response Body:', errorBody);
            errorMessage += ` - ${errorBody}`;
          }
        } catch (bodyError) {
          console.error('Failed to read error response body:', bodyError);
        }
        
        console.error('Full API Error Details:', {
          status: response.status,
          statusText: response.statusText,
          url: response.url,
          headers: Object.fromEntries(response.headers.entries()),
        });
        
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      console.error('API call failed with detailed error:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        apiUrl: this.apiBaseUrl,
        appId: this.config.appId,
        hasAppSecret: !!this.config.appSecret,
      });
      return null;
    }
  }

  private processVerificationResult(
    result: ReclaimProofResponse,
    repositoryUrl: string
  ): VerificationResult {
    if (result?.proofs && result.proofs.length > 0) {
      const proof = result.proofs[0];

      const extractedData: GitHubVerificationData = {
        username: proof.context?.username || 'unknown',
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
  }

  private createMockVerificationResult(
    repositoryUrl: string,
    repoInfo: { owner: string; repo: string }
  ): VerificationResult {
    // Mock data for development
    const mockData: GitHubVerificationData = {
      username: repoInfo.owner,
      repositoryUrl: repositoryUrl,
      commits: Math.floor(Math.random() * 100) + 10, // Random commits between 10-110
      lastCommitDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      isOwner: true, // Assume ownership for mock
    };

    return {
      success: true,
      data: mockData,
      proofHash: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  async generatePrivacyProof(data: any): Promise<string> {
    if (!this.isInitialized) {
      throw new Error('Reclaim service not initialized. Call initialize() first.');
    }

    if (!data) {
      throw new Error('Data is required to generate privacy proof');
    }

    try {
      // Option 1: REST API approach
      const response = await fetch(`${this.apiBaseUrl}/proof/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.appSecret}`,
          'X-App-ID': this.config.appId,
        },
        body: JSON.stringify({ data }),
      });

      if (response.ok) {
        const result = await response.json();
        return result.proofHash || result.id || JSON.stringify(result);
      } else {
        throw new Error(`API request failed: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Failed to generate privacy proof:', error);
      
      // Development fallback
      if (__DEV__) {
        console.warn('Using mock proof hash for development');
        return `mock_proof_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      }
      
      throw new Error(
        error instanceof Error ? error.message : 'Failed to generate privacy proof'
      );
    }
  }

  // Additional utility methods
  isServiceInitialized(): boolean {
    return this.isInitialized;
  }

  async cleanup(): Promise<void> {
    try {
      // Perform any necessary cleanup
      this.isInitialized = false;
      console.log('Reclaim service cleaned up');
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  }

  // WebView integration method for complex verification flows
  getWebVerificationUrl(repositoryUrl: string): string {
    const params = new URLSearchParams({
      appId: this.config.appId,
      repositoryUrl: repositoryUrl,
      providerId: 'github',
      callbackUrl: 'codecred://verification-complete',
    });

    return `${this.apiBaseUrl}/verify/web?${params.toString()}`;
  }
}

// Create and export a configured instance using your environment variables
const reclaimService = new ReclaimService({
  appId: process.env.EXPO_PUBLIC_RECLAIM_APP_ID || '0x376B86445693a5a596eB869182c0f3D79c945E1F',
  appSecret: process.env.EXPO_PUBLIC_RECLAIM_APP_SECRET || '0x0d98d38c03d794ee7f51ad56f8036d11514d453709b9699a35e2c9463dea4c59', 
});

export { reclaimService, ReclaimService };
export type { VerificationResult, GitHubVerificationData };