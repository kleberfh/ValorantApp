import {get, uniq} from "lodash";
import {useRecoilValue} from "recoil";
import {colors} from "../utilities/theme";
import {useEffect, useState} from "react";
import {themeAtom} from "../atoms/themeAtom";
import ValorantApi from "../services/valorantApi";
import {localization} from "../lang/localization";
import {languageAtom} from "../atoms/languageAtom";
import CircleSnail from "../components/Global/Loading";
import {Center, FlatList, Flex, Image, Text} from "native-base";

export default function Weapons() {
  const theme = useRecoilValue(themeAtom);
  const language = useRecoilValue(languageAtom);

  const [weapons, setWeapons] = useState([]);
  const [loading, setLoading] = useState(true);

  const requestWeapons = () => {
    ValorantApi('weapons', language)
      .then(({ data }) => {
        setLoading(false);
        setWeapons(uniq(get(data, 'data', [])));
      })
  }

  useEffect(() => {
    requestWeapons();
  }, [language]);

  return (
    <Flex
      flex={1}
      pb={loading ? 0 : 24}
      bgColor={colors[theme].background}
    >
      <Text
        fontSize='2xl'
        fontWeight='bold'
        textAlign='center'
        color={colors[theme].primary}
      >
        {localization[language].weapons.title}
      </Text>
      {loading ? (
        <Center my='auto'>
          <CircleSnail
            size={80}
            color={colors[theme].primary}
          />
        </Center>
      ) : (
        <FlatList
          mt={2}
          px={4}
          flex={1}
          data={weapons}
          renderItem={({item}) => (
            <Flex
              p={4}
              my={2}
              w='full'
              rounded="2xl"
              flexDirection='column'
              bgColor='rgba(255, 255, 255, 0.1)'
            >
              <Text
                mb={4}
                fontSize='lg'
                fontWeight="bold"
                color={colors[theme].primary}
              >
                {item.displayName}
              </Text>
              <Image
                h={24}
                w='full'
                alt="weapon icon"
                resizeMode="contain"
                src={item.displayIcon}
              />
            </Flex>
          )}
          keyExtractor={item => item.uuid}
        />
      )}
    </Flex>
  )
}