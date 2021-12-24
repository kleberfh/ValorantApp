import {Flex, Text} from "native-base";
import {useEffect, useState} from "react";
import ValorantApi from "../services/valorantApi";
import {colors} from "../utilities/theme";
import {useRecoilValue} from "recoil";
import {themeAtom} from "../atoms/themeAtom";

export default function Agents() {
  const theme = useRecoilValue(themeAtom);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    ValorantApi('agents')
      .then(({ data }) => {
        setAgents(data.data)
      })
  }, [])

  return (
    <Flex
      flex={1}
      flexDirection="column"
      bgColor={colors[theme].background}
    >
      {agents.map(agent => (
        <Text color={colors[theme].primary}>
          {agent.displayName}
        </Text>
      ))}
    </Flex>
  )
}