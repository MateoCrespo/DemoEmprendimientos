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
  const [loginError, setLoginError] = useState('');

  const handleLogin = () => {
    if (email.trim().toLowerCase() !== 'cliente1@gmail.com') {
      setLoginError('El usuario ingresado no es correcto. Usá cliente1@gmail.com.');
      Alert.alert('Usuario incorrecto', 'El usuario debe ser cliente1@gmail.com.');
      return;
    }

    if (password !== 'cliente123') {
      setLoginError('La contraseña ingresada no es correcta. Usá cliente123.');
      Alert.alert('Contraseña incorrecta', 'La contraseña debe ser cliente123.');
      return;
    }

    setLoginError('');
    onNavigate(Screen.PREFERENCIAS, 'push');
  };

  return (
    <AppShell
      title="PlanGo"
      rightText="?"
      onRightPress={() => Alert.alert('Ayuda', 'Ingresá con el usuario y contraseña de prueba.')}
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

        <Text style={styles.separator}>Ingresá con tu usuario de prueba</Text>
        <TextInput
          placeholder="nombre@ejemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            setLoginError('');
          }}
          style={styles.input}
        />
        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={(value) => {
            setPassword(value);
            setLoginError('');
          }}
          style={styles.input}
        />
        {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
        <PrimaryButton variant="secondary" onPress={handleLogin}>
          Continuar
        </PrimaryButton>

        <Text style={styles.legal}>Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad.</Text>
      </ScrollView>
    </AppShell>
  );
}
