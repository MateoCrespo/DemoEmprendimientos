import React, { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, Text, View } from 'react-native';
import AppShell from '../components/AppShell';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { ScreenProps } from '../navigation';
import { Screen } from '../types';
import { styles } from '../theme/styles';

export default function ConfirmacionReserva({ onNavigate }: ScreenProps) {
  const [isProcessing, setIsProcessing] = useState(true);
  const progress = useRef(new Animated.Value(0)).current;
  const celebration = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const progressAnimation = Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    });
    const celebrationAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(celebration, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(celebration, {
          toValue: 0,
          duration: 450,
          useNativeDriver: true,
        }),
      ]),
    );

    progressAnimation.start(() => setIsProcessing(false));
    celebrationAnimation.start();

    return () => {
      progressAnimation.stop();
      celebrationAnimation.stop();
    };
  }, [celebration, progress]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  const trumpetRotate = celebration.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['-12deg', '14deg', '-12deg'],
  });
  const trumpetScale = celebration.interpolate({
    inputRange: [0, 1],
    outputRange: isProcessing ? [0.96, 1.04] : [1, 1.2],
  });

  return (
    <AppShell onBack={() => onNavigate(Screen.INICIO, 'push_back')} rightText="👤" onRightPress={() => onNavigate(Screen.PERFIL, 'push')}>
      <ScrollView contentContainerStyle={styles.centerContent}>
        <View style={styles.successBox}>
          <Animated.View
            style={[
              styles.trumpetBadge,
              !isProcessing && styles.trumpetBadgeSuccess,
              {
                transform: [
                  { rotate: trumpetRotate },
                  { scale: trumpetScale },
                ],
              },
            ]}
          >
            <Text style={styles.trumpetIcon}>🎺</Text>
          </Animated.View>
          <Text style={isProcessing ? styles.title : styles.successTitle}>
            {isProcessing ? 'Se está procesando el pago' : '¡Tu sorpresa está asegurada!'}
          </Text>
          <Text style={styles.subtitle}>
            {isProcessing
              ? 'Estamos confirmando tu operación. Esto puede tardar unos segundos.'
              : 'En 48hs vas a recibir todo lo que necesitás saber.'}
          </Text>
        </View>

        <Card>
          <Text style={styles.cardTitle}>Estado de la reserva</Text>
          <Text style={styles.cardText}>
            {isProcessing ? 'Procesando pago y preparando tu reserva...' : 'Pago confirmado. Curando tu experiencia personalizada...'}
          </Text>
          <View style={styles.progressTrack}>
            <Animated.View
              style={[
                styles.progressFill,
                !isProcessing && styles.progressFillSuccess,
                { width: progressWidth },
              ]}
            />
          </View>
        </Card>

        {!isProcessing ? (
          <>
            <PrimaryButton variant="muted" onPress={() => onNavigate(Screen.AVENTURA_DISCOVERY, 'push')}>
              Ver mis experiencias
            </PrimaryButton>
            <Pressable onPress={() => onNavigate(Screen.CONFIGURAR, 'push')}>
              <Text style={styles.linkCenter}>Sorprendete otra vez</Text>
            </Pressable>
          </>
        ) : null}
      </ScrollView>
    </AppShell>
  );
}
