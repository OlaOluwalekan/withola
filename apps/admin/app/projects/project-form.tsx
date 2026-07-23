"use client";

import { useActionState, useState } from "react";
import { createProject, updateProject } from "../actions/projects";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { ImageUpload } from "../../components/image-upload";
import { RichTextEditor } from "../../components/rich-text-editor";

export function ProjectForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  
  const action = initialData 
    ? updateProject.bind(null, initialData.id) 
    : createProject;

  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [technologies, setTechnologies] = useState<string[]>(initialData?.technologies || []);
  const [screenShots, setScreenShots] = useState<string[]>(initialData?.screenShots || []);
  const [readme, setReadme] = useState<string>(initialData?.readme || "");
  const [isFeatured, setIsFeatured] = useState<boolean>(initialData?.isFeatured || false);

  const [state, formAction, isPending] = useActionState(async (prevState: any, formData: FormData) => {
    formData.set("tags", JSON.stringify(tags.filter(t => t.trim() !== "")));
    formData.set("technologies", JSON.stringify(technologies.filter(t => t.trim() !== "")));
    formData.set("screenShots", JSON.stringify(screenShots));
    formData.set("readme", readme);
    formData.set("isFeatured", isFeatured.toString());
    
    const res = await action(formData);
    if (res?.success) {
      router.push("/projects");
      router.refresh();
      return { success: true };
    }
    return res;
  }, undefined);

  return (
    <form action={formAction} className="space-y-6 max-w-4xl bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border dark:border-gray-800">
      
      <div className="flex items-center gap-2 mb-6">
        <input 
          type="checkbox" 
          id="isFeatured"
          checked={isFeatured}
          onChange={(e) => setIsFeatured(e.target.checked)}
          className="w-4 h-4 text-blue-600 rounded"
        />
        <label htmlFor="isFeatured" className="font-medium">Featured Project</label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input name="title" defaultValue={initialData?.title} required className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700" placeholder="My Awesome App" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Icon / Emoji</label>
          <input name="icon" defaultValue={initialData?.icon} required className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700" placeholder="🚀" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Major Feature</label>
        <input name="majorFeature" defaultValue={initialData?.majorFeature} required className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700" placeholder="Real-time Collaboration" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Short Description</label>
        <textarea name="description" defaultValue={initialData?.description} required rows={3} className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700" placeholder="A brief summary of the project..."></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Source Code URL</label>
          <input name="sourceCodeLink" defaultValue={initialData?.sourceCodeLink} className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700" placeholder="https://github.com/..." />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Live Demo URL</label>
          <input name="liveUrlLink" defaultValue={initialData?.liveUrlLink} className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700" placeholder="https://my-app.com" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Tags</label>
          <div className="space-y-2">
            {tags.map((tag, i) => (
              <div key={i} className="flex gap-2">
                <input type="text" value={tag} onChange={(e) => {
                  const newTags = [...tags];
                  newTags[i] = e.target.value;
                  setTags(newTags);
                }} className="flex-1 px-3 py-1 border rounded-md dark:bg-gray-800 dark:border-gray-700" placeholder="e.g. SaaS" />
                <button type="button" onClick={() => setTags(tags.filter((_, index) => index !== i))} className="p-1 text-red-500 hover:bg-red-50 rounded-md"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            <button type="button" onClick={() => setTags([...tags, ""])} className="text-sm text-blue-600 flex items-center gap-1"><Plus className="w-4 h-4" /> Add Tag</button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Technologies</label>
          <div className="space-y-2">
            {technologies.map((tech, i) => (
              <div key={i} className="flex gap-2">
                <input type="text" value={tech} onChange={(e) => {
                  const newTechs = [...technologies];
                  newTechs[i] = e.target.value;
                  setTechnologies(newTechs);
                }} className="flex-1 px-3 py-1 border rounded-md dark:bg-gray-800 dark:border-gray-700" placeholder="e.g. Next.js" />
                <button type="button" onClick={() => setTechnologies(technologies.filter((_, index) => index !== i))} className="p-1 text-red-500 hover:bg-red-50 rounded-md"><Trash2 className="w-4 h-4" /></button>
              </div>
            ))}
            <button type="button" onClick={() => setTechnologies([...technologies, ""])} className="text-sm text-blue-600 flex items-center gap-1"><Plus className="w-4 h-4" /> Add Tech</button>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Screenshots</label>
        <ImageUpload 
          value={screenShots} 
          onChange={(url) => setScreenShots([...screenShots, url])}
          onRemove={(url) => setScreenShots(screenShots.filter(s => s !== url))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Readme / Detailed Content</label>
        <RichTextEditor value={readme} onChange={setReadme} />
      </div>
      
      <div className="pt-4 flex justify-end">
        <button type="button" onClick={() => router.back()} className="px-4 py-2 mr-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">Cancel</button>
        <button type="submit" disabled={isPending} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors">
          {isPending ? "Saving..." : "Save Project"}
        </button>
      </div>
    </form>
  );
}
