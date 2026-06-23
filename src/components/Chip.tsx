import React from 'react';
import { Pressable, Text } from 'react-native';
import { styles } from '../theme/styles';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress: () => void;
}

export default function Chip({ label, selected, onPress }: ChipProps) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, selected && styles.chipSelected]}>
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </Pressable>
  );
}
