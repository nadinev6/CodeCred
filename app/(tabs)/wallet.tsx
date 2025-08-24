import React, { useState } from 'react';
import { useFonts, RobotoMono_400Regular } from '@expo-google-fonts/roboto-mono';
import { CircleCheck, Check, Wallet, Download, Link, CheckCircle } from 'lucide-react-native';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import { router } from 'expo-router'; 

const CodeCredWalletSetup = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [fontsLoaded] = useFonts({
    'RobotoMono-Regular': RobotoMono_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <View style={styles.stepContent}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>💼</Text>
            </View>
            <Text style={styles.stepTitle}>Welcome to CodeCred</Text>
            <Text style={styles.stepDescription}>
              CodeCred helps you verify your coding projects using blockchain technology and zero-knowledge proofs.
            </Text>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <CircleCheck size={20} color="#22c55e" />
                <Text style={styles.featureText}>Privacy-preserving verification</Text>
              </View>
              <View style={styles.featureItem}>
                <CircleCheck size={20} color="#22c55e" />
                <Text style={styles.featureText}>Blockchain-backed credentials</Text>
              </View>
              <View style={styles.featureItem}>
                <CircleCheck size={20} color="#22c55e" />
                <Text style={styles.featureText}>Mobile-friendly experience</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setCurrentStep(1)} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        );
      case 1:
        return (
          <View style={styles.stepContent}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>💼</Text>
            </View>
            <Text style={styles.stepTitle}>Wallet Setup Required</Text>
            <Text style={styles.stepDescription}>
              To use CodeCred, you'll need a Keplr wallet to interact with the XION blockchain.
            </Text>
            <TouchableOpacity
              onPress={() => {
                // Mock function for checking wallet status
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  setCurrentStep(2);
                }, 1000);
              }}
              style={styles.primaryButton}
              disabled={loading}
            >
              <Text style={styles.primaryButtonText}>
                {loading ? 'Checking...' : 'Check Wallet Status'}
              </Text>
              {loading && <ActivityIndicator style={styles.loadingIcon} color="white" />}
            </TouchableOpacity>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContent}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>📥</Text>
            </View>
            <Text style={styles.stepTitle}>Install Keplr Wallet</Text>
            <Text style={styles.stepDescription}>
              Keplr wallet is not installed on your device. Let's get it set up!
            </Text>
            <TouchableOpacity onPress={() => router.push('/install-keplr')} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Install Keplr Wallet</Text>
            </TouchableOpacity>
            
            <View style={styles.buttonGroup}>
              <TouchableOpacity onPress={() => setCurrentStep(1)} style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>I've Installed Keplr</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContent}>
            <View style={styles.iconContainer}>
              {loading ? <ActivityIndicator size="large" color="#00bfff" /> : <Text style={styles.icon}>💼</Text>}
            </View>
            <Text style={styles.stepTitle}>
              {loading ? 'Connecting...' : 'Connect Your Wallet'}
            </Text>
            <Text style={styles.stepDescription}>
              {loading ? 'Please approve the connection in your Keplr wallet' : 'Connect your Keplr wallet to start using CodeCred'}
            </Text>
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorIcon}>⚠️</Text>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
            <TouchableOpacity onPress={() => {}} style={styles.primaryButton} disabled={loading}>
              <Text style={styles.primaryButtonText}>
                {loading ? 'Connecting...' : 'Connect Keplr Wallet'}
              </Text>
              {loading && <ActivityIndicator style={styles.loadingIcon} color="white" />}
            </TouchableOpacity>
          </View>
        );
      case 4:
        return (
          <View style={styles.stepContent}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>✅</Text>
            </View>
            <Text style={styles.stepTitle}>Wallet Connected!</Text>
            <Text style={styles.stepDescription}>
              Your Keplr wallet is now connected to CodeCred. You're ready to start verifying your projects.
            </Text>
            <View style={styles.walletInfo}>
              <View style={styles.walletInfoHeader}>
                <Text style={styles.walletInfoTitle}>Connected Wallet</Text>
              </View>
              <View style={styles.walletDetail}>
                <Text style={styles.walletDetailLabel}>Address:</Text>
                <Text style={styles.walletDetailValue}>xion1abc...xyz</Text>
              </View>
              <View style={styles.walletDetail}>
                <Text style={styles.walletDetailLabel}>Balance:</Text>
                <Text style={styles.walletDetailValue}>1.00 XION</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => {}} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Start Using CodeCred</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <LinearGradient
      colors={['#0A0D14', '#1A202C']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Wallet</Text>
        </View>
        
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 180 }]}
        >
          <View style={styles.contentContainer}>
            <View style={styles.stepIndicator}>
              {[0, 1, 2, 3, 4].map((step, index) => (
                <React.Fragment key={step}>
                  <View
                    style={[
                      styles.stepCircle,
                      currentStep === step && styles.stepCircleActive,
                      currentStep < step && styles.stepCircleInactive,
                      currentStep > step && styles.stepCircleCompleted,
                    ]}
                  >
                    <Text
                      style={[
                        styles.stepCircleText,
                        currentStep > step && styles.stepCircleTextCompleted,
                      ]}
                    >
                      {currentStep > step ? '✓' : step + 1}
                        <Check size={16} color="#ffffff" />
                  </View>
                  {index < 4 && (
                    <View
                      style={[
                        styles.stepLine,
                        currentStep > step && styles.stepLineActive,
                      ]}
                    />
                  )}
                </React.Fragment>
              ))}
            </View>
            {renderStepContent()}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

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
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f0f6fc',
    fontFamily: 'RobotoMono-Regular',
    letterSpacing: 1.2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#21262d',
    marginBottom: 20,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#24292e',
    borderWidth: 2,
    borderColor: '#24292e',
  },
  stepCircleActive: {
    backgroundColor: '#00bfff',
    borderColor: '#00bfff',
  },
  stepCircleInactive: {
    backgroundColor: '#24292e',
    borderColor: '#24292e',
  },
  stepCircleCompleted: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  stepCircleText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#7d8590',
    fontFamily: 'RobotoMono-Regular',
  },
  stepCircleTextCompleted: {
    color: '#ffffff',
  },
  stepLine: {
    width: 30,
    height: 2,
    marginHorizontal: 8,
    backgroundColor: '#24292e',
  },
  stepLineActive: {
    backgroundColor: '#00bfff',
  },
  stepContent: {
    backgroundColor: '#0f1216',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#21262d',
    marginBottom: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1a1f24',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#21262d',
  },
  icon: {
    fontSize: 40,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#f0f6fc',
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: 'RobotoMono-Regular',
  },
  stepDescription: {
    fontSize: 16,
    color: '#e6edf3',
    lineHeight: 20,
    marginBottom: 16,
    textAlign: 'center',
  },
  featureList: {
    width: '100%',
    marginBottom: 24,
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1a1f24',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#21262d',
  },
  featureText: {
    color: '#e6edf3',
    marginLeft: 12,
    fontSize: 15,
  },
  primaryButton: {
    backgroundColor: '#00bfff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonGroup: {
    width: '100%',
    gap: 12,
  },
  loadingIcon: {
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: '#1a1f24',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#24292e',
  },
  secondaryButtonText: {
    color: '#f0f6fc',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#f8514920',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f8514940',
  },
  errorIcon: {
    fontSize: 14,
    color: '#f85149',
  },
  errorText: {
    color: '#f85149',
    fontSize: 14,
    marginLeft: 8,
  },
  walletInfo: {
    backgroundColor: '#1a1f24',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#21262d',
  },
  walletInfoHeader: {
    marginBottom: 12,
  },
  walletInfoTitle: {
    fontWeight: '600',
    color: '#f0f6fc',
    fontSize: 16,
  },
  walletDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  walletDetailLabel: {
    color: '#7d8590',
    fontSize: 14,
  },
  walletDetailValue: {
    color: '#f0f6fc',
    fontWeight: '500',
    fontSize: 14,
  },
});

export default CodeCredWalletSetup;