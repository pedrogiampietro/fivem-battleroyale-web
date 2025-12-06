import styled from "styled-components";

export const MenuContainer = styled.div`
  background: rgba(24, 24, 27, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 0px;
  width: 72px;
  height: auto;
  min-height: 300px;
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  left: 40px;
  gap: 1.5rem;
  z-index: 500;
`;

export const MenuItem = styled.a`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: var(--text-muted);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
  cursor: pointer;
  position: relative;
  border-radius: 12px;
  text-decoration: none;
  font-size: 1.2rem;

  &:hover {
    color: var(--primary);
    background: rgba(52, 178, 123, 0.1);
    border-color: rgba(52, 178, 123, 0.2);
    box-shadow: 0 0 15px var(--primary-glow);
    transform: translateX(5px);

    &::after {
      content: attr(data-tooltip);
      position: absolute;
      left: 60px;
      background-color: var(--bg-card);
      color: var(--text-main);
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 0.875rem;
      font-family: 'Inter', sans-serif;
      white-space: nowrap;
      border: 1px solid var(--border-color);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      opacity: 1;
      visibility: visible;
    }
  }

  &::after {
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
  }

  &.is-current {
    color: var(--text-main);
    background: var(--primary);
    box-shadow: 0 0 20px var(--primary-glow);
    
    &:hover {
      transform: none;
    }
  }
    background: linear-gradient(91.48deg, #34b27b 0%, #248a5e 100%);
  }

  svg {
    width: 15px;
    height: 15px;
  }
`;

export const AvatarCardContainer = styled.div`
  background: rgba(17, 24, 28, 0.98);
  backdrop-filter: blur(5px);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0px;
  width: 200px;
  height: 250px;
  position: fixed;
  top: 70px;
  right: 10%;
  gap: 1rem;
  z-index: 500;

  & p {
    font-size: 9px;
  }
`;

export const AvatarImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

export const AvatarName = styled.span`
  color: white;
  font-size: 1rem;
`;

export const LogoutIconContainer = styled.div`
  width: 1.875rem;
  height: 1.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

export const LogoutButton = styled.button`
  width: 30px;
  background: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  text-decoration: underline;
  position: relative;
  overflow: hidden;
  border-radius: 5px;

  &::before {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    z-index: -1;
  }

  &:hover {
    color: #34b27b;
    &::before {
      background-color: rgba(0, 0, 0, 0.6);
    }

    ${LogoutIconContainer} {
      filter: brightness(1.2);
    }
  }
`;

export const GroupRequestCard = styled.div`
  background: rgba(17, 24, 28, 0.98);
  backdrop-filter: blur(5px);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0px;
  width: 200px;
  position: fixed;
  top: calc(70px + 250px + 20px);
  right: 10%;
  gap: 1rem;
  z-index: 500;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const GroupRequestItem = styled.div`
  width: 160px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: #1a2329;
  color: #4a5568;
  transition: all 0.4s ease 0s;
  border-radius: 5px;
  margin-bottom: 10px;

  &:hover {
    color: #34b27b;
  }

  span {
    font-size: 14px;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  ${ActionButtons} {
    display: flex;
    gap: 10px;
  }
`;

export const AcceptButton = styled.button`
  background-color: #34b27b;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #248a5e;
  }
`;

export const RejectButton = styled.button`
  background-color: #f44336;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #da190b;
  }
`;
