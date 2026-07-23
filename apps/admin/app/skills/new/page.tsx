import { SkillForm } from "../skill-form";

export default function NewSkillPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Add New Skill</h1>
      <SkillForm />
    </div>
  );
}
