import React from 'react';
import { Alert, ImageBackground, ScrollView, Text, View } from 'react-native';
import AppShell from '../components/AppShell';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { SelectedExperienceScreenProps } from '../navigation';
import { Screen } from '../types';
import { styles } from '../theme/styles';

export default function RevelacionExperiencia({ onNavigate, experience }: SelectedExperienceScreenProps) {
  const destinationTitle = experience?.destinationTitle ?? 'Cena Regional & Coctelería de Autor';
  const destinationImage =
    experience?.destinationImage ??
    'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800';
  const destinationLocation = experience?.destinationLocation ?? 'Güemes, Córdoba';
  const activityType = experience?.activityType ?? 'Plan Premium';

  return (
    <AppShell title="Tu Plan Secreto" onBack={() => onNavigate(Screen.AVENTURA_DISCOVERY, 'push_back')} rightText="⋮">
      <ScrollView contentContainerStyle={styles.contentWithFooter}>
        <Text style={styles.kickerCenter}>¡Sorpresa!</Text>
        <Text style={styles.titleCenter}>¡Tu destino ha sido revelado!</Text>

        <ImageBackground
          source={{ uri: destinationImage }}
          style={styles.revealHero}
          imageStyle={styles.heroImage}
        >
          <View style={styles.imageOverlay} />
          <Text style={styles.planTag}>{activityType}</Text>
          <Text style={styles.featuredTitle}>{destinationTitle}</Text>
          <Text style={styles.whiteMeta}>{destinationLocation}</Text>
        </ImageBackground>

        <View style={styles.twoColumns}>
          <Card>
            <Text style={styles.cardTitle}>Fecha</Text>
            <Text style={styles.cardText}>{experience?.date ?? 'Confirmada'}</Text>
          </Card>
          <Card>
            <Text style={styles.cardTitle}>Horario</Text>
            <Text style={styles.cardText}>{experience?.timeRange ?? 'Confirmado'}</Text>
          </Card>
        </View>

        <Card>
          <Text style={styles.titleSmall}>¿No es lo que buscabas?</Text>
          <Text style={styles.cardText}>Tenemos una segunda alternativa gratuita solo para ti.</Text>
          <PrimaryButton variant="muted" onPress={() => Alert.alert('Alternativa', 'Paseo cultural por Nueva Córdoba.')}>
            Ver alternativa sorpresa
          </PrimaryButton>
        </Card>
      </ScrollView>

      <View style={styles.footerBar}>
        <PrimaryButton onPress={() => onNavigate(Screen.ENCUESTA, 'push')}>¡Me encanta, vamos!</PrimaryButton>
      </View>
    </AppShell>
  );
}
