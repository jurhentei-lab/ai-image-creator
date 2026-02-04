"use client";

import { ButtonGroup } from "./_features/ButtonGroup";
import { Header } from "./_features/Header";
import { ImageAnalysis } from "./_features/ImageAnalysis";
import { ImageCreator } from "./_features/ImageCreator";
import { IngredientRecognition } from "./_features/IngredientRecognition";
import { useHomeContext } from "./_provider/homeProvider";

export default function Home() {
  const { activeTab } = useHomeContext();

  return (
    <div>
      <Header />
      <div className="w-full h-full ">
        <div className="flex flex-col gap-6 items-center py-6">
          <ButtonGroup />
          {activeTab === "analysis" && <ImageAnalysis />}
          {activeTab === "recognition" && <IngredientRecognition />}
          {activeTab === "creator" && <ImageCreator />}
        </div>
      </div>
    </div>
  );
}
