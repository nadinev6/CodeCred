import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Star, GitFork, Eye, CircleCheck as CheckCircle, Flag } from 'lucide-react-native';

interface Project {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  isVerified: boolean;
  lastUpdate: string;
  tags: string[];
  author?: {
    username: string;
    avatar: string;
  };
}

interface ProjectCardProps {
  project: Project;
  showAuthor?: boolean;
  showStats?: boolean;
  onPress?: () => void;
}

const languageColors: { [key: string]: string } = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#f34b7d',
  Rust: '#dea584',
  Go: '#00ADD8',
  Swift: '#fa7343',
  Kotlin: '#A97BFF',
  Ruby: '#701516',
};

export default function ProjectCard({ 
  project, 
  showAuthor = false, 
  showStats = false, 
  onPress 
}: ProjectCardProps) {
  const languageColor = languageColors[project.language] || '#7d8590';

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-github-surface border border-github-border rounded-lg p-4 mb-4"
      activeOpacity={0.7}
    >
      {/* Author Info */}
      {showAuthor && project.author && (
        <View className="flex-row items-center mb-3">
          <Image
            source={{ uri: project.author.avatar }}
            className="w-6 h-6 rounded-full mr-2"
          />
          <Text className="text-github-textMuted text-sm">
            {project.author.username}
          </Text>
        </View>
      )}

      {/* Project Header */}
      <View className="flex-row items-start justify-between mb-2">
        <View className="flex-1 mr-3">
          <View className="flex-row items-center mb-1">
            <Text className="text-github-text text-lg font-semibold mr-2">
              {project.name}
            </Text>
            {project.isVerified && (
              <CheckCircle size={16} color="#238636" />
            )}
          </View>
          <Text className="text-github-textMuted text-sm leading-5">
            {project.description}
          </Text>
        </View>
        
        {/* Quick Actions */}
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-2 p-1">
            <Star size={16} color="#7d8590" />
          </TouchableOpacity>
          <TouchableOpacity className="p-1">
            <Flag size={14} color="#7d8590" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tags */}
      {project.tags && project.tags.length > 0 && (
        <View className="flex-row flex-wrap mb-3">
          {project.tags.slice(0, 3).map((tag) => (
            <View
              key={tag}
              className="bg-github-bg border border-github-border rounded-full px-2 py-1 mr-2 mb-1"
            >
              <Text className="text-github-textMuted text-xs">
                {tag}
              </Text>
            </View>
          ))}
          {project.tags.length > 3 && (
            <View className="bg-github-bg border border-github-border rounded-full px-2 py-1 mr-2 mb-1">
              <Text className="text-github-textMuted text-xs">
                +{project.tags.length - 3}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Stats and Language */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View
            className="w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: languageColor }}
          />
          <Text className="text-github-textMuted text-sm mr-4">
            {project.language}
          </Text>
          
          {showStats && (
            <View className="flex-row items-center">
              <Star size={14} color="#7d8590" />
              <Text className="text-github-textMuted text-sm ml-1 mr-3">
                {project.stars}
              </Text>
              <GitFork size={14} color="#7d8590" />
              <Text className="text-github-textMuted text-sm ml-1">
                {project.forks}
              </Text>
            </View>
          )}
        </View>

        <Text className="text-github-textMuted text-xs">
          Updated {new Date(project.lastUpdate).toLocaleDateString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}