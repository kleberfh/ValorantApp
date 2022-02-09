import {get, uniq, uniqBy} from "lodash";
import {useRecoilValue} from "recoil";
import {colors} from "../utilities/theme";
import {useEffect, useState} from "react";
import {filter as _filter } from "lodash";
import {Search} from "react-native-feather";
import {themeAtom} from "../atoms/themeAtom";
import {localization} from "../lang/localization";
import ValorantApi from "../services/valorantApi";
import {languageAtom} from "../atoms/languageAtom";
import AgentCard from "../components/Agents/AgentCard";
import CircleSnail from "../components/Global/Loading";
import {FlatList, Flex, Center, Text, Pressable, Avatar} from "native-base";
import {TextInput} from "react-native";

export default function Agents() {
  const theme = useRecoilValue(themeAtom);
  const language = useRecoilValue(languageAtom);

  const [type, setType] = useState('');
  const [types, setTypes] = useState([]);
  const [filter, setFilter] = useState('');
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredAgents, setFilteredAgents] = useState([]);

  const requestAgents = () => {
    ValorantApi('agents', language)
      .then(({ data }) => {
        setAgents(uniq(get(data, 'data', [])));
        setFilteredAgents(uniq(get(data, 'data', [])));
        setTypes(
          uniqBy(
            get(data, 'data', []).map(agent => agent.role),
            'displayName'
          )
        );
        setType('');
        setFilter('');
        setLoading(false);
      })
  }

  const searchAgent = () => {
    if (filter !== '') {
      setFilteredAgents(_filter(agents, ['displayName', filter]));
    } else {
      setFilteredAgents(agents);
    }
  }

  const filterClass = (filterType = '') => {
    if (filterType !== type) {
      setType(filterType);
      if (filter !== '') {
        setFilteredAgents(
          _filter(agents, {
            'role.displayName': filterType,
            'displayName': filter
          })
        );
      } else {
        setFilteredAgents(_filter(agents, ['role.displayName', filterType]));
      }
    } else {
      setType('');
      if (filter !== '') {
        setFilteredAgents(
          _filter(agents, {
            'displayName': filter
          })
        );
      } else {
        setFilteredAgents(agents);
      }
    }
  }

  useEffect(() => {
    requestAgents();
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
        {localization[language].agents.title}
      </Text>
      {loading ? (
        <Center my='auto'>
          <CircleSnail
            size={80}
            color={colors[theme].primary}
          />
        </Center>
      ) : (
        <Flex px={4} pb={4} flexDirection='column'>
          <Flex flexDirection='row' my={4} alignItems='center'>
            <TextInput
              value={filter}
              returnKeyType='search'
              onChangeText={setFilter}
              onSubmitEditing={searchAgent}
              placeholderTextColor={colors[theme].primary}
              placeholder={localization[language].agents.placeholder}
              style={{
                padding: 0,
                fontSize: 18,
                width: '85%',
                height: '100%',
                borderStyle: 'solid',
                borderBottomWidth: 1,
                color: colors[theme].primary,
                borderBottomColor: colors[theme].primary
              }}
            />
            <Pressable
              p={1}
              flex={1}
              mx='auto'
              rounded='lg'
              alignItems='center'
              onPress={searchAgent}
            >
              <Search color={colors[theme].primary} />
            </Pressable>
          </Flex>
          <Flex mb={2} flexDirection='row' alignItems='center'>
            <Text
              mr={4}
              fontSize='lg'
              fontWeight='medium'
              color={colors[theme].primary}
            >
              {localization[language].agents.class}
            </Text>
            {types.map((item, key) => {
              if (item) {
                return (
                  <Pressable
                    p={1}
                    mr={4}
                    key={key}
                    rounded='full'
                    onPress={() => filterClass(item.displayName)}
                    bgColor={type === item.displayName ? colors[theme].secondary : colors[theme].background}
                  >
                    <Avatar
                      size='xs'
                      source={{uri: item.displayIcon}}
                      bgColor={type === item.displayName ? colors[theme].secondary : colors[theme].background}
                    />
                  </Pressable>
                )
              }
            })}
          </Flex>
          {type !== '' && (
            <Text
              fontSize='lg'
              fontWeight='medium'
              color={colors[theme].secondary}
            >
              {`${localization[language].agents.filtering} ${type}`}
            </Text>
          )}
          <FlatList
            mt={2}
            mb={24}
            data={filteredAgents}
            keyExtractor={item => item.uuid}
            renderItem={({item}) => <AgentCard item={item} />}
          />
        </Flex>
      )}
    </Flex>
  )
}