import { createContext, useContext } from "react";

export type Appearance = "dark" | "light";

export interface ThemeContextValue {
  appearance: Appearance;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  appearance: "dark",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);
