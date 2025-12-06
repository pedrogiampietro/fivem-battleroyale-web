import styled from "styled-components";

interface TabProps {
  $isActive: boolean;
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
  padding: 0.5rem 1.25rem;
  border: none;
  font-size: 0.875rem;
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

  &:hover {
    background: ${(props) =>
      props.$isActive
        ? "#2ea06d"
        : "rgba(255, 255, 255, 0.05)"};
    color: ${(props) => (props.$isActive ? "#fff" : "var(--text-main)")};
    border-color: ${(props) => (props.$isActive ? "transparent" : "var(--text-muted)")};
  }
`;

export const ContentContainer = styled.div`
  padding: 0;
`;

export const InventoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  padding: 0.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }
`;

export const InventorySlot = styled.div`
  background: var(--bg-dark);
  border: 1px solid var(--border-color);
  padding: 1rem;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 12px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: var(--primary);
    box-shadow: 0 0 15px rgba(52, 178, 123, 0.15);
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.02);
  }
`;

export const ItemName = styled.span`
  color: var(--text-muted);
  margin-top: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  font-family: 'Inter', sans-serif;
`;

export const ItemImage = styled.img`
  width: 64px;
  height: 64px;
  object-fit: contain;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
`;