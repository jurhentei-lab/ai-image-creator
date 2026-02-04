"use client";
import { Button } from "@/components/ui/button";

import { useHomeContext } from "../_provider/homeProvider";

export const ButtonGroup = () => {
  const {
    handleChangeAnalysis,
    activeTab,
    handleChangeCreator,
    handleChangeRecognition,
  } = useHomeContext();
  return (
    <div className="space-y-4">
      <div className="flex gap-0 bg-gray-100 rounded-lg p-1 w-105 h-9 items-center">
        <Button
          variant="ghost"
          onClick={handleChangeAnalysis}
          className={`w-30.75 h-7 ${
            activeTab === "analysis"
              ? "bg-white shadow-sm text-black"
              : "text-gray-400"
          }`}
        >
          Image analysis
        </Button>
        <Button
          variant="ghost"
          onClick={handleChangeRecognition}
          className={`w-43 h-7 ${
            activeTab === "recognition"
              ? "bg-white shadow-sm text-black"
              : "text-gray-400"
          }`}
        >
          Ingredient recognition
        </Button>
        <Button
          variant="ghost"
          onClick={handleChangeCreator}
          className={`w-29.25 h-7 ${
            activeTab === "creator"
              ? "bg-white shadow-sm text-black"
              : "text-gray-400"
          }`}
        >
          Image creator
        </Button>
      </div>

      {/* {activeTab === "analysis" && <ImageAnalysis />}
      {activeTab === "recognition" && <IngredientRecognition />}
      {activeTab === "creator" && <ImageCreator />} */}
    </div>
  );
};
