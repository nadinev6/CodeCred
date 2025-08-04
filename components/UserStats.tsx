import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface UserStatsProps {
  stats: {
    repositories: number;
    followers: number;
    following: number;
    contributions: number;
  };
}

export default function UserStats({ stats }: UserStatsProps) {
  const StatItem = ({ label, value }: { label: string; value: number }) => (
    <TouchableOpacity className="items-center flex-1">
      <Text className="text-github-text text-lg font-bold">
        {value.toLocaleString()}
      </Text>
      <Text className="text-github-textMuted text-xs">
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="bg-github-surface border border-github-border rounded-lg p-4">
      <View className="flex-row items-center justify-between">
        <StatItem label="Repos" value={stats.repositories} />
        <View className="w-px h-8 bg-github-border" />
        <StatItem label="Followers" value={stats.followers} />
        <View className="w-px h-8 bg-github-border" />
        <StatItem label="Following" value={stats.following} />
        <View className="w-px h-8 bg-github-border" />
        <StatItem label="Contributions" value={stats.contributions} />
      </View>
    </View>
  );
}