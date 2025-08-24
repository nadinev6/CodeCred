import React, { useState } from 'react';
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

const COLORS = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  background: '#f8fafc',
  headerBackground: '#1a1f24', 
  text: '#1e293b',
  subtitle: '#64748b',
  green: '#10b981',
  blue: '#6366f1',
};

const CodeCredWalletSetup = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
                <Text style={styles.featureIcon}>🛡️</Text>
                <Text style={styles.featureText}>Privacy-preserving verification</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>✅</Text>
                <Text style={styles.featureText}>Blockchain-backed credentials</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>📱</Text>
                <Text style={styles.featureText}>Mobile-friendly experience</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setCurrentStep(1)} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Get Started</Text>
              <Text style={styles.buttonIcon}>→</Text>
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
              {loading && <ActivityIndicator style={styles.buttonIcon} color="white" />}
              {!loading && <Text style={styles.buttonIcon}>🔄</Text>}
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
              <Text style={styles.buttonIcon}>🔗</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCurrentStep(1)} style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>I've Installed Keplr</Text>
              <Text style={styles.buttonIcon}>🔄</Text>
            </TouchableOpacity>
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContent}>
            <View style={styles.iconContainer}>
              {loading ? <ActivityIndicator size="large" color={COLORS.blue} /> : <Text style={styles.icon}>💼</Text>}
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
              {loading && <ActivityIndicator style={styles.buttonIcon} color="white" />}
              {!loading && <Text style={styles.buttonIcon}>→</Text>}
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
                <Text style={styles.walletInfoIcon}>💼</Text>
                <Text style={{ fontWeight: '600', color: COLORS.blue }}>Connected Wallet</Text>
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
              <Text style={styles.buttonIcon}>→</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.fullScreenGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.mainContentContainer}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>CodeCred</Text>
              <Text style={styles.headerSubtitle}>Blockchain Project Verification</Text>
            </View>
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
                    </Text>
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
            <View style={styles.footer}>
              <Text style={styles.footerText}>Need help? Check our documentation or contact support.</Text>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flexGrow: 1 },
  fullScreenGradient: { flex: 1 },
  mainContentContainer: {
    maxWidth: 480,
    marginHorizontal: 'auto',
    backgroundColor: COLORS.background,
    flex: 1,
  },
  header: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: COLORS.headerBackground,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: '700',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 18,
    color: 'white',
    opacity: 0.9,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: 'white',
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e2e8f0',
  },
  stepCircleActive: {
    backgroundColor: COLORS.blue,
  },
  stepCircleInactive: {
    backgroundColor: '#e2e8f0',
  },
  stepCircleCompleted: {
    backgroundColor: COLORS.green,
  },
  stepCircleText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#94a3b8',
  },
  stepCircleTextCompleted: {
    color: 'white',
  },
  stepLine: {
    width: 30,
    height: 2,
    marginHorizontal: 8,
    backgroundColor: '#e2e8f0',
  },
  stepLineActive: {
    backgroundColor: COLORS.blue,
  },
  stepContent: {
    backgroundColor: 'white',
    marginHorizontal: 24,
    marginBottom: 32,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    elevation: 5,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 60,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 16,
    color: COLORS.subtitle,
    lineHeight: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  featureList: {
    width: '100%',
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.05)',
    borderRadius: 8,
  },
  featureIcon: {
    marginRight: 12,
    color: COLORS.green,
    fontSize: 24,
  },
  featureText: {
    color: COLORS.text,
  },
  primaryButton: {
    backgroundColor: COLORS.blue,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    marginLeft: 8,
    fontSize: 20,
    color: 'white',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.blue,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  secondaryButtonText: {
    color: COLORS.blue,
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#fef2f2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorIcon: {
    fontSize: 14,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    marginLeft: 8,
  },
  walletInfo: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  walletInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  walletInfoIcon: {
    fontSize: 20,
    marginRight: 8,
    color: COLORS.blue,
  },
  walletDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  walletDetailLabel: {
    color: COLORS.subtitle,
    fontSize: 14,
  },
  walletDetailValue: {
    color: COLORS.text,
    fontWeight: '500',
    fontSize: 14,
  },
  footer: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  footerText: {
    color: '#94a3b8',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default CodeCredWalletSetup;