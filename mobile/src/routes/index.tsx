import { NavigationContainer } from "@react-navigation/native"
import { Box } from "native-base"
import { FC } from "react"
import { useAuth } from "../hooks/useAuth"
import { SignIn } from "../screens/SignIn"
import { AppRoutes } from "./app.routes"

export const Routes: FC = () => {
    const { user } = useAuth();

    return (
        <Box flex={1} bg="gray.900">
            <NavigationContainer>
                {user.name ? <AppRoutes /> : <SignIn />}
            </NavigationContainer>
        </Box>
    )
}