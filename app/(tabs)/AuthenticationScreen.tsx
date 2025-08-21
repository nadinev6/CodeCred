import React, { useState, useEffect } from 'react';
import { xionService, XionAccount } from '../../services/xion';
import { reclaimService } from '../../services/reclaim';

export const AuthenticationScreen = () => {
  const [xionAccount, setXionAccount] = useState<XionAccount | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initializeServices();
  }, []);

  const initializeServices = async () => {
    try {
      await xionService.initialize();
      const account = await xionService.getCurrentAccount();
      setXionAccount(account);
    } catch (error) {
      console.error('Service initialization failed:', error);
    }
  };

  const handleXionAuth = async () => {
    setLoading(true);
    try {
      const account = await xionService.authenticate();
      setXionAccount(account);
      await xionService.connect();
    } catch (error) {
      console.error('XION authentication failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteVerification = async () => {
    if (!xionAccount) return;
    
    try {
      setLoading(true);
      
      // Step 1: Generate Reclaim proof
      const proof = await reclaimService.generateGitHubProof('username', 'repo');
      const verificationData = await reclaimService.extractGitHubData(proof);
      
      // Step 2: Submit to XION blockchain
      const txResult = await xionService.submitReclaimProof(proof, verificationData);
      
      console.log('Verification complete! TX Hash:', txResult.hash);
    } catch (error) {
      console.error('Complete verification failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      {!xionAccount ? (
        <Button 
          title="Connect with XION" 
          onPress={handleXionAuth}
          disabled={loading}
        />
      ) : (
        <View>
          <Text>Connected: {xionAccount.address}</Text>
          <Button 
            title="Complete GitHub Verification"
            onPress={handleCompleteVerification}
            disabled={loading}
          />
        </View>
      )}
    </View>
  );
};