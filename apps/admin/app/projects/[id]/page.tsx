import { prisma } from "@repo/database";
import { ProjectForm } from "../project-form";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id }
  });

  if (!project) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Project</h1>
      <ProjectForm initialData={project} />
    </div>
  );
}
