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
  items: CartItem[];
  promoCode: string;
  appliedPromoCode: string;
  paymentMethod: 'efectivo' | 'tarjeta';
  cardNumber: string;
  cardExpiration: string;
  cardSecurityCode: string;
}

export interface CartItem {
  id: string;
  purchase: NavigationOptions;
  quantity: number;
  unitPrice: number;
}

export type Navigate = (screen: Screen, transition?: TransitionType, options?: NavigationOptions) => void;

export type TabId = 'home' | 'discover' | 'cart' | 'alerts' | 'profile';

export interface ScreenProps {
  onNavigate: Navigate;
}

export interface ConfirmationInfo {
  itemType?: 'experience' | 'gift' | 'mixed';
  giftRecipientName?: string;
  itemCount?: number;
}

export interface ConfirmationScreenProps extends ScreenProps {
  confirmation?: ConfirmationInfo;
}

export interface UserProfile {
  name: string;
  age: string;
  preferences: UserPreferences;
}

export interface AuthScreenProps extends ScreenProps {
  onLogin: (email: string, password: string) => string | undefined;
  onRegister: (name: string, age: string, email: string, password: string) => string | undefined;
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
  cart: CartState;
  onCartChange: (cart: CartState) => void;
  onRemoveCartItems: (itemIds: string[]) => void;
  onCompletePurchase: (items: CartItem[]) => void;
}

export interface ExperiencesScreenProps extends ScreenProps {
  experiences: UserExperience[];
  onSelectExperience: (experience: UserExperience) => void;
}

export interface SelectedExperienceScreenProps extends ScreenProps {
  experience?: UserExperience;
  onFinishFeedback?: (experienceId: string) => void;
}
