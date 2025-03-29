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

export default function CreateDisciplineScreen() {
  const router = useRouter();
  const addDiscipline = useDisciplinesStore(state => state.addDiscipline);
  
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
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formGroup}>
          <Text style={[typography.subtitle, styles.label]}>Title</Text>
          <TextInput
            style={[styles.input, errors.title ? styles.inputError : null]}
            placeholder="e.g., Morning Prayer"
            placeholderTextColor={colors.text.light}
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
          />
          {errors.title ? (
            <Text style={styles.errorText}>{errors.title}</Text>
          ) : null}
        </View>
        
        <View style={styles.formGroup}>
          <Text style={[typography.subtitle, styles.label]}>Description</Text>
          <TextInput
            style={[
              styles.input, 
              styles.textArea, 
              errors.description ? styles.inputError : null
            ]}
            placeholder="e.g., Spend 5 minutes in prayer to start the day"
            placeholderTextColor={colors.text.light}
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
          {errors.description ? (
            <Text style={styles.errorText}>{errors.description}</Text>
          ) : null}
        </View>
        
        <View style={styles.formGroup}>
          <Text style={[typography.subtitle, styles.label]}>Reminder Time</Text>
          <View style={styles.timeInputContainer}>
            <Clock size={20} color={colors.text.light} style={styles.timeIcon} />
            <TextInput
              style={styles.timeInput}
              placeholder="08:00"
              placeholderTextColor={colors.text.light}
              value={formData.reminderTime}
              onChangeText={(text) => setFormData({ ...formData, reminderTime: text })}
              keyboardType="numbers-and-punctuation"
            />
          </View>
          <Text style={styles.helperText}>
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
    backgroundColor: colors.background,
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
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text.primary,
  },
  inputError: {
    borderColor: colors.error,
  },
  textArea: {
    minHeight: 100,
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
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
    color: colors.text.primary,
  },
  helperText: {
    fontSize: 12,
    color: colors.text.light,
    marginTop: 4,
  },
  errorText: {
    color: colors.error,
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