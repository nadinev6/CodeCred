import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Star, GitFork, Eye, CircleCheck as CheckCircle, Flag, Calendar, Code, Users } from 'lucide-react-native';

// Mock project detail data
const mockProjectDetail = {
  id: '1',
  name: 'awesome-react-app',
  description: 'A modern React application with TypeScript and Next.js featuring beautiful UI components and animations',
  language: 'TypeScript',
  stars: 125,
  forks: 23,
  watchers: 45,
  isVerified: true,
  lastUpdate: '2024-01-15',
  createdAt: '2023-06-10',
  tags: ['React', 'TypeScript', 'Next.js', 'UI Components', 'Animation'],
  author: {
    username: 'johndoe',
    displayName: 'John Doe',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
  },
  languageDistribution: {
    TypeScript: 65,
    JavaScript: 20,
    CSS: 10,
    HTML: 5,
  },
  readme: `# Awesome React App

This is a comprehensive React application built with modern technologies and best practices.

## Features

- 🚀 Next.js 13+ with App Router
- 🎨 Tailwind CSS for styling
- 📱 Fully responsive design
- ⚡ Fast and optimized performance
- 🔒 TypeScript for type safety

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## Contributing

Pull requests are welcome! Please read our contributing guidelines first.`,
  metrics: {
    codeCredStars: 85,
    verificationScore: 92,
    communityRating: 4.8,
  }
};

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams();
  const [isStarred, setIsStarred] = useState(false);
  const [showReadme, setShowReadme] = useState(true);

  const handleStarPress = () => {
    setIsStarred(!isStarred);
  };

  const languageColors: { [key: string]: string } = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    CSS: '#563d7c',
    HTML: '#e34c26',
  };

  return (
    <SafeAreaView className="flex-1 bg-github-bg">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-github-border">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center"
        >
          <ArrowLeft size={20} color="#7d8590" />
          <Text className="text-github-textMuted ml-2">Back</Text>
        </TouchableOpacity>
        
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={handleStarPress}
            className={`flex-row items-center px-3 py-2 rounded-lg mr-2 ${
              isStarred ? 'bg-yellow-500/20' : 'bg-github-surface border border-github-border'
            }`}
          >
            <Star 
              size={16} 
              color={isStarred ? '#f59e0b' : '#7d8590'} 
              fill={isStarred ? '#f59e0b' : 'none'}
            />
            <Text className={`text-sm ml-1 ${isStarred ? 'text-yellow-500' : 'text-github-textMuted'}`}>
              Star
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="p-2">
            <Flag size={16} color="#7d8590" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Project Header */}
        <View className="px-6 py-4">
          <View className="flex-row items-center mb-3">
            <Image
              source={{ uri: mockProjectDetail.author.avatar }}
              className="w-8 h-8 rounded-full mr-3"
            />
            <Text className="text-github-textMuted">
              {mockProjectDetail.author.username}
            </Text>
          </View>

          <View className="flex-row items-center mb-2">
            <Text className="text-github-text text-2xl font-bold mr-3">
              {mockProjectDetail.name}
            </Text>
            {mockProjectDetail.isVerified && (
              <CheckCircle size={20} color="#238636" />
            )}
          </View>

          <Text className="text-github-textMuted text-base mb-4 leading-6">
            {mockProjectDetail.description}
          </Text>

          {/* Stats Row */}
          <View className="flex-row items-center mb-4">
            <View className="flex-row items-center mr-6">
              <Star size={16} color="#7d8590" />
              <Text className="text-github-textMuted text-sm ml-1">
                {mockProjectDetail.stars}
              </Text>
            </View>
            <View className="flex-row items-center mr-6">
              <GitFork size={16} color="#7d8590" />
              <Text className="text-github-textMuted text-sm ml-1">
                {mockProjectDetail.forks}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Eye size={16} color="#7d8590" />
              <Text className="text-github-textMuted text-sm ml-1">
                {mockProjectDetail.watchers}
              </Text>
            </View>
          </View>

          {/* Tags */}
          <View className="flex-row flex-wrap mb-4">
            {mockProjectDetail.tags.map((tag) => (
              <View
                key={tag}
                className="bg-github-blue/20 border border-github-blue/30 rounded-full px-3 py-1 mr-2 mb-2"
              >
                <Text className="text-github-blue text-xs font-medium">
                  {tag}
                </Text>
              </View>
            ))}
          </View>

          {/* Date Info */}
          <View className="flex-row items-center text-sm text-github-textMuted mb-6">
            <Calendar size={14} color="#7d8590" />
            <Text className="text-github-textMuted text-sm ml-1">
              Created {new Date(mockProjectDetail.createdAt).toLocaleDateString()} • 
              Updated {new Date(mockProjectDetail.lastUpdate).toLocaleDateString()}
            </Text>
          </View>
        </View>

        {/* Metrics Cards */}
        <View className="px-6 mb-6">
          <Text className="text-github-text text-lg font-semibold mb-4">
            CodeCred Metrics
          </Text>
          
          <View className="flex-row justify-between mb-4">
            <View className="bg-github-surface border border-github-border rounded-lg p-4 flex-1 mr-2">
              <Text className="text-github-blue text-2xl font-bold">
                {mockProjectDetail.metrics.codeCredStars}
              </Text>
              <Text className="text-github-textMuted text-sm">
                CodeCred Stars
              </Text>
            </View>
            
            <View className="bg-github-surface border border-github-border rounded-lg p-4 flex-1 ml-2">
              <Text className="text-github-accent text-2xl font-bold">
                {mockProjectDetail.metrics.verificationScore}%
              </Text>
              <Text className="text-github-textMuted text-sm">
                Verification Score
              </Text>
            </View>
          </View>
        </View>

        {/* Language Distribution */}
        <View className="px-6 mb-6">
          <Text className="text-github-text text-lg font-semibold mb-4">
            Language Distribution
          </Text>
          
          <View className="bg-github-surface border border-github-border rounded-lg p-4">
            <View className="flex-row h-2 rounded-full overflow-hidden mb-4">
              {Object.entries(mockProjectDetail.languageDistribution).map(([lang, percentage]) => (
                <View
                  key={lang}
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: languageColors[lang] || '#7d8590',
                  }}
                />
              ))}
            </View>
            
            <View className="space-y-2">
              {Object.entries(mockProjectDetail.languageDistribution).map(([lang, percentage]) => (
                <View key={lang} className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <View
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: languageColors[lang] || '#7d8590' }}
                    />
                    <Text className="text-github-text text-sm">{lang}</Text>
                  </View>
                  <Text className="text-github-textMuted text-sm">{percentage}%</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Content Tabs */}
        <View className="px-6 mb-4">
          <View className="flex-row border-b border-github-border">
            <TouchableOpacity
              onPress={() => setShowReadme(true)}
              className={`py-3 mr-6 ${showReadme ? 'border-b-2 border-github-blue' : ''}`}
            >
              <Text className={`font-medium ${showReadme ? 'text-github-blue' : 'text-github-textMuted'}`}>
                README
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowReadme(false)}
              className={`py-3 ${!showReadme ? 'border-b-2 border-github-blue' : ''}`}
            >
              <Text className={`font-medium ${!showReadme ? 'text-github-blue' : 'text-github-textMuted'}`}>
                Code
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View className="px-6 mb-8">
          {showReadme ? (
            <View className="bg-github-surface border border-github-border rounded-lg p-4">
              <Text className="text-github-text text-sm font-mono leading-6">
                {mockProjectDetail.readme}
              </Text>
            </View>
          ) : (
            <View className="bg-github-surface border border-github-border rounded-lg p-4">
              <Text className="text-github-textMuted text-center">
                Code preview would be displayed here
              </Text>
            </View>
          )}
        </View>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}