import { prisma } from "@repo/database";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit, ExternalLink, GitBranch } from "lucide-react";
import Image from "next/image";

export default async function ViewProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id }
  });

  if (!project) notFound();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/projects" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
        <Link href={`/projects/${project.id}`} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm">
          <Edit className="w-4 h-4" /> Edit
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border dark:border-gray-800 overflow-hidden">
        <div className="p-8 border-b dark:border-gray-800">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{project.icon}</span>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                {project.title}
                {project.isFeatured && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs rounded-md font-medium align-middle">
                    Featured
                  </span>
                )}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mt-1">{project.majorFeature}</p>
            </div>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 max-w-3xl">
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            {project.sourceCodeLink && (
              <a href={project.sourceCodeLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                <GitBranch className="w-5 h-5" /> Source Code
              </a>
            )}
            {project.liveUrlLink && (
              <a href={project.liveUrlLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
                <ExternalLink className="w-5 h-5" /> Live Demo
              </a>
            )}
          </div>
        </div>

        <div className="p-8 bg-gray-50 dark:bg-gray-800/50 border-b dark:border-gray-800 flex flex-wrap gap-x-8 gap-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6">Readme</h2>
          <div 
            className="prose dark:prose-invert max-w-none prose-img:rounded-xl prose-img:shadow-sm" 
            dangerouslySetInnerHTML={{ __html: project.readme }} 
          />
        </div>

        {project.screenShots.length > 0 && (
          <div className="p-8 border-t dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30">
            <h2 className="text-2xl font-bold mb-6">Screenshots</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.screenShots.map((url, idx) => (
                <a key={idx} href={url} target="_blank" rel="noreferrer" className="relative block h-48 rounded-xl overflow-hidden shadow-sm border dark:border-gray-700 hover:opacity-90 transition-opacity">
                  <Image src={url} alt={`Screenshot ${idx + 1}`} fill className="object-cover" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
