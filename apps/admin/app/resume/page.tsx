import { prisma } from "@repo/database";
import ResumePageClient from "./page-client";

export const dynamic = "force-dynamic";

export default async function ResumePage() {
  const resumes = await prisma.resume.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Resume Management</h1>
      </div>

      <ResumePageClient initialResumes={resumes} />
    </div>
  );
}
