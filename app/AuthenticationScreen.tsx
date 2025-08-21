import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../components/ui/Button';
import { xionService, XionAccount } from '../../services/xion';
import { reclaimService } from '../../services/reclaim';

export default function AuthScreen() {
  const [xionAccount, setXionAccount] = useState<XionAccount | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkExistingAuth();
  }, []);

  const checkExistingAuth = async () => {
    try {
      const account = await xionService.getAccount();
      setXionAccount(account);
    } catch (error) {
      console.log('No existing auth');
    }
  };

  const handleXionAuth = async () => {
    setLoading(true);
    try {
      const account = await xionService.authenticate();
      setXionAccount(account);
    } catch (error) {
      console.error('Auth failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteVerification = async () => {
    setLoading(true);
    try {
      await reclaimService.generateProof();
      // Handle successful verification
    } catch (error) {
      console.error('Verification failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#0A0D14' }]}>
      <LinearGradient
        colors={['#0A0D14', '#1A202C']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Authentication</Text>
          <Text style={styles.subtitle}>Connect your XION account to get started</Text>
          
          {!xionAccount ? (
            <Button 
              title="Connect with XION" 
              onPress={handleXionAuth}
              disabled={loading}
            />
          ) : (
            <View style={styles.connectedContainer}>
              <Text style={styles.connectedText}>Connected: {xionAccount.address}</Text>
              <Button 
                title="Complete GitHub Verification"
                onPress={handleCompleteVerification}
                disabled={loading}
              />
            </View>
          )}
        </View>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#A0AEC0',
    marginBottom: 40,
    textAlign: 'center',
  },
  connectedContainer: {
    alignItems: 'center',
    gap: 20,
  },
  connectedText: {
    fontSize: 16,
    color: '#68D391',
    marginBottom: 20,
  },
});