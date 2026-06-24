import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import AppShell from '../components/AppShell';
import Card from '../components/Card';
import Chip from '../components/Chip';
import PrimaryButton from '../components/PrimaryButton';
import SectionTitle from '../components/SectionTitle';
import { GiftConfigScreenProps } from '../navigation';
import { styles } from '../theme/styles';
import { Screen } from '../types';

export default function ConfigurarRegalo({ onNavigate, giftPackTitle, giftPrice }: GiftConfigScreenProps) {
  const [date, setDate] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [location, setLocation] = useState('');
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [types, setTypes] = useState<string[]>([]);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');

  const monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const locationOptions = ['Nueva Córdoba', 'Güemes', 'General Paz', 'Cerro de las Rosas', 'Alta Córdoba', 'Centro'];
  const activityTypeOptions = [
    'Gastronomía regional',
    'Aire libre',
    'Cultura local',
    'Música en vivo',
    'Teatro',
    'Cata de vinos',
    'Relax y bienestar',
    'Plan romántico',
    'Plan familiar',
  ];

  const toggleType = (item: string) => {
    setTypes(types.includes(item) ? types.filter((type) => type !== item) : [...types, item]);
  };

  const formatTypedDate = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  };

  const formatDate = (value: Date) => {
    const day = String(value.getDate()).padStart(2, '0');
    const month = String(value.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}/${value.getFullYear()}`;
  };

  const formatTime = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}:${digits.slice(2)}`;
  };

  const getCalendarDays = () => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const emptyDays = (firstDay.getDay() + 6) % 7;

    return [
      ...Array.from({ length: emptyDays }, () => null),
      ...Array.from({ length: daysInMonth }, (_, index) => new Date(year, month, index + 1)),
    ];
  };

  const moveCalendarMonth = (amount: number) => {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + amount, 1));
  };

  const getPriceValue = (price: string) => Number(price.replace(/\D/g, ''));

  const confirmGift = () => {
    const packTitle = giftPackTitle ?? 'Pack Premium';
    const packPrice = giftPrice ?? '$35.000';

    onNavigate(Screen.PAGO, 'push', {
      itemType: 'gift',
      giftPackTitle: packTitle,
      giftPrice: packPrice,
      giftPriceValue: getPriceValue(packPrice),
      giftRecipientName: recipientName,
      giftRecipientEmail: recipientEmail,
      giftMessage: message,
      experienceTitle: `Regalo - ${packTitle}`,
      experienceDescription: message || 'Experiencia sorpresa para regalar.',
      activityType: types.length ? types.join(', ') : 'Regalo sorpresa',
      location,
      date,
      timeFrom,
      timeTo,
      experienceImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400',
    });
  };

  return (
    <AppShell
      title="Regalo"
      onBack={() => onNavigate(Screen.REGALAR, 'push_back')}
      rightText="👤"
      onRightPress={() => onNavigate(Screen.PERFIL, 'push')}
      withBottomNav
      activeTab="profile"
      onNavigate={onNavigate}
    >
      <ScrollView contentContainerStyle={styles.contentWithNavAndFooter}>
        <Text style={styles.title}>Preparar regalo</Text>
        <Card>
          <Text style={styles.cardTitle}>{giftPackTitle ?? 'Pack Premium'}</Text>
          <Text style={styles.price}>{giftPrice ?? '$35.000'}</Text>
          <Text style={styles.cardText}>Configurá la experiencia sorpresa para la persona que querés regalar.</Text>
        </Card>

        <SectionTitle title="Para quién es" />
        <TextInput value={recipientName} onChangeText={setRecipientName} placeholder="Nombre" style={styles.input} />
        <TextInput
          value={recipientEmail}
          onChangeText={setRecipientEmail}
          placeholder="Mail"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Mensaje"
          multiline
          style={[styles.input, styles.textAreaSmall]}
        />

        <SectionTitle title="Fecha" />
        <TextInput
          value={date}
          onChangeText={(value) => setDate(formatTypedDate(value))}
          keyboardType="numeric"
          placeholder="Escribí dd/mm/aaaa"
          style={styles.input}
        />
        <Pressable onPress={() => setCalendarOpen(!calendarOpen)}>
          <Text style={styles.linkCenter}>{calendarOpen ? 'Cerrar calendario' : 'Elegir en calendario'}</Text>
        </Pressable>
        {calendarOpen ? (
          <Card>
            <View style={styles.calendarHeader}>
              <Pressable onPress={() => moveCalendarMonth(-1)} style={styles.calendarArrow}>
                <Text style={styles.link}>‹</Text>
              </Pressable>
              <Text style={styles.cardTitle}>
                {monthNames[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
              </Text>
              <Pressable onPress={() => moveCalendarMonth(1)} style={styles.calendarArrow}>
                <Text style={styles.link}>›</Text>
              </Pressable>
            </View>

            <View style={styles.calendarGrid}>
              {weekDays.map((day, index) => (
                <Text key={`${day}-${index}`} style={styles.calendarWeekDay}>
                  {day}
                </Text>
              ))}
              {getCalendarDays().map((day, index) => {
                const formattedDay = day ? formatDate(day) : '';
                const isSelected = formattedDay === date;

                return (
                  <Pressable
                    key={`${formattedDay}-${index}`}
                    disabled={!day}
                    onPress={() => {
                      if (!day) return;
                      setDate(formatDate(day));
                      setCalendarOpen(false);
                    }}
                    style={[styles.calendarDay, isSelected && styles.calendarDaySelected]}
                  >
                    <Text style={[styles.calendarDayText, isSelected && styles.calendarDayTextSelected]}>
                      {day ? day.getDate() : ''}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </Card>
        ) : null}

        <SectionTitle title="Lugar" />
        <TextInput value={location} onChangeText={setLocation} placeholder="Barrio o localidad" style={styles.input} />
        <View style={styles.chipWrap}>
          {locationOptions.map((item) => (
            <Chip key={item} label={item} selected={location === item} onPress={() => setLocation(item)} />
          ))}
        </View>

        <SectionTitle title="Rango horario" />
        <View style={styles.budgetInputs}>
          <View style={styles.budgetInputGroup}>
            <Text style={styles.meta}>Desde</Text>
            <TextInput
              value={timeFrom}
              onChangeText={(value) => setTimeFrom(formatTime(value))}
              keyboardType="numeric"
              placeholder="hh:mm"
              style={styles.inputInline}
            />
          </View>
          <View style={styles.budgetInputGroup}>
            <Text style={styles.meta}>Hasta</Text>
            <TextInput
              value={timeTo}
              onChangeText={(value) => setTimeTo(formatTime(value))}
              keyboardType="numeric"
              placeholder="hh:mm"
              style={styles.inputInline}
            />
          </View>
        </View>

        <SectionTitle title="Preferencias adicionales" />
        <View style={styles.chipWrap}>
          {activityTypeOptions.map((item) => (
            <Chip key={item} label={item} selected={types.includes(item)} onPress={() => toggleType(item)} />
          ))}
        </View>

        <Card>
          <Text style={styles.cardTitle}>Resumen del regalo</Text>
          <Text style={styles.cardText}>Pack: {giftPackTitle ?? 'Pack Premium'}</Text>
          <Text style={styles.cardText}>Precio: {giftPrice ?? '$35.000'}</Text>
          <Text style={styles.cardText}>Para: {recipientName || 'Sin nombre'}</Text>
          <Text style={styles.cardText}>Mail: {recipientEmail || 'Sin mail'}</Text>
        </Card>
      </ScrollView>

      <View style={[styles.footerBar, styles.footerBarWithNav]}>
        <PrimaryButton onPress={confirmGift}>Comprar regalo</PrimaryButton>
      </View>
    </AppShell>
  );
}
