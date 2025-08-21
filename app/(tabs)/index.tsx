import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { Star, GitBranch, CircleCheck as CheckCircle, Eye } from 'lucide-react-native';

interface ProjectCardProps {
  title: string;
  author: string;
  description: string;
  language: string;
  stars: number;
  verified: boolean;
  views: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  author,
  description,
  language,
  stars,
  verified,
  views,
}) => (
  <TouchableOpacity style={styles.projectCard}>
    <View style={styles.cardHeader}>
      <View style={styles.titleRow}>
        <Text style={styles.projectTitle}>{title}</Text>
        {verified && (
          <View style={styles.verifiedBadge}>
            <CheckCircle size={16} color="#00bfff" />
          </View>
        )}
      </View>
      <Text style={styles.authorText}>by {author}</Text>
    </View>
    
    <Text style={styles.description}>{description}</Text>
    
    <View style={styles.cardFooter}>
      <View style={styles.languageTag}>
        <View style={[styles.languageDot, { backgroundColor: getLanguageColor(language) }]} />
        <Text style={styles.languageText}>{language}</Text>
      </View>
      
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Star size={14} color="#fbbf24" fill="#fbbf24" />
          <Text style={styles.statText}>{stars}</Text>
        </View>
        <View style={styles.stat}>
          <Eye size={14} color="#6b7280" />
          <Text style={styles.statText}>{views}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const getLanguageColor = (language: string) => {
  const colors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Java: '#b07219',
    Go: '#00ADD8',
    Rust: '#dea584',
  };
  return colors[language] || '#6b7280';
};

const mockProjects: ProjectCardProps[] = [
  {
    title: 'DeFi Portfolio Tracker',
    author: 'alexdev',
    description: 'A comprehensive DeFi portfolio tracking application with real-time analytics and yield farming insights.',
    language: 'TypeScript',
    stars: 245,
    verified: true,
    views: 1200,
  },
  {
    title: 'NFT Marketplace Smart Contracts',
    author: 'blockchain_builder',
    description: 'Secure and gas-optimized smart contracts for NFT trading with royalty management.',
    language: 'JavaScript',
    stars: 189,
    verified: true,
    views: 890,
  },
  {
    title: 'AI Code Review Assistant',
    author: 'ml_engineer_pro',
    description: 'Machine learning model that provides intelligent code review suggestions and bug detection.',
    language: 'Python',
    stars: 567,
    verified: false,
    views: 2100,
  },
  {
    title: 'Cross-Chain Bridge Protocol',
    author: 'web3_architect',
    description: 'Decentralized protocol for secure asset transfers between different blockchain networks.',
    language: 'Rust',
    stars: 334,
    verified: true,
    views: 1500,
  },
];

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={['#0A0D14', '#1A202C']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            // Inside the headerContent View in app/(tabs)/index.tsx

<Image
  source={require('../../assets/images/1755687723565.png')}
  style={{ width: 50, height: 50, marginRight: 12, backgroundColor: 'none' }} 
  resizeMode="contain"
/>
            <Text style={styles.headerTitle}>CODECRED</Text>
          </View>
          <Text style={styles.headerSubtitle}>Discover verified developer projects</Text>
        </View>
        
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 180 }]}
        >
          <View style={styles.filterSection}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.filterScroll}
            >
              <TouchableOpacity style={[styles.filterChip, styles.activeFilter]}>
                <Text style={[styles.filterText, styles.activeFilterText]}>All Projects</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterChip}>
                <Text style={styles.filterText}>Verified Only</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterChip}>
                <Text style={styles.filterText}>Trending</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterChip}>
                <Text style={styles.filterText}>New</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <View style={styles.projectList}>
            {mockProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
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
    borderBottomColor: '#21262d',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  logoContainer: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  logoImage: {
    width: 32,
    height: 32,
  },
  logoGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f0f6fc',
    fontFamily: 'RobotoMono-Regular',
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
  filterSection: {
    paddingVertical: 16,
  },
  filterScroll: {
    paddingHorizontal: 20,
  },
  filterChip: {
    backgroundColor: '#21262d',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  activeFilter: {
    backgroundColor: '#00bfff',
    borderColor: '#00bfff',
  },
  filterText: {
    color: '#7d8590',
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#ffffff',
  },
  projectList: {
    padding: 20,
    gap: 16,
  },
  projectCard: {
    backgroundColor: '#161b22',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#21262d',
  },
  cardHeader: {
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f0f6fc',
    flex: 1,
  },
  verifiedBadge: {
    marginLeft: 8,
    padding: 4,
    backgroundColor: '#22c55e20',
    borderRadius: 6,
  },
  authorText: {
    fontSize: 14,
    color: '#7d8590',
  },
  description: {
    fontSize: 15,
    lineHeight: 20,
    color: '#e6edf3',
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  languageText: {
    fontSize: 12,
    color: '#7d8590',
    fontWeight: '500',
  },
  stats: {
    flexDirection: 'row',
    gap: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#7d8590',
    fontWeight: '500',
  },
});