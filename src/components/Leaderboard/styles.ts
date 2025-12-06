import styled from "styled-components";

export const LeaderboardContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const LeaderboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  h1 {
    font-size: 2.5rem;
    color: #fff;
    text-shadow: 0 0 10px rgba(255, 200, 0, 0.5);
  }
`;

export const FilterTabs = styled.div`
  display: flex;
  gap: 10px;
`;

export const FilterTab = styled.button<{ $active?: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: ${props => props.$active ? 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.$active ? '#000' : '#fff'};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background: ${props => props.$active ? 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)' : 'rgba(255, 255, 255, 0.2)'};
  }
`;

export const LeaderboardTable = styled.div`
  background: rgba(0, 0, 0, 0.6);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr 100px 100px 100px 100px 120px;
  padding: 15px 20px;
  background: rgba(255, 200, 0, 0.1);
  border-bottom: 1px solid rgba(255, 200, 0, 0.3);
  font-weight: bold;
  color: #ffc107;
  font-size: 0.9rem;
`;

export const TableRow = styled.div<{ $isCurrentUser?: boolean; $rank?: number }>`
  display: grid;
  grid-template-columns: 80px 1fr 100px 100px 100px 100px 120px;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  align-items: center;
  transition: all 0.2s ease;
  background: ${props => {
    if (props.$isCurrentUser) return 'rgba(255, 200, 0, 0.15)';
    if (props.$rank === 1) return 'rgba(255, 215, 0, 0.1)';
    if (props.$rank === 2) return 'rgba(192, 192, 192, 0.1)';
    if (props.$rank === 3) return 'rgba(205, 127, 50, 0.1)';
    return 'transparent';
  }};
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

export const RankBadge = styled.div<{ $rank: number }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
  background: ${props => {
    if (props.$rank === 1) return 'linear-gradient(135deg, #ffd700 0%, #ffaa00 100%)';
    if (props.$rank === 2) return 'linear-gradient(135deg, #c0c0c0 0%, #a0a0a0 100%)';
    if (props.$rank === 3) return 'linear-gradient(135deg, #cd7f32 0%, #a05a20 100%)';
    return 'rgba(255, 255, 255, 0.1)';
  }};
  color: ${props => props.$rank <= 3 ? '#000' : '#fff'};
  box-shadow: ${props => props.$rank <= 3 ? '0 4px 15px rgba(0,0,0,0.3)' : 'none'};
`;

export const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

export const PlayerAvatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.2);
`;

export const PlayerName = styled.div`
  display: flex;
  flex-direction: column;
  
  .name {
    font-weight: bold;
    color: #fff;
    font-size: 1rem;
  }
  
  .tier {
    font-size: 0.8rem;
    color: #ffc107;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

export const StatCell = styled.div`
  text-align: center;
  font-size: 0.95rem;
  color: #fff;
`;

export const MMRCell = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 1.1rem;
  color: #ffc107;
`;

export const TierBadge = styled.span<{ $tier: string }>`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
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
  color: ${props => ['GOLD', 'SILVER'].includes(props.$tier) ? '#000' : '#fff'};
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px;
  color: #fff;
  font-size: 1.2rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px;
  color: rgba(255, 255, 255, 0.5);
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 1rem;
  }
`;
