"use client";

import { CheckCircle } from "lucide-react";

interface Props {
  templateId: string;
  setTemplateId: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const templates = [
  {
    id: "classic",
    name: "Classic Professional",
    description: "Traditional layout suitable for most corporate and enterprise roles.",
    previewStyle: "font-serif border-t-4 border-gray-900"
  },
  {
    id: "modern",
    name: "Modern Developer",
    description: "Clean layout with a strong left sidebar, great for tech roles.",
    previewStyle: "font-sans flex-row border-l-8 border-blue-600"
  },
  {
    id: "minimal",
    name: "Minimalist",
    description: "Compact typography-focused design to fit more information.",
    previewStyle: "font-sans uppercase tracking-wide border border-gray-200"
  }
];

export default function ResumeTemplateSelector({ templateId, setTemplateId, onNext, onBack }: Props) {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border dark:border-gray-800 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Choose a CV Template</h2>
        <p className="text-gray-500 mb-6">Select a design for your generated resume. All templates are optimized for A4 PDF printing.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              onClick={() => setTemplateId(tpl.id)}
              className={`relative cursor-pointer rounded-xl border-2 transition-all overflow-hidden ${
                templateId === tpl.id
                  ? "border-blue-600 bg-blue-50/50 dark:bg-blue-900/10 shadow-md ring-4 ring-blue-600/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:shadow-sm"
              }`}
            >
              {templateId === tpl.id && (
                <div className="absolute top-3 right-3 z-10 text-blue-600 bg-white rounded-full">
                  <CheckCircle className="w-6 h-6" />
                </div>
              )}

              <div className="h-40 bg-gray-50 dark:bg-gray-800 flex items-center justify-center p-4">
                <div className={`w-full h-full bg-white shadow-sm flex flex-col p-2 text-[6px] text-gray-300 gap-2 ${tpl.previewStyle}`}>
                   <div className="w-full h-2 bg-gray-400 mb-1" />
                   <div className="w-3/4 h-1 bg-gray-300" />
                   <div className="w-1/2 h-1 bg-gray-300" />

                   <div className="w-1/3 h-1.5 bg-gray-400 mt-2" />
                   <div className="w-full h-1 bg-gray-200" />
                   <div className="w-full h-1 bg-gray-200" />
                   <div className="w-5/6 h-1 bg-gray-200" />
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-gray-900">
                <h3 className="font-semibold text-lg">{tpl.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{tpl.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-4 pb-8">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Back to Content
        </button>
        <button
          onClick={onNext}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          Preview & Export
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
}