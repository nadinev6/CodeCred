import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, Filter, TrendingUp, Brain, Smartphone } from 'lucide-react-native';

interface CategoryCardProps {
  title: string;
  count: number;
  color: string;
  icon: React.ReactNode;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, count, color, icon }) => (
  <TouchableOpacity style={[styles.categoryCard, { borderLeftColor: color }]}>
    <View style={styles.categoryIcon}>
      {icon}
    </View>
    <View style={styles.categoryContent}>
      <Text style={styles.categoryTitle}>{title}</Text>
      <Text style={styles.categoryCount}>{count} projects</Text>
    </View>
  </TouchableOpacity>
);

const categories = [
  {
    title: 'DeFi & Blockchain',
    count: 156,
    color: '#3b82f6',
    icon: <TrendingUp size={24} color="#3b82f6" />,
  },
  {
    title: 'AI & Machine Learning',
    count: 203,
    color: '#8b5cf6',
    icon: <Brain size={24} color="#8b5cf6" />,
  },
  {
    title: 'Mobile Development',
    count: 89,
    color: '#06b6d4',
    icon: <Smartphone size={24} color="#06b6d4" />,
  },
  {
    title: 'Web Development',
    count: 267,
    color: '#10b981',
    icon: <TrendingUp size={24} color="#10b981" />,
  },
];

export default function DiscoverScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <LinearGradient
      colors={['#0A0D14', '#1A202C']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Discover Projects</Text>
          <Text style={styles.headerSubtitle}>Explore verified developer work</Text>
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.searchSection}>
            <View style={styles.searchContainer}>
              <Search size={20} color="#7d8590" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search projects, developers..."
                placeholderTextColor="#7d8590"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity style={styles.filterButton}>
                <Filter size={20} color="#7d8590" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Browse by Category</Text>
            <View style={styles.categoriesGrid}>
              {categories.map((category, index) => (
                <CategoryCard key={index} {...category} />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trending Languages</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.languageScroll}
            >
              {['TypeScript', 'Python', 'JavaScript', 'Rust', 'Go', 'Java', 'Solidity'].map((lang, index) => (
                <TouchableOpacity key={index} style={styles.languageChip}>
                  <Text style={styles.languageText}>{lang}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Featured Developers</Text>
            <View style={styles.developersGrid}>
              {[
                { name: 'Sarah Chen', projects: 12, verified: 8 },
                { name: 'Alex Rodriguez', projects: 15, verified: 12 },
                { name: 'Priya Patel', projects: 9, verified: 7 },
                { name: 'Marcus Johnson', projects: 18, verified: 14 },
              ].map((dev, index) => (
                <TouchableOpacity key={index} style={styles.developerCard}>
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>{dev.name.split(' ').map(n => n[0]).join('')}</Text>
                  </View>
                  <Text style={styles.developerName}>{dev.name}</Text>
                  <Text style={styles.developerStats}>
                    {dev.projects} projects • {dev.verified} verified
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1f24',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f0f6fc',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#7d8590',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  searchSection: {
    padding: 20,
    paddingBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1f24',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#24292e',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#f0f6fc',
  },
  filterButton: {
    padding: 4,
    marginLeft: 8,
  },
  section: {
    padding: 20,
    paddingTop: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#f0f6fc',
    marginBottom: 16,
  },
  categoriesGrid: {
    gap: 12,
  },
  categoryCard: {
    backgroundColor: '#0f1216',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1a1f24',
    borderLeftWidth: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    marginRight: 16,
  },
  categoryContent: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f0f6fc',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 14,
    color: '#7d8590',
  },
  languageScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  languageChip: {
    backgroundColor: '#1a1f24',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#24292e',
  },
  languageText: {
    color: '#e6edf3',
    fontSize: 14,
    fontWeight: '500',
  },
  developersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  developerCard: {
    backgroundColor: '#0f1216',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1a1f24',
    alignItems: 'center',
    width: '48%',
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    backgroundColor: '#00bfff',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  developerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f0f6fc',
    marginBottom: 4,
    textAlign: 'center',
  },
  developerStats: {
    fontSize: 12,
    color: '#7d8590',
    textAlign: 'center',
  },
});