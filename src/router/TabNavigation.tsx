import {Box, StatusBar} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/Home";
import NavBar from "../components/NavBar";
import Agents from "../screens/agents";
import {colors} from "../utilities/theme";
import {useRecoilValue} from "recoil";
import {themeAtom} from "../atoms/themeAtom";
import AgentsNavigation from "./AgentsNavigator";

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
          <Tab.Screen name="weapons" component={Home} />
          <Tab.Screen name="maps" component={Home} />
          <Tab.Screen name="ranks" component={Home} />
        </Tab.Navigator>
      </NavigationContainer>
    </Box>
  )
}