"use client";

import { useRef, useState } from "react";
import { ResumeData } from "./ResumeBuilder";
import { ResumeSelectionState } from "./types";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { ModernTemplate } from "./templates/ModernTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";
import { Download, Printer, ArrowLeft, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface Props {
  data: ResumeData;
  selection: ResumeSelectionState;
  templateId: string;
  onBack: () => void;
}

export default function ResumePreview({ data, selection, templateId, onBack }: Props) {
  const printRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

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

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    setIsExporting(true);

    try {
      const element = printRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();

      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }

      pdf.save("resume.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating the PDF. Please try the Print option instead.");
    } finally {
      setIsExporting(false);
    }
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
            Print to PDF
          </button>

          <button
            onClick={handleDownloadPDF}
            disabled={isExporting}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {isExporting ? "Generating..." : "Download PDF"}
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