import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import AppShell from '../components/AppShell';
import Chip from '../components/Chip';
import PrimaryButton from '../components/PrimaryButton';
import SectionTitle from '../components/SectionTitle';
import { interestOptions, outgoingStyleOptions, placeOptions, restrictionOptions } from '../data/preferenceOptions';
import { ProfileAwareScreenProps } from '../navigation';
import { Screen } from '../types';
import { styles } from '../theme/styles';

export default function TusPreferencias({ onNavigate, profile, onProfileChange }: ProfileAwareScreenProps) {
  const [interests, setInterests] = useState<string[]>(profile.preferences.interests);
  const [places, setPlaces] = useState<string[]>(profile.preferences.visitedPlaces);
  const [stylesOut, setStylesOut] = useState<string[]>(profile.preferences.outgoingStyle);
  const [restrictions, setRestrictions] = useState<string[]>(profile.preferences.restrictions);
  const [placeSearch, setPlaceSearch] = useState('');

  const filteredPlaces = placeOptions.filter((place) =>
    place.toLowerCase().includes(placeSearch.trim().toLowerCase()),
  );
  const visiblePlaces = placeSearch.trim() ? filteredPlaces : placeOptions.slice(0, 5);
  const customPlace = placeSearch.trim();

  const toggle = (value: string, list: string[], setList: (next: string[]) => void) => {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  };

  const savePreferences = () => {
    onProfileChange({
      ...profile,
      preferences: {
        interests,
        visitedPlaces: places,
        outgoingStyle: stylesOut,
        restrictions,
      },
    });
    onNavigate(Screen.INICIO, 'push');
  };

  return (
    <AppShell
      onBack={() => onNavigate(Screen.CREAR_CUENTA, 'push_back')}
      rightText="Omitir"
      onRightPress={() => onNavigate(Screen.INICIO, 'none')}
    >
      <ScrollView contentContainerStyle={[styles.contentWithFooter, { paddingBottom: 210 }]}>
        <View style={styles.progressRow}>
          <View style={[styles.progressBar, styles.progressBarActive]} />
          <View style={styles.progressBar} />
          <View style={styles.progressBar} />
        </View>

        <Text style={styles.title}>Personalicemos tu experiencia</Text>
        <Text style={styles.subtitle}>Queremos conocerte mejor para encontrar los mejores planes para vos.</Text>

        <SectionTitle title="¿Qué te apasiona?" />
        <View style={styles.chipGrid}>
          {interestOptions.map((item) => (
            <Chip key={item} label={item} selected={interests.includes(item)} onPress={() => toggle(item, interests, setInterests)} />
          ))}
        </View>

        <SectionTitle title="Lugares que ya visitaste" />
        <TextInput
          placeholder="Buscar barrios o hitos..."
          value={placeSearch}
          onChangeText={setPlaceSearch}
          style={styles.input}
        />
        <View style={styles.chipWrap}>
          {visiblePlaces.map((item) => (
            <Chip key={item} label={item} selected={places.includes(item)} onPress={() => toggle(item, places, setPlaces)} />
          ))}
          {placeSearch.trim() && filteredPlaces.length === 0 ? (
            <Chip
              label={`Seleccionar "${customPlace}"`}
              selected={places.includes(customPlace)}
              onPress={() => toggle(customPlace, places, setPlaces)}
            />
          ) : null}
        </View>

        <SectionTitle title="Estilo de salida" />
        {outgoingStyleOptions.map((item) => (
          <Pressable
            key={item}
            onPress={() => toggle(item, stylesOut, setStylesOut)}
            style={[styles.optionRow, stylesOut.includes(item) && styles.optionRowActive]}
          >
            <Text style={styles.optionText}>{item}</Text>
            <Text style={styles.radio}>{stylesOut.includes(item) ? '●' : '○'}</Text>
          </Pressable>
        ))}

        <SectionTitle title="Restricciones o preferencias" />
        <View style={styles.chipWrap}>
          {restrictionOptions.map((item) => (
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
        <PrimaryButton onPress={savePreferences}>Aceptar</PrimaryButton>
      </View>
    </AppShell>
  );
}
