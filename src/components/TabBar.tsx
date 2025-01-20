// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, Keyboard } from 'react-native';
import { useLinkBuilder } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { colors } from '../theme/colors.ts';
import {useVw} from "../hooks/useVw.ts";

export const TabBar = ({ state, descriptors, navigation }) => {
  const { buildHref } = useLinkBuilder();
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      Animated.timing(translateY, {
        toValue: 100,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });

    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [translateY]);

  return (
      <Animated.View style={[styles.tabBar, { transform: [{ translateY }] }]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
              options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                      ? options.title
                      : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            navigation.reset({
              index: 0,
              routes: [{ name: route.name }],
            });
          };

          return (
              <PlatformPressable
                  key={route.key}
                  pressColor="transparent"
                  href={buildHref(route.name, route.params)}
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarButtonTestID}
                  onPress={onPress}
                  style={[
                    styles.tabBarItem,
                    !isFocused && { backgroundColor: '#63aeed' },
                  ]}>
                <Text style={styles.tabBarLabel}>{label}</Text>
              </PlatformPressable>
          );
        })}
      </Animated.View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: useVw(1),
    overflow: 'hidden',
    backgroundColor: 'transparent',
    width: '100%',
  },
  tabBarItem: {
    flex: 1,
    paddingVertical: useVw(16),
    alignItems: 'center',
    borderRadius: useVw(50),
    backgroundColor: colors.background.secondary,
  },
  tabBarLabel: {
    fontSize: useVw(16),
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: colors.text.secondary,
  },
});
