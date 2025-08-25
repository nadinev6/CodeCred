import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { useXionService } from '../../services/xion';

export default function SignInScreen() {
  const { 
    account, 
    isConnected, 
    isConnecting,
    connectAccount, 
  } = useXionService();
  
  const [error, setError] = useState<string | null>(null);
  const [hasAttemptedConnect, setHasAttemptedConnect] = useState(false);

  const handleConnect = async () => {
    setHasAttemptedConnect(true);
    setError(null);
    
    try {
      console.log('🔐 Initiating wallet connection...');
      const connectedAccount = await connectAccount();
      console.log('✅ Wallet connection completed:', connectedAccount?.address);
    } catch (err) {
      console.error('Connection failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect');
    }
  };

  const handleBrowseApp = () => {
    router.replace('/(tabs)');
  };

  const handleContinueToProfile = () => {
    router.replace('/(tabs)/profile');
  };

  // Show loading state while connecting
  if (isConnecting) {
    return (
      <LinearGradient
        colors={['#0A0D14', '#1A202C']}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <ActivityIndicator size="large" color="#00bfff" />
            <Text style={styles.loadingText}>Connecting to wallet...</Text>
            <Text style={styles.subtitle}>
              Please approve the connection in your wallet app
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // Show wallet connected state only after attempted connection
  if (isConnected && hasAttemptedConnect && account) {
    return (
      <LinearGradient
        colors={['#0A0D14', '#1A202C']}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>CodeCred Authentication</Text>
            <Text style={styles.subtitle}>
              Connect your wallet to verify your projects
            </Text>

            <View style={styles.connectedContainer}>
              <Text style={styles.connectedText}>
                Wallet Connected
              </Text>
              <Text style={styles.addressText}>
                {account.address}
              </Text>
              
              <Button
                title="Continue to Profile"
                onPress={handleContinueToProfile}
              />
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // Default state: show choice between connecting wallet or browsing
  return (
    <LinearGradient
      colors={['#0A0D14', '#1A202C']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>CodeCred Authentication</Text>
          <Text style={styles.subtitle}>
            Connect your wallet to verify your projects or browse without authentication
          </Text>

          {error && (
            <Text style={styles.errorText}>
              {error}
            </Text>
          )}

          <View style={styles.buttonGroup}>
            <Button
              title="Login"
              onPress={handleConnect}
              style={styles.halfWidthButton}
            />
            <Button
              title="Browse"
              onPress={handleBrowseApp}
              variant="secondary"
              style={styles.halfWidthButton}
            />
          </View>
        </View>
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
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f0f6fc',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7d8590',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  halfWidthButton: {
    flex: 1,
  },
  connectedContainer: {
    alignItems: 'center',
    gap: 20,
  },
  connectedText: {
    fontSize: 16,
    color: '#22c55e',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '600',
  },
  addressText: {
    fontSize: 14,
    color: '#7d8590',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'RobotoMono-Regular',
  },
  loadingText: {
    fontSize: 18,
    color: '#f0f6fc',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 8,
    fontWeight: '600',
  },
  errorText: {
    color: '#f85149',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 14,
  },
});