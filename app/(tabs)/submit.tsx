import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Github, CircleCheck as CheckCircle, Eye, ArrowRight, Tag } from 'lucide-react-native';

type SubmissionStep = 'url-input' | 'preview' | 'labels' | 'verification';

export default function SubmitScreen() {
  const [currentStep, setCurrentStep] = useState<SubmissionStep>('url-input');
  const [githubUrl, setGithubUrl] = useState('');
  const [customLabels, setCustomLabels] = useState<string[]>([]);
  const [newLabel, setNewLabel] = useState('');

  // Mock project data for preview
  const mockProjectPreview = {
    name: 'awesome-react-native-app',
    description: 'A beautiful React Native application with modern UI components',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
    lastUpdate: new Date().toISOString(),
    readme: 'This is a sample README content that would be fetched from the repository...',
  };

  const handleUrlSubmit = () => {
    if (!githubUrl.trim()) {
      Alert.alert('Error', 'Please enter a GitHub repository URL');
      return;
    }
    if (!githubUrl.includes('github.com')) {
      Alert.alert('Error', 'Please enter a valid GitHub repository URL');
      return;
    }
    setCurrentStep('preview');
  };

  const handleAddLabel = () => {
    if (newLabel.trim() && !customLabels.includes(newLabel.trim())) {
      setCustomLabels([...customLabels, newLabel.trim()]);
      setNewLabel('');
    }
  };

  const handleRemoveLabel = (label: string) => {
    setCustomLabels(customLabels.filter(l => l !== label));
  };

  const handlePreviewNext = () => {
    setCurrentStep('labels');
  };

  const handleLabelsNext = () => {
    setCurrentStep('verification');
  };

  const handleFinalSubmit = () => {
    Alert.alert(
      'Success!',
      'Your project has been submitted for verification. You will receive a notification once the verification is complete.',
      [{ text: 'OK', onPress: () => setCurrentStep('url-input') }]
    );
  };

  const renderStepIndicator = () => (
    <View className="flex-row items-center justify-center mb-6">
      {['url-input', 'preview', 'labels', 'verification'].map((step, index) => (
        <View key={step} className="flex-row items-center">
          <View
            className={`w-8 h-8 rounded-full items-center justify-center ${
              currentStep === step
                ? 'bg-github-blue'
                : index < ['url-input', 'preview', 'labels', 'verification'].indexOf(currentStep)
                ? 'bg-github-accent'
                : 'bg-github-border'
            }`}
          >
            <Text
              className={`text-xs font-bold ${
                currentStep === step || index < ['url-input', 'preview', 'labels', 'verification'].indexOf(currentStep)
                  ? 'text-white'
                  : 'text-github-textMuted'
              }`}
            >
              {index + 1}
            </Text>
          </View>
          {index < 3 && (
            <View
              className={`w-8 h-0.5 mx-2 ${
                index < ['url-input', 'preview', 'labels', 'verification'].indexOf(currentStep)
                  ? 'bg-github-accent'
                  : 'bg-github-border'
              }`}
            />
          )}
        </View>
      ))}
    </View>
  );

  const renderUrlInput = () => (
    <View className="px-6">
      <View className="items-center mb-8">
        <View className="w-16 h-16 bg-github-surface rounded-full items-center justify-center mb-4">
          <Github size={32} color="#1f6feb" />
        </View>
        <Text className="text-github-text text-xl font-bold mb-2">
          Submit Your Project
        </Text>
        <Text className="text-github-textMuted text-center">
          Enter your GitHub repository URL to get started with verification
        </Text>
      </View>

      <View className="bg-github-surface border border-github-border rounded-lg p-4 mb-6">
        <Text className="text-github-text font-medium mb-3">
          GitHub Repository URL
        </Text>
        <TextInput
          className="bg-github-bg border border-github-border rounded-lg px-3 py-3 text-github-text"
          placeholder="https://github.com/username/repository"
          placeholderTextColor="#7d8590"
          value={githubUrl}
          onChangeText={setGithubUrl}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <TouchableOpacity
        onPress={handleUrlSubmit}
        className="bg-github-blue rounded-lg py-4 items-center"
      >
        <Text className="text-white font-semibold text-base">
          Continue to Preview
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderPreview = () => (
    <ScrollView className="px-6">
      <View className="items-center mb-6">
        <CheckCircle size={24} color="#238636" />
        <Text className="text-github-text text-xl font-bold mt-2 mb-1">
          Project Preview
        </Text>
        <Text className="text-github-textMuted text-center">
          Review your project details before submission
        </Text>
      </View>

      <View className="bg-github-surface border border-github-border rounded-lg p-4 mb-6">
        <Text className="text-github-text text-lg font-bold mb-2">
          {mockProjectPreview.name}
        </Text>
        <Text className="text-github-textMuted text-sm mb-3">
          {mockProjectPreview.description}
        </Text>
        
        <View className="flex-row items-center mb-3">
          <View className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
          <Text className="text-github-textMuted text-sm">
            {mockProjectPreview.language}
          </Text>
        </View>

        <View className="border-t border-github-border pt-3">
          <Text className="text-github-text font-medium mb-2">README Preview</Text>
          <Text className="text-github-textMuted text-sm">
            {mockProjectPreview.readme}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={handlePreviewNext}
        className="bg-github-blue rounded-lg py-4 items-center mb-4"
      >
        <Text className="text-white font-semibold text-base">
          Add Custom Labels
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setCurrentStep('url-input')}
        className="border border-github-border rounded-lg py-4 items-center"
      >
        <Text className="text-github-textMuted font-medium">
          Back to URL Input
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderLabels = () => (
    <ScrollView className="px-6">
      <View className="items-center mb-6">
        <Tag size={24} color="#1f6feb" />
        <Text className="text-github-text text-xl font-bold mt-2 mb-1">
          Custom Labels
        </Text>
        <Text className="text-github-textMuted text-center">
          Add tags to help others discover your project
        </Text>
      </View>

      <View className="bg-github-surface border border-github-border rounded-lg p-4 mb-6">
        <Text className="text-github-text font-medium mb-3">
          Add New Label
        </Text>
        <View className="flex-row">
          <TextInput
            className="flex-1 bg-github-bg border border-github-border rounded-lg px-3 py-3 text-github-text mr-3"
            placeholder="Enter label (e.g., React, TypeScript)"
            placeholderTextColor="#7d8590"
            value={newLabel}
            onChangeText={setNewLabel}
          />
          <TouchableOpacity
            onPress={handleAddLabel}
            className="bg-github-blue rounded-lg px-4 py-3"
          >
            <Plus size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {customLabels.length > 0 && (
        <View className="mb-6">
          <Text className="text-github-text font-medium mb-3">
            Your Labels ({customLabels.length})
          </Text>
          <View className="flex-row flex-wrap">
            {customLabels.map((label) => (
              <TouchableOpacity
                key={label}
                onPress={() => handleRemoveLabel(label)}
                className="bg-github-blue rounded-full px-3 py-1 mr-2 mb-2"
              >
                <Text className="text-white text-sm">
                  {label} ×
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <TouchableOpacity
        onPress={handleLabelsNext}
        className="bg-github-blue rounded-lg py-4 items-center mb-4"
      >
        <Text className="text-white font-semibold text-base">
          Continue to Verification
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setCurrentStep('preview')}
        className="border border-github-border rounded-lg py-4 items-center"
      >
        <Text className="text-github-textMuted font-medium">
          Back to Preview
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderVerification = () => (
    <View className="px-6">
      <View className="items-center mb-8">
        <View className="w-16 h-16 bg-github-accent rounded-full items-center justify-center mb-4">
          <CheckCircle size={32} color="white" />
        </View>
        <Text className="text-github-text text-xl font-bold mb-2">
          Ready for Verification
        </Text>
        <Text className="text-github-textMuted text-center">
          Your project will be verified using blockchain technology to ensure authenticity
        </Text>
      </View>

      <View className="bg-github-surface border border-github-border rounded-lg p-4 mb-6">
        <Text className="text-github-text font-medium mb-3">
          Verification Process
        </Text>
        <View className="space-y-2">
          <View className="flex-row items-center">
            <CheckCircle size={16} color="#238636" />
            <Text className="text-github-textMuted text-sm ml-2">
              Repository accessibility check
            </Text>
          </View>
          <View className="flex-row items-center">
            <CheckCircle size={16} color="#238636" />
            <Text className="text-github-textMuted text-sm ml-2">
              Code authenticity verification
            </Text>
          </View>
          <View className="flex-row items-center">
            <CheckCircle size={16} color="#238636" />
            <Text className="text-github-textMuted text-sm ml-2">
              Blockchain credential generation
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleFinalSubmit}
        className="bg-github-accent rounded-lg py-4 items-center mb-4"
      >
        <Text className="text-white font-semibold text-base">
          Submit for Verification
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setCurrentStep('labels')}
        className="border border-github-border rounded-lg py-4 items-center"
      >
        <Text className="text-github-textMuted font-medium">
          Back to Labels
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-github-bg">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="pt-6">
          {renderStepIndicator()}
          
          {currentStep === 'url-input' && renderUrlInput()}
          {currentStep === 'preview' && renderPreview()}
          {currentStep === 'labels' && renderLabels()}
          {currentStep === 'verification' && renderVerification()}
        </View>
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}