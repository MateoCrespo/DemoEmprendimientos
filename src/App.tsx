import React, { useState } from 'react';
import { CartState, Navigate, NavigationOptions, UserProfile } from './navigation';
import { createPurchasedExperience, initialUserExperiences } from './data/userExperiences';
import ConfigurarExperiencia from './screens/ConfigurarExperiencia';
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
import { Screen, UserExperience } from './types';

const createEmptyCart = (): CartState => ({
  ticketCount: 1,
  promoCode: '',
  appliedPromoCode: '',
  paymentMethod: 'efectivo',
  cardNumber: '',
  cardExpiration: '',
  cardSecurityCode: '',
});

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.CREAR_CUENTA);
  const [selectedActivityType, setSelectedActivityType] = useState<string | undefined>();
  const [selectedLocation, setSelectedLocation] = useState<string | undefined>();
  const [selectedExperienceTitle, setSelectedExperienceTitle] = useState<string | undefined>();
  const [selectedExperienceDescription, setSelectedExperienceDescription] = useState<string | undefined>();
  const [selectedExperienceImage, setSelectedExperienceImage] = useState<string | undefined>();
  const [purchase, setPurchase] = useState<NavigationOptions | undefined>();
  const [cart, setCart] = useState<CartState>(createEmptyCart);
  const [userExperiences, setUserExperiences] = useState<UserExperience[]>(initialUserExperiences);
  const [selectedUserExperience, setSelectedUserExperience] = useState<UserExperience | undefined>();
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
    if (screen === Screen.CONFIGURAR) {
      setSelectedActivityType(options?.activityType);
      setSelectedLocation(options?.location);
      setSelectedExperienceTitle(options?.experienceTitle);
      setSelectedExperienceDescription(options?.experienceDescription);
      setSelectedExperienceImage(options?.experienceImage);
    }

    if (screen === Screen.PAGO && options) {
      setPurchase(options);
      setCart((currentCart) => ({ ...currentCart, ticketPrice: undefined }));
    }

    if (screen === Screen.CONFIRMACION) {
      if (purchase) {
        const newExperience = createPurchasedExperience(purchase);
        setUserExperiences((currentExperiences) => [newExperience, ...currentExperiences]);
        setSelectedUserExperience(newExperience);
      }

      setPurchase(undefined);
      setCart(createEmptyCart());
    }

    setCurrentScreen(screen);
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

    setCurrentScreen(Screen.ENCUESTA);
  };

  switch (currentScreen) {
    case Screen.PREFERENCIAS:
      return <TusPreferencias onNavigate={navigate} profile={profile} onProfileChange={setProfile} />;
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
      return <PantallaPago onNavigate={navigate} purchase={purchase} cart={cart} onCartChange={setCart} />;
    case Screen.CONFIRMACION:
      return <ConfirmacionReserva onNavigate={navigate} />;
    case Screen.AVENTURA_DISCOVERY:
      return <ProximasExperiencias onNavigate={navigate} experiences={userExperiences} onSelectExperience={openUserExperience} />;
    case Screen.PROXIMA_DETALLE:
      return <TuProximaAventura onNavigate={navigate} experience={selectedUserExperience} />;
    case Screen.REVELACION:
      return <RevelacionExperiencia onNavigate={navigate} experience={selectedUserExperience} />;
    case Screen.ENCUESTA:
      return <EncuestaCalidad onNavigate={navigate} experience={selectedUserExperience} />;
    case Screen.REGALAR:
      return <RegalarExperiencia onNavigate={navigate} />;
    case Screen.PERFIL:
      return <PerfilOpciones onNavigate={navigate} />;
    case Screen.EDITAR_PERFIL:
      return <PerfilUsuario onNavigate={navigate} profile={profile} onProfileChange={setProfile} />;
    case Screen.CREAR_CUENTA:
    default:
      return <CrearCuenta onNavigate={navigate} />;
  }
}
