import React, { useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { CartItem, CartState, ConfirmationInfo, Navigate, NavigationOptions, UserProfile } from './navigation';
import { createPurchasedExperience, initialUserExperiences } from './data/userExperiences';
import ConfigurarExperiencia from './screens/ConfigurarExperiencia';
import ConfigurarRegalo from './screens/ConfigurarRegalo';
import ConfirmacionReserva from './screens/ConfirmacionReserva';
import CrearCuenta from './screens/CrearCuenta';
import EncuestaCalidad from './screens/EncuestaCalidad';
import Inicio from './screens/Inicio';
import PantallaPago from './screens/PantallaPago';
import PerfilOpciones from './screens/PerfilOpciones';
import PerfilUsuario from './screens/PerfilUsuario';
import ProximasExperiencias from './screens/ProximasExperiencias';
import RegalarExperiencia from './screens/RegalarExperiencia';
import RevelacionExperiencia from './screens/RevelacionExperiencia';
import TuProximaAventura from './screens/TuProximaAventura';
import TusPreferencias from './screens/TusPreferencias';
import { colors } from './theme/colors';
import { Screen, UserExperience } from './types';

const textInputDefaults = TextInput as typeof TextInput & { defaultProps?: TextInputProps };
textInputDefaults.defaultProps = {
  ...textInputDefaults.defaultProps,
  placeholderTextColor: colors.muted,
};

const createEmptyCart = (): CartState => ({
  items: [],
  promoCode: '',
  appliedPromoCode: '',
  paymentMethod: 'efectivo',
  cardNumber: '',
  cardExpiration: '',
  cardSecurityCode: '',
});

const createCartItem = (purchase: NavigationOptions): CartItem => {
  const minPrice = purchase.budgetFrom ?? 10000;
  const maxPrice = purchase.budgetTo ?? 50000;
  const roundStep = 1100;
  const randomPrice = minPrice + Math.random() * (maxPrice - minPrice);
  const roundedPrice = Math.round(randomPrice / roundStep) * roundStep;
  const unitPrice = purchase.giftPriceValue ?? Math.min(Math.max(roundedPrice, minPrice), maxPrice);

  return {
    id: `cart-${Date.now()}-${Math.round(Math.random() * 10000)}`,
    purchase,
    quantity: 1,
    unitPrice,
  };
};

interface StoredUser {
  email: string;
  password: string;
  profile: UserProfile;
  hasPreferences: boolean;
  experiences: UserExperience[];
}

const demoUser: StoredUser = {
  email: 'cliente1@gmail.com',
  password: 'cliente123',
  profile: {
    name: 'Cliente 1',
    age: '28',
    preferences: {
      interests: ['Gastronomía', 'Música', 'Cultura local'],
      visitedPlaces: ['Güemes', 'Nueva Córdoba'],
      outgoingStyle: ['En pareja'],
      restrictions: ['Sin TACC'],
    },
  },
  hasPreferences: true,
  experiences: initialUserExperiences,
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.CREAR_CUENTA);
  const [selectedActivityType, setSelectedActivityType] = useState<string | undefined>();
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>();
  const [selectedExperienceTitle, setSelectedExperienceTitle] = useState<string | undefined>();
  const [selectedExperienceDescription, setSelectedExperienceDescription] = useState<string | undefined>();
  const [selectedExperienceImage, setSelectedExperienceImage] = useState<string | undefined>();
  const [selectedGiftPackTitle, setSelectedGiftPackTitle] = useState<string | undefined>();
  const [selectedGiftPrice, setSelectedGiftPrice] = useState<string | undefined>();
  const [confirmation, setConfirmation] = useState<ConfirmationInfo | undefined>();
  const [cart, setCart] = useState<CartState>(createEmptyCart);
  const [userExperiences, setUserExperiences] = useState<UserExperience[]>([]);
  const [selectedUserExperience, setSelectedUserExperience] = useState<UserExperience | undefined>();
  const [users, setUsers] = useState<Record<string, StoredUser>>({
    [demoUser.email]: demoUser,
  });
  const [currentUserEmail, setCurrentUserEmail] = useState<string | undefined>();
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Cliente 1',
    age: '',
    preferences: {
      interests: [],
      visitedPlaces: [],
      outgoingStyle: [],
      restrictions: [],
    },
  });

  const navigate: Navigate = (screen, _transition, options) => {
    if (screen === Screen.CREAR_CUENTA) {
      setCurrentUserEmail(undefined);
    }

    if (screen === Screen.CONFIGURAR) {
      setSelectedActivityType(options?.activityType);
      setSelectedLocation(options?.location);
      setSelectedExperienceTitle(options?.experienceTitle);
      setSelectedExperienceDescription(options?.experienceDescription);
      setSelectedExperienceImage(options?.experienceImage);
    }

    if (screen === Screen.CONFIGURAR_REGALO) {
      setSelectedGiftPackTitle(options?.giftPackTitle);
      setSelectedGiftPrice(options?.giftPrice);
    }

    if (screen === Screen.PAGO && options) {
      setCart((currentCart) => ({
        ...currentCart,
        items: [...currentCart.items, createCartItem(options)],
      }));
    }

    setCurrentScreen(screen);
  };

  const saveProfile = (nextProfile: UserProfile) => {
    setProfile(nextProfile);

    if (!currentUserEmail) {
      return;
    }

    setUsers((currentUsers) => ({
      ...currentUsers,
      [currentUserEmail]: {
        ...currentUsers[currentUserEmail],
        profile: nextProfile,
        hasPreferences: true,
        experiences: userExperiences,
      },
    }));
  };

  const saveUserExperiences = (nextExperiences: UserExperience[]) => {
    setUserExperiences(nextExperiences);

    if (!currentUserEmail) {
      return;
    }

    setUsers((currentUsers) => ({
      ...currentUsers,
      [currentUserEmail]: {
        ...currentUsers[currentUserEmail],
        experiences: nextExperiences,
      },
    }));
  };

  const loginUser = (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const user = users[normalizedEmail];

    if (!user) {
      return 'El usuario ingresado no existe.';
    }

    if (user.password !== password) {
      return 'La contraseña ingresada no es correcta.';
    }

    setCurrentUserEmail(normalizedEmail);
    setProfile(user.profile);
    setUserExperiences(user.experiences);
    setSelectedUserExperience(undefined);
    setCart(createEmptyCart());
    setCurrentScreen(user.hasPreferences ? Screen.INICIO : Screen.PREFERENCIAS);
    return undefined;
  };

  const registerUser = (name: string, age: string, email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!name.trim()) {
      return 'Ingresá tu nombre.';
    }

    if (!age.trim()) {
      return 'Ingresá tu edad.';
    }

    if (!normalizedEmail) {
      return 'Ingresá un mail.';
    }

    if (!password) {
      return 'Ingresá una contraseña.';
    }

    if (users[normalizedEmail]) {
      return 'Ese usuario ya existe.';
    }

    const newProfile: UserProfile = {
      name: name.trim(),
      age,
      preferences: {
        interests: [],
        visitedPlaces: [],
        outgoingStyle: [],
        restrictions: [],
      },
    };

    setUsers((currentUsers) => ({
      ...currentUsers,
      [normalizedEmail]: {
        email: normalizedEmail,
        password,
        profile: newProfile,
        hasPreferences: false,
        experiences: [],
      },
    }));
    setCurrentUserEmail(normalizedEmail);
    setProfile(newProfile);
    setUserExperiences([]);
    setSelectedUserExperience(undefined);
    setCart(createEmptyCart());
    setCurrentScreen(Screen.PREFERENCIAS);
    return undefined;
  };

  const openUserExperience = (experience: UserExperience) => {
    setSelectedUserExperience(experience);

    if (experience.status === 'upcoming') {
      setCurrentScreen(Screen.PROXIMA_DETALLE);
      return;
    }

    if (experience.status === 'revealed') {
      setCurrentScreen(Screen.REVELACION);
      return;
    }

    if (experience.status === 'finished') {
      setCurrentScreen(Screen.AVENTURA_DISCOVERY);
      return;
    }

    setCurrentScreen(Screen.ENCUESTA);
  };

  const finishExperienceFeedback = (experienceId: string) => {
    const nextExperiences: UserExperience[] = userExperiences.map((experience) =>
      experience.id === experienceId
        ? { ...experience, status: 'finished', revealLabel: 'Finalizada' }
        : experience,
    );
    saveUserExperiences(nextExperiences);
    setSelectedUserExperience((experience) =>
      experience?.id === experienceId
        ? { ...experience, status: 'finished', revealLabel: 'Finalizada' }
        : experience,
    );
    setCurrentScreen(Screen.AVENTURA_DISCOVERY);
  };

  const removeCartItems = (itemIds: string[]) => {
    setCart((currentCart) => ({
      ...currentCart,
      items: currentCart.items.filter((item) => !itemIds.includes(item.id)),
    }));
  };

  const completePurchase = (items: CartItem[]) => {
    const giftItems = items.filter((item) => item.purchase.itemType === 'gift');
    const experienceItems = items.filter((item) => item.purchase.itemType !== 'gift');

    if (experienceItems.length) {
      const newExperiences = experienceItems.map((item) => createPurchasedExperience(item.purchase));
      saveUserExperiences([...newExperiences, ...userExperiences]);
      setSelectedUserExperience(newExperiences[0]);
    }

    setConfirmation({
      itemType: giftItems.length && experienceItems.length ? 'mixed' : giftItems.length ? 'gift' : 'experience',
      giftRecipientName: giftItems.length === 1 ? giftItems[0].purchase.giftRecipientName : undefined,
      itemCount: items.length,
    });

    setCart((currentCart) => ({
      ...currentCart,
      items: currentCart.items.filter((item) => !items.some((purchasedItem) => purchasedItem.id === item.id)),
      promoCode: '',
      appliedPromoCode: '',
    }));
    setCurrentScreen(Screen.CONFIRMACION);
  };

  switch (currentScreen) {
    case Screen.PREFERENCIAS:
      return <TusPreferencias onNavigate={navigate} profile={profile} onProfileChange={saveProfile} />;
    case Screen.INICIO:
      return <Inicio onNavigate={navigate} />;
    case Screen.CONFIGURAR:
      return (
        <ConfigurarExperiencia
          onNavigate={navigate}
          selectedActivityType={selectedActivityType}
          selectedLocation={selectedLocation}
          selectedExperienceTitle={selectedExperienceTitle}
          selectedExperienceDescription={selectedExperienceDescription}
          selectedExperienceImage={selectedExperienceImage}
        />
      );
    case Screen.PAGO:
      return (
        <PantallaPago
          onNavigate={navigate}
          cart={cart}
          onCartChange={setCart}
          onRemoveCartItems={removeCartItems}
          onCompletePurchase={completePurchase}
        />
      );
    case Screen.CONFIRMACION:
      return <ConfirmacionReserva onNavigate={navigate} confirmation={confirmation} />;
    case Screen.AVENTURA_DISCOVERY:
      return <ProximasExperiencias onNavigate={navigate} experiences={userExperiences} onSelectExperience={openUserExperience} />;
    case Screen.PROXIMA_DETALLE:
      return <TuProximaAventura onNavigate={navigate} experience={selectedUserExperience} />;
    case Screen.REVELACION:
      return <RevelacionExperiencia onNavigate={navigate} experience={selectedUserExperience} />;
    case Screen.ENCUESTA:
      return (
        <EncuestaCalidad
          onNavigate={navigate}
          experience={selectedUserExperience}
          onFinishFeedback={finishExperienceFeedback}
        />
      );
    case Screen.REGALAR:
      return <RegalarExperiencia onNavigate={navigate} />;
    case Screen.CONFIGURAR_REGALO:
      return (
        <ConfigurarRegalo
          onNavigate={navigate}
          giftPackTitle={selectedGiftPackTitle}
          giftPrice={selectedGiftPrice}
        />
      );
    case Screen.PERFIL:
      return <PerfilOpciones onNavigate={navigate} />;
    case Screen.EDITAR_PERFIL:
      return <PerfilUsuario onNavigate={navigate} profile={profile} onProfileChange={saveProfile} />;
    case Screen.CREAR_CUENTA:
    default:
      return <CrearCuenta onNavigate={navigate} onLogin={loginUser} onRegister={registerUser} />;
  }
}
