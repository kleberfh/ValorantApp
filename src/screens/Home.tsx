import {Flex, Image, Center, Text, Switch,} from "native-base";
import {useRecoilState} from "recoil";
import {themeAtom} from "../atoms/themeAtom";
import {colors} from "../utilities/theme";
import NavBar from "../components/NavBar";

import valorant from '../assets/valorant.png'

export default function Home() {
  const [theme, setTheme] = useRecoilState(themeAtom);

  return (
    <Flex flex={1} bgColor={colors[theme].background}>
      <Center mt={20}>
        <Image size="2xl" source={valorant} alt="valorant logo" />
        <Text
          mt={12}
          fontSize="xl"
          fontWeight="semibold"
          color={colors[theme].primary}
        >
          App developed by Kleber Fernando
        </Text>
        <Flex
          mt={6}
          alignItems="center"
          flexDirection="row"
        >
          <Switch
            mr={4}
            size="md"
            isChecked={theme === 'dark'}
            onToggle={() => {
              setTheme(theme === 'dark' ? 'light' : 'dark')
            }}
            onTrackColor={colors.light.background}
            onThumbColor={colors[theme].secondary}
            offThumbColor={colors[theme].secondary}
            offTrackColor={colors[theme].background}
          />
          <Text
            fontSize="lg"
            fontWeight="semibold"
            color={colors[theme].primary}
          >
            Dark Mode
          </Text>
        </Flex>
      </Center>
    </Flex>
  )
}