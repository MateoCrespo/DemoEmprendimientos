import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Navigate, TabId } from '../navigation';
import { Screen } from '../types';
import { styles } from '../theme/styles';

const items = [
  { id: 'home', label: 'Home', screen: Screen.INICIO },
  { id: 'discover', label: 'Discover', screen: Screen.CONFIGURAR },
  { id: 'cart', label: 'Cart', screen: Screen.PAGO },
  { id: 'alerts', label: 'Alerts', screen: Screen.AVENTURA_DISCOVERY },
  { id: 'profile', label: 'Profile', screen: Screen.REGALAR },
] as const;

function navIcon(id: string) {
  switch (id) {
    case 'home':
      return '⌂';
    case 'discover':
      return '◇';
    case 'cart':
      return '▣';
    case 'alerts':
      return '!';
    default:
      return '○';
  }
}

export default function BottomNav({ active, onNavigate }: { active: TabId; onNavigate: Navigate }) {
  return (
    <View style={styles.bottomNav}>
      {items.map((item) => {
        const isActive = active === item.id;

        return (
          <Pressable
            key={item.id}
            onPress={() => onNavigate(item.screen, 'none')}
            style={[styles.navItem, isActive && styles.navItemActive]}
          >
            <Text style={[styles.navIcon, isActive && styles.navIconActive]}>{navIcon(item.id)}</Text>
            <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
