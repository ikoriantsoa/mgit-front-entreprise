
import { FileText } from "lucide-react";

interface TraineeBioProps {
  bio?: string;
}

export function TraineeBio({ bio }: TraineeBioProps) {
  if (!bio) return null;
  
  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <FileText className="h-5 w-5 text-primary" />
        À propos
      </h3>
      <p className="text-muted-foreground">{bio}</p>
    </div>
  );
}
