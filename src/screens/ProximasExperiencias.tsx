import React from 'react';
import { ImageBackground, Pressable, ScrollView, Text, View } from 'react-native';
import AppShell from '../components/AppShell';
import Card from '../components/Card';
import { ExperiencesScreenProps } from '../navigation';
import { styles } from '../theme/styles';
import { Screen, UserExperienceStatus } from '../types';

const statusLabels: Record<UserExperienceStatus, string> = {
  upcoming: 'Próxima',
  revealed: 'Revelada',
  feedback: 'Feedback',
  finished: 'Finalizada',
};

export default function ProximasExperiencias({ onNavigate, experiences, onSelectExperience }: ExperiencesScreenProps) {
  return (
    <AppShell
      onBack={() => onNavigate(Screen.INICIO, 'push_back')}
      rightText="👤"
      onRightPress={() => onNavigate(Screen.PERFIL, 'push')}
      withBottomNav
      activeTab="alerts"
      onNavigate={onNavigate}
    >
      <ScrollView contentContainerStyle={styles.contentWithNav}>
        <Text style={styles.title}>Mis experiencias</Text>
        <Text style={styles.subtitle}>Tocá una actividad para ver qué corresponde hacer ahora.</Text>

        {experiences.map((experience) => (
          <Pressable
            key={experience.id}
            disabled={experience.status === 'finished'}
            onPress={() => onSelectExperience(experience)}
          >
            <Card>
              <ImageBackground source={{ uri: experience.image }} style={styles.countdownHero} imageStyle={styles.heroImage}>
                <View style={styles.imageOverlay} />
                <Text style={styles.planTag}>{statusLabels[experience.status]}</Text>
                <Text style={styles.featuredTitle}>{experience.title}</Text>
                <Text style={styles.whiteMeta}>{experience.location}</Text>
              </ImageBackground>

              <View style={styles.rowBetween}>
                <Text style={styles.cardText}>{experience.date}</Text>
                <Text style={styles.link}>{experience.revealLabel}</Text>
              </View>
              <Text style={styles.cardText}>{experience.description}</Text>
              {experience.status === 'finished' ? (
                <Text style={styles.successText}>Feedback enviado. Esta experiencia ya quedó finalizada.</Text>
              ) : null}
            </Card>
          </Pressable>
        ))}
      </ScrollView>
    </AppShell>
  );
}
