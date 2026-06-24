import React from 'react';
import { ScrollView, Text } from 'react-native';
import AppShell from '../components/AppShell';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { ScreenProps } from '../navigation';
import { styles } from '../theme/styles';
import { Screen } from '../types';

export default function PerfilOpciones({ onNavigate }: ScreenProps) {
  return (
    <AppShell title="Mi Perfil" onBack={() => onNavigate(Screen.INICIO, 'push_back')}>
      <ScrollView contentContainerStyle={styles.centerContent}>
        <Card>
          <Text style={styles.cardTitle}>Opciones de perfil</Text>
        </Card>

        <PrimaryButton onPress={() => onNavigate(Screen.EDITAR_PERFIL, 'push')}>
          Modificar perfil
        </PrimaryButton>
        <PrimaryButton variant="muted" onPress={() => onNavigate(Screen.CREAR_CUENTA, 'push_back')}>
          Log out
        </PrimaryButton>
      </ScrollView>
    </AppShell>
  );
}
