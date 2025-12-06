// Configuração do servidor FiveM
export const FIVEM_CONFIG = {
  // IP do servidor FiveM
  serverIp: import.meta.env.VITE_FIVEM_SERVER_IP || "localhost",

  // Porta do servidor FiveM
  serverPort: import.meta.env.VITE_FIVEM_SERVER_PORT || "30120",

  // Timeout para auto-conexão (segundos)
  autoConnectTimeout: 30,

  // URL de conexão formatada
  get connectionUrl() {
    return `fivem://connect/${this.serverIp}:${this.serverPort}`;
  },
};
