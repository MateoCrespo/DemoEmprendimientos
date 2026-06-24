import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, Text, View } from 'react-native';
import AppShell from '../components/AppShell';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import SectionTitle from '../components/SectionTitle';
import { SelectedExperienceScreenProps } from '../navigation';
import { styles } from '../theme/styles';
import { Screen } from '../types';

function TimerBox({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <View style={styles.timerBox}>
      <Text style={[styles.timerValue, accent && styles.timerAccent]}>{value}</Text>
      <Text style={styles.timerLabel}>{label}</Text>
    </View>
  );
}

export default function TuProximaAventura({ onNavigate, experience }: SelectedExperienceScreenProps) {
  const [secondsLeft, setSecondsLeft] = useState(24 * 60 * 60);

  useEffect(() => {
    const interval = setInterval(() => setSecondsLeft((value) => (value > 0 ? value - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  if (!experience) {
    return (
      <AppShell title="Próximos" onBack={() => onNavigate(Screen.AVENTURA_DISCOVERY, 'push_back')}>
        <ScrollView contentContainerStyle={styles.centerContent}>
          <Card>
            <Text style={styles.cardTitle}>No hay experiencia seleccionada</Text>
            <Text style={styles.cardText}>Volvé a la lista para elegir una actividad.</Text>
          </Card>
          <PrimaryButton onPress={() => onNavigate(Screen.AVENTURA_DISCOVERY, 'push_back')}>Ver mis experiencias</PrimaryButton>
        </ScrollView>
      </AppShell>
    );
  }

  return (
    <AppShell
      onBack={() => onNavigate(Screen.AVENTURA_DISCOVERY, 'push_back')}
      rightText="👤"
      onRightPress={() => onNavigate(Screen.PERFIL, 'push')}
      withBottomNav
      activeTab="alerts"
      onNavigate={onNavigate}
    >
      <ScrollView contentContainerStyle={styles.contentWithNav}>
        <ImageBackground source={{ uri: experience.image }} style={styles.countdownHero} imageStyle={styles.heroImage}>
          <View style={styles.imageOverlay} />
          <Text style={styles.planTag}>Tu próximo destino</Text>
          <Text style={styles.featuredTitle}>{experience.title}</Text>
          <Text style={styles.whiteMeta}>{experience.location}</Text>
        </ImageBackground>

        <View style={styles.timerRow}>
          <TimerBox value={hours.toString().padStart(2, '0')} label="Horas" />
          <TimerBox value={minutes.toString().padStart(2, '0')} label="Minutos" />
          <TimerBox value={seconds.toString().padStart(2, '0')} label="Segundos" accent />
        </View>
        <Text style={styles.legal}>La revelación total ocurre 24hs antes de la experiencia.</Text>

        <SectionTitle title="Pistas del Plan" />
        {experience.hints.map((hint, index) => (
          <Card key={hint}>
            <Text style={styles.kicker}>Pista #{index + 1}</Text>
            <Text style={index === 0 ? styles.titleSmall : styles.cardTitle}>{index === 0 ? `"${hint}"` : hint}</Text>
          </Card>
        ))}

        <SectionTitle title="Prepárate para la acción" />
        {experience.preparation.map((item) => (
          <Card key={item}>
            <Text style={styles.cardTitle}>{item}</Text>
          </Card>
        ))}

        <Card>
          <Text style={styles.cardTitle}>Detalle reservado</Text>
          <Text style={styles.cardText}>Fecha: {experience.date}</Text>
          <Text style={styles.cardText}>Horario: {experience.timeRange ?? 'Sin seleccionar'}</Text>
          <Text style={styles.cardText}>Actividad: {experience.activityType}</Text>
          <Text style={styles.cardText}>Lugar elegido: {experience.location}</Text>
        </Card>
      </ScrollView>
    </AppShell>
  );
}
