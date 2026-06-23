import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import AppShell from '../components/AppShell';
import Chip from '../components/Chip';
import PrimaryButton from '../components/PrimaryButton';
import SectionTitle from '../components/SectionTitle';
import { ScreenProps } from '../navigation';
import { Screen } from '../types';
import { styles } from '../theme/styles';

export default function TusPreferencias({ onNavigate }: ScreenProps) {
  const [interests, setInterests] = useState<string[]>([]);
  const [places, setPlaces] = useState<string[]>([]);
  const [style, setStyle] = useState('');
  const [restrictions, setRestrictions] = useState<string[]>([]);

  const toggle = (value: string, list: string[], setList: (next: string[]) => void) => {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  };

  return (
    <AppShell
      onBack={() => onNavigate(Screen.CREAR_CUENTA, 'push_back')}
      rightText="Omitir"
      onRightPress={() => onNavigate(Screen.INICIO, 'none')}
    >
      <ScrollView contentContainerStyle={styles.contentWithFooter}>
        <View style={styles.progressRow}>
          <View style={[styles.progressBar, styles.progressBarActive]} />
          <View style={styles.progressBar} />
          <View style={styles.progressBar} />
        </View>

        <Text style={styles.title}>Personalicemos tu experiencia</Text>
        <Text style={styles.subtitle}>Queremos conocerte mejor para encontrar los mejores planes para vos.</Text>

        <SectionTitle title="¿Qué te apasiona?" />
        <View style={styles.chipGrid}>
          {['Gastronomía', 'Arte', 'Aventura', 'Música', 'Historia', 'Relax'].map((item) => (
            <Chip key={item} label={item} selected={interests.includes(item)} onPress={() => toggle(item, interests, setInterests)} />
          ))}
        </View>

        <SectionTitle title="Lugares que ya visitaste" />
        <TextInput placeholder="Buscar barrios o hitos..." style={styles.input} />
        <View style={styles.chipWrap}>
          {['Palermo Soho', 'San Telmo', 'Recoleta', 'Puerto Madero'].map((item) => (
            <Chip key={item} label={item} selected={places.includes(item)} onPress={() => toggle(item, places, setPlaces)} />
          ))}
        </View>

        <SectionTitle title="Estilo de salida" />
        {['En pareja', 'Con amigos', 'Solo/a', 'Familiar'].map((item) => (
          <Pressable key={item} onPress={() => setStyle(item)} style={[styles.optionRow, style === item && styles.optionRowActive]}>
            <Text style={styles.optionText}>{item}</Text>
            <Text style={styles.radio}>{style === item ? '●' : '○'}</Text>
          </Pressable>
        ))}

        <SectionTitle title="Restricciones o preferencias" />
        <View style={styles.chipWrap}>
          {['Vegetariano/Vegano', 'Sin TACC', 'Movilidad reducida', 'Pet friendly'].map((item) => (
            <Chip
              key={item}
              label={item}
              selected={restrictions.includes(item)}
              onPress={() => toggle(item, restrictions, setRestrictions)}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footerBar}>
        <PrimaryButton variant="muted" onPress={() => onNavigate(Screen.CREAR_CUENTA, 'push_back')}>
          Anterior
        </PrimaryButton>
        <PrimaryButton onPress={() => onNavigate(Screen.INICIO, 'push')}>Finalizar</PrimaryButton>
      </View>
    </AppShell>
  );
}
