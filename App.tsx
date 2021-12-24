import {RecoilRoot} from "recoil";
import {NativeBaseProvider} from "native-base";
import Home from "./src/screens/Home";
import NavBar from "./src/components/NavBar";
import Navigation from "./src/router/navigation";

export default function App() {
  return (
    <RecoilRoot>
      <NativeBaseProvider>
        <Navigation />
      </NativeBaseProvider>
    </RecoilRoot>
  );
}
