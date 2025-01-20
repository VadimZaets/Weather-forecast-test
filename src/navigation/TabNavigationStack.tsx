import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MapScreen } from '../screens/MapScreen.tsx';
import { SearchScreen } from '../screens/SearchScreen.tsx';
import { TabBar } from '../components/TabBar.tsx';


const Tab = createBottomTabNavigator();

export function TabNavigator() {

  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Map">
      <Tab.Screen name="Map" component={MapScreen} options={{}} />
      <Tab.Screen name="Search" component={SearchScreen} options={{}} />
    </Tab.Navigator>
  );
}
