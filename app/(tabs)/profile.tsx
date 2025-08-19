import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Star, GitBranch, Award, CircleCheck, Users, Calendar, Github, ExternalLink } from 'lucide-react-native';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
  <View style={styles.statCard}>
    <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
      {icon}
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statTitle}>{title}</Text>
  </View>
);

interface ProjectItemProps {
  title: string;
  description: string;
  language: string;
  stars: number;
  verified: boolean;
  lastUpdated: string;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ 
  title, 
  description, 
  language, 
  stars, 
  verified, 
  lastUpdated 
}) => (
  <TouchableOpacity style={styles.projectItem}>
    <View style={styles.projectHeader}>
      <Text style={styles.projectTitle}>{title}</Text>
      {verified && (
        <View style={styles.verifiedBadge}>
          <CircleCheck size={16} color="#22c55e" />
        </View>
      )}
    </View>
    
    <Text style={styles.projectDescription}>{description}</Text>
    
    <View style={styles.projectFooter}>
      <View style={styles.projectMeta}>
        <View style={[styles.languageDot, { backgroundColor: getLanguageColor(language) }]} />
        <Text style={styles.languageText}>{language}</Text>
        
        <View style={styles.projectStat}>
          <Star size={14} color="#fbbf24" fill="#fbbf24" />
          <Text style={styles.statText}>{stars}</Text>
        </View>
      </View>
      
      <Text style={styles.lastUpdated}>Updated {lastUpdated}</Text>
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
    Swift: '#fa7343',
  };
  return colors[language] || '#6b7280';
};

const mockProjects = [
  {
    title: 'DeFi Portfolio Tracker',
    description: 'A comprehensive DeFi portfolio tracking application with real-time analytics.',
    language: 'TypeScript',
    stars: 245,
    verified: true,
    lastUpdated: '2 days ago',
  },
  {
    title: 'Blockchain Voting System',
    description: 'Secure and transparent voting system built on XION blockchain.',
    language: 'JavaScript',
    stars: 89,
    verified: true,
    lastUpdated: '5 days ago',
  },
  {
    title: 'Mobile Wallet App',
    description: 'Cross-platform mobile wallet for managing crypto assets.',
    language: 'React Native',
    stars: 156,
    verified: false,
    lastUpdated: '1 week ago',
  },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0A0D14', '#12151F']}
        style={styles.gradient}
      >
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>JD</Text>
              </View>
              <View style={styles.verificationBadge}>
                <CircleCheck size={20} color="#22c55e" fill="#22c55e" />
              </View>
            </View>
            
            <Text style={styles.displayName}>John Developer</Text>
            <Text style={styles.username}>@johndeveloper</Text>
            <Text style={styles.bio}>
              Full-stack developer passionate about blockchain technology and DeFi. 
              Building the future of decentralized applications.
            </Text>
            
            <View style={styles.profileActions}>
              <TouchableOpacity style={styles.primaryAction}>
                <Github size={18} color="#ffffff" />
                <Text style={styles.primaryActionText}>View GitHub</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.secondaryAction}>
                <ExternalLink size={18} color="#7d8590" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.statsSection}>
            <View style={styles.statsGrid}>
              <StatCard
                title="Projects"
                value="15"
                icon={<GitBranch size={20} color="#3b82f6" />}
                color="#3b82f6"
              />
              <StatCard
                title="Verified"
                value="12"
                icon={<CircleCheck size={20} color="#00bfff" />}
                color="#00bfff"
              />
              <StatCard
                title="Stars"
                value="1.2k"
                icon={<Star size={20} color="#fbbf24" />}
                color="#fbbf24"
              />
              <StatCard
                title="Followers"
                value="234"
                icon={<Users size={20} color="#8b5cf6" />}
                color="#8b5cf6"
              />
            </View>
          </View>

          <View style={styles.achievementsSection}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.achievementsScroll}
            >
              <View style={styles.achievementBadge}>
                <Award size={24} color="#fbbf24" />
                <Text style={styles.achievementText}>Top Contributor</Text>
              </View>
              <View style={styles.achievementBadge}>
                <CircleCheck size={24} color="#22c55e" />
                <Text style={styles.achievementText}>Verified Developer</Text>
              </View>
              <View style={styles.achievementBadge}>
                <Star size={24} color="#3b82f6" />
                <Text style={styles.achievementText}>Rising Star</Text>
              </View>
            </ScrollView>
          </View>

          <View style={styles.projectsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>My Projects</Text>
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.projectsList}>
              {mockProjects.map((project, index) => (
                <ProjectItem key={index} {...project} />
              ))}
            </View>
          </View>

          <View style={styles.activitySection}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <View style={styles.activityList}>
              <View style={styles.activityItem}>
                <Calendar size={16} color="#7d8590" />
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>
                    Verified project <Text style={styles.activityHighlight}>DeFi Portfolio Tracker</Text>
                  </Text>
                  <Text style={styles.activityTime}>2 days ago</Text>
                </View>
              </View>
              
              <View style={styles.activityItem}>
                <Star size={16} color="#fbbf24" />
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>
                    Received 15 new stars on <Text style={styles.activityHighlight}>Blockchain Voting System</Text>
                  </Text>
                  <Text style={styles.activityTime}>5 days ago</Text>
                </View>
              </View>
              
              <View style={styles.activityItem}>
                <GitBranch size={16} color="#3b82f6" />
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>
                    Published new project <Text style={styles.activityHighlight}>Mobile Wallet App</Text>
                  </Text>
                  <Text style={styles.activityTime}>1 week ago</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: '#3b82f6',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#1a1f24',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
  },
  verificationBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#0d1117',
    borderRadius: 12,
    padding: 2,
  },
  displayName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#f0f6fc',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    color: '#7d8590',
    marginBottom: 12,
  },
  bio: {
    fontSize: 16,
    color: '#e6edf3',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  profileActions: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00bfff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  primaryActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  secondaryAction: {
    backgroundColor: '#1a1f24',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#24292e',
  },
  statsSection: {
    padding: 20,
    paddingTop: 0,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: '#0f1216',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1a1f24',
    alignItems: 'center',
    width: '48%',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f0f6fc',
    marginBottom: 2,
  },
  statTitle: {
    fontSize: 14,
    color: '#7d8590',
  },
  achievementsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#f0f6fc',
    marginBottom: 16,
  },
  achievementsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  achievementBadge: {
    backgroundColor: '#0f1216',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1a1f24',
    alignItems: 'center',
    marginRight: 12,
    minWidth: 100,
  },
  achievementText: {
    fontSize: 12,
    color: '#e6edf3',
    textAlign: 'center',
    marginTop: 8,
  },
  projectsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllButton: {
    paddingVertical: 4,
  },
  viewAllText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
  projectsList: {
    gap: 12,
  },
  projectItem: {
    backgroundColor: '#0f1216',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1a1f24',
  },
  projectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
    backgroundColor: '#00bfff20',
    borderRadius: 6,
  },
  projectDescription: {
    fontSize: 14,
    color: '#7d8590',
    lineHeight: 20,
    marginBottom: 12,
    fontFamily: 'RobotoMono-Regular',
  },
  projectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  projectMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  languageDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  languageText: {
    fontSize: 12,
    color: '#7d8590',
  },
  projectStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#7d8590',
  },
  lastUpdated: {
    fontSize: 12,
    color: '#7d8590',
  },
  activitySection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  activityList: {
    gap: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#e6edf3',
    lineHeight: 20,
    marginBottom: 2,
  },
  activityHighlight: {
    color: '#3b82f6',
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 12,
    color: '#7d8590',
  },
});