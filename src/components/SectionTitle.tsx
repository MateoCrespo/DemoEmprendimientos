import React from 'react';
import { Text } from 'react-native';
import { styles } from '../theme/styles';

export default function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}
