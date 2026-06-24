import React, { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import AppShell from '../components/AppShell';
import Chip from '../components/Chip';
import PrimaryButton from '../components/PrimaryButton';
import SectionTitle from '../components/SectionTitle';
import { interestOptions, outgoingStyleOptions, placeOptions, restrictionOptions } from '../data/preferenceOptions';
import { ProfileAwareScreenProps } from '../navigation';
import { Screen } from '../types';
import { styles } from '../theme/styles';

export default function PerfilUsuario({ onNavigate, profile, onProfileChange }: ProfileAwareScreenProps) {
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age);
  const [interests, setInterests] = useState<string[]>(profile.preferences.interests);
  const [places, setPlaces] = useState<string[]>(profile.preferences.visitedPlaces);
  const [stylesOut, setStylesOut] = useState<string[]>(profile.preferences.outgoingStyle);
  const [restrictions, setRestrictions] = useState<string[]>(profile.preferences.restrictions);

  const profileInterestOptions = [...new Set([...interestOptions, ...interests])];
  const profilePlaceOptions = [...new Set([...placeOptions, ...places])];
  const profileOutgoingStyleOptions = [...new Set([...outgoingStyleOptions, ...stylesOut])];
  const profileRestrictionOptions = [...new Set([...restrictionOptions, ...restrictions])];

  const toggle = (value: string, list: string[], setList: (next: string[]) => void) => {
    setList(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
  };

  const saveProfile = () => {
    onProfileChange({
      name: name.trim() || 'Cliente 1',
      age,
      preferences: {
        interests,
        visitedPlaces: places,
        outgoingStyle: stylesOut,
        restrictions,
      },
    });
    onNavigate(Screen.PERFIL, 'push_back');
  };

  return (
    <AppShell title="Mi Perfil" onBack={() => onNavigate(Screen.PERFIL, 'push_back')}>
      <ScrollView contentContainerStyle={styles.contentWithFooter}>
        <Text style={styles.title}>Editar perfil</Text>
        <Text style={styles.subtitle}>Estos datos usan las mismas preferencias de la encuesta inicial.</Text>

        <SectionTitle title="Datos personales" />
        <TextInput value={name} onChangeText={setName} placeholder="Nombre" style={styles.input} />
        <TextInput
          value={age}
          onChangeText={(value) => setAge(value.replace(/\D/g, ''))}
          placeholder="Edad"
          keyboardType="numeric"
          style={styles.input}
        />

        <SectionTitle title="¿Qué te apasiona?" />
        <View style={styles.chipWrap}>
          {profileInterestOptions.map((item) => (
            <Chip key={item} label={item} selected={interests.includes(item)} onPress={() => toggle(item, interests, setInterests)} />
          ))}
        </View>

        <SectionTitle title="Barrios visitados" />
        <View style={styles.chipWrap}>
          {profilePlaceOptions.map((item) => (
            <Chip key={item} label={item} selected={places.includes(item)} onPress={() => toggle(item, places, setPlaces)} />
          ))}
        </View>

        <SectionTitle title="Estilo de salida" />
        <View style={styles.chipWrap}>
          {profileOutgoingStyleOptions.map((item) => (
            <Chip key={item} label={item} selected={stylesOut.includes(item)} onPress={() => toggle(item, stylesOut, setStylesOut)} />
          ))}
        </View>

        <SectionTitle title="Restricciones o preferencias" />
        <View style={styles.chipWrap}>
          {profileRestrictionOptions.map((item) => (
            <Chip key={item} label={item} selected={restrictions.includes(item)} onPress={() => toggle(item, restrictions, setRestrictions)} />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footerBar}>
        <PrimaryButton onPress={saveProfile}>Guardar perfil</PrimaryButton>
      </View>
    </AppShell>
  );
}
