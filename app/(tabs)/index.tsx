import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Star, GitFork, Eye, Calendar } from 'lucide-react-native';
import ProjectCard from '../../components/ProjectCard';
import UserStats from '../../components/UserStats';

// Mock user data
const mockUser = {
  username: 'johndoe',
  displayName: 'John Doe',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
  bio: 'Full-stack developer passionate about open source',
  location: 'San Francisco, CA',
  company: 'Tech Corp',
  joinedDate: '2020-01-15',
  stats: {
    repositories: 24,
    followers: 156,
    following: 89,
    contributions: 1247,
  }
};

// Mock projects data
const mockProjects = [
  {
    id: '1',
    name: 'awesome-react-app',
    description: 'A modern React application with TypeScript and Next.js',
    language: 'TypeScript',
    stars: 125,
    forks: 23,
    isVerified: true,
    lastUpdate: '2024-01-15',
    tags: ['React', 'TypeScript', 'Next.js'],
  },
  {
    id: '2',
    name: 'mobile-ui-components',
    description: 'Reusable UI components library for React Native',
    language: 'JavaScript',
    stars: 89,
    forks: 15,
    isVerified: true,
    lastUpdate: '2024-01-10',
    tags: ['React Native', 'UI', 'Components'],
  },
  {
    id: '3',
    name: 'python-data-analyzer',
    description: 'Advanced data analysis toolkit with machine learning capabilities',
    language: 'Python',
    stars: 67,
    forks: 12,
    isVerified: false,
    lastUpdate: '2024-01-08',
    tags: ['Python', 'ML', 'Data Science'],
  },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-github-bg">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          <View className="flex-row items-center mb-4">
            <Image
              source={{ uri: mockUser.avatar }}
              className="w-20 h-20 rounded-full mr-4 border-2 border-github-border"
            />
            <View className="flex-1">
              <Text className="text-github-text text-xl font-bold">
                {mockUser.displayName}
              </Text>
              <Text className="text-github-textMuted text-base">
                @{mockUser.username}
              </Text>
              <View className="flex-row items-center mt-1">
                <Calendar size={14} color="#7d8590" />
                <Text className="text-github-textMuted text-sm ml-1">
                  Joined {new Date(mockUser.joinedDate).getFullYear()}
                </Text>
              </View>
            </View>
          </View>

          <Text className="text-github-text text-base mb-3">
            {mockUser.bio}
          </Text>

          <View className="flex-row items-center mb-4">
            <Text className="text-github-textMuted text-sm">
              📍 {mockUser.location} • 🏢 {mockUser.company}
            </Text>
          </View>

          <UserStats stats={mockUser.stats} />
        </View>

        {/* Projects Section */}
        <View className="px-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-github-text text-lg font-semibold">
              Verified Projects
            </Text>
            <TouchableOpacity>
              <Text className="text-github-blue text-sm font-medium">
                View All
              </Text>
            </TouchableOpacity>
          </View>

          {mockProjects.map((project) => (
            <ProjectCard key={project.id} project={project} showStats={true} />
          ))}
        </View>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}