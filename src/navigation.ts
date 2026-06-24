import { Screen, TransitionType, UserExperience, UserPreferences } from './types';

export interface NavigationOptions {
  itemType?: 'experience' | 'gift';
  activityType?: string;
  location?: string;
  experienceTitle?: string;
  experienceDescription?: string;
  experienceImage?: string;
  date?: string;
  timeFrom?: string;
  timeTo?: string;
  budgetFrom?: number;
  budgetTo?: number;
  giftPackTitle?: string;
  giftPrice?: string;
  giftPriceValue?: number;
  giftRecipientName?: string;
  giftRecipientEmail?: string;
  giftMessage?: string;
}

export interface CartState {
  ticketCount: number;
  promoCode: string;
  appliedPromoCode: string;
  paymentMethod: 'efectivo' | 'tarjeta';
  cardNumber: string;
  cardExpiration: string;
  cardSecurityCode: string;
  ticketPrice?: number;
}

export type Navigate = (screen: Screen, transition?: TransitionType, options?: NavigationOptions) => void;

export type TabId = 'home' | 'discover' | 'cart' | 'alerts' | 'profile';

export interface ScreenProps {
  onNavigate: Navigate;
}

export interface ConfirmationInfo {
  itemType?: 'experience' | 'gift';
  giftRecipientName?: string;
}

export interface ConfirmationScreenProps extends ScreenProps {
  confirmation?: ConfirmationInfo;
}

export interface UserProfile {
  name: string;
  age: string;
  preferences: UserPreferences;
}

export interface ProfileAwareScreenProps extends ScreenProps {
  profile: UserProfile;
  onProfileChange: (profile: UserProfile) => void;
}

export interface ConfigScreenProps extends ScreenProps {
  selectedActivityType?: string;
  selectedLocation?: string;
  selectedExperienceTitle?: string;
  selectedExperienceDescription?: string;
  selectedExperienceImage?: string;
}

export interface GiftConfigScreenProps extends ScreenProps {
  giftPackTitle?: string;
  giftPrice?: string;
}

export interface PaymentScreenProps extends ScreenProps {
  purchase?: NavigationOptions;
  cart: CartState;
  onCartChange: (cart: CartState) => void;
}

export interface ExperiencesScreenProps extends ScreenProps {
  experiences: UserExperience[];
  onSelectExperience: (experience: UserExperience) => void;
}

export interface SelectedExperienceScreenProps extends ScreenProps {
  experience?: UserExperience;
  onFinishFeedback?: (experienceId: string) => void;
}
