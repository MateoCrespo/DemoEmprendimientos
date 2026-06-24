import React, { useState } from 'react';
import { ImageBackground, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import AppShell from '../components/AppShell';
import Chip from '../components/Chip';
import PrimaryButton from '../components/PrimaryButton';
import SectionTitle from '../components/SectionTitle';
import { SelectedExperienceScreenProps } from '../navigation';
import { Screen } from '../types';
import { styles } from '../theme/styles';

export default function EncuestaCalidad({ onNavigate, experience }: SelectedExperienceScreenProps) {
  const [rating, setRating] = useState(0);
  const [ambient, setAmbient] = useState('');
  const [match, setMatch] = useState('');
  const [strengths, setStrengths] = useState<string[]>([]);
  const [improvement, setImprovement] = useState('');
  const [tip, setTip] = useState('');

  const toggleStrength = (item: string) => {
    setStrengths(strengths.includes(item) ? strengths.filter((value) => value !== item) : [...strengths, item]);
  };

  return (
    <AppShell title="Tu Plan Secreto" onBack={() => onNavigate(Screen.INICIO, 'push_back')} rightText="⋮">
      <ScrollView contentContainerStyle={styles.contentWithNav}>
        <ImageBackground
          source={{
            uri:
              experience?.destinationImage ??
              'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800',
          }}
          style={styles.feedbackHero}
          imageStyle={styles.heroImage}
        >
          <View style={styles.imageOverlay} />
          <Text style={styles.planTag}>Completado</Text>
          <Text style={styles.featuredTitle}>{experience?.destinationTitle ?? 'Cata de Vinos en Cava Secreta'}</Text>
        </ImageBackground>

        <Text style={styles.title}>¿Qué te pareció tu aventura?</Text>
        <Text style={styles.subtitle}>Tu feedback ayuda a que la comunidad de PlanGo siga creciendo.</Text>

        <SectionTitle title="Puntuación general" />
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((value) => (
            <Pressable key={value} onPress={() => setRating(value)}>
              <Text style={[styles.star, value <= rating && styles.starActive]}>★</Text>
            </Pressable>
          ))}
        </View>

        <SectionTitle title="¿Cómo calificarías el ambiente?" />
        <View style={styles.chipWrap}>
          {['Acogedor', 'Ruidoso', 'Sofisticado', 'Casual'].map((item) => (
            <Chip key={item} label={item} selected={ambient === item} onPress={() => setAmbient(item)} />
          ))}
        </View>

        <SectionTitle title="¿Coincidió con tus gustos?" />
        <View style={styles.chipWrap}>
          {['Match total', 'Me sorprendió', 'No era lo mío'].map((item) => (
            <Chip key={item} label={item} selected={match === item} onPress={() => setMatch(item)} />
          ))}
        </View>

        <SectionTitle title="Puntos fuertes" />
        <View style={styles.chipWrap}>
          {['Atención', 'Calidad/Precio', 'Ubicación', 'Originalidad'].map((item) => (
            <Chip key={item} label={item} selected={strengths.includes(item)} onPress={() => toggleStrength(item)} />
          ))}
        </View>

        <TextInput
          placeholder="¿Qué cambiarías para que sea perfecta?"
          value={improvement}
          onChangeText={setImprovement}
          multiline
          style={[styles.input, styles.textArea]}
        />
        <TextInput placeholder="Tip directo para el anfitrión" value={tip} onChangeText={setTip} style={styles.input} />
        <PrimaryButton onPress={() => onNavigate(Screen.INICIO, 'none')}>Enviar Feedback</PrimaryButton>
      </ScrollView>
    </AppShell>
  );
}
