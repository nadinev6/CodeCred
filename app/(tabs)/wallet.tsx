import React, { useState } from 'react';
import { useFonts, RobotoMono_400Regular } from '@expo-google-fonts/roboto-mono';
import { CircleCheck, Check, Wallet, Download, Link, CircleCheck as CheckCircle, CircleAlert as AlertCircle, WalletMinimal } from 'lucide-react-native';
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

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => (
  <View style={styles.stepContainer}>
    {Array.from({ length: totalSteps }, (_, index) => (
      <View key={index} style={styles.stepItem}>
        <View style={[
          styles.stepCircle,
          index < currentStep ? styles.stepCompleted : 
          index === currentStep ? styles.stepActive : styles.stepInactive
        ]}>
          {index < currentStep ? (
            <CheckCircle size={16} color="#00bfff" />
          ) : (
            <Text style={[
              styles.stepNumber,
              index === currentStep ? styles.stepNumberActive : styles.stepNumberInactive
            ]}>
              {index + 1}
            </Text>
          )}
        </View>
        {index < totalSteps - 1 && (
          <View style={[
            styles.stepLine,
            index < currentStep ? styles.stepLineCompleted : styles.stepLineInactive
          ]} />
        )}
      </View>
    ))}
  </View>
);

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

  const steps = [
    'Install Keplr',
    'Connect Wallet',
    'Complete Setup'
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <View style={styles.stepContent}>
            <View style={styles.iconContainer}>
              <Download size={40} color="#f0f6fc" />
            </View>
            <Text style={styles.stepTitle}>Install Keplr Wallet</Text>
            <Text style={styles.stepDescription}>
              Keplr wallet is not installed on your device. Let's get it set up!
            </Text>
            
            <View style={styles.verificationSteps}>
              <View style={styles.verificationStep}>
                <Download size={24} color="#3b82f6" />
                <View style={styles.verificationStepContent}>
                  <Text style={styles.verificationStepTitle}>Download Keplr</Text>
                  <Text style={styles.verificationStepText}>Install the Keplr wallet app</Text>
                </View>
              </View>

              <View style={styles.verificationStep}>
                <AlertCircle size={24} color="#7d8590" />
                <View style={styles.verificationStepContent}>
                  <Text style={styles.verificationStepTitle}>Setup Account</Text>
                  <Text style={styles.verificationStepText}>Create or import your wallet</Text>
                </View>
              </View>
            </View>
          </View>
        );
      case 1:
        return (
          <View style={styles.stepContent}>
            <View style={styles.iconContainer}>
              {loading ? <ActivityIndicator size="large" color="#00bfff" /> : <WalletMinimal size={40} color="#f0f6fc" />}
            </View>
            <Text style={styles.stepTitle}>
              {loading ? 'Connecting...' : 'Connect Your Wallet'}
            </Text>
            <Text style={styles.stepDescription}>
              {loading ? 'Please approve the connection in your Keplr wallet' : 'Connect your Keplr wallet to start using CodeCred'}
            </Text>
            
            {error && (
              <View style={styles.verificationBox}>
                <AlertCircle size={20} color="#f85149" />
                <View style={styles.verificationContent}>
                  <Text style={styles.verificationTitle}>Connection Error</Text>
                  <Text style={styles.verificationText}>{error}</Text>
                </View>
              </View>
            )}

            <View style={styles.verificationSteps}>
              <View style={styles.verificationStep}>
                <CheckCircle size={24} color="#22c55e" />
                <View style={styles.verificationStepContent}>
                  <Text style={styles.verificationStepTitle}>Keplr Detected</Text>
                  <Text style={styles.verificationStepText}>Wallet found and ready to connect</Text>
                </View>
              </View>

              <View style={styles.verificationStep}>
                <AlertCircle size={24} color="#f59e0b" />
                <View style={styles.verificationStepContent}>
                  <Text style={styles.verificationStepTitle}>XION Network</Text>
                  <Text style={styles.verificationStepText}>Connecting to XION blockchain...</Text>
                </View>
              </View>
            </View>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContent}>
            <View style={styles.iconContainer}>
              <CheckCircle size={40} color="#22c55e" />
            </View>
            <Text style={styles.stepTitle}>Wallet Connected!</Text>
            <Text style={styles.stepDescription}>
              Your Keplr wallet is now connected to CodeCred.
            </Text>
            
            <View style={styles.reviewSection}>
              <Text style={styles.reviewTitle}>Wallet Information</Text>
              
              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Address</Text>
                <Text style={styles.reviewValue}>xion1abc...xyz</Text>
              </View>

              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Balance</Text>
                <Text style={styles.reviewValue}>1.00 XION</Text>
              </View>

              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Network</Text>
                <Text style={styles.reviewValue}>XION Mainnet</Text>
              </View>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (currentStep === 0) {
        // Move to connect step after install
        setCurrentStep(currentStep + 1);
      } else if (currentStep === 1) {
        // Simulate connection
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setCurrentStep(currentStep + 1);
        }, 2000);
      }
    } else {
      // Final step - navigate to main app
      router.replace('/(tabs)');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getButtonText = () => {
    switch (currentStep) {
      case 0:
        return 'Next';
      case 1:
        return loading ? 'Connecting...' : 'Next';
      case 2:
        return 'Next';
      default:
        return 'Next';
    }
  };

  return (
    <LinearGradient
      colors={['#0A0D14', '#1A202C']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Wallet Setup</Text>
          <Text style={styles.headerSubtitle}>Connect your Keplr wallet</Text>
        </View>

        <StepIndicator currentStep={currentStep} totalSteps={steps.length} />

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 120 }]}
        >
          <View style={styles.stepHeader}>
            <Text style={styles.stepTitleHeader}>{steps[currentStep]}</Text>
          </View>

          {renderStepContent()}
        </ScrollView>
      </SafeAreaView>

      <View style={styles.fixedBottomBarContainer}>
        <SafeAreaView edges={['bottom']} style={styles.bottomBarSafeArea}>
          {currentStep > 0 && (
            <TouchableOpacity style={styles.secondaryButton} onPress={handlePrevious}>
              <Text style={styles.secondaryButtonText}>Previous</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleNext}
            disabled={loading}
          >
            <Text style={styles.primaryButtonText}>
              {getButtonText()}
            </Text>
            {loading && <ActivityIndicator style={styles.loadingIcon} color="white" />}
          </TouchableOpacity>
        </SafeAreaView>
      </View>
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
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1f24',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  stepCompleted: {
    backgroundColor: '#00bfff20',
    borderColor: '#00bfff',
  },
  stepActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  stepInactive: {
    backgroundColor: 'transparent',
    borderColor: '#24292e',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
  },
  stepNumberActive: {
    color: '#ffffff',
  },
  stepNumberInactive: {
    color: '#7d8590',
  },
  stepLine: {
    width: 40,
    height: 2,
    marginHorizontal: 8,
  },
  stepLineCompleted: {
    backgroundColor: '#00bfff',
  },
  stepLineInactive: {
    backgroundColor: '#24292e',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  stepHeader: {
    padding: 20,
    paddingBottom: 12,
  },
  stepTitleHeader: {
    fontSize: 24,
    fontWeight: '600',
    color: '#f0f6fc',
  },
  stepContent: {
    padding: 20,
    paddingTop: 0,
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
    borderColor: '#24292e',
    alignSelf: 'center',
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#f0f6fc',
    marginBottom: 12,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 16,
    color: '#7d8590',
    lineHeight: 20,
    marginBottom: 24,
    textAlign: 'center',
  },
  featureList: {
    width: '100%',
    gap: 12,
    marginBottom: 24,
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
  verificationBox: {
    flexDirection: 'row',
    backgroundColor: '#f59e0b20',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f59e0b40',
    marginBottom: 24,
  },
  verificationContent: {
    flex: 1,
    marginLeft: 12,
  },
  verificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f59e0b',
    marginBottom: 4,
  },
  verificationText: {
    fontSize: 14,
    color: '#e6edf3',
    lineHeight: 20,
  },
  verificationSteps: {
    gap: 16,
    marginBottom: 24,
  },
  verificationStep: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f1216',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1a1f24',
  },
  verificationStepContent: {
    flex: 1,
    marginLeft: 16,
  },
  verificationStepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f0f6fc',
    marginBottom: 4,
  },
  verificationStepText: {
    fontSize: 14,
    color: '#7d8590',
  },
  reviewSection: {
    gap: 16,
    marginBottom: 24,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#f0f6fc',
    marginBottom: 8,
  },
  reviewItem: {
    backgroundColor: '#0f1216',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1a1f24',
  },
  reviewLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7d8590',
    marginBottom: 6,
  },
  reviewValue: {
    fontSize: 16,
    color: '#f0f6fc',
  },
  fixedBottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  bottomBarSafeArea: {
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderTopColor: '#1a1f24',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  secondaryButton: {
    width: '45%',
    backgroundColor: '#1a1f24',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#24292e',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f0f6fc',
  },
  primaryButton: {
    width: '45%',
    backgroundColor: '#00bfff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  loadingIcon: {
    marginLeft: 8,
  },
});

export default CodeCredWalletSetup;