import { prisma } from "@repo/database";
import Link from "next/link";
import { deleteProject } from "../actions/projects";
import { Trash2, Edit } from "lucide-react";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link href="/projects/new" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-sm transition-colors">Add Project</Link>
      </div>
      
      <div className="bg-white dark:bg-gray-900 shadow-sm rounded-xl overflow-hidden border dark:border-gray-800">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-800">
            <tr>
              <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Project</th>
              <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Major Feature</th>
              <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Featured</th>
              <th className="p-4 font-medium text-right text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-800">
            {projects.map(project => (
              <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <span className="text-2xl bg-gray-100 dark:bg-gray-800 w-10 h-10 flex items-center justify-center rounded-lg">{project.icon}</span>
                  <div>
                    <div className="font-medium">{project.title}</div>
                    <div className="text-sm text-gray-500">{project.technologies.join(', ')}</div>
                  </div>
                </td>
                <td className="p-4 text-gray-600 dark:text-gray-300">{project.majorFeature}</td>
                <td className="p-4">
                  {project.isFeatured ? (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs rounded-md font-medium">Featured</span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 text-xs rounded-md">Standard</span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/projects/${project.id}`} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <form action={async () => { "use server"; await deleteProject(project.id); }}>
                      <button type="submit" className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr><td colSpan={4} className="p-12 text-center text-gray-500">No projects added yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
