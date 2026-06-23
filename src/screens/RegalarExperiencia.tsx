import React, { useState } from 'react';
import { Alert, ImageBackground, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import AppShell from '../components/AppShell';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import SectionTitle from '../components/SectionTitle';
import { ScreenProps } from '../navigation';
import { Screen } from '../types';
import { styles } from '../theme/styles';

export default function RegalarExperiencia({ onNavigate }: ScreenProps) {
  const [pack, setPack] = useState('premium');
  const [recipient, setRecipient] = useState('Sofía García');
  const [message, setMessage] = useState('Escribe algo que le saque una sonrisa...');

  return (
    <AppShell
      onBack={() => onNavigate(Screen.INICIO, 'push_back')}
      rightText="Log out"
      onRightPress={() => onNavigate(Screen.INICIO, 'push_back')}
      withBottomNav
      activeTab="profile"
      onNavigate={onNavigate}
    >
      <ScrollView contentContainerStyle={styles.contentWithNav}>
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
          {[
            { id: 'explorador', title: 'Pack Explorador', price: '$150' },
            { id: 'premium', title: 'Pack Premium', price: '$350' },
            { id: 'vip', title: 'Pack VIP / Lujo', price: '$750' },
          ].map((item) => (
            <Pressable key={item.id} onPress={() => setPack(item.id)} style={[styles.packCard, pack === item.id && styles.packCardActive]}>
              <Text style={[styles.packPrice, pack === item.id && styles.whiteText]}>{item.price}</Text>
              <Text style={[styles.cardTitle, pack === item.id && styles.whiteText]}>{item.title}</Text>
              <Text style={[styles.cardText, pack === item.id && styles.whiteSoft]}>Experiencias sorpresa para crear recuerdos.</Text>
              <Text style={[styles.selectText, pack === item.id && styles.whiteText]}>Seleccionar</Text>
            </Pressable>
          ))}
        </ScrollView>

        <SectionTitle title="Personalización" />
        <TextInput value={recipient} onChangeText={setRecipient} style={styles.input} />
        <TextInput value={message} onChangeText={setMessage} style={[styles.input, styles.textAreaSmall]} multiline />

        <Card dark>
          <Text style={styles.ticketTitle}>¡Sorpresa, {recipient}!</Text>
          <Text style={styles.whiteSoft}>Alguien quiere que vivas algo inolvidable.</Text>
          <View style={styles.ticketCode}>
            <Text style={styles.kickerCenter}>Código de Canje</Text>
            <Text style={styles.cardTitle}>PLAN-GO-8821</Text>
          </View>
        </Card>

        <PrimaryButton
          onPress={() => {
            Alert.alert('Regalo comprado', `¡Gracias por regalar una aventura PlanGo a ${recipient}!`);
            onNavigate(Screen.INICIO, 'push_back');
          }}
        >
          Comprar para regalar
        </PrimaryButton>
      </ScrollView>
    </AppShell>
  );
}
