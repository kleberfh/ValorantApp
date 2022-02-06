import {useRecoilState} from "recoil";
import {colors} from "../utilities/theme";
import {themeAtom} from "../atoms/themeAtom";
import {Flex, Image, Center, Text, Switch,} from "native-base";

import valorant from '../assets/valorant.png'
import {languageAtom} from "../atoms/languageAtom";
import {localization} from "../lang/localization";

export default function Home() {
  const [theme, setTheme] = useRecoilState(themeAtom);
  const [language, setLanguage] = useRecoilState(languageAtom);

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
          {localization[language].developer}
        </Text>
        <Flex
          mt={6}
          w='2/4'
          mx='auto'
          alignItems="center"
          flexDirection="row"
        >
          <Switch
            mr={4}
            size="md"
            isChecked={language === 'en-US'}
            onToggle={() => {
              setLanguage(language === 'pt-BR' ? 'en-US' : 'pt-BR')
            }}
            onTrackColor={colors[theme].primary}
            onThumbColor={colors[theme].secondary}
            offThumbColor={colors[theme].secondary}
            offTrackColor={colors[theme].background}
          />
          <Text
            fontSize="lg"
            fontWeight="semibold"
            color={colors[theme].primary}
          >
            {localization[language].language}
          </Text>
        </Flex>
        <Flex
          mt={6}
          w='2/4'
          mx='auto'
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
            {localization[language].theme}
          </Text>
        </Flex>
      </Center>
    </Flex>
  )
}