import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Search: { locationInfo: string | undefined };
  Map: undefined;
};

export type RouteProps<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

export type NavigationProp =
  StackNavigationProp<RootStackParamList>;
