import {get} from "lodash";
import {Audio} from "expo-av";
import {useState} from "react";
import {useRecoilValue} from "recoil";
import {Play} from "react-native-feather";
import {colors} from "../utilities/theme";
import {themeAtom} from "../atoms/themeAtom";
import {Box, ChevronLeftIcon, Flex, Image, Pressable, Text, FlatList, Avatar} from "native-base";
import {TouchableOpacity} from "react-native";
import CircleSnail from "../components/Global/Loading";
import {languageAtom} from "../atoms/languageAtom";
import {localization} from "../lang/localization";

const Agent = ({ route, navigation }) => {
  const agent = get(route, 'params', null);

  const theme = useRecoilValue(themeAtom);
  const language = useRecoilValue(languageAtom);

  const [playing, setPlaying] = useState(false);

  const playVoice = async () => {
    const agentVoices = get(agent, 'voiceLine.mediaList', []);

    if (!playing && agentVoices.length >= 1) {
      const { sound } = await Audio.Sound.createAsync({
        uri: agentVoices[0].wave
      });
      setPlaying(true)
      await sound.playAsync();
      const duration: string = get(agent, 'voiceLine.maxDuration', 0);
      setTimeout(() => {
        sound.unloadAsync();
        setPlaying(false);
      }, Number(String(duration).replace('.', '').substring(0, 4)));
    }
  }

  return (
    <Flex
      p={4}
      flex={1}
      bgColor={colors[theme].background}
    >
      <Image
        top={0}
        h='full'
        w='full'
        right={0}
        opacity={20}
        position='absolute'
        alt='character portrait'
        src={get(agent, 'fullPortrait', '')}
      />
      <Flex
        alignItems='center'
        flexDirection='row'
      >
        <Pressable onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size='xl' color={colors[theme].primary} />
        </Pressable>
        <Text
          fontSize='4xl'
          fontWeight='bold'
          color={colors[theme].primary}
        >
          {get(agent, 'displayName', '')}
        </Text>
      </Flex>
      <Flex
        alignItems='center'
        flexDirection='row'
        justifyContent='flex-end'
      >
        <Text
          fontSize='3xl'
          fontWeight='semibold'
          color={colors[theme].primary}
        >
          {get(agent, 'role.displayName', '')}
        </Text>
        <Box
          p={2}
          ml={2}
          rounded='full'
          bgColor={colors[theme].secondary}
        >
          <Image
            size='xs'
            alt='agent role'
            src={get(agent, 'role.displayIcon', '')}
          />
        </Box>
      </Flex>
      <Flex
        p={4}
        mt={4}
        shadow={1}
        rounded='xl'
        opacity={80}
        flexDirection='column'
        bgColor={theme === 'light' ? '#FFF' : '#242526'}
      >
        <Text
          fontSize='2xl'
          fontWeight='semibold'
          color={colors[theme].primary}
        >
          {localization[language].agent.abilities}
        </Text>
        <FlatList
          mt={2}
          horizontal
          keyExtractor={item => item.slot}
          data={get(agent, 'abilities', [])}
          renderItem={({item}) => (
            <Flex
              my={2}
              mr={4}
              alignItems='center'
              flexDirection='column'
              justifyContent='space-around'
            >
              <Avatar
                size='md'
                bgColor={colors[theme].secondary}
                source={{ uri: item.displayIcon }}
              />
              <Text
                mt={2}
                fontWeight='semibold'
                color={colors[theme].primary}
              >
                {item.displayName}
              </Text>
            </Flex>
          )}
        />
      </Flex>
      <Flex
        p={4}
        mt={4}
        shadow={1}
        rounded='xl'
        opacity={80}
        flexDirection='row'
        alignItems='center'
        bgColor={theme === 'light' ? '#FFF' : '#242526'}
      >
        <TouchableOpacity onPress={playVoice}>
          <Box
            p={2}
            rounded='full'
            bgColor={colors[theme].secondary}
          >
            {playing ? (
              <CircleSnail
                size={24}
                thickness={2}
                color={colors[theme].primary}
              />
            ) : (
              <Play
                strokeWidth={3}
                color={colors[theme].primary}
              />
            )}
          </Box>
        </TouchableOpacity>
        <Text
          ml={2}
          fontSize='2xl'
          fontWeight='semibold'
          color={colors[theme].primary}
        >
          {localization[language].agent.voice}
        </Text>
      </Flex>
    </Flex>
  )
};

export default Agent;