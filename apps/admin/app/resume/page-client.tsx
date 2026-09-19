"use client";

import { useState, useEffect } from "react";
import { FileUpload } from "../../components/file-upload";
import { createResume, deleteResume, setDefaultResume } from "../actions/resume";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  FileText,
  Trash2,
  CheckCircle2,
  Eye,
  LayoutGrid,
  List,
  Loader2
} from "lucide-react";
import { useRouter } from "next/navigation";

// Define a type for Resume
interface Resume {
  id: string;
  name: string;
  url: string;
  isDefault: boolean;
  createdAt: Date;
}

export default function ResumePageClient({ initialResumes }: { initialResumes: Resume[] }) {
  const [resumes, setResumes] = useState(initialResumes);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [urls, setUrls] = useState<string[]>([]);
  const [customName, setCustomName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();

  const handleUpload = async (url: string) => {
    setIsUploading(true);
    let nameToUse = customName.trim();

    if (!nameToUse) {
      // Extract filename from URL (e.g., https://res.cloudinary.com/.../my-resume.pdf -> my-resume.pdf)
      const urlParts = url.split("/");
      let rawName = urlParts.pop() || "Resume";

      // If it has a timestamp-like string or version appended by cloudinary, we can try to clean it,
      // but let's just use it as is for simplicity, or handle duplicate names.
      // A simple logic for duplicate names:
      let finalName = rawName;
      let counter = 1;
      while (resumes.some(r => r.name === finalName)) {
        finalName = `${rawName.replace(/\.[^/.]+$/, "")}-${counter}.pdf`;
        counter++;
      }
      nameToUse = finalName;
    }

    const result = await createResume(nameToUse, url);
    if (result.success) {
      toast.success("Resume uploaded successfully");
      setUrls([]);
      setCustomName("");
      // Using router.refresh() will re-fetch data from the server,
      // but we can also update local state instantly if needed.
      router.refresh();
    } else {
      toast.error(result.error || "Failed to upload resume");
    }
    setIsUploading(false);
  };

  const handleRemoveUrl = (url: string) => {
    setUrls((prev) => prev.filter((u) => u !== url));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;

    // Optimistic update
    setResumes(prev => prev.filter(r => r.id !== id));

    const result = await deleteResume(id);
    if (result.success) {
      toast.success("Resume deleted");
      router.refresh();
    } else {
      toast.error(result.error || "Failed to delete resume");
      // Revert if failed
      router.refresh();
    }
  };

  const handleSetDefault = async (id: string) => {
    // Optimistic update
    setResumes(prev => prev.map(r => ({
      ...r,
      isDefault: r.id === id
    })));

    const result = await setDefaultResume(id);
    if (result.success) {
      toast.success("Default resume updated");
      router.refresh();
    } else {
      toast.error(result.error || "Failed to update default resume");
      // Revert if failed
      router.refresh();
    }
  };

  // Sync state when props change
  // We use useEffect to handle this without causing a visual flicker during optimistic updates
  useEffect(() => {
    setResumes(initialResumes);
  }, [initialResumes]);

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border dark:border-gray-800">
        <h2 className="text-lg font-semibold mb-4">Upload New Resume</h2>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex-1 w-full max-w-sm">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Custom Name (Optional)
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="e.g. John_Doe_Resume_2024.pdf"
              className="w-full px-3 py-2 border dark:border-gray-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="pt-6">
            <FileUpload
              value={urls}
              onChange={(url: string) => {
                setUrls([...urls, url]);
                handleUpload(url);
              }}
              onRemove={handleRemoveUrl}
              folder="resume"
              resourceType="raw"
              clientAllowedFormats={["pdf"]}
              maxFiles={1}
            />
          </div>
          {isUploading && (
            <div className="pt-6 flex items-center text-blue-600 gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm font-medium">Uploading...</span>
            </div>
          )}
        </div>
      </div>

      {/* List Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Your Resumes</h2>
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-md transition-colors ${
                view === "grid"
                  ? "bg-white dark:bg-gray-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-md transition-colors ${
                view === "list"
                  ? "bg-white dark:bg-gray-700 shadow-sm"
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {resumes.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 p-12 text-center rounded-xl border dark:border-gray-800 text-gray-500">
            No resumes uploaded yet.
          </div>
        ) : (
          <>
            {view === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {resumes.map((resume) => (
                  <div
                    key={resume.id}
                    className={`bg-white dark:bg-gray-900 rounded-xl p-5 border flex flex-col gap-4 ${
                      resume.isDefault
                        ? "border-blue-500 shadow-md ring-1 ring-blue-500/20"
                        : "border-gray-200 dark:border-gray-800"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="p-3 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-lg shrink-0">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div className="overflow-hidden">
                          <h3 className="font-semibold truncate" title={resume.name}>
                            {resume.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {format(new Date(resume.createdAt), "MMM d, yyyy")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-auto pt-4 border-t dark:border-gray-800">
                      <button
                        onClick={() => setPreviewUrl(resume.url)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-md text-sm font-medium transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleSetDefault(resume.id)}
                          disabled={resume.isDefault}
                          className={`p-2 rounded-md transition-colors ${
                            resume.isDefault
                              ? "text-blue-500 bg-blue-50 dark:bg-blue-900/20 cursor-default"
                              : "text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                          }`}
                          title={resume.isDefault ? "Current Default" : "Set as Default"}
                        >
                          <CheckCircle2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(resume.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                          title="Delete Resume"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden border dark:border-gray-800">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 dark:bg-gray-800/50 border-b dark:border-gray-800">
                    <tr>
                      <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Name</th>
                      <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Date Added</th>
                      <th className="p-4 font-medium text-gray-500 dark:text-gray-400">Status</th>
                      <th className="p-4 font-medium text-right text-gray-500 dark:text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-gray-800">
                    {resumes.map((resume) => (
                      <tr key={resume.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-lg shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                            <span className="font-medium">{resume.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-500">
                          {format(new Date(resume.createdAt), "MMM d, yyyy")}
                        </td>
                        <td className="p-4">
                          {resume.isDefault ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                              <CheckCircle2 className="w-3 h-3" />
                              Default
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                              Standard
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setPreviewUrl(resume.url)}
                              className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                              title="Preview"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleSetDefault(resume.id)}
                              disabled={resume.isDefault}
                              className={`p-2 rounded-md transition-colors ${
                                resume.isDefault
                                  ? "text-blue-500 cursor-default"
                                  : "text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                              }`}
                              title={resume.isDefault ? "Current Default" : "Set as Default"}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(resume.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {/* Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
              <h3 className="font-semibold">Resume Preview</h3>
              <button
                onClick={() => setPreviewUrl(null)}
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                Close
              </button>
            </div>
            <div className="flex-1 p-0">
              <iframe
                src={previewUrl}
                className="w-full h-full border-0"
                title="Resume Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
