import { TemplateProps } from "./ClassicTemplate";

export function MinimalTemplate({ data, selection }: TemplateProps) {
  return (
    <div className="font-sans text-gray-800 bg-white p-8 max-w-4xl mx-auto w-full text-[13px] leading-relaxed">
      {selection.aboutMe.selected && data.aboutMe && (
        <div className="mb-8 flex flex-col md:flex-row justify-between items-baseline border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold tracking-tight text-black uppercase">
            {selection.aboutMe.fields.about ? data.aboutMe.about : "Your Name"}
          </h1>
          <div className="text-right text-xs text-gray-500 space-x-3">
            {selection.aboutMe.fields.emails && data.aboutMe.emails?.length > 0 && (
              <span>{data.aboutMe.emails[0]}</span>
            )}
            {selection.aboutMe.fields.phones && data.aboutMe.phones?.length > 0 && (
              <span>{data.aboutMe.phones[0]}</span>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          {Object.values(selection.skills).some((s) => s.selected) && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-black mb-3">
                Skills
              </h2>
              <div className="space-y-1 text-gray-600">
                {data.skills
                  .filter((skill) => selection.skills[skill.id]?.selected)
                  .map((skill) => (
                    <div key={skill.id}>{skill.name}</div>
                  ))}
              </div>
            </div>
          )}
        </div>

        <div className="md:col-span-3 space-y-8">
          {Object.values(selection.workExperiences).some((s) => s.selected) && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-black mb-4">
                Experience
              </h2>
              <div className="space-y-5">
                {data.workExperiences
                  .filter((w) => selection.workExperiences[w.id]?.selected)
                  .map((work) => {
                    const s = selection.workExperiences[work.id]?.fields;
                    if (!s) return null;
                    return (
                      <div key={work.id}>
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-semibold text-black">
                            {s.company && work.company}
                          </h3>
                          <div className="text-xs text-gray-500">
                            {s.startDate && new Date(work.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric'})}
                            {s.startDate && s.endDate && " - "}
                            {s.endDate && (work.endDate ? new Date(work.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric'}) : "Present")}
                          </div>
                        </div>
                        <div className="text-black mb-2 italic">
                          {s.jobTitle && work.jobTitle}
                        </div>
                        {s.responsibilities && (
                          <ul className="list-disc ml-4 text-gray-700 space-y-1">
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
              <h2 className="text-xs font-bold uppercase tracking-widest text-black mb-4">
                Projects
              </h2>
              <div className="space-y-5">
                {data.projects
                  .filter((p) => selection.projects[p.id]?.selected)
                  .map((project) => {
                    const s = selection.projects[project.id]?.fields;
                    if (!s) return null;
                    return (
                      <div key={project.id}>
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-semibold text-black">
                            {s.title && project.title}
                          </h3>
                        </div>
                        <div className="text-gray-500 text-xs mb-2">
                           {s.technologies && project.technologies.join(", ")}
                        </div>
                        {s.description && (
                          <p className="text-gray-700 mb-1">{project.description}</p>
                        )}
                        {s.keyHighlights && project.keyHighlights.length > 0 && (
                          <ul className="list-disc ml-4 text-gray-700 space-y-1">
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
        </div>
      </div>
    </div>
  );
}