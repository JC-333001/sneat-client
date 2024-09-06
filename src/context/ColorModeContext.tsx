import * as React from "react";
import {
  useTheme,
  ThemeProvider,
  createTheme,
  Theme,
} from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { createContext, useContext } from "react";
import { PaletteMode } from "@mui/material";
import { lightGreen } from "@mui/material/colors";

type ColorModeContextType = {
  mode: string;
  toggleColorMode: () => void;
  theme: Theme;
};

export const ColorModeContext = createContext<ColorModeContextType>({
  mode: "light",
  toggleColorMode: () => {
    console.log("toggle!");
  },
  theme: createTheme(),
});

export const useColorModeContext = () => {
  const [mode, setMode] = React.useState<PaletteMode>("light");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    console.log("change color, current mode = ", mode);
  };

  const theme = createTheme({
    palette: {
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: "#f44336",
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
  });

  const modifiedTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,

          ...(mode === "light"
            ? {
                // palette values for light mode
                background: {
                  default: "#F2F2F7",
                  paper: "#fff",
                },
                text: {
                  primary: "#4C5F71",
                  secondary: "#85909D",
                },
                divider: "#B2B9C1",
                primary: {
                  light: "#E7E7FF",
                  main: "#6A6CFF",
                  dark: "#6A6CFF",
                  contrastText: "#FFF",
                },
              }
            : {
                // palette values for dark mode
                background: {
                  default: "#232333",
                  paper: "#2B2C3F",
                },
                text: {
                  primary: "#C5C5D4",
                  secondary: "#9495A6",
                },
                divider: "#6E6E81",
                primary: {
                  light: "#E7E7FF",
                  main: "#6A6CFF",
                  dark: "#6A6CFF",
                  contrastText: "#FFF",
                },
              }),
          ...{
            success: {
              light: "#E0F6FC",
              main: "#70DD38",
            },
            warn: "#FF3E1D",
            info: {
              light: "#FFF2DE",
              main: "#FFAB00",
            },
          },
        },
      }),
    [mode]
  );

  return {
    theme: modifiedTheme,
    mode,
    toggleColorMode,
  };
};

export const ColorContextProvider = ({ children }) => {
  const value = useColorModeContext();
  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
};

export const useColorContext = () => {
  return useContext(ColorModeContext);
};
