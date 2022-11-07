import { Box, FlatList, useToast } from 'native-base';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { EmptyMyPoolList } from './EmptyMyPoolList';
import { Game, GameProps } from './Game';
import { Loading } from './Loading';

interface Props {
  pollId: string;
  code: string;
}

export function Guesses({ pollId, code }: Props) {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState<GameProps[]>([]);
  const [firstTeamPoints, setFirstTeamPoints] = useState("");
  const [secondTeamPoints, setSecondTeamPoints] = useState("");
  const toast = useToast();


  const fetchGames = async () => {
    try {
      setLoading(true);

      const r = await api.get(`/polls/${pollId}/games`)
      setGames(r.data.games);
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

  const handleGuessConfirm = async (gameId: string) => {
    try {
      if(!firstTeamPoints.trim() || !secondTeamPoints.trim()){
        toast.show({
          title: "Informe o placar do palpite!",
          color: "red.500",
          placement: "top",
        });
        return
      }

      await api.post(`polls/${pollId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints)
      });

      toast.show({
        title: "Palpite enviado com sucesso",
        color: "green.500",
        placement: "top",
      });

      fetchGames();
    }
    catch (error) {
      console.log(error);
      toast.show({
        title: "Não foi possível enviar o palpite!",
        color: "red.500",
        placement: "top",
      });
    }
    finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    fetchGames();
  }, [pollId])

  if(loading){
    return <Loading />
  }

  return (
    <FlatList
      data={[]}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item.id)}
        />
      )}
      _contentContainerStyle={{pb: 10}}
      ListEmptyComponent={() => <EmptyMyPoolList code={code}/>}
    />
  );
}
