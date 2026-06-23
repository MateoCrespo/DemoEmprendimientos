import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import AppShell from '../components/AppShell';
import Card from '../components/Card';
import Chip from '../components/Chip';
import PrimaryButton from '../components/PrimaryButton';
import SectionTitle from '../components/SectionTitle';
import { ScreenProps } from '../navigation';
import { Screen } from '../types';
import { styles } from '../theme/styles';

export default function ConfigurarExperiencia({ onNavigate }: ScreenProps) {
  const [budget, setBudget] = useState('15000');
  const [open, setOpen] = useState(false);
  const [types, setTypes] = useState<string[]>(['Gastronomía']);

  const toggleType = (item: string) => {
    setTypes(types.includes(item) ? types.filter((type) => type !== item) : [...types, item]);
  };

  return (
    <AppShell
      onBack={() => onNavigate(Screen.INICIO, 'push_back')}
      rightText="Log out"
      onRightPress={() => onNavigate(Screen.INICIO, 'push_back')}
      withBottomNav
      activeTab="discover"
      onNavigate={onNavigate}
    >
      <ScrollView contentContainerStyle={styles.contentWithNav}>
        <Text style={styles.title}>Mi próxima experiencia</Text>
        <Text style={styles.subtitle}>Personalizá tu aventura urbana en segundos.</Text>

        <SectionTitle title="Fecha" />
        <TextInput value="2026-06-26" editable={false} style={styles.input} />

        <SectionTitle title="Presupuesto" />
        <Card>
          <Text style={styles.cardText}>Rango sugerido</Text>
          <TextInput keyboardType="numeric" value={budget} onChangeText={setBudget} style={styles.inputInline} />
          <Text style={styles.meta}>Desde $5.000 hasta ${Number(budget || 0).toLocaleString('es-AR')}</Text>
        </Card>

        <Pressable onPress={() => setOpen(!open)}>
          <Card>
            <View style={styles.rowBetween}>
              <Text style={styles.cardTitle}>Preferencias adicionales</Text>
              <Text style={styles.link}>{open ? 'Cerrar' : 'Abrir'}</Text>
            </View>
            {open ? (
              <View style={styles.innerGap}>
                <View style={styles.chipWrap}>
                  {['Gastronomía', 'Aire Libre', 'Cultura'].map((item) => (
                    <Chip key={item} label={item} selected={types.includes(item)} onPress={() => toggleType(item)} />
                  ))}
                </View>
                <TextInput value="Palermo, CABA" editable={false} style={styles.inputInline} />
              </View>
            ) : null}
          </Card>
        </Pressable>

        <PrimaryButton variant="secondary" onPress={() => onNavigate(Screen.PAGO, 'push')}>
          Vivir experiencia
        </PrimaryButton>

        <Card>
          <Text style={styles.cardTitle}>Garantía de Satisfacción</Text>
          <Text style={styles.cardText}>Reembolso total o crédito si tu primera experiencia no cumple tus expectativas.</Text>
        </Card>
      </ScrollView>
    </AppShell>
  );
}
