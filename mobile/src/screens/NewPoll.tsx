import { Heading, Text, VStack, useToast } from "native-base"
import { FC, useState } from "react"
import { Header } from "../components/Header"
import Logo from "../assets/logo.svg"
import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { api } from "../services/api"


export const NewPoll: FC = () => {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const handlePollCreate = async () => {
        if (!title.trim()) {
            return toast.show({
                title: "Informe algum título para que o seu bolão seja criado!",
                placement: "top",
                bgColor: "red.500"
            });
        }

        try {
            await api.post("/polls", { title })
            toast.show({
                title: "Bolão criado com sucesso",
                placement: "top",
                bgColor: "green.500"
            });
            setTitle("");
        }
        catch (error) {
            console.log(error);
            toast.show({
                title: "Não foi possível criar o bolão.",
                placement: "top",
                bgColor: "red.500"
            });
        }
        finally {
            setLoading(false);
        }

    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Criar novo bolão" />

            <VStack mt={14} mx={5} alignItems="center">
                <Logo />

                <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
                    Crie seu próprio bolão da copa e compartilhe entre amigos!
                </Heading>

                <Input
                    mb={2}
                    placeholder="Qual o nome do seu bolão"
                    onChangeText={setTitle}
                    value={title} />

                <Button
                    title="Criar meu bolão"
                    onPress={handlePollCreate}
                    isLoading={loading}
                />

                <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
                    Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.
                </Text>
            </VStack>
        </VStack>
    )
}