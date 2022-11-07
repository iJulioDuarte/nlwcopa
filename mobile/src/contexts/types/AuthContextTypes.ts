

export type UserProps = {
    name: string;
    avatarUrl: string;
}

export type AuthContextDataProps = {
    user: UserProps;
    isUserLoading: boolean;
    signIn: () => Promise<void>;
}

export type AuthProviderProps = {
    children: React.ReactNode
}