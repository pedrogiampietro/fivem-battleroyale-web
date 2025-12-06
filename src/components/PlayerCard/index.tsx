import React from "react";
import { useMatchmaking } from "../../contexts/MatchmakingContext";
import { GameType } from "../../enums/GameType";
import { FaUsers, FaUserFriends, FaUser, FaGamepad, FaClock } from "react-icons/fa";

import soloImg from "../../assets/imgs/br-solo.webp";
import duoImg from "../../assets/imgs/br-duo.webp";
import squadImg from "../../assets/imgs/br-squad.webp";

import * as S from "./styles";
import { toast } from "../../lib/toast";

const matchmakings = [
  {
    type: "Squad",
    total: 64,
    size: 4,
    img: squadImg,
    gameType: GameType.SQUAD,
    icon: <FaUsers />,
    description: "Junte-se a 3 amigos e domine a ilha."
  },
  {
    type: "Duo",
    total: 64,
    size: 2,
    img: duoImg,
    gameType: GameType.DUO,
    icon: <FaUserFriends />,
    description: "Trabalhe em dupla para sobreviver."
  },
  {
    type: "Solo",
    total: 64,
    size: 1,
    img: soloImg,
    gameType: GameType.SOLO,
    icon: <FaUser />,
    description: "É cada um por si. Sobreviva a todos."
  },
];

export const PlayerCard = () => {
  const {
    startMatchmaking,
    matchmakingCounters,
    isFindingMatch,
    cancelMatchmaking,
    loading,
    playerIsReady,
  } = useMatchmaking();

  const [currentFindingGameType, setCurrentFindingGameType] =
    React.useState<GameType | null>(null);

  const handleMatchmaking = async (gameType: GameType) => {
    if (!playerIsReady && gameType !== "SOLO") {
      toast.error("Você precisa estar pronto para buscar uma partida.");
      return;
    }

    if (isFindingMatch && currentFindingGameType === gameType) {
      setCurrentFindingGameType(null);
      await cancelMatchmaking(gameType);
    } else {
      setCurrentFindingGameType(gameType);
      await startMatchmaking(gameType);
    }
  };

  return (
    <S.CardContainer>
      {matchmakings.map((matchmaking, i) => {
        const isSearching = isFindingMatch && currentFindingGameType === matchmaking.gameType;
        
        return (
          <S.Card key={i} $isSearching={isSearching}>
            <S.CardHeader>
              <S.CardImage src={matchmaking.img} alt={matchmaking.type} />
              <S.ModeBadge>
                {matchmaking.icon}
                {matchmaking.type}
              </S.ModeBadge>
            </S.CardHeader>

            <S.CardContent>
              <S.Description>{matchmaking.description}</S.Description>
              
              <S.StatsGrid>
                <S.StatBox>
                  <S.StatLabel><FaGamepad /> Total</S.StatLabel>
                  <S.StatValue>{matchmaking.total}</S.StatValue>
                </S.StatBox>
                <S.StatBox>
                  <S.StatLabel><FaClock /> Fila</S.StatLabel>
                  <S.StatValue>
                    {matchmakingCounters[matchmaking.gameType] || 0}
                  </S.StatValue>
                </S.StatBox>
                <S.StatBox>
                  <S.StatLabel><FaUsers /> Time</S.StatLabel>
                  <S.StatValue>{matchmaking.size}</S.StatValue>
                </S.StatBox>
              </S.StatsGrid>

              <S.Button
                disabled={
                  loading ||
                  (isFindingMatch &&
                    currentFindingGameType !== matchmaking.gameType)
                }
                $isSearching={isSearching}
                onClick={() => handleMatchmaking(matchmaking.gameType)}
              >
                {loading ? (
                  "Carregando..."
                ) : isSearching ? (
                  <>Cancelar Busca <span className="loader">...</span></>
                ) : (
                  "Buscar Partida"
                )}
              </S.Button>
            </S.CardContent>
          </S.Card>
        );
      })}
    </S.CardContainer>
  );
};
