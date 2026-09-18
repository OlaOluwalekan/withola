import * as LucideIcons from "lucide-react";

interface DynamicIconProps {
  icon: string;
  className?: string;
}

export function DynamicIcon({ icon, className = "w-6 h-6" }: DynamicIconProps) {
  if (!icon) return null;

  if (icon.startsWith("lucide:")) {
    const iconName = icon.replace("lucide:", "");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComponent = (LucideIcons as Record<string, any>)[iconName];

    if (IconComponent) {
      return <IconComponent className={className} />;
    }
  }

  // Check if icon is a valid URL
  try {
    new URL(icon);
    return (
      <img
        src={icon}
        alt="Icon"
        className={className}
        style={{ objectFit: "contain" }}
      />
    );
  } catch {
    // Not a valid URL, continue
  }

  // Render as emoji or text
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </span>
  );
}
