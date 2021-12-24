import {Box} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/Home";
import NavBar from "../components/NavBar";
import Agents from "../screens/agents";
import {colors} from "../utilities/theme";
import {useRecoilValue} from "recoil";
import {themeAtom} from "../atoms/themeAtom";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const theme = useRecoilValue(themeAtom);

  return (
    <Box flex={1} bgColor={colors[theme].background} pt={12}>
      <NavigationContainer>
        <Tab.Navigator
          tabBar={props => <NavBar {...props} />}
          screenOptions={{
            headerShown: false
          }}
        >
          <Tab.Screen name="home" component={Home} />
          <Tab.Screen name="agents" component={Agents} />
          <Tab.Screen name="weapons" component={Home} />
          <Tab.Screen name="maps" component={Home} />
          <Tab.Screen name="ranks" component={Home} />
        </Tab.Navigator>
      </NavigationContainer>
    </Box>
  )
}