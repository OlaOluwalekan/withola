import { prisma } from "@repo/database";
import { WorkForm } from "../work-form";
import { notFound } from "next/navigation";

export default async function EditWorkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const work = await prisma.workExperience.findUnique({
    where: { id }
  });

  if (!work) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Work Experience</h1>
      <WorkForm initialData={work} />
    </div>
  );
}
