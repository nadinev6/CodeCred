import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, TrendingUp, Star } from 'lucide-react-native';
import ProjectCard from '../../components/ProjectCard';

// Mock feed data
const mockFeedProjects = [
  {
    id: '1',
    name: 'react-native-animations',
    description: 'Beautiful animations and transitions for React Native apps',
    language: 'TypeScript',
    stars: 245,
    forks: 34,
    isVerified: true,
    lastUpdate: '2024-01-16',
    tags: ['React Native', 'Animations', 'UI'],
    author: {
      username: 'animateddev',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    }
  },
  {
    id: '2',
    name: 'blockchain-wallet',
    description: 'Secure cryptocurrency wallet with multi-chain support',
    language: 'Rust',
    stars: 189,
    forks: 28,
    isVerified: true,
    lastUpdate: '2024-01-15',
    tags: ['Blockchain', 'Cryptocurrency', 'Security'],
    author: {
      username: 'cryptobuilder',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    }
  },
  {
    id: '3',
    name: 'ai-code-reviewer',
    description: 'AI-powered code review assistant with intelligent suggestions',
    language: 'Python',
    stars: 156,
    forks: 42,
    isVerified: true,
    lastUpdate: '2024-01-14',
    tags: ['AI', 'Code Review', 'Machine Learning'],
    author: {
      username: 'aidev123',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    }
  },
  {
    id: '4',
    name: 'mobile-game-engine',
    description: 'Lightweight 2D game engine optimized for mobile devices',
    language: 'C++',
    stars: 134,
    forks: 19,
    isVerified: false,
    lastUpdate: '2024-01-13',
    tags: ['Game Development', 'Mobile', 'Graphics'],
    author: {
      username: 'gamedev_pro',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    }
  },
];

const filterOptions = ['All', 'Trending', 'Recent', 'Most Starred', 'Verified'];

export default function FeedScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProjects = mockFeedProjects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-github-bg">
      {/* Header */}
      <View className="px-6 pt-4 pb-2">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-github-text text-2xl font-bold">
            Discover
          </Text>
          <View className="flex-row items-center">
            <TrendingUp size={20} color="#1f6feb" />
            <Text className="text-github-blue text-sm font-medium ml-1">
              Trending
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-github-surface border border-github-border rounded-lg px-3 py-3 mb-3">
          <Search size={18} color="#7d8590" />
          <TextInput
            className="flex-1 text-github-text ml-3"
            placeholder="Search projects..."
            placeholderTextColor="#7d8590"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Toggle */}
        <TouchableOpacity
          onPress={() => setShowFilters(!showFilters)}
          className="flex-row items-center justify-between bg-github-surface border border-github-border rounded-lg px-3 py-3"
        >
          <View className="flex-row items-center">
            <Filter size={16} color="#7d8590" />
            <Text className="text-github-textMuted ml-2">
              Filter: {selectedFilter}
            </Text>
          </View>
          <Text className="text-github-blue text-sm">
            {showFilters ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>

        {/* Filter Options */}
        {showFilters && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-3"
          >
            <View className="flex-row space-x-2">
              {filterOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => setSelectedFilter(option)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedFilter === option
                      ? 'bg-github-blue border-github-blue'
                      : 'border-github-border'
                  }`}
                >
                  <Text
                    className={`text-sm font-medium ${
                      selectedFilter === option
                        ? 'text-white'
                        : 'text-github-textMuted'
                    }`}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}
      </View>

      {/* Projects Feed */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="pt-4">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              showAuthor={true}
              showStats={true}
            />
          ))}
        </View>
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}