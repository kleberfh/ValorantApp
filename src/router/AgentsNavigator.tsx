import {Box} from 'native-base';
import Agent from "../screens/agent";
import {useRecoilValue} from "recoil";
import Agents from "../screens/agents";
import {colors} from "../utilities/theme";
import {themeAtom} from "../atoms/themeAtom";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function AgentsNavigation() {
  const theme = useRecoilValue(themeAtom);

  return (
    <Box flex={1} bgColor={colors[theme].background}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="agents-list"
          component={Agents}
        />
        <Stack.Screen
          name="agent"
          component={Agent}
        />
      </Stack.Navigator>
    </Box>
  )
}