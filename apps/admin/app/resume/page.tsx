import { prisma } from "@repo/database";
import ResumeBuilder from "../../components/resume/ResumeBuilder";

export const dynamic = "force-dynamic";

export default async function ResumePage() {
  const [aboutMeResult, projects, skills, workExperiences] = await Promise.all([
    prisma.aboutMe.findFirst(),
    prisma.project.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.skill.findMany({ orderBy: { category: "asc" } }),
    prisma.workExperience.findMany({ orderBy: { startDate: "desc" } }),
  ]);

  const aboutMe = aboutMeResult || null;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resume Builder</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Create a professional CV from your portfolio database.
          </p>
        </div>
      </div>

      <ResumeBuilder
        initialData={{
          aboutMe,
          projects,
          skills,
          workExperiences,
        }}
      />
    </div>
  );
}
