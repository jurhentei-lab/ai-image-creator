"use client";

import { useState } from "react";
import Image from "next/image";
import { useTypewriter } from "@/hooks/useTypeWriter";

export const ImageAnalysis = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultText, setResultText] = useState<string | null>(null);
  const typedText = useTypewriter(resultText ?? "", 25);

  const handleClick = () => {
    setIsActive(true);
    setTimeout(() => {
      setIsActive(false);
    }, 200);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDelete = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleGenerate = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      setLoading(true);

      const res = await fetch(
        "https://ai-test-back.onrender.com/image-analysis",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      setResultText(data.content);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-145">
      <div className="flex justify-between w-145">
        <div className="flex gap-2">
          <p className="font-semibold text-xl">Image analysis</p>
        </div>

        <button
          onClick={handleClick}
          className="w-12 h-10 flex items-center justify-center rounded-md border border-[#E4E4E7]"
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

      <p className="text-[#71717A] text-sm">
        Upload a food photo, and AI will detect the ingredients.
      </p>

      {!previewUrl ? (
        <label
          htmlFor="file-upload"
          className="flex h-10 px-3 py-2 items-center rounded-md border cursor-pointer"
        >
          <span className="font-medium">Choose File</span>
          <span className="text-gray-400 ml-2">JPG , PNG</span>
          <input
            id="file-upload"
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      ) : (
        <div className="relative w-70 h-65 rounded-lg overflow-hidden">
          <Image src={previewUrl} alt="Preview" fill className="object-cover" />
          <button
            onClick={handleDelete}
            className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-md shadow"
          >
            🗑
          </button>
        </div>
      )}

      <div className="flex justify-end mt-4">
        <button
          onClick={handleGenerate}
          disabled={!selectedFile || loading}
          className={`px-6 py-2 rounded-md text-white ${
            selectedFile
              ? "bg-black hover:bg-gray-800"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {loading ? "Analyzing..." : "Generate"}
        </button>
      </div>
      <div className="space-y-3 mt-6">
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
          <h3 className="text-lg font-semibold">Here is the summary</h3>
        </div>

        {loading && (
          <p className="text-sm text-gray-500 animate-pulse">
            Analyzing image...
          </p>
        )}

        {!loading && !resultText && (
          <p className="text-sm text-gray-500">
            First, upload an image to analyze ingredients.
          </p>
        )}

        {!loading && resultText && (
          <div className="bg-gray-50 border rounded-md p-3 text-sm whitespace-pre-wrap font-mono">
            {typedText}
            <span className="animate-pulse">▍</span>
          </div>
        )}
      </div>
    </div>
  );
};
