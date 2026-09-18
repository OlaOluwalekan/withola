import { getDefaultResume } from "../../actions/resume";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Resume | Olalekan Bello",
  description: "View my resume",
};

export default async function ResumePage() {
  const resume = await getDefaultResume();

  if (!resume) {
    return (
      <div className="min-h-screen bg-custom-bg flex flex-col items-center justify-center text-custom-primary font-sans p-4">
        <div className="bg-custom-card border border-custom-border p-8 rounded-xl max-w-md w-full text-center space-y-4">
          <h1 className="text-2xl font-bold text-custom-heading">No Resume Available</h1>
          <p className="text-custom-secondary">
            A resume has not been uploaded or set as default yet.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-custom-bg flex flex-col overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-custom-card/80 hover:bg-custom-inner backdrop-blur-md border border-custom-border text-custom-primary rounded-lg transition-colors shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </Link>
      </div>

      <iframe
        src={resume.url}
        className="w-full h-full border-0"
        title="Resume"
      />
    </div>
  );
}
