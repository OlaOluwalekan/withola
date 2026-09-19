"use client";

import { useState, useEffect } from "react";
import ResumeContentSelector from "./ResumeContentSelector";
import ResumeTemplateSelector from "./ResumeTemplateSelector";
import ResumePreview from "./ResumePreview";
import { ResumeSelectionState, generateDefaultState, Step } from "./types";
import { AboutMe, Project, Skill, WorkExperience } from "@repo/database";

export type ResumeData = {
  aboutMe: AboutMe | null;
  projects: Project[];
  skills: Skill[];
  workExperiences: WorkExperience[];
};

interface ResumeBuilderProps {
  initialData?: ResumeData;
}

const STORAGE_KEY = "resume_builder_selection";

const DEFAULT_RESUME_DATA: ResumeData = {
  aboutMe: null,
  projects: [],
  skills: [],
  workExperiences: [],
};

export default function ResumeBuilder({ initialData = DEFAULT_RESUME_DATA }: ResumeBuilderProps) {
  const [step, setStep] = useState<Step>("content");
  const [templateId, setTemplateId] = useState<string>("classic");
  const [selection, setSelection] = useState<ResumeSelectionState | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSelection(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved resume state", e);
        setSelection(generateDefaultState(initialData));
      }
    } else {
      setSelection(generateDefaultState(initialData));
    }
  }, [initialData]);

  useEffect(() => {
    if (selection) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
    }
  }, [selection]);

  if (!selection) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {step === "content" && (
        <ResumeContentSelector
          data={initialData}
          selection={selection}
          setSelection={setSelection}
          onNext={() => setStep("template")}
        />
      )}
      {step === "template" && (
        <ResumeTemplateSelector
          templateId={templateId}
          setTemplateId={setTemplateId}
          onNext={() => setStep("preview")}
          onBack={() => setStep("content")}
        />
      )}
      {step === "preview" && (
        <ResumePreview
          data={initialData}
          selection={selection}
          templateId={templateId}
          onBack={() => setStep("template")}
        />
      )}
    </div>
  );
}
