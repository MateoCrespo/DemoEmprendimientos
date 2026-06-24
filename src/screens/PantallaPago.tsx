import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import AppShell from '../components/AppShell';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { CartItem, CartState, PaymentScreenProps } from '../navigation';
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

function getTimeRange(item: CartItem) {
  const { purchase } = item;
  return purchase.timeFrom || purchase.timeTo
    ? `${purchase.timeFrom || 'Sin inicio'} a ${purchase.timeTo || 'Sin fin'}`
    : 'Sin seleccionar';
}

export default function PantallaPago({
  onNavigate,
  cart,
  onCartChange,
  onRemoveCartItems,
  onCompletePurchase,
}: PaymentScreenProps) {
  const [paymentError, setPaymentError] = useState('');
  const [selectedToRemove, setSelectedToRemove] = useState<string[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const updateCart = (nextCart: Partial<CartState>) => {
    onCartChange({ ...cart, ...nextCart });
  };

  const updateCartItem = (itemId: string, nextItem: Partial<CartItem>) => {
    updateCart({
      items: cart.items.map((item) => (item.id === itemId ? { ...item, ...nextItem } : item)),
    });
  };

  const toggleSelectedToRemove = (itemId: string) => {
    setSelectedToRemove((currentSelection) =>
      currentSelection.includes(itemId)
        ? currentSelection.filter((selectedId) => selectedId !== itemId)
        : [...currentSelection, itemId],
    );
  };

  const toggleExpandedItem = (itemId: string) => {
    setExpandedItems((currentItems) =>
      currentItems.includes(itemId)
        ? currentItems.filter((expandedItemId) => expandedItemId !== itemId)
        : [...currentItems, itemId],
    );
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

  const getSubtotal = (items: CartItem[]) => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const subtotal = getSubtotal(cart.items);
  const hasGiftItem = cart.items.some((item) => item.purchase.itemType === 'gift');
  const normalizedPromoCode = cart.promoCode.trim().toUpperCase();
  const appliedPromoCodeIsValid = cart.appliedPromoCode === 'MIPRIMERACOMPRA';
  const discount = appliedPromoCodeIsValid ? Math.round(subtotal * 0.15) : 0;
  const total = Math.max(0, subtotal - discount);

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

  const validatePayment = () => {
    const hasInvalidPromo = normalizedPromoCode && normalizedPromoCode !== cart.appliedPromoCode;

    if (hasInvalidPromo) {
      setPaymentError('Aplicá el código promocional antes de continuar.');
      return false;
    }

    if (hasGiftItem && cart.paymentMethod === 'efectivo') {
      setPaymentError('Los regalos solo se pueden pagar con tarjeta.');
      return false;
    }

    if (cart.paymentMethod === 'tarjeta') {
      const cardHasEmptyFields = !cart.cardNumber || !cart.cardExpiration || !cart.cardSecurityCode;
      const cardIsValid =
        cart.cardNumber === '1111111111111111' &&
        cart.cardExpiration === '11/30' &&
        cart.cardSecurityCode === '111';

      if (cardHasEmptyFields) {
        setPaymentError('No se ingresó ninguna tarjeta completa.');
        return false;
      }

      if (!cardIsValid) {
        setPaymentError('No existe esa tarjeta.');
        return false;
      }
    }

    setPaymentError('');
    return true;
  };

  const buyItems = (items: CartItem[]) => {
    if (!items.length || !validatePayment()) {
      return;
    }

    onCompletePurchase(items);
  };

  const removeSelectedItems = () => {
    onRemoveCartItems(selectedToRemove);
    setSelectedToRemove([]);
  };

  if (!cart.items.length) {
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
            <Text style={styles.cardText}>No se ha cargado ninguna experiencia ni regalo todavía.</Text>
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
      onBack={() => onNavigate(Screen.INICIO, 'push_back')}
      rightText="Cerrar"
      onRightPress={() => onNavigate(Screen.INICIO, 'push_back')}
    >
      <ScrollView contentContainerStyle={styles.contentWithFooter}>
        <Text style={styles.kicker}>Carrito</Text>
        <Text style={styles.titleSmall}>Tus compras cargadas</Text>

        {cart.items.map((item) => {
          const isGift = item.purchase.itemType === 'gift';
          const itemTitle = item.purchase.experienceTitle ?? (isGift ? 'Regalo sorpresa' : 'Entrada sorpresa');
          const itemDescription = item.purchase.experienceDescription ?? item.purchase.activityType ?? 'Experiencia sorpresa';
          const itemImage =
            item.purchase.experienceImage ??
            'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=400';
          const itemTotal = item.unitPrice * item.quantity;
          const isSelected = selectedToRemove.includes(item.id);
          const isExpanded = expandedItems.includes(item.id);

          return (
            <Card key={item.id}>
              <View style={styles.experienceRow}>
                <Image source={{ uri: itemImage }} style={styles.paymentImage} />
                <View style={styles.flex}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.cardTitle}>{itemTitle}</Text>
                    <Pressable onPress={() => toggleSelectedToRemove(item.id)} style={styles.removeSelector}>
                      <Text style={styles.removeSelectorText}>{isSelected ? '✓' : ''}</Text>
                    </Pressable>
                  </View>
                  <Text style={styles.cardText}>{itemDescription}</Text>
                  <Text style={styles.meta}>{isGift ? 'Regalo' : 'Experiencia sorpresa'}</Text>
                </View>
              </View>

              <PaymentLine label="Subtotal" value={`$${itemTotal.toLocaleString('es-AR')}`} strong />
              <PrimaryButton variant="muted" onPress={() => toggleExpandedItem(item.id)}>
                {isExpanded ? 'Ocultar detalle' : 'Ver detalle'}
              </PrimaryButton>

              {isExpanded && isGift ? (
                <>
                  <PaymentLine label="Pack" value={item.purchase.giftPackTitle ?? 'Pack Premium'} />
                  <PaymentLine label="Para" value={item.purchase.giftRecipientName || 'Sin nombre'} />
                  <PaymentLine label="Mail" value={item.purchase.giftRecipientEmail || 'Sin mail'} />
                </>
              ) : null}
              {isExpanded ? (
                <>
                  <PaymentLine label="Lugar" value={item.purchase.location || 'Sin seleccionar'} />
                  <PaymentLine label="Fecha" value={item.purchase.date || 'Sin seleccionar'} />
                  <PaymentLine label="Horario" value={getTimeRange(item)} />
                  <PaymentLine label="Tipo de actividad" value={item.purchase.activityType || 'Sorpresa'} />
                </>
              ) : null}

              <View style={styles.ticketSelector}>
                <View>
                  <Text style={styles.cardTitle}>{isGift ? 'Cantidad de regalos' : 'Cantidad de entradas'}</Text>
                  <Text style={styles.meta}>Precio unitario ${item.unitPrice.toLocaleString('es-AR')}</Text>
                </View>
                <View style={styles.ticketStepper}>
                  <Pressable
                    onPress={() => updateCartItem(item.id, { quantity: Math.max(1, item.quantity - 1) })}
                    style={styles.stepperButton}
                  >
                    <Text style={styles.stepperButtonText}>-</Text>
                  </Pressable>
                  <Text style={styles.ticketCount}>{item.quantity}</Text>
                  <Pressable
                    onPress={() => updateCartItem(item.id, { quantity: Math.min(10, item.quantity + 1) })}
                    style={styles.stepperButton}
                  >
                    <Text style={styles.stepperButtonText}>+</Text>
                  </Pressable>
                </View>
              </View>
            </Card>
          );
        })}

        {selectedToRemove.length ? (
          <PrimaryButton variant="danger" onPress={removeSelectedItems}>
            Eliminar del carrito
          </PrimaryButton>
        ) : null}

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
          <PaymentLine label="Subtotal" value={`$${subtotal.toLocaleString('es-AR')}`} />
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
                if (hasGiftItem) {
                  setPaymentError('Los regalos solo se pueden pagar con tarjeta.');
                  return;
                }

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
          {hasGiftItem ? <Text style={styles.errorText}>El carrito tiene regalos: el pago debe ser con tarjeta.</Text> : null}

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
            <Text style={styles.meta}>Pagás en efectivo al momento de realizar la experiencia.</Text>
          )}
        </Card>
        {paymentError ? <Text style={styles.errorText}>{paymentError}</Text> : null}
        <Text style={styles.legal}>Tus datos están protegidos. Al confirmar, aceptas términos y políticas.</Text>
      </ScrollView>

      <View style={styles.footerBar}>
        <PrimaryButton onPress={() => buyItems(cart.items)}>Comprar todo</PrimaryButton>
      </View>
    </AppShell>
  );
}
