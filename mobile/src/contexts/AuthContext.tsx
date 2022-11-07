import React, { createContext, useState, useEffect } from "react";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google"
import { AuthContextDataProps, AuthProviderProps, UserProps } from "./types/AuthContextTypes";
import { api } from "./../services/api";

WebBrowser.maybeCompleteAuthSession();

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {

    const [user, setUser] = useState<UserProps>({} as UserProps);
    const [isUserLoading, setIsUserLoading] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: process.env.CLIENT_ID,
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
        scopes: ["profile", "email"]
    })


    const signIn = async () => {
        try {
            setIsUserLoading(true);
            await promptAsync();

        } catch (e) {
            console.log(e);
            throw e;

        } finally {
            setIsUserLoading(false);
        }
    }

    const signInWithGoogle = async (access_token: string) => {
        try {
            setIsUserLoading(true);

            const tokenResponse = await api.post("/users", { access_token });
            api.defaults.headers.common["Authorization"] = `Bearer ${tokenResponse.data.token}`

            const userInfoResponse = await api.get("/me");
            setUser(userInfoResponse.data.user);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
        finally {
            setIsUserLoading(false);
        }
    }

    useEffect(() => {
        if (response?.type === "success" && response.authentication?.accessToken) {
            signInWithGoogle(response.authentication.accessToken)
        }
    }, [response]);
    return (
        <AuthContext.Provider value={{
            signIn,
            user,
            isUserLoading,

        }}>
            {children}
        </AuthContext.Provider>
    );
}