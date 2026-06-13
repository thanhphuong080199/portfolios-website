import { lazy, Suspense, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./App.css";
import { LoadingProvider } from "./context/LoadingProvider";
import { ThemeContext, type Appearance } from "./context/ThemeContext";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const MyWorks = lazy(() => import("./pages/MyWorks"));
const Play = lazy(() => import("./pages/Play"));

const App = () => {
  const [appearance, setAppearance] = useState<Appearance>("dark");
  const toggleTheme = () =>
    setAppearance((a) => (a === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ appearance, toggleTheme }}>
    <Theme appearance={appearance} accentColor="violet" grayColor="slate">
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LoadingProvider>
              <Suspense>
                <MainContainer>
                  <Suspense>
                    <CharacterModel />
                  </Suspense>
                </MainContainer>
              </Suspense>
            </LoadingProvider>
          }
        />
        <Route
          path="/myworks"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <MyWorks />
            </Suspense>
          }
        />
        <Route
          path="/play"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Play />
            </Suspense>
          }
        />
      </Routes>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
    </Theme>
    </ThemeContext.Provider>
  );
};

export default App;
