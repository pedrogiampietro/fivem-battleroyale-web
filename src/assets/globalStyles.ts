import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --primary: #34b27b;
    --primary-glow: rgba(52, 178, 123, 0.5);
    --bg-dark: #09090b;
    --bg-card: #18181b;
    --text-main: #ffffff;
    --text-muted: #a1a1aa;
    --border-color: #27272a;
  }

  body {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    background: var(--bg-dark);
    color: var(--text-main);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Rajdhani', sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  button {
    cursor: pointer;
    font-family: 'Rajdhani', sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol {
    list-style: none;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #111; 
  }
 
  ::-webkit-scrollbar-thumb {
    background: #333; 
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--primary); 
  }
`;
