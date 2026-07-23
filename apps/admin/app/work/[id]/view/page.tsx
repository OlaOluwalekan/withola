import { prisma } from "@repo/database";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";

export default async function ViewWorkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const work = await prisma.workExperience.findUnique({
    where: { id }
  });

  if (!work) notFound();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/work" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Work Experience
        </Link>
        <Link href={`/work/${work.id}`} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm">
          <Edit className="w-4 h-4" /> Edit
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border dark:border-gray-800 p-8">
        <div className="border-b dark:border-gray-800 pb-6 mb-6">
          <h1 className="text-3xl font-bold mb-2">{work.jobTitle}</h1>
          <div className="text-xl text-gray-600 dark:text-gray-400 mb-4">{work.company} • {work.companyLocation}</div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              {new Date(work.startDate).toLocaleDateString()} - {work.endDate ? new Date(work.endDate).toLocaleDateString() : "Present"}
            </span>
            <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              {work.workType.replace(/_/g, " ")}
            </span>
            <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
              {work.workLocationType}
            </span>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Responsibilities & Achievements</h2>
          {work.responsibilities.length > 0 ? (
            <ul className="list-disc pl-6 space-y-4">
              {work.responsibilities.map((resp, i) => (
                <li key={i} className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                  <div dangerouslySetInnerHTML={{ __html: resp }} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No responsibilities listed.</p>
          )}
        </div>
      </div>
    </div>
  );
}
