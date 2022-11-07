import { useRoute } from "@react-navigation/native"
import { HStack, useToast, VStack } from "native-base"
import { FC, useEffect, useState } from "react"
import { Share } from "react-native";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Guesses } from "../components/Guesses";
import { Header } from "../components/Header"
import { Loading } from "../components/Loading";
import { Option } from "../components/Option";
import { PollCardPros } from "../components/PollCard";
import { PollHeader } from "../components/PollHeader";
import { api } from "../services/api";

interface RouteParams {
    id: string;
}

export const Details: FC = () => {
    const route = useRoute();
    const { id } = route.params as RouteParams;
    const [loading, setLoading] = useState(false);
    const [pollDetails, setPollDetails] = useState<PollCardPros>({} as PollCardPros);
    const [optionsSelected, setOptionsSelected] = useState<"Guesses" | "Ranking">("Guesses");
    const toast = useToast();

    const fetchPollDetails = async () => {
        try {
            setLoading(true);
            const r = await api.get(`/polls/${id}`);
            setPollDetails(r.data.poll);
        }
        catch (error) {
            console.log(error);
            toast.show({
                title: "Não foi possível carregar os detalhes do bolão",
                color: "red.500",
                placement: "top",
            });
        }
        finally {
            setLoading(false);
        }
    }

    const handleCodeShare = async () => {
        await Share.share({
            message: pollDetails.code
        });
    }


    useEffect(() => {
        fetchPollDetails()
    }, [id])


    if (loading) {
        return (
            <Loading />
        );
    }


    return (
        <VStack flex={1} bgColor="gray.900">
            <Header
                title={pollDetails.title}
                showBackButton
                showShareButton
                onShare={handleCodeShare}
            />

            {
                pollDetails._count?.participants > 0 ?
                    <VStack px={5} flex={1}>
                        <PollHeader data={pollDetails} />

                        <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                            <Option
                                title="Seus Palpites"
                                isSelected={optionsSelected === "Guesses"}
                                onPress={() => {
                                    setOptionsSelected("Guesses")
                                }} />
                            <Option
                                title="Ranking de grupos"
                                isSelected={optionsSelected === "Ranking"}
                                onPress={() => {
                                    setOptionsSelected("Ranking")
                                }}
                            />
                        </HStack>

                        <Guesses pollId={pollDetails.id} code={pollDetails.code}/>
                    </VStack>
                    :
                    <EmptyMyPoolList code={pollDetails.code} />
            }


        </VStack>
    )
}