import { TemplateProps } from "./ClassicTemplate";

export function ModernTemplate({ data, selection }: TemplateProps) {
  return (
    <div className="font-sans text-gray-900 bg-white flex max-w-4xl mx-auto w-full min-h-[1056px]">
      <div className="w-1/3 bg-gray-100 p-8 border-r border-gray-200">
        {selection.aboutMe.selected && data.aboutMe && (
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold tracking-tight mb-4 leading-tight">
              {selection.aboutMe.fields.about ? data.aboutMe.about : "Your Name"}
            </h1>

            <div className="space-y-2 text-sm text-gray-700">
              {selection.aboutMe.fields.emails && data.aboutMe.emails?.length > 0 && (
                <div className="flex flex-col">
                  <span className="font-semibold text-xs text-gray-500 uppercase">Email</span>
                  <span>{data.aboutMe.emails[0]}</span>
                </div>
              )}
              {selection.aboutMe.fields.phones && data.aboutMe.phones?.length > 0 && (
                <div className="flex flex-col mt-3">
                  <span className="font-semibold text-xs text-gray-500 uppercase">Phone</span>
                  <span>{data.aboutMe.phones[0]}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {Object.values(selection.skills).some((s) => s.selected) && (
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills
                .filter((skill) => selection.skills[skill.id]?.selected)
                .map((skill) => (
                  <span key={skill.id} className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-sm">
                    {skill.name}
                  </span>
                ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-2/3 p-8">
        {Object.values(selection.workExperiences).some((s) => s.selected) && (
          <div className="mb-10">
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-6 flex items-center">
              <span className="w-6 h-px bg-blue-600 mr-4"></span>
              Experience
            </h2>
            <div className="space-y-6">
              {data.workExperiences
                .filter((w) => selection.workExperiences[w.id]?.selected)
                .map((work) => {
                  const s = selection.workExperiences[work.id]?.fields;
                  if (!s) return null;
                  return (
                    <div key={work.id}>
                      <div className="mb-2">
                        <h3 className="text-lg font-bold text-gray-900 leading-tight">
                          {s.jobTitle && work.jobTitle}
                        </h3>
                        <div className="text-sm font-medium text-blue-600 mb-1">
                          {s.company && work.company}
                        </div>
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {s.startDate && new Date(work.startDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric'})}
                          {s.startDate && s.endDate && " — "}
                          {s.endDate && (work.endDate ? new Date(work.endDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric'}) : "Present")}
                        </div>
                      </div>
                      {s.responsibilities && (
                        <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1.5 marker:text-gray-400">
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
            <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-6 flex items-center">
              <span className="w-6 h-px bg-blue-600 mr-4"></span>
              Projects
            </h2>
            <div className="space-y-6">
              {data.projects
                .filter((p) => selection.projects[p.id]?.selected)
                .map((project) => {
                  const s = selection.projects[project.id]?.fields;
                  if (!s) return null;
                  return (
                    <div key={project.id}>
                      <div className="mb-2">
                        <h3 className="font-bold text-base text-gray-900">{s.title && project.title}</h3>
                        <div className="text-xs text-blue-600 font-medium">
                          {s.technologies && project.technologies.join(" • ")}
                        </div>
                      </div>
                      {s.description && (
                        <p className="text-sm text-gray-700 mb-2">{project.description}</p>
                      )}
                      {s.keyHighlights && project.keyHighlights.length > 0 && (
                        <ul className="list-disc ml-4 text-sm text-gray-700 space-y-1 marker:text-gray-400">
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
  );
}