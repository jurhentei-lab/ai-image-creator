"use client";
import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
// const HomeContext = createContext(null) //JS

type HomeTab = "analysis" | "recognition" | "creator";

type HomeContextType = {
  activeTab: HomeTab;
  handleChangeAnalysis: () => void;
  handleChangeRecognition: () => void;
  handleChangeCreator: () => void;
};

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("useHomeContext must be used inside <HomeProvider>");
  }

  return context;
};

// export const HomeProvider = ({children})=>{}

export const HomeProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<HomeTab>("analysis");

  const handleChangeAnalysis = useCallback(() => {
    setActiveTab("analysis");
  }, []);

  const handleChangeRecognition = useCallback(() => {
    setActiveTab("recognition");
  }, []);

  const handleChangeCreator = useCallback(() => {
    setActiveTab("creator");
  }, []);

  const contextValue = useMemo(
    () => ({
      activeTab,
      handleChangeAnalysis,
      handleChangeCreator,
      handleChangeRecognition,
    }),
    [
      activeTab,
      handleChangeAnalysis,
      handleChangeCreator,
      handleChangeRecognition,
    ]
  );

  return (
    <HomeContext.Provider value={contextValue}>
      {children}
    </HomeContext.Provider>
  );
};
