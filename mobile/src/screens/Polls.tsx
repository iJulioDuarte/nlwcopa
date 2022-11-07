import { Icon, useToast, VStack, FlatList } from "native-base";
import { Octicons } from "@expo/vector-icons";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { FC, useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { api } from "../services/api";
import { PollCard, PollCardPros } from "../components/PollCard";
import { Loading } from "../components/Loading";
import { EmptyPollList } from "../components/EmptyPoolList";
import { ItemClick } from "native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types";

export const Polls: FC = () => {
    const { navigate } = useNavigation();
    const [loading, setLoading] = useState(true);
    const [polls, setPolls] = useState<PollCardPros[]>([]);
    const toast = useToast();

    const fetchPolls = async () => {
        try {
            const r = await api.get("/polls");
            setPolls(r.data.polls);
        }
        catch (error) {
            console.log(error);
            toast.show({
                title: "Não foi possível carregar os bolões",
                color: "red.500",
                placement: "top",
            });
        }
        finally {
            setLoading(false);
        }
    }

    useFocusEffect(useCallback(() => {
        fetchPolls();
    }, []))

    return (
        <VStack flex={1} bgColor="gray.900">

            <Header title="Meus bolões" />

            <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
                <Button
                    title="Buscar bolão pelo código"
                    leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
                    onPress={() => {
                        navigate("findPoll")
                    }}
                />
            </VStack>

            {
                loading ?
                    <Loading /> 
                    :
                        <FlatList
                            data={polls}
                            keyExtractor={poll => poll.id}
                            renderItem={(poll) => (
                                <PollCard 
                                data={poll.item}
                                onPress={() => navigate("details", { id:poll.item.id })} 
                            />)}
                            px={5}
                            showsVerticalScrollIndicator={false}
                            _contentContainerStyle={{ pb: 10 }}
                            ListEmptyComponent={() => <EmptyPollList />}
                        />
            }
        </VStack>
    )
}