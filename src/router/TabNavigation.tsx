import Home from "../screens/Home";
import {useRecoilValue} from "recoil";
import NavBar from "../components/NavBar";
import {colors} from "../utilities/theme";
import {Box, StatusBar} from 'native-base';
import {themeAtom} from "../atoms/themeAtom";
import AgentsNavigation from "./AgentsNavigator";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Weapons from "../screens/weapons";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const theme = useRecoilValue(themeAtom);

  return (
    <Box flex={1} bgColor={colors[theme].background} pt={12}>
      <StatusBar
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
      />
      <NavigationContainer>
        <Tab.Navigator
          tabBar={props => <NavBar {...props} />}
          screenOptions={{
            headerShown: false
          }}
        >
          <Tab.Screen name="home" component={Home} />
          <Tab.Screen name="agents" component={AgentsNavigation} />
          <Tab.Screen name="weapons" component={Weapons} />
          <Tab.Screen name="maps" component={Home} />
          <Tab.Screen name="ranks" component={Home} />
        </Tab.Navigator>
      </NavigationContainer>
    </Box>
  )
}