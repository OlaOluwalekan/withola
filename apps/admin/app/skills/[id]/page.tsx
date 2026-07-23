import { prisma } from "@repo/database";
import { SkillForm } from "../skill-form";
import { notFound } from "next/navigation";

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const skill = await prisma.skill.findUnique({
    where: { id }
  });

  if (!skill) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Skill</h1>
      <SkillForm initialData={skill} />
    </div>
  );
}
