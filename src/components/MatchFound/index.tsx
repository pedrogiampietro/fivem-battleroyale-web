import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useMatchmaking } from "../../contexts/MatchmakingContext";
import { FIVEM_CONFIG } from "../../config/fivem.config";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(52, 178, 123, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(52, 178, 123, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(52, 178, 123, 0);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(9, 9, 11, 0.8);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const ModalContent = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--primary);
  border-radius: 24px;
  padding: 3rem;
  text-align: center;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary), #2ea06d);
  }
`;

const Title = styled.h1`
  color: var(--primary);
  font-family: 'Rajdhani', sans-serif;
  font-size: 3rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-shadow: 0 0 20px rgba(52, 178, 123, 0.3);
`;

const Subtitle = styled.p`
  color: var(--text-main);
  font-size: 1.125rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const MatchInfo = styled.div`
  background: var(--bg-dark);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  color: var(--text-muted);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
`;

const InfoValue = styled.span`
  color: var(--text-main);
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Rajdhani', sans-serif;
`;

const ConnectButton = styled.button`
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 1rem 3rem;
  font-size: 1.125rem;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  animation: ${pulse} 2s infinite;
  width: 100%;
  font-family: 'Rajdhani', sans-serif;

  &:hover {
    transform: translateY(-2px);
    background: #2ea06d;
    box-shadow: 0 10px 20px -5px rgba(52, 178, 123, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Timer = styled.div`
  color: var(--text-muted);
  font-size: 0.875rem;
  margin-top: 1.5rem;
  font-weight: 500;
  
  span {
    color: var(--primary);
    font-weight: 700;
  }
`;

const MatchFound: React.FC = () => {
  const { matchFound, match, connectToServer, setPlayerIsReady } =
    useMatchmaking();
  const [countdown, setCountdown] = useState(FIVEM_CONFIG.autoConnectTimeout);

  useEffect(() => {
    if (!matchFound) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto-conectar quando o tempo acabar
          connectToServer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [matchFound, connectToServer]);

  if (!matchFound) return null;

  const handleConnect = () => {
    connectToServer();
  };

  const handleCancel = () => {
    setPlayerIsReady(false);
    // Aqui poderia ter lógica para cancelar a participação
  };

  return (
    <Overlay>
      <ModalContent>
        <Title>Partida Encontrada!</Title>
        <Subtitle>Sua partida está pronta. Conecte-se ao servidor!</Subtitle>

        <MatchInfo>
          <InfoRow>
            <InfoLabel>Match ID</InfoLabel>
            <InfoValue>{match?.matchId?.substring(0, 8) || "..."}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Modo</InfoLabel>
            <InfoValue>{match?.gameType || "SOLO"}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Jogadores</InfoLabel>
            <InfoValue>{match?.playerCount || 1}</InfoValue>
          </InfoRow>
        </MatchInfo>

        <ConnectButton onClick={handleConnect}>
          Conectar Agora
        </ConnectButton>

        <Timer>Conectando automaticamente em <span>{countdown}s</span></Timer>
      </ModalContent>
    </Overlay>
  );
};

export default MatchFound;
