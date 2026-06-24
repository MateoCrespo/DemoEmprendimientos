import React, { useEffect, useRef, useState } from 'react';
import { Image, ImageBackground, NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, Text, View } from 'react-native';
import AppShell from '../components/AppShell';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { featuredPlans, newExperiences } from '../data/experiences';
import { ScreenProps } from '../navigation';
import { Screen } from '../types';
import { styles } from '../theme/styles';

export default function Inicio({ onNavigate }: ScreenProps) {
  const carouselRef = useRef<ScrollView>(null);
  const [activePlanIndex, setActivePlanIndex] = useState(0);
  const cardWidth = 304;

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePlanIndex((currentIndex) => {
        const nextIndex = currentIndex === featuredPlans.length - 1 ? 0 : currentIndex + 1;
        carouselRef.current?.scrollTo({ x: nextIndex * cardWidth, animated: true });
        return nextIndex;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const handleCarouselScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / cardWidth);
    setActivePlanIndex(nextIndex);
  };

  return (
    <AppShell
      title="PlanGo"
      rightText="👤"
      onRightPress={() => onNavigate(Screen.PERFIL, 'push')}
      withBottomNav
      activeTab="home"
      onNavigate={onNavigate}
    >
      <ScrollView contentContainerStyle={styles.contentWithNav}>
        <Text style={styles.titleSmall}>Para vos esta semana</Text>
        <Text style={styles.subtitle}>Curaduría exclusiva basada en tus gustos</Text>

        <ScrollView
          ref={carouselRef}
          horizontal
          pagingEnabled
          snapToInterval={cardWidth}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselList}
          onMomentumScrollEnd={handleCarouselScrollEnd}
        >
          {featuredPlans.map((plan) => (
            <Pressable
              key={plan.id}
              onPress={() =>
                onNavigate(Screen.CONFIGURAR, 'slide_up', {
                  activityType: plan.activityType,
                  location: plan.location,
                  experienceTitle: plan.title,
                  experienceDescription: plan.tag,
                  experienceImage: plan.image,
                })
              }
              style={styles.featuredCard}
            >
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

        <View style={styles.carouselDots}>
          {featuredPlans.map((plan, index) => (
            <View
              key={plan.id}
              style={[styles.carouselDot, activePlanIndex === index && styles.carouselDotActive]}
            />
          ))}
        </View>

        <View style={styles.rowBetween}>
          <Text style={styles.titleSmall}>Nuevas experiencias</Text>
        </View>

        {newExperiences.map((item) => (
          <Pressable
            key={item.id}
            onPress={() =>
              onNavigate(Screen.CONFIGURAR, 'push', {
                activityType: item.activityType,
                location: item.location,
                experienceTitle: item.title,
                experienceDescription: item.description,
                experienceImage: item.image,
              })
            }
          >
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
        <PrimaryButton onPress={() => onNavigate(Screen.CONFIGURAR, 'slide_up')}>Sorprendeme</PrimaryButton>
      </View>
    </AppShell>
  );
}
