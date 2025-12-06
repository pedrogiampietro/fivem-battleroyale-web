import styled, { css, keyframes } from "styled-components";

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(52, 178, 123, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(52, 178, 123, 0); }
  100% { box-shadow: 0 0 0 0 rgba(52, 178, 123, 0); }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 2rem;
  justify-content: center;
  padding: 1rem;
  max-width: 1400px;
  margin: 0 auto;
`;

export const Card = styled.div<{ $isSearching?: boolean }>`
  background: var(--bg-card);
  border-radius: 24px;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 480px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  ${props => props.$isSearching && css`
    border-color: var(--primary);
    box-shadow: 0 0 20px rgba(52, 178, 123, 0.2);
  `}

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px -5px rgba(0, 0, 0, 0.3);
    border-color: var(--primary);
    
    &::before {
      opacity: 1;
    }
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 24px;
    padding: 1px;
    background: linear-gradient(
      180deg,
      rgba(52, 178, 123, 0) 0%,
      rgba(52, 178, 123, 0.5) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
`;

export const CardHeader = styled.div`
  position: relative;
  height: 220px;
  overflow: hidden;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

export const ModeBadge = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  padding: 0.5rem 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  font-size: 1.25rem;
  text-transform: uppercase;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

  svg {
    color: var(--primary);
  }
`;

export const CardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 1.5rem;
`;

export const Description = styled.p`
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.5;
  min-height: 3rem;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  background: rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

export const StatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`;

export const StatLabel = styled.span`
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  svg {
    font-size: 0.875rem;
  }
`;

export const StatValue = styled.span`
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-main);
`;

export const Button = styled.button<{ $isSearching?: boolean }>`
  position: relative;
  border: none;
  background: ${props => props.$isSearching 
    ? 'rgba(239, 68, 68, 0.1)' 
    : 'var(--primary)'};
  color: ${props => props.$isSearching ? '#ef4444' : '#fff'};
  font-size: 1rem;
  padding: 1rem;
  border-radius: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  width: 100%;
  margin-top: auto;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.$isSearching ? 'rgba(239, 68, 68, 0.2)' : 'transparent'};

  ${props => !props.$isSearching && css`
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 50%;
      height: 100%;
      background: linear-gradient(
        to right,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transform: skewX(-25deg);
      transition: 0.5s;
    }

    &:hover {
      background: #2ea06d;
      box-shadow: 0 0 20px var(--primary-glow);
      transform: translateY(-2px);

      &::before {
        left: 150%;
        transition: 0.5s;
      }
    }
  `}

  ${props => props.$isSearching && css`
    &:hover {
      background: rgba(239, 68, 68, 0.2);
      border-color: #ef4444;
    }

    .loader {
      display: inline-block;
      animation: blink 1.4s infinite both;
    }

    @keyframes blink {
      0% { opacity: .2; }
      20% { opacity: 1; }
      100% { opacity: .2; }
    }
  `}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background: #27272a;
    color: #71717a;
    box-shadow: none;
    transform: none;
  }
`;

// Legacy exports to prevent breaking changes if referenced elsewhere
export const MatchmakingTitle = styled.strong``;
export const MatchmakingInfo = styled.div``;
export const InfoPair = styled.div``;
export const InfoLabel = styled.span``;
export const InfoData = styled.p``;
