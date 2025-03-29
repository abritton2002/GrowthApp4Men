import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { Clock } from 'lucide-react-native';
import Button from '@/components/Button';
import { useDisciplinesStore } from '@/store/disciplines-store';
import colors from '@/constants/colors';
import typography from '@/constants/typography';
import { DisciplineFormData } from '@/types/disciplines';
import { useThemeStore } from '@/store/theme-store';

export default function CreateDisciplineScreen() {
  const router = useRouter();
  const addDiscipline = useDisciplinesStore(state => state.addDiscipline);
  const theme = useThemeStore(state => state.theme);
  const colorScheme = theme === 'dark' ? colors.dark : colors.light;
  
  const [formData, setFormData] = useState<DisciplineFormData>({
    title: '',
    description: '',
    reminderTime: '08:00',
  });
  
  const [errors, setErrors] = useState({
    title: '',
    description: '',
  });
  
  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = {
      title: '',
      description: '',
    };
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      addDiscipline(formData);
      router.back();
    }
  };
  
  const handleCancel = () => {
    router.back();
  };
  
  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colorScheme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formGroup}>
          <Text style={[typography.subtitle, styles.label, { color: colorScheme.text.primary }]}>Title</Text>
          <TextInput
            style={[
              styles.input, 
              { 
                backgroundColor: colorScheme.cardBackground,
                borderColor: colorScheme.border,
                color: colorScheme.text.primary
              },
              errors.title ? [styles.inputError, { borderColor: colorScheme.error }] : null
            ]}
            placeholder="e.g., Morning Prayer"
            placeholderTextColor={colorScheme.text.light}
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
          />
          {errors.title ? (
            <Text style={[styles.errorText, { color: colorScheme.error }]}>{errors.title}</Text>
          ) : null}
        </View>
        
        <View style={styles.formGroup}>
          <Text style={[typography.subtitle, styles.label, { color: colorScheme.text.primary }]}>Description</Text>
          <TextInput
            style={[
              styles.input, 
              styles.textArea,
              { 
                backgroundColor: colorScheme.cardBackground,
                borderColor: colorScheme.border,
                color: colorScheme.text.primary
              },
              errors.description ? [styles.inputError, { borderColor: colorScheme.error }] : null
            ]}
            placeholder="e.g., Spend 5 minutes in prayer to start the day"
            placeholderTextColor={colorScheme.text.light}
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
          {errors.description ? (
            <Text style={[styles.errorText, { color: colorScheme.error }]}>{errors.description}</Text>
          ) : null}
        </View>
        
        <View style={styles.formGroup}>
          <Text style={[typography.subtitle, styles.label, { color: colorScheme.text.primary }]}>Reminder Time</Text>
          <View style={[
            styles.timeInputContainer,
            { 
              backgroundColor: colorScheme.cardBackground,
              borderColor: colorScheme.border
            }
          ]}>
            <Clock size={20} color={colorScheme.text.light} style={styles.timeIcon} />
            <TextInput
              style={[styles.timeInput, { color: colorScheme.text.primary }]}
              placeholder="08:00"
              placeholderTextColor={colorScheme.text.light}
              value={formData.reminderTime}
              onChangeText={(text) => setFormData({ ...formData, reminderTime: text })}
              keyboardType="numbers-and-punctuation"
            />
          </View>
          <Text style={[styles.helperText, { color: colorScheme.text.light }]}>
            Format: 24-hour time (e.g., 08:00, 14:30)
          </Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Create Discipline"
            onPress={handleSubmit}
            style={styles.submitButton}
          />
          <Button
            title="Cancel"
            variant="outline"
            onPress={handleCancel}
            style={styles.cancelButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputError: {
    borderWidth: 2,
  },
  textArea: {
    minHeight: 100,
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  timeIcon: {
    marginRight: 8,
  },
  timeInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  helperText: {
    fontSize: 12,
    marginTop: 4,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 24,
    gap: 12,
  },
  submitButton: {
    marginBottom: 8,
  },
  cancelButton: {},
});