
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Trainee } from "@/data/mockData";

interface TraineeHeaderProps {
  trainee: Trainee;
}

export function TraineeHeader({ trainee }: TraineeHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
      <div className="flex-shrink-0">
        <div className="h-32 w-32 rounded-full bg-primary/20 flex items-center justify-center text-3xl font-bold text-primary">
          {trainee.name.charAt(0)}
        </div>
      </div>
      <div className="flex-grow space-y-2 text-center md:text-left">
        <h2 className="text-3xl font-bold">{trainee.name}</h2>
        <p className="text-xl text-muted-foreground">{trainee.title || trainee.program}</p>
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {trainee.skills && trainee.skills.map((skill: string, index: number) => (
            <Badge key={index} variant="outline" className="px-3 py-1 text-sm">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
