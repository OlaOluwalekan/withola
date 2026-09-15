"use client";

import { ResumeData } from "./ResumeBuilder";
import { ResumeSelectionState } from "./types";
import { ChevronDown, ChevronUp, User, Briefcase, FileCode2, Brain } from "lucide-react";
import { useState } from "react";

interface Props {
  data: ResumeData;
  selection: ResumeSelectionState;
  setSelection: (s: ResumeSelectionState) => void;
  onNext: () => void;
}

export default function ResumeContentSelector({ data, selection, setSelection, onNext }: Props) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    about: true,
    projects: true,
    skills: false,
    work: true,
  });

  const toggleSection = (section: string) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border dark:border-gray-800 shadow-sm">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-500" />
          About Me
        </h2>

        <div className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            className="w-4 h-4 rounded text-blue-600"
            checked={selection.aboutMe.selected}
            onChange={(e) => {
              setSelection({
                ...selection,
                aboutMe: {
                  ...selection.aboutMe,
                  selected: e.target.checked
                }
              });
            }}
          />
          <span className="font-medium">Include About section</span>
        </div>

        {selection.aboutMe.selected && (
          <div className="ml-7 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300">
            {Object.keys(selection.aboutMe.fields).map((field) => (
              <label key={field} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded text-blue-600 border-gray-300"
                  checked={selection.aboutMe.fields[field as keyof typeof selection.aboutMe.fields]}
                  onChange={(e) => {
                    setSelection({
                      ...selection,
                      aboutMe: {
                        ...selection.aboutMe,
                        fields: {
                          ...selection.aboutMe.fields,
                          [field]: e.target.checked
                        }
                      }
                    });
                  }}
                />
                <span className="capitalize">{field}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border dark:border-gray-800 shadow-sm">
        <div className="flex justify-between items-center mb-6 cursor-pointer" onClick={() => toggleSection('work')}>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-purple-500" />
            Work Experience
          </h2>
          {expanded.work ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>

        {expanded.work && (
          <div className="space-y-4">
            {data.workExperiences.map((work) => {
              const itemSelection = selection.workExperiences[work.id];
              if (!itemSelection) return null;

              return (
                <div key={work.id} className="border dark:border-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded text-blue-600"
                      checked={itemSelection.selected}
                      onChange={(e) => {
                        setSelection({
                          ...selection,
                          workExperiences: {
                            ...selection.workExperiences,
                            [work.id]: {
                              ...itemSelection,
                              selected: e.target.checked
                            }
                          }
                        });
                      }}
                    />
                    <span className="font-medium text-lg">{work.jobTitle} at {work.company}</span>
                  </div>

                  {itemSelection.selected && (
                    <div className="ml-7 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-700 dark:text-gray-300">
                      {Object.keys(itemSelection.fields).map((field) => (
                        <label key={field} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded text-blue-600 border-gray-300"
                            checked={itemSelection.fields[field as keyof typeof itemSelection.fields]}
                            onChange={(e) => {
                              setSelection({
                                ...selection,
                                workExperiences: {
                                  ...selection.workExperiences,
                                  [work.id]: {
                                    ...itemSelection,
                                    fields: {
                                      ...itemSelection.fields,
                                      [field]: e.target.checked
                                    }
                                  }
                                }
                              });
                            }}
                          />
                          <span className="capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            {data.workExperiences.length === 0 && (
              <p className="text-gray-500 text-sm">No work experience found.</p>
            )}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border dark:border-gray-800 shadow-sm">
        <div className="flex justify-between items-center mb-6 cursor-pointer" onClick={() => toggleSection('projects')}>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FileCode2 className="w-5 h-5 text-emerald-500" />
            Projects
          </h2>
          {expanded.projects ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>

        {expanded.projects && (
          <div className="space-y-4">
            {data.projects.map((project) => {
              const itemSelection = selection.projects[project.id];
              if (!itemSelection) return null;

              return (
                <div key={project.id} className="border dark:border-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded text-blue-600"
                      checked={itemSelection.selected}
                      onChange={(e) => {
                        setSelection({
                          ...selection,
                          projects: {
                            ...selection.projects,
                            [project.id]: {
                              ...itemSelection,
                              selected: e.target.checked
                            }
                          }
                        });
                      }}
                    />
                    <span className="font-medium text-lg">{project.title}</span>
                  </div>

                  {itemSelection.selected && (
                    <div className="ml-7 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-700 dark:text-gray-300">
                      {Object.keys(itemSelection.fields).map((field) => (
                        <label key={field} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded text-blue-600 border-gray-300"
                            checked={itemSelection.fields[field as keyof typeof itemSelection.fields]}
                            onChange={(e) => {
                              setSelection({
                                ...selection,
                                projects: {
                                  ...selection.projects,
                                  [project.id]: {
                                    ...itemSelection,
                                    fields: {
                                      ...itemSelection.fields,
                                      [field]: e.target.checked
                                    }
                                  }
                                }
                              });
                            }}
                          />
                          <span className="capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            {data.projects.length === 0 && (
              <p className="text-gray-500 text-sm">No projects found.</p>
            )}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border dark:border-gray-800 shadow-sm">
        <div className="flex justify-between items-center mb-6 cursor-pointer" onClick={() => toggleSection('skills')}>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Brain className="w-5 h-5 text-orange-500" />
            Skills
          </h2>
          {expanded.skills ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>

        {expanded.skills && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.skills.map((skill) => {
              const itemSelection = selection.skills[skill.id];
              if (!itemSelection) return null;

              return (
                <label key={skill.id} className="flex items-center gap-3 p-3 border dark:border-gray-800 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded text-blue-600 border-gray-300"
                    checked={itemSelection.selected}
                    onChange={(e) => {
                      setSelection({
                        ...selection,
                        skills: {
                          ...selection.skills,
                          [skill.id]: {
                            ...itemSelection,
                            selected: e.target.checked
                          }
                        }
                      });
                    }}
                  />
                  <span className="font-medium text-sm flex items-center gap-2">
                    {skill.emojiIcon} {skill.name}
                  </span>
                </label>
              );
            })}
            {data.skills.length === 0 && (
              <p className="text-gray-500 text-sm col-span-full">No skills found.</p>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end pt-4 pb-8">
        <button
          onClick={onNext}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          Next: Choose Template
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
}