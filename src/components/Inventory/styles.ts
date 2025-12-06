import styled from "styled-components";

interface TabProps {
  $isActive: boolean;
}

interface SlotProps {
  $rarity?: string;
  $equipped?: boolean;
}

interface RarityProps {
  $color: string;
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

export const ContentContainer = styled.div`
  padding: 0;
`;

export const InventoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    font-family: 'Rajdhani', sans-serif;
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text-main);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

export const InventoryInfo = styled.div`
  display: flex;
  gap: 1rem;

  span {
    background: var(--bg-dark);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 0.875rem;
    color: var(--text-muted);
    border: 1px solid var(--border-color);
  }
`;

export const TabsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
`;

export const Tab = styled.button<TabProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: 'Rajdhani', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: ${(props) =>
    props.$isActive
      ? "var(--primary)"
      : "transparent"};
  border-radius: 8px;
  cursor: pointer;
  color: ${(props) => (props.$isActive ? "#fff" : "var(--text-muted)")};
  transition: all 0.2s ease;
  border: 1px solid ${(props) => (props.$isActive ? "transparent" : "var(--border-color)")};

  svg {
    font-size: 1rem;
  }

  span {
    @media (max-width: 768px) {
      display: none;
    }
  }

  &:hover {
    background: ${(props) =>
      props.$isActive
        ? "#2ea06d"
        : "rgba(255, 255, 255, 0.05)"};
    color: ${(props) => (props.$isActive ? "#fff" : "var(--text-main)")};
    border-color: ${(props) => (props.$isActive ? "transparent" : "var(--text-muted)")};
  }
`;

export const InventoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
  padding: 0.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
`;

export const InventorySlot = styled.div<SlotProps>`
  background: var(--bg-dark);
  border: 2px solid ${(props) => props.$equipped ? 'var(--primary)' : 'var(--border-color)'};
  padding: 1rem;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 12px;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  ${(props) => props.$equipped && `
    box-shadow: 0 0 15px rgba(52, 178, 123, 0.3);
  `}

  &:hover {
    border-color: var(--primary);
    box-shadow: 0 0 20px rgba(52, 178, 123, 0.2);
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.02);
  }

  &:active {
    transform: translateY(-2px);
  }
`;

export const RarityIndicator = styled.div<RarityProps>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: ${(props) => props.$color};
  box-shadow: 0 0 10px ${(props) => props.$color};
`;

export const EquippedBadge = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  background: var(--primary);
  color: #fff;
  font-size: 0.625rem;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const ItemImage = styled.img`
  width: 72px;
  height: 72px;
  object-fit: contain;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
  margin-top: 0.5rem;
`;

export const ItemName = styled.span`
  color: var(--text-main);
  margin-top: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
  font-family: 'Rajdhani', sans-serif;
  line-height: 1.2;
`;

export const ItemCategory = styled.span`
  color: var(--text-muted);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.25rem;
`;

export const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  color: var(--text-muted);

  p {
    font-size: 1rem;
  }
`;