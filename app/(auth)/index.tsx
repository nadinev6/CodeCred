import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { useXionService, XionAccount } from '../../services/xion';
import { reclaimService } from '../../services/reclaim';

export default function SignInScreen() {
  const { 
    account, 
    isConnected, 
    connectAccount, 
    disconnect 
  } = useXionService();
  
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected && account) {
      router.replace('/(tabs)');
    }
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      await connectAccount();
      if (account && account.isConnected) {
        router.replace('/(tabs)');
      }
    } catch (err) {
      console.error('Connection failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleContinueToApp = () => {
    router.replace('/(tabs)');
  };

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

          {error && (
            <Text style={{ color: '#f85149', marginBottom: 20, textAlign: 'center' }}>
              {error}
            </Text>
          )}

          {account ? (
            <View style={styles.connectedContainer}>
              <Text style={styles.connectedText}>
                Connected: {account.address}
              </Text>
              
              <Button
                title="Continue to App"
                onPress={handleContinueToApp}
              />
            </View>
          ) : (
            <Button
              title={isConnecting ? "Connecting..." : "Connect XION Wallet"}
              onPress={handleConnect}
              disabled={isConnecting}
            />
          )}
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
  },
  connectedContainer: {
    alignItems: 'center',
    gap: 20,
  },
  connectedText: {
    fontSize: 16,
    color: '#22c55e',
    textAlign: 'center',
    marginBottom: 20,
  },
});