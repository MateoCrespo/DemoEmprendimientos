import React, { useRef, useState } from 'react';
import { GestureResponderEvent, LayoutChangeEvent, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import AppShell from '../components/AppShell';
import Card from '../components/Card';
import Chip from '../components/Chip';
import PrimaryButton from '../components/PrimaryButton';
import SectionTitle from '../components/SectionTitle';
import { ConfigScreenProps } from '../navigation';
import { Screen } from '../types';
import { styles } from '../theme/styles';

export default function ConfigurarExperiencia({
  onNavigate,
  selectedActivityType,
  selectedLocation,
  selectedExperienceTitle,
  selectedExperienceDescription,
  selectedExperienceImage,
}: ConfigScreenProps) {
  const [date, setDate] = useState('');
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [location, setLocation] = useState(selectedLocation ?? '');
  const [locationSearch, setLocationSearch] = useState(selectedLocation ?? '');
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [budgetFrom, setBudgetFrom] = useState('0');
  const [budgetTo, setBudgetTo] = useState('10000');
  const [trackWidth, setTrackWidth] = useState(1);
  const [open, setOpen] = useState(Boolean(selectedActivityType));
  const [types, setTypes] = useState<string[]>(selectedActivityType ? [selectedActivityType] : []);
  const activeBudgetThumb = useRef<'from' | 'to' | null>(null);

  const minBudget = 0;
  const maxBudget = 150000;
  const minBudgetRange = 10000;
  const budgetStep = 500;
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
  const locationOptions = [
    'Nueva Córdoba',
    'Güemes',
    'General Paz',
    'Cerro de las Rosas',
    'Alta Córdoba',
    'Centro',
    'Jardín',
    'Urca',
    'Villa Belgrano',
    'Alberdi',
    'Cofico',
    'Observatorio',
    'Parque Sarmiento',
    'Sierras Chicas',
  ];
  const activityTypeOptions = [
    'Gastronomía regional',
    'Aire libre',
    'Cultura local',
    'Música en vivo',
    'Teatro',
    'Cata de vinos',
    'Café de especialidad',
    'Ferias y diseño',
    'Deportes urbanos',
    'Relax y bienestar',
    'Historia cordobesa',
    'Vida nocturna',
    'Naturaleza',
    'Arte y talleres',
    'Plan familiar',
    'Plan romántico',
  ];

  const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
  const roundToStep = (value: number) => Math.round(value / budgetStep) * budgetStep;
  const parseBudget = (value: string, fallback: number) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };
  const formatBudgetInput = (value: string) => {
    if (!value) return '';
    return Number(value).toLocaleString('es-AR');
  };

  const budgetFromNumber = clamp(parseBudget(budgetFrom, minBudget), minBudget, maxBudget - minBudgetRange);
  const budgetToNumber = clamp(parseBudget(budgetTo, minBudget + minBudgetRange), budgetFromNumber + minBudgetRange, maxBudget);
  const fromPercent = ((budgetFromNumber - minBudget) / (maxBudget - minBudget)) * 100;
  const toPercent = ((budgetToNumber - minBudget) / (maxBudget - minBudget)) * 100;

  const setBudgetFromNumber = (value: number) => {
    const nextValue = clamp(roundToStep(value), minBudget, budgetToNumber - minBudgetRange);
    setBudgetFrom(String(nextValue));
  };

  const setBudgetToNumber = (value: number) => {
    const nextValue = clamp(roundToStep(value), budgetFromNumber + minBudgetRange, maxBudget);
    setBudgetTo(String(nextValue));
  };

  const normalizeBudgetInputs = () => {
    setBudgetFromNumber(budgetFromNumber);
    setBudgetToNumber(budgetToNumber);
  };

  const handleTrackLayout = (event: LayoutChangeEvent) => {
    setTrackWidth(event.nativeEvent.layout.width);
  };

  const updateBudgetFromTrack = (locationX: number) => {
    const safeX = clamp(locationX, 0, trackWidth);
    const nextValue = minBudget + (safeX / trackWidth) * (maxBudget - minBudget);

    if (activeBudgetThumb.current === 'from') {
      setBudgetFromNumber(nextValue);
    } else {
      setBudgetToNumber(nextValue);
    }
  };

  const handleTrackGrant = (event: GestureResponderEvent) => {
    const locationX = event.nativeEvent.locationX;
    const fromX = (fromPercent / 100) * trackWidth;
    const toX = (toPercent / 100) * trackWidth;

    activeBudgetThumb.current = Math.abs(locationX - fromX) <= Math.abs(locationX - toX) ? 'from' : 'to';
    updateBudgetFromTrack(locationX);
  };

  const toggleType = (item: string) => {
    setTypes(types.includes(item) ? types.filter((type) => type !== item) : [...types, item]);
  };

  const formatTypedDate = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 8);

    if (digits.length <= 2) {
      return digits;
    }

    if (digits.length <= 4) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }

    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  };

  const formatDate = (value: Date) => {
    const day = String(value.getDate()).padStart(2, '0');
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const year = value.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);

    if (digits.length <= 2) {
      return digits;
    }

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

  const filteredLocations = locationOptions.filter((place) =>
    place.toLowerCase().includes(locationSearch.trim().toLowerCase()),
  );
  const baseVisibleLocations = locationSearch.trim() ? filteredLocations : locationOptions.slice(0, 5);
  const visibleLocations = location
    ? [location, ...baseVisibleLocations.filter((place) => place !== location)]
    : baseVisibleLocations;
  const customLocation = locationSearch.trim();
  const selectedLocationIsCustom = location && !locationOptions.includes(location);

  return (
    <AppShell
      onBack={() => onNavigate(Screen.INICIO, 'push_back')}
      rightText="👤"
      onRightPress={() => onNavigate(Screen.PERFIL, 'push')}
      withBottomNav
      activeTab="discover"
      onNavigate={onNavigate}
    >
      <ScrollView contentContainerStyle={styles.contentWithNav}>
        <Text style={styles.title}>Mi próxima experiencia</Text>
        <Text style={styles.subtitle}>Personalizá tu aventura urbana en segundos.</Text>

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

        <SectionTitle title="Lugar" />
        <TextInput
          value={locationSearch}
          onChangeText={setLocationSearch}
          placeholder="Buscar barrio o localidad..."
          style={styles.input}
        />
        <View style={styles.chipWrap}>
          {visibleLocations.map((item) => (
            <Chip
              key={item}
              label={item}
              selected={location === item}
              onPress={() => {
                setLocation(item);
                setLocationSearch(item);
              }}
            />
          ))}
          {locationSearch.trim() && filteredLocations.length === 0 ? (
            <Chip
              label={`Seleccionar "${customLocation}"`}
              selected={location === customLocation}
              onPress={() => {
                setLocation(customLocation);
                setLocationSearch(customLocation);
              }}
            />
          ) : null}
          {selectedLocationIsCustom && !visibleLocations.includes(location) ? (
            <Chip label={location} selected onPress={() => setLocation(location)} />
          ) : null}
        </View>
        <Text style={styles.meta}>Lugar seleccionado: {location || 'Sin seleccionar'}</Text>

        <SectionTitle title="Presupuesto" />
        <Card>
          <Text style={styles.cardText}>Elegí un rango para la experiencia sorpresa.</Text>

          <View style={styles.budgetInputs}>
            <View style={styles.budgetInputGroup}>
              <Text style={styles.meta}>Desde</Text>
              <TextInput
                keyboardType="numeric"
                value={formatBudgetInput(budgetFrom)}
                onChangeText={(value) => setBudgetFrom(value.replace(/\D/g, ''))}
                onEndEditing={normalizeBudgetInputs}
                style={styles.inputInline}
              />
            </View>
            <View style={styles.budgetInputGroup}>
              <Text style={styles.meta}>Hasta</Text>
              <TextInput
                keyboardType="numeric"
                value={formatBudgetInput(budgetTo)}
                onChangeText={(value) => setBudgetTo(value.replace(/\D/g, ''))}
                onEndEditing={normalizeBudgetInputs}
                style={styles.inputInline}
              />
            </View>
          </View>

          <View
            style={styles.budgetSlider}
            onLayout={handleTrackLayout}
            onStartShouldSetResponder={() => true}
            onMoveShouldSetResponder={() => true}
            onResponderGrant={handleTrackGrant}
            onResponderMove={(event) => updateBudgetFromTrack(event.nativeEvent.locationX)}
            onResponderRelease={() => {
              activeBudgetThumb.current = null;
            }}
          >
            <View style={styles.budgetTrack} />
            <View
              style={[
                styles.budgetTrackActive,
                {
                  left: `${fromPercent}%`,
                  width: `${toPercent - fromPercent}%`,
                },
              ]}
            />
            <View style={[styles.budgetThumb, { left: `${fromPercent}%` }]} />
            <View style={[styles.budgetThumb, { left: `${toPercent}%` }]} />
          </View>

          <Text style={styles.meta}>
            Desde ${budgetFromNumber.toLocaleString('es-AR')} hasta ${budgetToNumber.toLocaleString('es-AR')}
          </Text>
          <Text style={styles.meta}>El rango mínimo entre ambos valores es de $10.000.</Text>
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
                  {activityTypeOptions.map((item) => (
                    <Chip key={item} label={item} selected={types.includes(item)} onPress={() => toggleType(item)} />
                  ))}
                </View>
              </View>
            ) : null}
          </Card>
        </Pressable>

        <PrimaryButton
          variant="secondary"
          onPress={() =>
            onNavigate(Screen.PAGO, 'push', {
              activityType: types[0],
              timeFrom,
              timeTo,
              location,
              experienceTitle: selectedExperienceTitle ?? 'Experiencia sorpresa',
              experienceDescription: selectedExperienceDescription ?? 'Plan curado según tus preferencias',
              experienceImage:
                selectedExperienceImage ??
                'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400',
              date,
              budgetFrom: budgetFromNumber,
              budgetTo: budgetToNumber,
            })
          }
        >
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
