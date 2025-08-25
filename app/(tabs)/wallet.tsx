import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { WalletMinimal, LogOut, ExternalLink, CircleCheck } from 'lucide-react-native';
import { router } from 'expo-router';
import { useXionService } from '@/services/xion';

export default function WalletScreen() {
  const { account, isConnected, disconnect } = useXionService();

  const handleConnectWallet = () => {
    router.push('/(auth)');
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  if (!isConnected || !account) {
    // Not connected - show connection prompt
    return (
      <LinearGradient
        colors={['#0A0D14', '#1A202C']}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Wallet</Text>
            <Text style={styles.headerSubtitle}>Connect your wallet to verify projects</Text>
          </View>

          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[styles.scrollContent, { paddingBottom: 180 }]}
          >
            <View style={styles.emptyState}>
              <View style={styles.iconContainer}>
                <WalletMinimal size={48} color="#7d8590" />
              </View>
              
              <Text style={styles.emptyTitle}>No Wallet Connected</Text>
              <Text style={styles.emptyDescription}>
                Connect your XION wallet to submit and verify projects on the blockchain.
              </Text>

              <View style={styles.featureList}>
                <View style={styles.featureItem}>
                  <CircleCheck size={20} color="#00bfff" />
                  <Text style={styles.featureText}>Submit projects for verification</Text>
                </View>
                <View style={styles.featureItem}>
                  <CircleCheck size={20} color="#00bfff" />
                  <Text style={styles.featureText}>Store credentials on blockchain</Text>
                </View>
                <View style={styles.featureItem}>
                  <CircleCheck size={20} color="#00bfff" />
                  <Text style={styles.featureText}>Build verified developer profile</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.connectButton} onPress={handleConnectWallet}>
                <WalletMinimal size={20} color="#ffffff" />
                <Text style={styles.connectButtonText}>Connect Wallet</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // Connected - show wallet info
  return (
    <LinearGradient
      colors={['#0A0D14', '#1A202C']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Wallet</Text>
          <Text style={styles.headerSubtitle}>Manage your connected wallet</Text>
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 180 }]}
        >
          <View style={styles.walletCard}>
            <View style={styles.walletHeader}>
              <View style={styles.walletIcon}>
                <WalletMinimal size={24} color="#00bfff" />
              </View>
              <View style={styles.walletInfo}>
                <Text style={styles.walletName}>XION Wallet</Text>
                <View style={styles.statusBadge}>
                  <CircleCheck size={16} color="#22c55e" />
                  <Text style={styles.statusText}>Connected</Text>
                </View>
              </View>
            </View>

            <View style={styles.walletDetails}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Address</Text>
                <Text style={styles.detailValue}>{account.address}</Text>
              </View>

              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Balance</Text>
                <Text style={styles.detailValue}>{account.balance || '0'} XION</Text>
              </View>

              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Network</Text>
                <Text style={styles.detailValue}>XION Testnet</Text>
              </View>
            </View>
          </View>

          <View style={styles.actionsSection}>
            <Text style={styles.sectionTitle}>Actions</Text>
            
            <TouchableOpacity style={styles.actionButton}>
              <ExternalLink size={20} color="#7d8590" />
              <Text style={styles.actionButtonText}>View on Explorer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.disconnectButton} onPress={handleDisconnect}>
              <LogOut size={20} color="#f85149" />
              <Text style={styles.disconnectButtonText}>Disconnect Wallet</Text>
            </TouchableOpacity>
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
    paddingBottom: 20,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    paddingTop: 80,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1a1f24',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#24292e',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#f0f6fc',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: 16,
    color: '#7d8590',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  featureList: {
    width: '100%',
    gap: 16,
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f1216',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1a1f24',
  },
  featureText: {
    fontSize: 16,
    color: '#f0f6fc',
    marginLeft: 12,
  },
  connectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00bfff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  connectButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  walletCard: {
    margin: 20,
    backgroundColor: '#0f1216',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#1a1f24',
  },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  walletIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#00bfff20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  walletInfo: {
    flex: 1,
  },
  walletName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f0f6fc',
    marginBottom: 4,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#22c55e',
    fontWeight: '500',
  },
  walletDetails: {
    gap: 16,
  },
  detailItem: {
    gap: 6,
  },
  detailLabel: {
    fontSize: 14,
    color: '#7d8590',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#f0f6fc',
    fontFamily: 'RobotoMono-Regular',
  },
  actionsSection: {
    margin: 20,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#f0f6fc',
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1f24',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#24292e',
    gap: 12,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#f0f6fc',
    fontWeight: '500',
  },
  disconnectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8514920',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f8514940',
    gap: 12,
  },
  disconnectButtonText: {
    fontSize: 16,
    color: '#f85149',
    fontWeight: '500',
  },
});