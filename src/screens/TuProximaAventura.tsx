import React, { useEffect, useState } from 'react';
import { Alert, ImageBackground, Pressable, ScrollView, Text, View } from 'react-native';
import AppShell from '../components/AppShell';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import SectionTitle from '../components/SectionTitle';
import { ScreenProps } from '../navigation';
import { Screen } from '../types';
import { styles } from '../theme/styles';

function TimerBox({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <View style={styles.timerBox}>
      <Text style={[styles.timerValue, accent && styles.timerAccent]}>{value}</Text>
      <Text style={styles.timerLabel}>{label}</Text>
    </View>
  );
}

export default function TuProximaAventura({ onNavigate }: ScreenProps) {
  const [seconds, setSeconds] = useState(55);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((value) => (value > 0 ? value - 1 : 59)), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppShell
      onBack={() => onNavigate(Screen.INICIO, 'push_back')}
      rightText="Log out"
      onRightPress={() => onNavigate(Screen.INICIO, 'push_back')}
      withBottomNav
      activeTab="alerts"
      onNavigate={onNavigate}
    >
      <ScrollView contentContainerStyle={styles.contentWithNav}>
        <Pressable onPress={() => onNavigate(Screen.REVELACION, 'push')}>
          <ImageBackground
            source={{ uri: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800' }}
            style={styles.countdownHero}
            imageStyle={styles.heroImage}
          >
            <View style={styles.imageOverlay} />
            <Text style={styles.planTag}>Tu próximo destino</Text>
            <Text style={styles.featuredTitle}>Casi es momento de la verdad</Text>
          </ImageBackground>
        </Pressable>

        <View style={styles.timerRow}>
          <TimerBox value="47" label="Horas" />
          <TimerBox value="55" label="Minutos" />
          <TimerBox value={seconds.toString().padStart(2, '0')} label="Segundos" accent />
        </View>
        <Text style={styles.legal}>La revelación total ocurrirá el viernes a las 19:00</Text>

        <SectionTitle title="Pistas del Plan" />
        <Card>
          <Text style={styles.kicker}>Pista #1</Text>
          <Text style={styles.titleSmall}>"Aromas intensos y luz tenue"</Text>
        </Card>
        <View style={styles.twoColumns}>
          <Card>
            <Text style={styles.cardTitle}>En 12 horas</Text>
            <Text style={styles.cardText}>Pista bloqueada</Text>
          </Card>
          <Card>
            <Text style={styles.cardTitle}>En 24 horas</Text>
            <Text style={styles.cardText}>Pista bloqueada</Text>
          </Card>
        </View>

        <SectionTitle title="Prepárate para la acción" />
        {['Usa ropa cómoda y casual', 'Carga tu celular al 100%', 'Ganas de descubrir lo inesperado'].map((item) => (
          <Card key={item}>
            <Text style={styles.cardTitle}>{item}</Text>
          </Card>
        ))}

        <PrimaryButton onPress={() => Alert.alert('Compartido', 'Invitados notificados.')}>Compartir con invitados</PrimaryButton>
      </ScrollView>
    </AppShell>
  );
}
