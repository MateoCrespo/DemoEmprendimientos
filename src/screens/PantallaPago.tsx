import React, { useEffect, useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import AppShell from '../components/AppShell';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { CartState, PaymentScreenProps } from '../navigation';
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

export default function PantallaPago({ onNavigate, purchase, cart, onCartChange }: PaymentScreenProps) {
  const [paymentError, setPaymentError] = useState('');
  const hasPurchase = Boolean(purchase);
  const updateCart = (nextCart: Partial<CartState>) => {
    onCartChange({ ...cart, ...nextCart });
  };
  const isGift = purchase?.itemType === 'gift';

  const generatedTicketPrice = useMemo(() => {
    if (purchase?.giftPriceValue) {
      return purchase.giftPriceValue;
    }

    const minPrice = purchase?.budgetFrom ?? 10000;
    const maxPrice = purchase?.budgetTo ?? 50000;
    const roundStep = 1100;
    const randomPrice = minPrice + Math.random() * (maxPrice - minPrice);
    const roundedPrice = Math.round(randomPrice / roundStep) * roundStep;

    return Math.min(Math.max(roundedPrice, minPrice), maxPrice);
  }, [purchase?.budgetFrom, purchase?.budgetTo, purchase?.giftPriceValue]);

  useEffect(() => {
    if (!hasPurchase) {
      return;
    }

    if (!cart.ticketPrice) {
      updateCart({ ticketPrice: generatedTicketPrice });
    }
  }, [cart.ticketPrice, generatedTicketPrice, hasPurchase]);

  const ticketPrice = cart.ticketPrice ?? generatedTicketPrice;

  const subtotal = cart.ticketCount * ticketPrice;
  const normalizedPromoCode = cart.promoCode.trim().toUpperCase();
  const appliedPromoCodeIsValid = cart.appliedPromoCode === 'MIPRIMERACOMPRA';
  const discount = appliedPromoCodeIsValid ? Math.round(subtotal * 0.15) : 0;
  const total = Math.max(0, subtotal - discount);
  const experienceTitle = purchase?.experienceTitle ?? 'Entrada sorpresa';
  const experienceDescription = purchase?.experienceDescription ?? purchase?.activityType ?? 'Experiencia sorpresa';
  const experienceLocation = purchase?.location || 'Sin seleccionar';
  const activityType = purchase?.activityType || 'Sorpresa';
  const timeRange = purchase?.timeFrom || purchase?.timeTo
    ? `${purchase?.timeFrom || 'Sin inicio'} a ${purchase?.timeTo || 'Sin fin'}`
    : 'Sin seleccionar';
  const experienceImage =
    purchase?.experienceImage ??
    'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400';

  const decreaseTickets = () => {
    updateCart({ ticketCount: Math.max(1, cart.ticketCount - 1) });
  };

  const increaseTickets = () => {
    updateCart({ ticketCount: Math.min(10, cart.ticketCount + 1) });
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  };

  const formatCardExpiration = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);

    if (digits.length <= 2) {
      return digits;
    }

    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  const applyPromoCode = () => {
    setPaymentError('');

    if (!normalizedPromoCode) {
      updateCart({ appliedPromoCode: '' });
      return;
    }

    if (normalizedPromoCode !== 'MIPRIMERACOMPRA') {
      updateCart({ appliedPromoCode: '' });
      setPaymentError('El código promocional ingresado no existe.');
      return;
    }

    updateCart({ promoCode: normalizedPromoCode, appliedPromoCode: normalizedPromoCode });
  };

  const handleBuy = () => {
    const hasInvalidPromo = normalizedPromoCode && normalizedPromoCode !== cart.appliedPromoCode;

    if (hasInvalidPromo) {
      setPaymentError('Aplicá el código promocional antes de continuar.');
      return;
    }

    if (cart.paymentMethod === 'tarjeta') {
      const cardHasEmptyFields = !cart.cardNumber || !cart.cardExpiration || !cart.cardSecurityCode;
      const cardIsValid =
        cart.cardNumber === '1111111111111111' &&
        cart.cardExpiration === '11/30' &&
        cart.cardSecurityCode === '111';

      if (cardHasEmptyFields) {
        setPaymentError('No se ingresó ninguna tarjeta completa.');
        return;
      }

      if (!cardIsValid) {
        setPaymentError('No existe esa tarjeta.');
        return;
      }
    }

    setPaymentError('');
    onNavigate(Screen.CONFIRMACION, 'push');
  };

  if (!hasPurchase) {
    return (
      <AppShell
        title="Finalizar compra"
        onBack={() => onNavigate(Screen.INICIO, 'push_back')}
        rightText="Cerrar"
        onRightPress={() => onNavigate(Screen.INICIO, 'push_back')}
      >
        <ScrollView contentContainerStyle={styles.centerContent}>
          <Card>
            <Text style={styles.cardTitle}>Tu carrito está vacío</Text>
            <Text style={styles.cardText}>No se ha cargado ninguna experiencia todavía.</Text>
          </Card>

          <PrimaryButton onPress={() => onNavigate(Screen.CONFIGURAR, 'push')}>
            Ir a Mi próxima experiencia
          </PrimaryButton>
        </ScrollView>
      </AppShell>
    );
  }

  return (
    <AppShell
      title="Finalizar compra"
      onBack={() => onNavigate(Screen.CONFIGURAR, 'push_back')}
      rightText="Cerrar"
      onRightPress={() => onNavigate(Screen.INICIO, 'push_back')}
    >
      <ScrollView contentContainerStyle={styles.contentWithFooter}>
        <Text style={styles.kicker}>{isGift ? 'Resumen del Regalo' : 'Resumen del Plan'}</Text>
        <View style={styles.experienceRow}>
          <Image
            source={{ uri: experienceImage }}
            style={styles.paymentImage}
          />
          <View style={styles.flex}>
            <Text style={styles.titleSmall}>{experienceTitle}</Text>
            <Text style={styles.cardText}>{experienceDescription}</Text>
          </View>
        </View>

        <Card>
          <Text style={styles.cardTitle}>{isGift ? 'Detalle del regalo' : 'Detalle de la experiencia'}</Text>
          {isGift ? (
            <>
              <PaymentLine label="Pack" value={purchase?.giftPackTitle ?? 'Pack Premium'} />
              <PaymentLine label="Para" value={purchase?.giftRecipientName || 'Sin nombre'} />
              <PaymentLine label="Mail" value={purchase?.giftRecipientEmail || 'Sin mail'} />
              {purchase?.giftMessage ? <PaymentLine label="Mensaje" value={purchase.giftMessage} /> : null}
            </>
          ) : null}
          <PaymentLine label="Lugar" value={experienceLocation} />
          <PaymentLine label="Fecha" value={purchase?.date || 'Sin seleccionar'} />
          <PaymentLine label="Horario" value={timeRange} />
          <PaymentLine label="Tipo de actividad" value={activityType} />
        </Card>

        <Card>
          <Text style={styles.cardTitle}>Código promocional</Text>
          <TextInput
            value={cart.promoCode}
            onChangeText={(value) => {
              setPaymentError('');
              updateCart({ promoCode: value, appliedPromoCode: '' });
            }}
            autoCapitalize="characters"
            placeholder="Ingresá tu código"
            style={styles.inputInline}
          />
          <PrimaryButton variant="muted" onPress={applyPromoCode}>Aplicar</PrimaryButton>
          {appliedPromoCodeIsValid ? <Text style={styles.successText}>Código aplicado: 15% de descuento.</Text> : null}
        </Card>

        <Card>
          <Text style={styles.cardTitle}>Detalles del pago</Text>
          <View style={styles.ticketSelector}>
            <View>
              <Text style={styles.cardTitle}>{isGift ? 'Cantidad de regalos' : 'Cantidad de entradas'}</Text>
              <Text style={styles.meta}>{isGift ? 'Podés comprar hasta 10 regalos iguales' : 'Máximo 10 entradas por compra'}</Text>
            </View>
            <View style={styles.ticketStepper}>
              <Pressable onPress={decreaseTickets} style={styles.stepperButton}>
                <Text style={styles.stepperButtonText}>-</Text>
              </Pressable>
              <Text style={styles.ticketCount}>{cart.ticketCount}</Text>
              <Pressable onPress={increaseTickets} style={styles.stepperButton}>
                <Text style={styles.stepperButtonText}>+</Text>
              </Pressable>
            </View>
          </View>

          <PaymentLine label={isGift ? 'Precio del regalo' : 'Precio por entrada'} value={`$${ticketPrice.toLocaleString('es-AR')}`} />
          <PaymentLine
            label={isGift ? `${cart.ticketCount}x Regalo` : `${cart.ticketCount}x Entrada General`}
            value={`$${subtotal.toLocaleString('es-AR')}`}
          />
          {discount > 0 ? (
            <PaymentLine label="Descuento MIPRIMERACOMPRA (15%)" value={`-$${discount.toLocaleString('es-AR')}`} accent />
          ) : null}
          <View style={styles.divider} />
          <PaymentLine label="Total" value={`$${total.toLocaleString('es-AR')}`} strong />
        </Card>

        <Card>
          <Text style={styles.cardTitle}>Método de pago</Text>
          <View style={styles.paymentMethodRow}>
            <Pressable
              onPress={() => {
                setPaymentError('');
                updateCart({ paymentMethod: 'efectivo' });
              }}
              style={[styles.paymentMethodButton, cart.paymentMethod === 'efectivo' && styles.paymentMethodButtonActive]}
            >
              <Text style={[styles.paymentMethodText, cart.paymentMethod === 'efectivo' && styles.paymentMethodTextActive]}>
                Efectivo
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setPaymentError('');
                updateCart({ paymentMethod: 'tarjeta' });
              }}
              style={[styles.paymentMethodButton, cart.paymentMethod === 'tarjeta' && styles.paymentMethodButtonActive]}
            >
              <Text style={[styles.paymentMethodText, cart.paymentMethod === 'tarjeta' && styles.paymentMethodTextActive]}>
                Tarjeta
              </Text>
            </Pressable>
          </View>

          {cart.paymentMethod === 'tarjeta' ? (
            <View style={styles.innerGap}>
              <TextInput
                value={formatCardNumber(cart.cardNumber)}
                onChangeText={(value) => {
                  setPaymentError('');
                  updateCart({ cardNumber: value.replace(/\D/g, '').slice(0, 16) });
                }}
                keyboardType="numeric"
                placeholder="Número de tarjeta"
                style={styles.inputInline}
              />
              <View style={styles.cardFieldsRow}>
                <TextInput
                  value={cart.cardExpiration}
                  onChangeText={(value) => {
                    setPaymentError('');
                    updateCart({ cardExpiration: formatCardExpiration(value) });
                  }}
                  keyboardType="numeric"
                  placeholder="Vence MM/AA"
                  style={[styles.inputInline, styles.cardExpirationInput]}
                />
                <TextInput
                  value={cart.cardSecurityCode}
                  onChangeText={(value) => {
                    setPaymentError('');
                    updateCart({ cardSecurityCode: value.replace(/\D/g, '').slice(0, 3) });
                  }}
                  keyboardType="numeric"
                  placeholder="Código"
                  secureTextEntry
                  style={styles.cardSecurityInput}
                />
              </View>
            </View>
          ) : (
            <Text style={styles.meta}>Pagás en efectivo al momento de retirar o confirmar la experiencia.</Text>
          )}
        </Card>
        {paymentError ? <Text style={styles.errorText}>{paymentError}</Text> : null}
        <Text style={styles.legal}>Tus datos están protegidos. Al confirmar, aceptas términos y políticas.</Text>
      </ScrollView>

      <View style={styles.footerBar}>
        <PrimaryButton onPress={handleBuy}>Comprar entradas</PrimaryButton>
      </View>
    </AppShell>
  );
}
