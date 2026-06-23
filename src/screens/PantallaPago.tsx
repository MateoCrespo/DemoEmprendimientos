import React from 'react';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import AppShell from '../components/AppShell';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { ScreenProps } from '../navigation';
import { Screen } from '../types';
import { styles } from '../theme/styles';

function PaymentLine({ label, value, accent, strong }: { label: string; value: string; accent?: boolean; strong?: boolean }) {
  return (
    <View style={styles.rowBetween}>
      <Text style={[styles.paymentText, accent && styles.accentText, strong && styles.paymentStrong]}>{label}</Text>
      <Text style={[styles.paymentText, accent && styles.accentText, strong && styles.paymentStrong]}>{value}</Text>
    </View>
  );
}

export default function PantallaPago({ onNavigate }: ScreenProps) {
  return (
    <AppShell
      title="Finalizar compra"
      onBack={() => onNavigate(Screen.CONFIGURAR, 'push_back')}
      rightText="Cerrar"
      onRightPress={() => onNavigate(Screen.INICIO, 'push_back')}
    >
      <ScrollView contentContainerStyle={styles.contentWithFooter}>
        <Text style={styles.kicker}>Resumen del Plan</Text>
        <View style={styles.experienceRow}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400' }}
            style={styles.paymentImage}
          />
          <View style={styles.flex}>
            <Text style={styles.titleSmall}>Entrada sorpresa</Text>
            <Text style={styles.cardText}>Gastronomía & Coctelería</Text>
            <Text style={styles.meta}>Palermo / Centro</Text>
          </View>
        </View>

        <Card>
          <Text style={styles.cardTitle}>Detalles del pago</Text>
          <PaymentLine label="1x Entrada General" value="$15.000" />
          <PaymentLine label="Promo: MIPRIMERCOMPRA" value="-$500" accent />
          <View style={styles.divider} />
          <PaymentLine label="Total" value="$14.500" strong />
        </Card>

        <Card>
          <Text style={styles.cardTitle}>Método de pago</Text>
          <Text style={styles.cardText}>Visa terminada en 1234</Text>
          <Text style={styles.meta}>Vence 12/28</Text>
        </Card>

        <TextInput value="MIPRIMERCOMPRA" editable={false} style={styles.input} />
        <Text style={styles.legal}>Tus datos están protegidos. Al confirmar, aceptas términos y políticas.</Text>
      </ScrollView>

      <View style={styles.footerBar}>
        <PrimaryButton onPress={() => onNavigate(Screen.CONFIRMACION, 'push')}>Comprar entradas</PrimaryButton>
      </View>
    </AppShell>
  );
}
