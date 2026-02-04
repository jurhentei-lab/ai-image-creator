"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import RunningManLoader from "@/components/ui/RunningManLoader";

export const ImageCreator = () => {
  const [isActive, setIsActive] = useState(false);
  const [text, setText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

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
        "https://ai-test-back.onrender.com/image-creator",
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
      setResultImage(data.image);
    } catch (error) {
      console.error("Image generate error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
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
            <p className="font-semibold text-xl">Food image creator</p>
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
          What food image do you want? Describe it briefly.
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Хоолны тайлбар"
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
      </div>

      {/* <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 15L17.914 11.914C17.5389 11.5391 17.0303 11.3284 16.5 11.3284C15.9697 11.3284 15.4611 11.5391 15.086 11.914L6 21M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3ZM11 9C11 10.1046 10.1046 11 9 11C7.89543 11 7 10.1046 7 9C7 7.89543 7.89543 7 9 7C10.1046 7 11 7.89543 11 9Z"
              stroke="#09090B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="font-semibold text-xl">Result</p>
        </div>

        {!resultImage ? (
          <p className="text-sm text-gray-600">
            First, enter your text to generate an image.
          </p>
        ) : (
          <div className="relative w-145 h-full rounded-lg overflow-hidden border">
            <img
              src={resultImage}
              alt="Generated food"
              className="object-cover w-full h-full"
            />
          </div>
        )}
      </div> */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 15L17.914 11.914C17.5389 11.5391 17.0303 11.3284 16.5 11.3284C15.9697 11.3284 15.4611 11.5391 15.086 11.914L6 21M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3ZM11 9C11 10.1046 10.1046 11 9 11C7.89543 11 7 10.1046 7 9C7 7.89543 7.89543 7 9 7C10.1046 7 11 7.89543 11 9Z"
              stroke="#09090B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="font-semibold text-xl">Result</p>
        </div>

        <div className="relative w-145 h-80 rounded-lg overflow-hidden border bg-gray-50">
          {isGenerating && <RunningManLoader />}

          {!isGenerating && resultImage && (
            <img
              src={resultImage}
              alt="Generated food"
              className="object-cover w-full h-full"
            />
          )}

          {!isGenerating && !resultImage && (
            <p className="text-sm text-gray-600 flex items-center justify-center h-full">
              First, enter your text to generate an image.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
