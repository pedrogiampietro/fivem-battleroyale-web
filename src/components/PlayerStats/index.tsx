import React, { useState, useEffect } from "react";
import { apiClient } from "../../services/api";
import {
  StatsContainer,
  CardHeader,
  AvatarWrapper,
  Avatar,
  TierBadge,
  PlayerName,
  RankInfo,
  MMRDisplay,
  StatsGrid,
  StatBox,
  ProgressSection,
  ProgressLabel,
  ProgressBar,
  ProgressFill,
  RecentMatches,
  MatchItem,
  LoadingState,
} from "./styles";

interface PlayerStatsData {
  id: string;
  mmr: number;
  rankTier: string;
  rankPoints: number;
  peakMmr: number;
  wins: number;
  losses: number;
  totalKills: number;
  totalDeaths: number;
  totalAssists: number;
  totalMatches: number;
  avgPlacement: number;
  winStreak: number;
  bestStreak: number;
  kd: string;
  winRate: string;
  rankPosition: number;
  user: {
    id: string;
    steamId: string;
    personaName: string;
    avatar: string;
  };
  recentMatches: Array<{
    id: string;
    placement: number;
    kills: number;
    deaths: number;
    assists: number;
    mmrChange: number;
    match: {
      gameType: string;
      totalPlayers: number;
      createdAt: string;
    };
  }>;
}

interface PlayerStatsProps {
  userId?: string;
}

export const PlayerStats: React.FC<PlayerStatsProps> = ({ userId }) => {
  const [stats, setStats] = useState<PlayerStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [userId]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      let targetUserId = userId;

      if (!targetUserId) {
        const userData = localStorage.getItem("userData");
        if (userData) {
          const user = JSON.parse(userData);
          targetUserId = user.id;
        }
      }

      if (!targetUserId) {
        setLoading(false);
        return;
      }

      const response = await apiClient().get(`/stats/player/${targetUserId}`);
      const data = JSON.parse(response.data);

      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <StatsContainer>
        <LoadingState>Carregando estatísticas...</LoadingState>
      </StatsContainer>
    );
  }

  if (!stats) {
    return (
      <StatsContainer>
        <LoadingState>Nenhuma estatística encontrada</LoadingState>
      </StatsContainer>
    );
  }

  return (
    <StatsContainer>
      <CardHeader>
        <AvatarWrapper>
          <Avatar
            src={stats.user.avatar || "/default-avatar.png"}
            alt={stats.user.personaName}
          />
          <TierBadge $tier={stats.rankTier}>
            {getTierIcon(stats.rankTier)} {stats.rankTier}
          </TierBadge>
        </AvatarWrapper>
        <PlayerName>{stats.user.personaName}</PlayerName>
        <RankInfo>
          <span>🏆 Rank #{stats.rankPosition}</span>
          <span>•</span>
          <span>Peak: {stats.peakMmr} MMR</span>
        </RankInfo>
        <MMRDisplay>
          <span className="mmr-value">{stats.mmr}</span>
          <span className="mmr-label">MMR</span>
        </MMRDisplay>
      </CardHeader>

      <StatsGrid>
        <StatBox>
          <div className="value">{stats.totalMatches}</div>
          <div className="label">Partidas</div>
        </StatBox>
        <StatBox>
          <div className="value">{stats.wins}</div>
          <div className="label">Vitórias</div>
        </StatBox>
        <StatBox>
          <div className="value">{stats.winRate}%</div>
          <div className="label">Win Rate</div>
        </StatBox>
        <StatBox>
          <div className="value">{stats.totalKills}</div>
          <div className="label">Kills</div>
        </StatBox>
        <StatBox>
          <div className="value">{stats.kd}</div>
          <div className="label">K/D</div>
        </StatBox>
        <StatBox>
          <div className="value">{stats.bestStreak}</div>
          <div className="label">Best Streak</div>
        </StatBox>
      </StatsGrid>

      <ProgressSection>
        <ProgressLabel>
          <span>Progresso para próximo tier</span>
          <span>{stats.rankPoints}/100</span>
        </ProgressLabel>
        <ProgressBar>
          <ProgressFill $percent={stats.rankPoints} />
        </ProgressBar>
      </ProgressSection>

      {stats.recentMatches.length > 0 && (
        <RecentMatches>
          <h3>📊 Últimas Partidas</h3>
          {stats.recentMatches.slice(0, 5).map((match) => (
            <MatchItem key={match.id} $won={match.placement === 1}>
              <div className="match-info">
                <span className="game-type">{match.match.gameType}</span>
                <span className="date">
                  {formatDate(match.match.createdAt)}
                </span>
              </div>
              <div className="match-stats">
                <div className="stat">
                  <div className="value">{match.kills}</div>
                  <div className="label">Kills</div>
                </div>
                <div className="stat">
                  <div className="value">
                    {match.mmrChange >= 0 ? "+" : ""}
                    {match.mmrChange}
                  </div>
                  <div className="label">MMR</div>
                </div>
              </div>
              <div className="placement">#{match.placement}</div>
            </MatchItem>
          ))}
        </RecentMatches>
      )}
    </StatsContainer>
  );
};

export default PlayerStats;
