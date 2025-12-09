import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(46, 160, 67, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(46, 160, 67, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(46, 160, 67, 0);
  }
`;

const StyledButton = styled.button`
  /* Green Theme: Dark Green/Black -> Forest Green -> Emerald */
  background: linear-gradient(135deg, #0d1117 0%, #1a2e1a 50%, #238636 100%);
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  padding: 1rem 2rem;
  border: 1px solid rgba(46, 160, 67, 0.3);
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3),
              0 0 15px rgba(35, 134, 54, 0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
  min-width: 250px;

  /* Glass/Glow effect overlay */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      rgba(76, 175, 80, 0.2), /* Green tint */
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transform: skewX(-20deg);
    animation: ${shimmer} 3s infinite;
    pointer-events: none;
  }

  /* Pulse animation */
  animation: ${pulse} 2s infinite;

  &:hover {
    /* Brighter Green Gradient */
    background: linear-gradient(135deg, #1a2e1a 0%, #238636 50%, #2ea043 100%);
    border-color: #2ea043;
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5),
                0 0 20px rgba(46, 160, 67, 0.6);
    color: #fff;
    text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);

    &::before {
      animation-duration: 1.5s;
    }
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4),
                0 0 10px rgba(46, 160, 67, 0.4);
  }

  svg {
    transition: transform 0.3s ease;
    filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.3));
  }

  &:hover svg {
    transform: rotate(-5deg) scale(1.1);
    filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.8));
  }
`;

const SteamIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11.979 2C6.466 2 2 6.486 2 12c0 4.858 3.447 8.905 8.01 9.818l.012.003L7.525 16.29c-.279.117-.58.175-.884.175a2.25 2.25 0 0 1-2.25-2.25c0-.986.635-1.83 1.523-2.128l3.613-1.493V8.5c0-.276.224-.5.5-.5.276 0 .5.224.5.5v2.332l4.475-1.847c.159-.065.334-.105.525-.105a2.25 2.25 0 0 1 2.25 2.25c0 .986-.635 1.83-1.523 2.128l-3.21 1.326v5.204c4.56-.917 8-4.962 8-9.789 0-5.514-4.486-10-10-10zM8.6 14.38a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zm6.75-3.26a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z" />
  </svg>
);

const SteamLoginButton = () => {
  const redirectToSteamAuth = () => {
    const authUrl = `http://localhost:5000/auth/steam`;
    window.location.href = authUrl;
  };

  return (
    <StyledButton onClick={redirectToSteamAuth}>
      <SteamIcon />
      <span>Conectar com Steam</span>
    </StyledButton>
  );
};

export default SteamLoginButton;
