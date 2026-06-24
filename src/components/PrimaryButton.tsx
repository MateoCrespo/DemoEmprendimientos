import React from 'react';
import { Pressable, Text } from 'react-native';
import { styles } from '../theme/styles';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'muted' | 'danger';
}

export default function PrimaryButton({ children, onPress, variant = 'primary' }: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        variant === 'secondary' && styles.buttonSecondary,
        variant === 'muted' && styles.buttonMuted,
        variant === 'danger' && styles.buttonDanger,
      ]}
    >
      <Text style={[styles.buttonText, variant === 'muted' && styles.buttonTextMuted]}>{children}</Text>
    </Pressable>
  );
}
