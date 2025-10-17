export const walletThemes = {
  "#000000": {
    background: "linear-gradient(180deg, #1E1E1E 0%, #000000 100%)",
    textColor: "#FFFFFF",
    chipColor: "rgba(255,255,255,0.2)",
    border: "none",
  },
  "#FFFFFF": {
    background: "linear-gradient(180deg, #FFFFFF 0%, #EAEAEA 100%)",
    textColor: "#000000",
    chipColor: "rgba(0,0,0,0.15)",
    border: "1px solid rgba(0,0,0,0.1)",
  },
  "#FFD700": {
    background: "linear-gradient(180deg, #FFD700 0%, #E5B700 100%)",
    textColor: "#000000",
    chipColor: "rgba(0,0,0,0.15)",
    border: "none",
  },
  "#800080": {
    background: "linear-gradient(180deg, #B76AFF 0%, #5E2C8B 100%)",
    textColor: "#FFFFFF",
    chipColor: "rgba(255,255,255,0.25)",
    border: "none",
  },
} as const;

export const defaultWalletTheme = {
  background: "#333333",
  textColor: "#FFFFFF",
  chipColor: "rgba(255,255,255,0.2)",
  border: "none",
};

export type WalletTheme = (typeof walletThemes)[keyof typeof walletThemes];
