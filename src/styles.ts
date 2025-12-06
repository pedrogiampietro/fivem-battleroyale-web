import styled from "styled-components";

interface BannerProps {
  background: string;
}

export const CenteredContainer = styled.div`
  width: 100%;
  max-width: 76.25rem;
  margin: -50px auto 30px;
  z-index: 2;
  position: relative;
  padding: 0px 1rem;
  display: flex;
  flex-direction: column;
`;

export const Banner = styled.div<BannerProps>`
  width: 100%;
  height: 45rem;
  position: relative;
  background: linear-gradient(
      to bottom,
      rgba(9, 9, 11, 0) 0%,
      rgba(9, 9, 11, 0.6) 50%,
      #09090b 100%
    ),
    radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%),
    url(${(props) => props.background});
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  mask-image: linear-gradient(to bottom, black 80%, transparent 100%);

  @media (max-width: 1400px) {
    height: 38rem;
  }

  @media (max-width: 1024px) {
    height: 32rem;
  }

  @media (max-width: 768px) {
    height: 25rem;
  }
`;
