import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  Check, 
  Crown, 
  BookOpen, 
  TrendingUp, 
  Calendar, 
  BookText 
} from 'lucide-react-native';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { useSubscriptionStore } from '@/store/subscription-store';
import colors from '@/constants/colors';
import { useThemeStore } from '@/store/theme-store';

export default function SubscriptionScreen() {
  const router = useRouter();
  const theme = useThemeStore(state => state.theme);
  const colorScheme = theme === 'dark' ? colors.dark : colors.light;
  
  const { 
    subscription, 
    plans, 
    mockPurchaseSubscription, 
    mockRestorePurchases 
  } = useSubscriptionStore();
  
  const [selectedPlan, setSelectedPlan] = useState(plans[1].id); // Default to yearly
  const [isLoading, setIsLoading] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  
  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      const success = await mockPurchaseSubscription(selectedPlan);
      if (success) {
        router.back();
      }
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRestore = async () => {
    setIsRestoring(true);
    try {
      const success = await mockRestorePurchases();
      if (success) {
        router.back();
      }
    } catch (error) {
      console.error('Restore failed:', error);
    } finally {
      setIsRestoring(false);
    }
  };
  
  const isPremiumActive = subscription.tier === 'premium' && subscription.isActive;
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorScheme.background }]} edges={['top']}>
      <View style={[styles.header, { borderBottomColor: colorScheme.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colorScheme.text.primary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colorScheme.text.primary }]}>Premium Subscription</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {isPremiumActive ? (
          <View style={styles.activeSubscriptionContainer}>
            <View style={[styles.crownContainer, { backgroundColor: colorScheme.accent }]}>
              <Crown size={40} color="#FFFFFF" />
            </View>
            
            <Text style={[styles.activeTitle, { color: colorScheme.text.primary }]}>
              You're a Premium Member!
            </Text>
            
            <Text style={[styles.activeDetails, { color: colorScheme.text.secondary }]}>
              Your {subscription.plan === 'yearly' ? 'annual' : 'monthly'} subscription is active until{' '}
              {new Date(subscription.expiryDate || '').toLocaleDateString()}
            </Text>
            
            <Button
              title="Return to App"
              onPress={() => router.back()}
              style={styles.returnButton}
            />
          </View>
        ) : (
          <>
            <View style={styles.heroSection}>
              <View style={[styles.crownContainer, { backgroundColor: colorScheme.accent }]}>
                <Crown size={40} color="#FFFFFF" />
              </View>
              
              <Text style={[styles.heroTitle, { color: colorScheme.text.primary }]}>
                Upgrade to Premium
              </Text>
              
              <Text style={[styles.heroSubtitle, { color: colorScheme.text.secondary }]}>
                Unlock all features and accelerate your growth journey
              </Text>
            </View>
            
            <View style={styles.featuresSection}>
              <Text style={[styles.sectionTitle, { color: colorScheme.text.primary }]}>
                Premium Features
              </Text>
              
              <View style={styles.featuresList}>
                <FeatureItem 
                  icon={<BookText size={24} color={colorScheme.primary} />}
                  title="Full Journal History"
                  description="Access your complete journal archive and track your growth over time"
                  colorScheme={colorScheme}
                />
                
                <FeatureItem 
                  icon={<BookOpen size={24} color={colorScheme.primary} />}
                  title="Enhanced Learning Content"
                  description="Get access to in-depth materials and trending growth topics"
                  colorScheme={colorScheme}
                />
                
                <FeatureItem 
                  icon={<TrendingUp size={24} color={colorScheme.primary} />}
                  title="Detailed Analytics"
                  description="Visualize your progress with advanced insights and reports"
                  colorScheme={colorScheme}
                />
                
                <FeatureItem 
                  icon={<Calendar size={24} color={colorScheme.primary} />}
                  title="Unlimited Disciplines"
                  description="Create and track as many daily disciplines as you need"
                  colorScheme={colorScheme}
                />
              </View>
            </View>
            
            <View style={styles.plansSection}>
              <Text style={[styles.sectionTitle, { color: colorScheme.text.primary }]}>
                Choose Your Plan
              </Text>
              
              <View style={styles.planCards}>
                {plans.map(plan => (
                  <TouchableOpacity
                    key={plan.id}
                    style={[
                      styles.planCard,
                      { 
                        backgroundColor: colorScheme.cardBackground,
                        borderColor: selectedPlan === plan.id ? colorScheme.primary : colorScheme.border
                      },
                      selectedPlan === plan.id && styles.selectedPlan
                    ]}
                    onPress={() => setSelectedPlan(plan.id)}
                  >
                    <Text style={[styles.planName, { color: colorScheme.text.primary }]}>
                      {plan.name}
                    </Text>
                    
                    <Text style={[styles.planPrice, { color: colorScheme.text.primary }]}>
                      {plan.price}
                      <Text style={[styles.planPeriod, { color: colorScheme.text.secondary }]}>
                        /{plan.period}
                      </Text>
                    </Text>
                    
                    {plan.id === 'yearly' && (
                      <View style={[styles.savingsBadge, { backgroundColor: colorScheme.accent }]}>
                        <Text style={styles.savingsText}>SAVE 20%</Text>
                      </View>
                    )}
                    
                    {selectedPlan === plan.id && (
                      <View style={[styles.checkmark, { backgroundColor: colorScheme.primary }]}>
                        <Check size={16} color="#FFFFFF" />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View style={styles.actionButtons}>
              <Button
                title={isLoading ? "Processing..." : "Subscribe Now"}
                onPress={handlePurchase}
                disabled={isLoading}
                loading={isLoading}
                style={styles.subscribeButton}
              />
              
              <TouchableOpacity 
                style={styles.restoreButton}
                onPress={handleRestore}
                disabled={isRestoring}
              >
                {isRestoring ? (
                  <ActivityIndicator size="small" color={colorScheme.primary} />
                ) : (
                  <Text style={[styles.restoreText, { color: colorScheme.primary }]}>
                    Restore Purchases
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            
            <Text style={[styles.termsText, { color: colorScheme.text.muted }]}>
              By subscribing, you agree to our Terms of Service and Privacy Policy. 
              Your subscription will automatically renew unless canceled at least 24 hours 
              before the end of the current period. You can manage your subscription in your 
              account settings.
            </Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  colorScheme: any;
}

function FeatureItem({ icon, title, description, colorScheme }: FeatureItemProps) {
  return (
    <View style={styles.featureItem}>
      <View style={[styles.featureIcon, { backgroundColor: colorScheme.cardBackgroundAlt }]}>
        {icon}
      </View>
      <View style={styles.featureContent}>
        <Text style={[styles.featureTitle, { color: colorScheme.text.primary }]}>
          {title}
        </Text>
        <Text style={[styles.featureDescription, { color: colorScheme.text.secondary }]}>
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  crownContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    maxWidth: '80%',
  },
  featuresSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  featuresList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  plansSection: {
    marginBottom: 32,
  },
  planCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  planCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    position: 'relative',
  },
  selectedPlan: {
    borderWidth: 2,
  },
  planName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  planPeriod: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  savingsBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  savingsText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  checkmark: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtons: {
    marginBottom: 24,
  },
  subscribeButton: {
    marginBottom: 16,
  },
  restoreButton: {
    alignItems: 'center',
    padding: 12,
  },
  restoreText: {
    fontSize: 16,
    fontWeight: '500',
  },
  termsText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  activeSubscriptionContainer: {
    alignItems: 'center',
    padding: 24,
  },
  activeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  activeDetails: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  returnButton: {
    minWidth: 200,
  },
});