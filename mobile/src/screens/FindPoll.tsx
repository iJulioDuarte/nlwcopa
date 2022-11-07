import { Heading, useToast, VStack } from "native-base"
import { FC, useState } from "react"
import { Header } from "../components/Header"
import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { api } from "../services/api"
import { useNavigation } from "@react-navigation/native"

export const FindPoll: FC = () => {
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState<string>("");
    const toast = useToast();
    const {navigate} = useNavigation();

    const handleJoinPoll = async () => {
        try {
            setLoading(true)
            if (!code.trim()) {
                toast.show({
                    title: "Informe um código!",
                    placement: "top",
                    color: "red.500",
                });

                setLoading(false);
                return;
            }

            await api.post("/polls/join", { code });

            toast.show({
                title: "Bolão encontrado com sucesso!",
                placement: "top",
                color: "green.500"
            });
            setCode("");
            setLoading(false);
            navigate("polls");
        }
        catch (error) {
            console.log(error);

            setLoading(false);

            if (error.response?.data?.message === "Poll not found") {
                return toast.show({
                    title: "Bolão não encontrado!",
                    placement: "top",
                    color: "red.500"
                })
            }
            if (error.response?.data?.message === "You already joined this poll") {
                return toast.show({
                    title: "Você ja está nesse bolão!",
                    placement: "top",
                    color: "red.500"
                })
            }

            return toast.show({
                title: "Você ja está nesse bolão!",
                placement: "top",
                color: "red.500"
            });
        }
    }
    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Buscar por código" showBackButton />

            <VStack mt={8} mx={5} alignItems="center">

                <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
                    Encontre um bolão através de seu código único
                </Heading>

                <Input
                    mb={2}
                    placeholder="Qual o nome do seu bolão"
                    autoCapitalize="characters"
                    onChangeText={setCode}
                />

                <Button
                    title="Buscar bolão"
                    isLoading={loading}
                    onPress={handleJoinPoll}
                />
            </VStack>
        </VStack>
    )
}