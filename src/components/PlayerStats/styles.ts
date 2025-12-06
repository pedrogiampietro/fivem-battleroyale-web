import styled from "styled-components";

export const StatsContainer = styled.div`
  width: 100%;
  max-width: 400px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const CardHeader = styled.div`
  position: relative;
  padding: 30px 20px;
  background: linear-gradient(135deg, rgba(255, 200, 0, 0.2) 0%, rgba(255, 100, 0, 0.1) 100%);
  text-align: center;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #ffc107;
  box-shadow: 0 0 20px rgba(255, 193, 7, 0.4);
`;

export const TierBadge = styled.div<{ $tier: string }>`
  position: absolute;
  bottom: -5px;
  right: -5px;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: bold;
  background: ${props => {
    switch (props.$tier) {
      case 'CHALLENGER': return 'linear-gradient(135deg, #00ffff 0%, #0088ff 100%)';
      case 'MASTER': return 'linear-gradient(135deg, #ff00ff 0%, #aa00ff 100%)';
      case 'DIAMOND': return 'linear-gradient(135deg, #00bfff 0%, #0066ff 100%)';
      case 'PLATINUM': return 'linear-gradient(135deg, #00ff88 0%, #00aa55 100%)';
      case 'GOLD': return 'linear-gradient(135deg, #ffd700 0%, #ff9900 100%)';
      case 'SILVER': return 'linear-gradient(135deg, #c0c0c0 0%, #888888 100%)';
      default: return 'linear-gradient(135deg, #cd7f32 0%, #8b4513 100%)';
    }
  }};
  color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
`;

export const PlayerName = styled.h2`
  margin: 15px 0 5px;
  font-size: 1.5rem;
  color: #fff;
`;

export const RankInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #ffc107;
  font-size: 0.9rem;
`;

export const MMRDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  
  .mmr-value {
    font-size: 2.5rem;
    font-weight: bold;
    color: #ffc107;
    text-shadow: 0 0 10px rgba(255, 193, 7, 0.5);
  }
  
  .mmr-label {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: rgba(255, 255, 255, 0.1);
  padding: 1px;
`;

export const StatBox = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  text-align: center;
  
  .value {
    font-size: 1.8rem;
    font-weight: bold;
    color: #fff;
  }
  
  .label {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 5px;
  }
`;

export const ProgressSection = styled.div`
  padding: 20px;
`;

export const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
`;

export const ProgressBar = styled.div`
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${props => props.$percent}%;
  background: linear-gradient(90deg, #ffc107 0%, #ff9800 100%);
  border-radius: 4px;
  transition: width 0.5s ease;
`;

export const RecentMatches = styled.div`
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  h3 {
    font-size: 1rem;
    color: #fff;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const MatchItem = styled.div<{ $won: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  margin-bottom: 8px;
  background: ${props => props.$won 
    ? 'rgba(76, 175, 80, 0.15)' 
    : 'rgba(244, 67, 54, 0.15)'};
  border-radius: 8px;
  border-left: 3px solid ${props => props.$won ? '#4caf50' : '#f44336'};
  
  .match-info {
    display: flex;
    flex-direction: column;
    gap: 3px;
    
    .game-type {
      font-size: 0.85rem;
      color: #fff;
      font-weight: 500;
    }
    
    .date {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.5);
    }
  }
  
  .match-stats {
    display: flex;
    gap: 15px;
    
    .stat {
      text-align: center;
      
      .value {
        font-size: 1rem;
        font-weight: bold;
        color: #fff;
      }
      
      .label {
        font-size: 0.65rem;
        color: rgba(255, 255, 255, 0.5);
        text-transform: uppercase;
      }
    }
  }
  
  .placement {
    font-size: 1.2rem;
    font-weight: bold;
    color: ${props => props.$won ? '#4caf50' : '#f44336'};
    min-width: 45px;
    text-align: center;
  }
`;

export const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  color: rgba(255, 255, 255, 0.6);
`;
