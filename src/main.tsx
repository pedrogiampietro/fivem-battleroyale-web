import React from "react";
import ReactDOM from "react-dom/client";

import { GlobalStyle } from "./assets/globalStyles";
import MainRouter from "./MainRouter";
import { MatchmakingProvider } from "./contexts/MatchmakingContext";
import { GroupRequestProvider } from "./contexts/ManageInvitesContext";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <MatchmakingProvider>
    <GroupRequestProvider>
      <GlobalStyle />
      <MainRouter />
      <Toaster
        gutter={8}
        toastOptions={{
          style: {
            background: "#11181c",
            color: "#f5f5f5",
            borderRadius: "4px",
            border: "1px solid rgba(52, 178, 123, 0.3)",
            padding: "16px",
            fontSize: "14px",
          },
        }}
      />
    </GroupRequestProvider>
  </MatchmakingProvider>
);
