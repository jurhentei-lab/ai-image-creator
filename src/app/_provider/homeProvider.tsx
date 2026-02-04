"use client";
import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
// const HomeContext = createContext(null) //JS

type HomeContextType = {
  activeTab: string;
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
  const [activeTab, setActiveTab] = useState("analysis");
  const handleChangeAnalysis = () => setActiveTab("analysis");
  const handleChangeRecognition = () => setActiveTab("recognition");
  const handleChangeCreator = () => setActiveTab("creator");

  return (
    <HomeContext.Provider
      value={{
        activeTab,
        handleChangeAnalysis,
        handleChangeCreator,
        handleChangeRecognition,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
