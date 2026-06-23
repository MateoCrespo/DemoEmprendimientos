import React, { useState } from 'react';
import { Alert, ImageBackground, ScrollView, Text, TextInput, View } from 'react-native';
import AppShell from '../components/AppShell';
import PrimaryButton from '../components/PrimaryButton';
import { ScreenProps } from '../navigation';
import { Screen } from '../types';
import { styles } from '../theme/styles';

export default function CrearCuenta({ onNavigate }: ScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AppShell
      title="PlanGo"
      rightText="?"
      onRightPress={() => Alert.alert('Ayuda', 'Ingresá con email o seguí con una cuenta social.')}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800' }}
          style={styles.loginHero}
          imageStyle={styles.heroImage}
        >
          <View style={styles.imageOverlay} />
          <Text style={styles.heroKicker}>Exploración Urbana</Text>
          <Text style={styles.heroTitle}>Descubrí experiencias únicas cerca tuyo, sin buscar.</Text>
        </ImageBackground>

        <Text style={styles.subtitle}>Tu conserje personal para momentos inolvidables.</Text>

        <View style={styles.stack}>
          <PrimaryButton variant="muted" onPress={() => onNavigate(Screen.PREFERENCIAS, 'push')}>
            Continuar con Google
          </PrimaryButton>
          <PrimaryButton onPress={() => onNavigate(Screen.PREFERENCIAS, 'push')}>Continuar con Apple</PrimaryButton>
        </View>

        <Text style={styles.separator}>O continuar con email</Text>
        <TextInput
          placeholder="nombre@ejemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <PrimaryButton variant="secondary" onPress={() => onNavigate(Screen.PREFERENCIAS, 'push')}>
          Continuar
        </PrimaryButton>

        <Text style={styles.legal}>Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad.</Text>
      </ScrollView>
    </AppShell>
  );
}
