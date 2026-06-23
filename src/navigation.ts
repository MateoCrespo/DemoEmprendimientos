import { Screen, TransitionType } from './types';

export type Navigate = (screen: Screen, transition?: TransitionType) => void;

export type TabId = 'home' | 'discover' | 'cart' | 'alerts' | 'profile';

export interface ScreenProps {
  onNavigate: Navigate;
}
