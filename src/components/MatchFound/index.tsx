import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useMatchmaking } from "../../contexts/MatchmakingContext";
import { FIVEM_CONFIG } from "../../config/fivem.config";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
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
    box-shadow: 0 0 0 20px rgba(52, 178, 123, 0);
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
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled.div`
  background: linear-gradient(145deg, #11181c, #1a2329);
  border: 2px solid #34b27b;
  border-radius: 20px;
  padding: 50px;
  text-align: center;
  max-width: 500px;
  width: 90%;
  animation: ${fadeIn} 0.5s ease-out;
`;

const Title = styled.h1`
  color: #34b27b;
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 3px;
`;

const Subtitle = styled.p`
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 30px;
  opacity: 0.8;
`;

const MatchInfo = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  color: #888;
  font-size: 0.9rem;
`;

const InfoValue = styled.span`
  color: #fff;
  font-size: 0.9rem;
  font-weight: bold;
`;

const ConnectButton = styled.button`
  background: linear-gradient(135deg, #34b27b, #248a5e);
  color: #fff;
  border: none;
  padding: 18px 50px;
  font-size: 1.3rem;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  animation: ${pulse} 2s infinite;
  
  &:hover {
    transform: scale(1.05);
    background: linear-gradient(135deg, #3dc98a, #34b27b);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const Timer = styled.div`
  color: #ff6b6b;
  font-size: 1.5rem;
  margin-top: 20px;
  font-weight: bold;
`;

const MatchFound: React.FC = () => {
  const { matchFound, match, connectToServer, setPlayerIsReady } = useMatchmaking();
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
        <Title>🎮 Partida Encontrada!</Title>
        <Subtitle>Sua partida está pronta. Conecte-se ao servidor!</Subtitle>
        
        <MatchInfo>
          <InfoRow>
            <InfoLabel>Match ID:</InfoLabel>
            <InfoValue>{match?.matchId?.substring(0, 8) || "..."}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Modo:</InfoLabel>
            <InfoValue>{match?.gameType || "SOLO"}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Jogadores:</InfoLabel>
            <InfoValue>{match?.playerCount || 1}</InfoValue>
          </InfoRow>
        </MatchInfo>
        
        <ConnectButton onClick={handleConnect}>
          Conectar ao Servidor
        </ConnectButton>
        
        <Timer>
          Conectando automaticamente em {countdown}s
        </Timer>
      </ModalContent>
    </Overlay>
  );
};

export default MatchFound;
