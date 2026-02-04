"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const IngredientRecognition = () => {
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultText, setResultText] = useState<string | null>(null);

  const handleClick = () => {
    setIsActive(true);
    setText("");
    setTimeout(() => {
      setIsActive(false);
    }, 200);
  };

  const handleGenerate = async () => {
    if (!text.trim()) return;

    try {
      setIsGenerating(true);

      const res = await fetch(
        "https://ai-test-back.onrender.com/ingredient-recognition",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: text,
          }),
        }
      );

      const data = await res.json();
      setResultText(data.text);
    } catch (error) {
      console.error("Image generate error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between w-145">
        <div className="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 3V7M19 17V21M3 5H7M17 19H21M12 3L10.088 8.813C9.99015 9.11051 9.82379 9.38088 9.60234 9.60234C9.38088 9.82379 9.11051 9.99015 8.813 10.088L3 12L8.813 13.912C9.11051 14.0099 9.38088 14.1762 9.60234 14.3977C9.82379 14.6191 9.99015 14.8895 10.088 15.187L12 21L13.912 15.187C14.0099 14.8895 14.1762 14.6191 14.3977 14.3977C14.6191 14.1762 14.8895 14.0099 15.187 13.912L21 12L15.187 10.088C14.8895 9.99015 14.6191 9.82379 14.3977 9.60234C14.1762 9.38088 14.0099 9.11051 13.912 8.813L12 3Z"
              stroke="#09090B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="font-semibold text-xl">Ingredient Recognition</p>
        </div>
        <button
          onClick={handleClick}
          className="w-12 h-10 relative flex items-center justify-center px-4 py-2 rounded-md border box-border border-[#E4E4E7]"
        >
          <Image
            src="/reload.svg"
            alt="reload"
            width={16}
            height={16}
            className={isActive ? "" : "opacity-40 grayscale"}
          />
        </button>
      </div>

      <p className="text-sm text-gray-600">
        Describe the food, and AI will detect the ingredients.
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Орц тодорхойлох"
        className="w-145 h-32 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="w-145 flex justify-end">
        <Button
          onClick={handleGenerate}
          disabled={!text.trim() || isGenerating}
          className="bg-gray-800 hover:bg-gray-700 text-white px-6"
        >
          {isGenerating ? "Generating..." : "Generate"}
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <h3 className="text-lg font-semibold">Identified Ingredients</h3>
        </div>

        {isGenerating && (
          <p className="text-sm text-gray-500 animate-pulse">
            Analyzing ingredients...
          </p>
        )}

        {!isGenerating && !resultText && (
          <p className="text-sm text-gray-500">
            First, enter your text to recognize ingredients.
          </p>
        )}

        {!isGenerating && resultText && (
          <div className="bg-gray-50 border rounded-md p-3 text-sm whitespace-pre-wrap">
            {resultText}
          </div>
        )}
      </div>
    </div>
  );
};
