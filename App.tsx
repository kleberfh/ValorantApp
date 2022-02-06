import {RecoilRoot} from "recoil";
import {NativeBaseProvider} from "native-base";
import TabNavigation from "./src/router/TabNavigation";

export default function App() {
  return (
    <RecoilRoot>
      <NativeBaseProvider>
        <TabNavigation />
      </NativeBaseProvider>
    </RecoilRoot>
  );
}
