import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Navigate, TabId } from '../navigation';
import { Screen } from '../types';
import { styles } from '../theme/styles';

const items = [
  { id: 'home', label: 'Inicio', screen: Screen.INICIO },
  { id: 'discover', label: 'Sorprendete', screen: Screen.CONFIGURAR },
  { id: 'cart', label: 'Carrito', screen: Screen.PAGO },
  { id: 'alerts', label: 'Próximos', screen: Screen.AVENTURA_DISCOVERY },
  { id: 'profile', label: 'Regalo', screen: Screen.REGALAR },
] as const;

function navIcon(id: string) {
  switch (id) {
    case 'home':
      return '⌂';
    case 'discover':
      return '⌕';
    case 'cart':
      return '🛒';
    case 'alerts':
      return '!';
    case 'profile':
      return '🎁';
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
