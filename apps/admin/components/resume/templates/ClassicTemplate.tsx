import { ResumeData } from "../ResumeBuilder";
import { ResumeSelectionState } from "../types";

export interface TemplateProps {
  data: ResumeData;
  selection: ResumeSelectionState;
}

export function ClassicTemplate({ data, selection }: TemplateProps) {
  return (
    <div className="font-serif text-black bg-white p-8 space-y-6 max-w-4xl mx-auto w-full">
      {selection.aboutMe.selected && data.aboutMe && (
        <div className="text-center border-b-2 border-black pb-4 mb-6">
          <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">
            {selection.aboutMe.fields.about ? data.aboutMe.about : "Your Name"}
          </h1>
          <div className="text-sm flex flex-wrap justify-center gap-4 text-gray-700">
            {selection.aboutMe.fields.emails && data.aboutMe.emails?.length > 0 && (
              <span>{data.aboutMe.emails[0]}</span>
            )}
            {selection.aboutMe.fields.phones && data.aboutMe.phones?.length > 0 && (
              <span>{data.aboutMe.phones[0]}</span>
            )}
          </div>
        </div>
      )}

      {Object.values(selection.workExperiences).some((s) => s.selected) && (
        <div>
          <h2 className="text-xl font-bold uppercase tracking-widest border-b border-gray-300 mb-4 pb-1">
            Experience
          </h2>
          <div className="space-y-4">
            {data.workExperiences
              .filter((w) => selection.workExperiences[w.id]?.selected)
              .map((work) => {
                const s = selection.workExperiences[work.id]?.fields;
                if (!s) return null;
                return (
                  <div key={work.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="text-lg font-bold">
                        {s.jobTitle && work.jobTitle}
                        {s.jobTitle && s.company && " - "}
                        {s.company && <span className="font-medium text-gray-800">{work.company}</span>}
                      </h3>
                      <div className="text-sm font-medium text-gray-600">
                        {s.startDate && new Date(work.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric'})}
                        {s.startDate && s.endDate && " — "}
                        {s.endDate && (work.endDate ? new Date(work.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric'}) : "Present")}
                      </div>
                    </div>
                    {s.responsibilities && (
                      <ul className="list-disc ml-5 text-sm space-y-1">
                        {work.responsibilities.map((resp, i) => (
                          <li key={i}>{resp}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {Object.values(selection.projects).some((s) => s.selected) && (
        <div>
          <h2 className="text-xl font-bold uppercase tracking-widest border-b border-gray-300 mb-4 pb-1">
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects
              .filter((p) => selection.projects[p.id]?.selected)
              .map((project) => {
                const s = selection.projects[project.id]?.fields;
                if (!s) return null;
                return (
                  <div key={project.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-base">{s.title && project.title}</h3>
                      <div className="text-xs text-gray-600">
                         {s.technologies && project.technologies.join(", ")}
                      </div>
                    </div>
                    {s.description && (
                      <p className="text-sm mt-1 mb-2">{project.description}</p>
                    )}
                    {s.keyHighlights && project.keyHighlights.length > 0 && (
                      <ul className="list-disc ml-5 text-sm space-y-1">
                        {project.keyHighlights.map((highlight, i) => (
                          <li key={i}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {Object.values(selection.skills).some((s) => s.selected) && (
        <div>
          <h2 className="text-xl font-bold uppercase tracking-widest border-b border-gray-300 mb-4 pb-1">
            Skills
          </h2>
          <div className="text-sm">
             {data.skills
              .filter((skill) => selection.skills[skill.id]?.selected)
              .map((skill) => skill.name)
              .join(" • ")}
          </div>
        </div>
      )}
    </div>
  );
}