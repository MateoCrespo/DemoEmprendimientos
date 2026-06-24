import React, { useState } from 'react';
import { ImageBackground, Pressable, ScrollView, Text, View } from 'react-native';
import AppShell from '../components/AppShell';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import SectionTitle from '../components/SectionTitle';
import { ScreenProps } from '../navigation';
import { Screen } from '../types';
import { styles } from '../theme/styles';

export default function RegalarExperiencia({ onNavigate }: ScreenProps) {
  const [pack, setPack] = useState('premium');
  const packs = [
    { id: 'explorador', title: 'Pack Explorador', price: '$15.000' },
    { id: 'premium', title: 'Pack Premium', price: '$35.000' },
    { id: 'vip', title: 'Pack VIP / Lujo', price: '$75.000' },
  ];
  const selectedPack = packs.find((item) => item.id === pack) ?? packs[1];

  return (
    <AppShell
      onBack={() => onNavigate(Screen.INICIO, 'push_back')}
      rightText="👤"
      onRightPress={() => onNavigate(Screen.PERFIL, 'push')}
      withBottomNav
      activeTab="profile"
      onNavigate={onNavigate}
    >
      <ScrollView contentContainerStyle={styles.contentWithNavAndFooter}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800' }}
          style={styles.giftHero}
          imageStyle={styles.heroImage}
        >
          <View style={styles.imageOverlay} />
          <Text style={styles.planTag}>Exclusivo</Text>
          <Text style={styles.featuredTitle}>Regala una Aventura Inolvidable</Text>
          <Text style={styles.whiteMeta}>Momentos curados por expertos.</Text>
        </ImageBackground>

        <SectionTitle title="¿Cómo funciona?" />
        {['1. Eliges el nivel', '2. Reciben la sorpresa', '3. ¡Viven el momento!'].map((item) => (
          <Card key={item}>
            <Text style={styles.cardTitle}>{item}</Text>
            <Text style={styles.cardText}>Simple, rápido y listo para regalar.</Text>
          </Card>
        ))}

        <SectionTitle title="Elige un Pack" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {packs.map((item) => (
            <Pressable key={item.id} onPress={() => setPack(item.id)} style={[styles.packCard, pack === item.id && styles.packCardActive]}>
              <Text style={[styles.packPrice, pack === item.id && styles.whiteText]}>{item.price}</Text>
              <Text style={[styles.cardTitle, pack === item.id && styles.whiteText]}>{item.title}</Text>
              <Text style={[styles.cardText, pack === item.id && styles.whiteSoft]}>Experiencias sorpresa para crear recuerdos.</Text>
              <Text style={[styles.selectText, pack === item.id && styles.whiteText]}>Seleccionar</Text>
            </Pressable>
          ))}
        </ScrollView>
      </ScrollView>

      <View style={[styles.footerBar, styles.footerBarWithNav]}>
        <PrimaryButton
          onPress={() =>
            onNavigate(Screen.CONFIGURAR_REGALO, 'push', {
              giftPackTitle: selectedPack.title,
              giftPrice: selectedPack.price,
            })
          }
        >
          Realizar regalo
        </PrimaryButton>
      </View>
    </AppShell>
  );
}
