import React from 'react';
import { Alert, ImageBackground, ScrollView, Text, View } from 'react-native';
import AppShell from '../components/AppShell';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { ScreenProps } from '../navigation';
import { Screen } from '../types';
import { styles } from '../theme/styles';

export default function RevelacionExperiencia({ onNavigate }: ScreenProps) {
  return (
    <AppShell title="Tu Plan Secreto" onBack={() => onNavigate(Screen.AVENTURA_DISCOVERY, 'push_back')} rightText="⋮">
      <ScrollView contentContainerStyle={styles.contentWithFooter}>
        <Text style={styles.kickerCenter}>¡Sorpresa!</Text>
        <Text style={styles.titleCenter}>¡Tu destino ha sido revelado!</Text>

        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800' }}
          style={styles.revealHero}
          imageStyle={styles.heroImage}
        >
          <View style={styles.imageOverlay} />
          <Text style={styles.planTag}>Plan Premium</Text>
          <Text style={styles.featuredTitle}>Cena & Coctelería de Autor</Text>
          <Text style={styles.whiteMeta}>San Telmo, Buenos Aires</Text>
        </ImageBackground>

        <View style={styles.twoColumns}>
          <Card>
            <Text style={styles.cardTitle}>Menú Exclusivo</Text>
            <Text style={styles.cardText}>3 pasos + maridaje</Text>
          </Card>
          <Card>
            <Text style={styles.cardTitle}>Welcome Drink</Text>
            <Text style={styles.cardText}>Gin Tonic de autor</Text>
          </Card>
        </View>

        <Card>
          <Text style={styles.titleSmall}>¿No es lo que buscabas?</Text>
          <Text style={styles.cardText}>Tenemos una segunda alternativa gratuita solo para ti.</Text>
          <PrimaryButton variant="muted" onPress={() => Alert.alert('Alternativa', 'Aventura urbana en las alturas.')}>
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
