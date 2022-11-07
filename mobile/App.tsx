import { NativeBaseProvider, StatusBar } from "native-base"
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from "@expo-google-fonts/roboto"
import { THEME } from "./src/styles/theme"
import { Loading } from './src/components/Loading';
import { AuthContextProvider } from "./src/contexts/AuthContext";
import { Routes } from "./src/routes";


export default function App() {
  const fonts = { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold };

  const [fontsLoaded] = useFonts(fonts);

  return (
      <NativeBaseProvider theme={THEME}>
        <AuthContextProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          {
            fontsLoaded ? <Routes /> : <Loading />
          }

        </AuthContextProvider>
      </NativeBaseProvider>
  );
}
