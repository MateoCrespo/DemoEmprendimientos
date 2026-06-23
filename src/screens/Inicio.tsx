import React from 'react';
import { Image, ImageBackground, Pressable, ScrollView, Text, View } from 'react-native';
import AppShell from '../components/AppShell';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { featuredPlans, newExperiences } from '../data/experiences';
import { ScreenProps } from '../navigation';
import { Screen } from '../types';
import { styles } from '../theme/styles';

export default function Inicio({ onNavigate }: ScreenProps) {
  return (
    <AppShell title="PlanGo" withBottomNav activeTab="home" onNavigate={onNavigate}>
      <ScrollView contentContainerStyle={styles.contentWithNav}>
        <Text style={styles.titleSmall}>Para vos esta semana</Text>
        <Text style={styles.subtitle}>Curaduría exclusiva basada en tus gustos</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {featuredPlans.map((plan) => (
            <Pressable key={plan.id} onPress={() => onNavigate(Screen.CONFIGURAR, 'slide_up')} style={styles.featuredCard}>
              <ImageBackground source={{ uri: plan.image }} style={styles.featuredImage} imageStyle={styles.heroImage}>
                <View style={styles.imageOverlay} />
                <Text style={styles.planTag}>{plan.tag}</Text>
                <Text style={styles.featuredTitle}>{plan.title}</Text>
              </ImageBackground>
              <View style={styles.rowBetween}>
                <Text style={styles.meta}>Ubicación: {plan.location}</Text>
                <Text style={styles.price}>{plan.price}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.rowBetween}>
          <Text style={styles.titleSmall}>Nuevas experiencias</Text>
          <Pressable onPress={() => onNavigate(Screen.CONFIGURAR, 'push')}>
            <Text style={styles.link}>Ver todas</Text>
          </Pressable>
        </View>

        {newExperiences.map((item) => (
          <Pressable key={item.id} onPress={() => onNavigate(Screen.CONFIGURAR, 'push')}>
            <Card>
              <View style={styles.experienceRow}>
                <Image source={{ uri: item.image }} style={styles.thumb} />
                <View style={styles.flex}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardText}>{item.description}</Text>
                  <Text style={styles.rating}>★ {item.rating}</Text>
                </View>
              </View>
            </Card>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.floatingCta}>
        <PrimaryButton onPress={() => onNavigate(Screen.CONFIGURAR, 'slide_up')}>Sorprendeme esta noche</PrimaryButton>
      </View>
    </AppShell>
  );
}
