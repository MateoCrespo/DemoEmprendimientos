export enum Screen {
  CREAR_CUENTA = 'CREAR_CUENTA',
  PREFERENCIAS = 'PREFERENCIAS',
  INICIO = 'INICIO',
  CONFIGURAR = 'CONFIGURAR',
  PAGO = 'PAGO',
  CONFIRMACION = 'CONFIRMACION',
  AVENTURA_DISCOVERY = 'AVENTURA_DISCOVERY',
  PROXIMA_DETALLE = 'PROXIMA_DETALLE',
  REVELACION = 'REVELACION',
  ENCUESTA = 'ENCUESTA',
  REGALAR = 'REGALAR',
  PERFIL = 'PERFIL',
  EDITAR_PERFIL = 'EDITAR_PERFIL'
}

export type TransitionType = 'push' | 'push_back' | 'slide_up' | 'none';

export interface UserPreferences {
  interests: string[];
  visitedPlaces: string[];
  outgoingStyle: string[];
  restrictions: string[];
}

export interface ExperienceConfig {
  date: string;
  budget: number;
  experienceTypes: string[];
  location: string;
}

export interface FeedbackData {
  rating: number;
  atmosphere: string;
  match: string;
  strengths: string[];
  improvement: string;
  hostTip: string;
}

export interface GiftConfig {
  packType: 'explorador' | 'premium' | 'vip';
  recipientName: string;
  message: string;
}

export type UserExperienceStatus = 'upcoming' | 'revealed' | 'feedback';

export interface UserExperience {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  date: string;
  timeRange?: string;
  activityType: string;
  status: UserExperienceStatus;
  revealLabel: string;
  destinationTitle: string;
  destinationImage: string;
  destinationLocation: string;
  hints: string[];
  preparation: string[];
}
