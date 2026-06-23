import React from 'react';
import { Pressable, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { Navigate, TabId } from '../navigation';
import { colors } from '../theme/colors';
import { styles } from '../theme/styles';
import BottomNav from './BottomNav';

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  onBack?: () => void;
  rightText?: string;
  onRightPress?: () => void;
  withBottomNav?: boolean;
  activeTab?: TabId;
  onNavigate?: Navigate;
}

export default function AppShell({
  children,
  title = 'PlanGo',
  onBack,
  rightText,
  onRightPress,
  withBottomNav,
  activeTab,
  onNavigate,
}: AppShellProps) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={colors.secondary} />
      <View style={styles.header}>
        <View style={styles.headerSide}>
          {onBack ? (
            <Pressable onPress={onBack} style={styles.iconButton}>
              <Text style={styles.iconText}>‹</Text>
            </Pressable>
          ) : null}
        </View>

        <Text style={styles.logo}>{title}</Text>

        <View style={[styles.headerSide, styles.headerRight]}>
          {rightText ? (
            <Pressable onPress={onRightPress}>
              <Text style={styles.headerAction}>{rightText}</Text>
            </Pressable>
          ) : null}
        </View>
      </View>

      <View style={styles.screen}>{children}</View>

      {withBottomNav && onNavigate ? (
        <BottomNav active={activeTab ?? 'home'} onNavigate={onNavigate} />
      ) : null}
    </SafeAreaView>
  );
}
