import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../components/ui/Button';
import { xionService, XionAccount } from '../../services/xion';
import { reclaimService } from '../../services/reclaim';

export const XionScreen = () => {
  const [account, setAccount] = useState<XionAccount | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      const connectedAccount = await xionService.getAccount();
      setAccount(connectedAccount);
    } catch (err) {
      console.log('No account connected');
    }
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      const connectedAccount = await xionService.connect();
      setAccount(connectedAccount);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await xionService.disconnect();
      setAccount(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to disconnect');
    }
  };

  const handleCreateProof = async () => {
    if (!account) return;
    
    try {
      // This would integrate with Reclaim Protocol
      const proof = await reclaimService.createProof({
        provider: 'github',
        parameters: {
          username: 'example'
        }
      });
      
      console.log('Proof created:', proof);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create proof');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0d1117', '#161b22', '#21262d']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.title}>XION Wallet</Text>
          <Text style={styles.subtitle}>
            Connect your XION wallet to create proofs
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
                title="Create Proof"
                onPress={handleCreateProof}
                style={{ marginBottom: 10 }}
              />
              
              <Button
                title="Disconnect"
                onPress={handleDisconnect}
                variant="secondary"
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
      </LinearGradient>
    </SafeAreaView>
  );
};

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