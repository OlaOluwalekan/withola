import { prisma } from "@repo/database";
import Link from "next/link";
import { deleteWork } from "../actions/work";
import { Trash2, Edit } from "lucide-react";

export default async function WorkPage() {
  const experiences = await prisma.workExperience.findMany({
    orderBy: { startDate: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Work Experience</h1>
        <Link href="/work/new" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-sm transition-colors">Add Experience</Link>
      </div>
      
      <div className="bg-white dark:bg-gray-900 shadow-sm rounded-xl overflow-hidden border dark:border-gray-800">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-800">
            <tr>
              <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Role & Company</th>
              <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Timeline</th>
              <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Type</th>
              <th className="p-4 font-medium text-right text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-800">
            {experiences.map(work => (
              <tr key={work.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="p-4">
                  <div className="font-medium text-lg">{work.jobTitle}</div>
                  <div className="text-gray-600 dark:text-gray-400">{work.company} • {work.companyLocation}</div>
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-300">
                  {new Date(work.startDate).toLocaleDateString()} - {work.endDate ? new Date(work.endDate).toLocaleDateString() : "Present"}
                </td>
                <td className="p-4">
                  <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded-md">
                    {work.workType.replace(/_/g, " ")} • {work.workLocationType}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/work/${work.id}`} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <form action={async () => { "use server"; await deleteWork(work.id); }}>
                      <button type="submit" className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {experiences.length === 0 && (
              <tr><td colSpan={4} className="p-12 text-center text-gray-500">No work experience added yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
