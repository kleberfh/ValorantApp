import {useState} from "react";
import {colors} from "../utilities/theme";
import {Flex, Image, Pressable, Text} from "native-base";

import gun from '../assets/gun.png';
import map from '../assets/map.png';
import home from '../assets/home.png';
import ranks from '../assets/ranks.png';
import agents from '../assets/agents.png';
import {useRecoilValue} from "recoil";
import {languageAtom} from "../atoms/languageAtom";
import {localization} from "../lang/localization";

const images = {
  weapons: gun,
  maps: map,
  home: home,
  ranks: ranks,
  agents: agents
}

export default function NavBar({ state, navigation }) {
  const { routes } = state;
  const [currentRoute, setCurrentRoute] = useState('home');

  const language = useRecoilValue(languageAtom);

  const onPress = (route, index) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
    });

    const isFocused = state.index === index;

    if (!isFocused && !event.defaultPrevented) {
      setCurrentRoute(route.name);
      navigation.navigate(route.name);
    }
  };

  return (
    <Flex
      pt={4}
      px={2}
      pb={8}
      left={0}
      right={0}
      bottom={0}
      roundedTop="2xl"
      position="absolute"
      flexDirection="row"
      alignItems="center"
      bgColor={colors.light.secondary}
    >
      {routes.map((route, index: Number) => (
        <Pressable
          w='1/5'
          key={route.key}
          alignItems="center"
          flexDirection="column"
          onPress={() => onPress(route, index)}
        >
          <Image size="2xs" source={images[route.name]} alt="gun icon" />
          <Text
            mt={2}
            fontSize="sm"
            textAlign="center"
            fontWeight="semibold"
            color={currentRoute === route.name ? colors.light.background : colors.light.primary}
          >
            {localization[language].menu[route.name]}
          </Text>
        </Pressable>
      ))}
    </Flex>
  )
}