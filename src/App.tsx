import React, { useState } from 'react';
import { Navigate } from './navigation';
import ConfigurarExperiencia from './screens/ConfigurarExperiencia';
import ConfirmacionReserva from './screens/ConfirmacionReserva';
import CrearCuenta from './screens/CrearCuenta';
import EncuestaCalidad from './screens/EncuestaCalidad';
import Inicio from './screens/Inicio';
import PantallaPago from './screens/PantallaPago';
import RegalarExperiencia from './screens/RegalarExperiencia';
import RevelacionExperiencia from './screens/RevelacionExperiencia';
import TuProximaAventura from './screens/TuProximaAventura';
import TusPreferencias from './screens/TusPreferencias';
import { Screen } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.CREAR_CUENTA);

  const navigate: Navigate = (screen) => {
    setCurrentScreen(screen);
  };

  switch (currentScreen) {
    case Screen.PREFERENCIAS:
      return <TusPreferencias onNavigate={navigate} />;
    case Screen.INICIO:
      return <Inicio onNavigate={navigate} />;
    case Screen.CONFIGURAR:
      return <ConfigurarExperiencia onNavigate={navigate} />;
    case Screen.PAGO:
      return <PantallaPago onNavigate={navigate} />;
    case Screen.CONFIRMACION:
      return <ConfirmacionReserva onNavigate={navigate} />;
    case Screen.AVENTURA_DISCOVERY:
      return <TuProximaAventura onNavigate={navigate} />;
    case Screen.REVELACION:
      return <RevelacionExperiencia onNavigate={navigate} />;
    case Screen.ENCUESTA:
      return <EncuestaCalidad onNavigate={navigate} />;
    case Screen.REGALAR:
      return <RegalarExperiencia onNavigate={navigate} />;
    case Screen.CREAR_CUENTA:
    default:
      return <CrearCuenta onNavigate={navigate} />;
  }
}
