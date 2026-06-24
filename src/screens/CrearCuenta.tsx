import React, { useState } from 'react';
import { ImageBackground, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import AppShell from '../components/AppShell';
import PrimaryButton from '../components/PrimaryButton';
import { AuthScreenProps } from '../navigation';
import { styles } from '../theme/styles';

export default function CrearCuenta({ onLogin, onRegister }: AuthScreenProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const clearFormError = () => setFormError('');

  const handleSubmit = () => {
    const error = mode === 'login'
      ? onLogin(email, password)
      : onRegister(name, age, email, password);

    if (error) {
      setFormError(error);
      return;
    }

    setFormError('');
  };

  return (
    <AppShell title="PlanGo">
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

        <View style={styles.paymentMethodRow}>
          <Pressable
            onPress={() => {
              setMode('login');
              clearFormError();
            }}
            style={[styles.paymentMethodButton, mode === 'login' && styles.paymentMethodButtonActive]}
          >
            <Text style={[styles.paymentMethodText, mode === 'login' && styles.paymentMethodTextActive]}>
              Iniciar sesión
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setMode('register');
              clearFormError();
            }}
            style={[styles.paymentMethodButton, mode === 'register' && styles.paymentMethodButtonActive]}
          >
            <Text style={[styles.paymentMethodText, mode === 'register' && styles.paymentMethodTextActive]}>
              Registrarme
            </Text>
          </Pressable>
        </View>

        <Text style={styles.separator}>
          {mode === 'login' ? 'Ingresá con tu usuario' : 'Creá tu usuario'}
        </Text>

        {mode === 'register' ? (
          <>
            <TextInput
              placeholder="Nombre"
              value={name}
              onChangeText={(value) => {
                setName(value);
                clearFormError();
              }}
              style={styles.input}
            />
            <TextInput
              placeholder="Edad"
              keyboardType="numeric"
              value={age}
              onChangeText={(value) => {
                setAge(value.replace(/\D/g, ''));
                clearFormError();
              }}
              style={styles.input}
            />
          </>
        ) : null}

        <TextInput
          placeholder="nombre@ejemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            clearFormError();
          }}
          style={styles.input}
        />
        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={(value) => {
            setPassword(value);
            clearFormError();
          }}
          style={styles.input}
        />

        {formError ? <Text style={styles.errorText}>{formError}</Text> : null}

        <PrimaryButton variant="secondary" onPress={handleSubmit}>
          {mode === 'login' ? 'Iniciar sesión' : 'Registrarme'}
        </PrimaryButton>

      </ScrollView>
    </AppShell>
  );
}
