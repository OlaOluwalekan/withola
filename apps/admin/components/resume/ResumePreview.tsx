"use client";

import { useRef } from "react";
import { ResumeData } from "./ResumeBuilder";
import { ResumeSelectionState } from "./types";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { Printer, ArrowLeft } from "lucide-react";

interface Props {
  data: ResumeData;
  selection: ResumeSelectionState;
  templateId: string;
  onBack: () => void;
}

export default function ResumePreview({ data, selection, templateId, onBack }: Props) {
  const printRef = useRef<HTMLDivElement>(null);

  const renderTemplate = () => {
    switch (templateId) {
      case "classic":
        return <ClassicTemplate data={data} selection={selection} />;
      case "modern":
        return <ModernTemplate data={data} selection={selection} />;
      case "minimal":
        return <MinimalTemplate data={data} selection={selection} />;
      default:
        return <ClassicTemplate data={data} selection={selection} />;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          #print-container, #print-container * {
            visibility: visible;
          }
          #print-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
            box-shadow: none;
          }
        }
      `}} />

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-gray-900 p-4 rounded-xl border dark:border-gray-800 shadow-sm print:hidden">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Templates
        </button>

        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Print / Save as PDF
          </button>
        </div>
      </div>

      <div className="flex justify-center overflow-x-auto p-4 md:p-8 bg-gray-100 dark:bg-gray-800 rounded-xl print:p-0 print:bg-transparent">
        <div
          id="print-container"
          ref={printRef}
          className="bg-white shadow-xl print:shadow-none mx-auto w-full max-w-[210mm] min-h-[297mm] overflow-hidden relative origin-top"
          style={{
            width: "210mm",
            minHeight: "297mm",
            backgroundColor: "white",
            color: "black"
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}