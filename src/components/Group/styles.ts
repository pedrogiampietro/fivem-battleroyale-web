import styled, { css } from "styled-components";
import { FiSearch } from "react-icons/fi";
import { FaCrown } from "react-icons/fa";

export interface StatusButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $playerReady: boolean;
}
interface CollapseWrapperProps {
  $isOpen: boolean;
}

export const GroupSection = styled.section`
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 1.5rem 2rem;
  margin-top: 2rem;
  margin-bottom: 4rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

export const InnerGroupSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

export const PlayerBox = styled.div`
  background: linear-gradient(
    135deg,
    rgba(52, 178, 123, 0.1) 0%,
    rgba(52, 178, 123, 0.2) 100%
  );
  border: 1px solid rgba(52, 178, 123, 0.3);
  border-radius: 12px;
  height: 4.5rem;
  width: 100%;
  padding: 0 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(
      135deg,
      rgba(52, 178, 123, 0.15) 0%,
      rgba(52, 178, 123, 0.25) 100%
    );
    border-color: var(--primary);
    box-shadow: 0 0 15px var(--primary-glow);
  }
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 1rem;
  border: 2px solid var(--primary);
`;

export const CrownIcon = styled(FaCrown)`
  color: #ffd700;
  margin-left: 8px;
  filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.5));
`;

export const AddPlayerBox = styled(PlayerBox)`
  background: transparent;
  border: 2px dashed var(--border-color);
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.03);
    border-color: var(--text-muted);
    box-shadow: none;
  }
`;

export const StatusButton = styled.button<StatusButtonProps>`
  background: ${(props) =>
    props.$playerReady ? "var(--primary)" : "var(--bg-dark)"};
  color: ${(props) =>
    props.$playerReady ? "#fff" : "var(--text-muted)"};
  border: 1px solid ${(props) =>
    props.$playerReady ? "transparent" : "var(--border-color)"};
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  padding: 4px 8px;
  transition: all 0.3s ease;
  font-weight: 600;
  text-transform: uppercase;

  &:hover {
    background: ${(props) =>
      props.$playerReady ? "#2ea06d" : "var(--border-color)"};
    color: #fff;
  }
`;

export const InviteIcon = styled.div`
  /* Replace this with the actual SVG for your plus icon */
`;

export const CardContainer = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  gap: 0.5rem;
`;

export const CollapseWrapper = styled.div<CollapseWrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  gap: 1rem;
  grid-column: 1 / -1;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  
  ${(props) =>
    props.$isOpen &&
    css`
      height: auto;
      opacity: 1;
      transform: translateY(0);
    `}
    
  ${(props) =>
    !props.$isOpen &&
    css`
      height: 0;
      opacity: 0;
      padding: 0;
      border: none;
      transform: translateY(-10px);
    `}
`;

export const SearchPlayersContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const HeaderContent = styled.header`
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--text-main);
  text-align: center;
`;

export const DescriptionText = styled.p`
  font-size: 0.875rem;
  color: var(--text-muted);
  text-align: center;
`;

export const SearchBox = styled.div`
  width: 100%;
  height: 2.5rem;
  background: var(--bg-dark);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: var(--primary);
    box-shadow: 0 0 0 2px var(--primary-glow);
  }
`;

export const SearchInput = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  background: transparent;
  color: var(--text-main);
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;

  &::placeholder {
    color: var(--text-muted);
  }
`;

export const SearchIcon = styled(FiSearch)`
  margin-right: 0.75rem;
  color: var(--text-muted);
`;

export const FriendsSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
  max-height: 200px;
  overflow-y: auto;
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    width: 4px;
  }
`;

export const NoResultText = styled.p`
  font-size: 0.875rem;
  color: var(--text-muted);
  text-align: center;
  padding: 1rem;
`;

export const Friend = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--bg-dark);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    border-color: var(--text-muted);
  }
`;

export const InviteButton = styled.button`
  background-color: var(--primary);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #2ea06d;
    box-shadow: 0 0 10px var(--primary-glow);
  }

  &:disabled {
    background-color: var(--border-color);
    color: var(--text-muted);
    cursor: not-allowed;
    box-shadow: none;
  }
`;

export const RemoveButton = styled.button`
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(239, 68, 68, 0.2);
    border-color: #ef4444;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
