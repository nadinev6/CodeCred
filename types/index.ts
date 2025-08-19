// Type definitions for the CodeCred app

export interface User {
  id: string;
  username: string;
  displayName: string;
  email?: string;
  avatar?: string;
  bio?: string;
  githubUrl?: string;
  verified: boolean;
  stats: UserStats;
  createdAt: string;
}

export interface UserStats {
  totalProjects: number;
  verifiedProjects: number;
  totalStars: number;
  followers: number;
  following: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  repositoryUrl: string;
  category: ProjectCategory;
  tags: string[];
  author: User;
  language: string;
  stars: number;
  views: number;
  verified: boolean;
  verificationHash?: string;
  lastUpdated: string;
  createdAt: string;
  metrics: ProjectMetrics;
}

export interface ProjectMetrics {
  codeQuality: number;
  documentation: number;
  activity: number;
  community: number;
}

export interface ProjectSubmission {
  repositoryUrl: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  submittedAt: string;
  status: SubmissionStatus;
  verificationSteps: VerificationStep[];
}

export interface VerificationStep {
  id: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  message?: string;
  completedAt?: string;
}

export type ProjectCategory = 
  | 'defi-blockchain'
  | 'ai-ml'
  | 'mobile-development'
  | 'web-development'
  | 'devtools'
  | 'other';

export type SubmissionStatus =
  | 'draft'
  | 'submitted'
  | 'verifying'
  | 'approved'
  | 'rejected';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  unlockedAt?: string;
}

export interface Activity {
  id: string;
  type: 'project_verified' | 'project_submitted' | 'stars_received' | 'follower_gained';
  message: string;
  projectId?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface Filter {
  category?: ProjectCategory;
  verified?: boolean;
  language?: string;
  minStars?: number;
  sortBy: 'newest' | 'oldest' | 'stars' | 'views';
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Blockchain-related types
export interface BlockchainTransaction {
  hash: string;
  blockNumber: number;
  timestamp: string;
  gasUsed: string;
  status: 'pending' | 'confirmed' | 'failed';
}

export interface VerificationProof {
  proofHash: string;
  provider: string;
  data: Record<string, any>;
  timestamp: string;
  validated: boolean;
}

// Navigation types
export type TabParamList = {
  index: undefined;
  discover: undefined;
  submit: undefined;
  profile: undefined;
};

export type RootStackParamList = {
  '(tabs)': undefined;
  ProjectDetail: { projectId: string };
  UserProfile: { userId: string };
  Settings: undefined;
};