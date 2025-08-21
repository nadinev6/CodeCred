import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Github, Link, FileText, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react-native';

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

export default function SubmitScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    repositoryUrl: '',
    projectTitle: '',
    description: '',
    category: '',
    tags: '',
  });

  const steps = [
    'Repository Details',
    'Project Information',
    'Verification',
    'Review & Submit'
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    Alert.alert(
      'Project Submitted',
      'Your project has been submitted for verification. You will receive a notification once the review is complete.',
      [{ text: 'OK', onPress: () => setCurrentStep(0) }]
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <View style={styles.stepContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Repository URL *</Text>
              <View style={styles.inputContainer}>
                <Github size={20} color="#7d8590" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="https://github.com/username/repository"
                  placeholderTextColor="#7d8590"
                  value={formData.repositoryUrl}
                  onChangeText={(text) => setFormData({ ...formData, repositoryUrl: text })}
                />
              </View>
              <Text style={styles.inputHelp}>Enter your GitHub repository URL</Text>
            </View>

            <View style={styles.verificationBox}>
              <AlertCircle size={20} color="#f59e0b" />
              <View style={styles.verificationContent}>
                <Text style={styles.verificationTitle}>Repository Access</Text>
                <Text style={styles.verificationText}>
                  Make sure your repository is public or provide proper access permissions for verification.
                </Text>
              </View>
            </View>
          </View>
        );

      case 1:
        return (
          <View style={styles.stepContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Project Title *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your project title"
                placeholderTextColor="#7d8590"
                value={formData.projectTitle}
                onChangeText={(text) => setFormData({ ...formData, projectTitle: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description *</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Describe your project, its purpose, and key features"
                placeholderTextColor="#7d8590"
                multiline
                numberOfLines={4}
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Category *</Text>
              <View style={styles.categoryGrid}>
                {['DeFi & Blockchain', 'AI & ML', 'Mobile Development', 'Web Development', 'DevTools', 'Other'].map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.categoryChip,
                      formData.category === category && styles.categoryChipSelected
                    ]}
                    onPress={() => setFormData({ ...formData, category })}
                  >
                    <Text style={[
                      styles.categoryText,
                      formData.category === category && styles.categoryTextSelected
                    ]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContent}>
            <View style={styles.verificationSteps}>
              <View style={styles.verificationStep}>
                <CheckCircle size={24} color="#22c55e" />
                <View style={styles.verificationStepContent}>
                  <Text style={styles.verificationStepTitle}>Repository Analysis</Text>
                  <Text style={styles.verificationStepText}>Code quality and structure verified</Text>
                </View>
              </View>

              <View style={styles.verificationStep}>
                <CheckCircle size={24} color="#22c55e" />
                <View style={styles.verificationStepContent}>
                  <Text style={styles.verificationStepTitle}>Commit History</Text>
                  <Text style={styles.verificationStepText}>Development history validated</Text>
                </View>
              </View>

              <View style={styles.verificationStep}>
                <AlertCircle size={24} color="#f59e0b" />
                <View style={styles.verificationStepContent}>
                  <Text style={styles.verificationStepTitle}>XION Blockchain Integration</Text>
                  <Text style={styles.verificationStepText}>Connecting to XION network...</Text>
                </View>
              </View>

              <View style={styles.verificationStep}>
                <AlertCircle size={24} color="#7d8590" />
                <View style={styles.verificationStepContent}>
                  <Text style={styles.verificationStepTitle}>Reclaim Protocol Verification</Text>
                  <Text style={styles.verificationStepText}>Waiting for blockchain integration</Text>
                </View>
              </View>
            </View>

          </View>
        );

      case 3:
        return (
          <View style={styles.stepContent}>
            <View style={styles.reviewSection}>
              <Text style={styles.reviewTitle}>Project Summary</Text>
              
              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Repository</Text>
                <Text style={styles.reviewValue}>{formData.repositoryUrl || 'Not provided'}</Text>
              </View>

              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Title</Text>
                <Text style={styles.reviewValue}>{formData.projectTitle || 'Not provided'}</Text>
              </View>

              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Category</Text>
                <Text style={styles.reviewValue}>{formData.category || 'Not selected'}</Text>
              </View>

              <View style={styles.reviewItem}>
                <Text style={styles.reviewLabel}>Description</Text>
                <Text style={styles.reviewValue}>{formData.description || 'Not provided'}</Text>
              </View>
            </View>
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
          <Text style={styles.headerTitle}>Submit Project</Text>
          <Text style={styles.headerSubtitle}>Get your project verified on the blockchain</Text>
        </View>

        <StepIndicator currentStep={currentStep} totalSteps={steps.length} />

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 120 }]}
        >
          <View style={styles.stepHeader}>
            <Text style={styles.stepTitle}>{steps[currentStep]}</Text>
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
            onPress={currentStep === steps.length - 1 ? handleSubmit : handleNext}
          >
            <Text style={styles.primaryButtonText}>
              {currentStep === steps.length - 1 ? 'Submit Project' : 'Next'}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
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
  stepTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#f0f6fc',
  },
  stepContent: {
    padding: 20,
    paddingTop: 0,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f0f6fc',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1f24',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#24292e',
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#f0f6fc',
    backgroundColor: '#1a1f24',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#24292e',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  inputHelp: {
    fontSize: 14,
    color: '#7d8590',
    marginTop: 6,
  },
  verificationBox: {
    flexDirection: 'row',
    backgroundColor: '#f59e0b20',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f59e0b40',
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
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryChip: {
    backgroundColor: '#1a1f24',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#24292e',
  },
  categoryChipSelected: {
    backgroundColor: '#00bfff',
    borderColor: '#00bfff',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#e6edf3',
  },
  categoryTextSelected: {
    color: '#ffffff',
  },
  verificationSteps: {
    gap: 16,
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
  blockchainInfo: {
    backgroundColor: '#3b82f620',
    borderRadius: 8,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#3b82f640',
  },
  blockchainTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3b82f6',
    marginBottom: 8,
  },
  blockchainText: {
    fontSize: 14,
    color: '#e6edf3',
    lineHeight: 20,
  },
  reviewSection: {
    gap: 16,
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
  disclaimerBox: {
    backgroundColor: '#f59e0b20',
    borderRadius: 8,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#f59e0b40',
  },
  disclaimerText: {
    fontSize: 14,
    color: '#e6edf3',
    lineHeight: 20,
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
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
    flex: 1,
    backgroundColor: '#00bfff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});