import React from 'react';
import { View } from 'react-native';
import { styles } from '../theme/styles';

export default function Card({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <View style={[styles.card, dark && styles.cardDark]}>{children}</View>;
}
