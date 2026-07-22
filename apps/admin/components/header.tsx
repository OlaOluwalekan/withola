import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="h-16 border-b flex items-center justify-between px-6 bg-white dark:bg-black">
      <div className="md:hidden">
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
      </div>
      <div className="hidden md:block" />
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  );
}
