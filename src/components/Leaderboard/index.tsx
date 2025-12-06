import React, { useState, useEffect } from "react";
import { apiClient } from "../../services/api";
import {
  LeaderboardContainer,
  LeaderboardHeader,
  FilterTabs,
  FilterTab,
  LeaderboardTable,
  TableHeader,
  TableRow,
  RankBadge,
  PlayerInfo,
  PlayerAvatar,
  PlayerName,
  StatCell,
  MMRCell,
  TierBadge,
  LoadingContainer,
  EmptyState,
} from "./styles";

interface PlayerRating {
  rank: number;
  id: string;
  mmr: number;
  rankTier: string;
  rankPoints: number;
  wins: number;
  losses: number;
  totalKills: number;
  totalDeaths: number;
  totalMatches: number;
  kd: string;
  winRate: string;
  user: {
    id: string;
    steamId: string;
    personaName: string;
    avatar: string;
  };
}

type GameTypeFilter = "ALL" | "SOLO" | "DUO" | "SQUAD";

export const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<PlayerRating[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<GameTypeFilter>("ALL");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUserId(user.id);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [filter]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const params = filter !== "ALL" ? `?gameType=${filter}` : "";
      const response = await apiClient().get(`/stats/leaderboard${params}`);
      const data = JSON.parse(response.data);

      if (data.success) {
        setLeaderboard(data.data);
      }
    } catch (error) {
      console.error("Erro ao buscar leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "CHALLENGER":
        return "👑";
      case "MASTER":
        return "💎";
      case "DIAMOND":
        return "💠";
      case "PLATINUM":
        return "⚡";
      case "GOLD":
        return "🏅";
      case "SILVER":
        return "🥈";
      default:
        return "🥉";
    }
  };

  return (
    <LeaderboardContainer>
      <LeaderboardHeader>
        <h1>🏆 Leaderboard</h1>
        <FilterTabs>
          {(["ALL", "SOLO", "DUO", "SQUAD"] as GameTypeFilter[]).map((type) => (
            <FilterTab
              key={type}
              $active={filter === type}
              onClick={() => setFilter(type)}
            >
              {type === "ALL" ? "Todos" : type}
            </FilterTab>
          ))}
        </FilterTabs>
      </LeaderboardHeader>

      <LeaderboardTable>
        <TableHeader>
          <div>Rank</div>
          <div>Jogador</div>
          <div>Partidas</div>
          <div>Vitórias</div>
          <div>K/D</div>
          <div>Win Rate</div>
          <div>MMR</div>
        </TableHeader>

        {loading ? (
          <LoadingContainer>
            <span>Carregando ranking...</span>
          </LoadingContainer>
        ) : leaderboard.length === 0 ? (
          <EmptyState>
            <h3>Nenhum jogador encontrado</h3>
            <p>Seja o primeiro a jogar e aparecer no ranking!</p>
          </EmptyState>
        ) : (
          leaderboard.map((player) => (
            <TableRow
              key={player.id}
              $isCurrentUser={player.user.id === currentUserId}
              $rank={player.rank}
            >
              <RankBadge $rank={player.rank}>
                {player.rank <= 3
                  ? player.rank === 1
                    ? "🥇"
                    : player.rank === 2
                    ? "🥈"
                    : "🥉"
                  : `#${player.rank}`}
              </RankBadge>

              <PlayerInfo>
                <PlayerAvatar
                  src={player.user.avatar || "/default-avatar.png"}
                  alt={player.user.personaName}
                />
                <PlayerName>
                  <span className="name">{player.user.personaName}</span>
                  <span className="tier">
                    {getTierIcon(player.rankTier)}
                    <TierBadge $tier={player.rankTier}>
                      {player.rankTier}
                    </TierBadge>
                  </span>
                </PlayerName>
              </PlayerInfo>

              <StatCell>{player.totalMatches}</StatCell>
              <StatCell>{player.wins}</StatCell>
              <StatCell>{player.kd}</StatCell>
              <StatCell>{player.winRate}%</StatCell>
              <MMRCell>{player.mmr}</MMRCell>
            </TableRow>
          ))
        )}
      </LeaderboardTable>
    </LeaderboardContainer>
  );
};

export default Leaderboard;
