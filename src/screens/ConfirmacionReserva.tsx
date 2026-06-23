import React from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import AppShell from '../components/AppShell';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { ScreenProps } from '../navigation';
import { Screen } from '../types';
import { styles } from '../theme/styles';

export default function ConfirmacionReserva({ onNavigate }: ScreenProps) {
  return (
    <AppShell onBack={() => onNavigate(Screen.INICIO, 'push_back')} rightText="Log out" onRightPress={() => onNavigate(Screen.INICIO, 'push_back')}>
      <ScrollView contentContainerStyle={styles.centerContent}>
        <View style={styles.successBox}>
          <Text style={styles.successIcon}>□</Text>
          <Text style={styles.title}>¡Tu sorpresa está asegurada!</Text>
          <Text style={styles.subtitle}>En 48hs vas a recibir todo lo que necesitás saber.</Text>
        </View>

        <Card>
          <Text style={styles.cardTitle}>Estado de la reserva</Text>
          <Text style={styles.cardText}>Curando tu experiencia personalizada...</Text>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
        </Card>

        <PrimaryButton onPress={() => Alert.alert('Compartido', 'Listo para compartir con tus amigos.')}>
          Compartir con mis amigos
        </PrimaryButton>
        <PrimaryButton variant="muted" onPress={() => onNavigate(Screen.AVENTURA_DISCOVERY, 'push')}>
          Ver mis experiencias
        </PrimaryButton>
        <Pressable onPress={() => onNavigate(Screen.CONFIGURAR, 'push')}>
          <Text style={styles.linkCenter}>Sorprendete otra vez</Text>
        </Pressable>
      </ScrollView>
    </AppShell>
  );
}
