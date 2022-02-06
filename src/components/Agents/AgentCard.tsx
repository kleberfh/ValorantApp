import React from "react";
import {useRecoilValue} from "recoil";
import {colors} from "../../utilities/theme";
import {themeAtom} from "../../atoms/themeAtom";
import {useNavigation} from "@react-navigation/native";
import {Flex, Image, Pressable, Text} from "native-base";
import {languageAtom} from "../../atoms/languageAtom";
import {localization} from "../../lang/localization";

const AgentCard = ({ item }) => {
  const navigation = useNavigation();
  const theme = useRecoilValue(themeAtom);
  const language = useRecoilValue(languageAtom);

  return(
    <Flex
      p={5}
      mb={4}
      w='98%'
      mx='auto'
      shadow={3}
      rounded='xl'
      flexDirection='column'
      bgColor={theme === 'light' ? '#FFF' : '#242526'}
    >
      <Image
        h='80%'
        w='80%'
        top={8}
        right={0}
        opacity={20}
        position='absolute'
        src={item.background}
        alt={`Background ${item.displayName}`}
      />
      <Flex flexDirection='row'>
        <Image
          size='lg'
          rounded='2xl'
          src={item.displayIcon}
          alt={`Agent ${item.displayName}`}
          bgColor={colors[theme].secondary}
        />
        <Flex
          ml={2}
          flexDirection='column'
        >
          <Text
            fontSize='3xl'
            fontWeight='semibold'
            color={colors[theme].primary}
          >
            {item.displayName}
          </Text>
        </Flex>
      </Flex>
      <Text
        mt={2}
        fontSize='lg'
        fontWeight='medium'
        color={colors[theme].primary}
      >
        {item.description}
      </Text>
      <Pressable
        mt={4}
        py={3}
        px={8}
        mx='auto'
        rounded='xl'
        bgColor={colors[theme].secondary}
        onPress={() => navigation.navigate('agent', item)}
      >
        <Text
          color='#FFF'
          fontSize='lg'
          textAlign='center'
          fontWeight='semibold'
        >
          {localization[language].agents.viewMore}
        </Text>
      </Pressable>
    </Flex>
  )
};

export default AgentCard;