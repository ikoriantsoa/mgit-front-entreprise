
import { Briefcase } from "lucide-react";
import { Experience } from "@/data/mockData";

interface TraineeExperienceProps {
  experience?: Experience[];
}

export function TraineeExperience({ experience }: TraineeExperienceProps) {
  if (!experience || experience.length === 0) return null;
  
  return (
    <div className="space-y-3">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <Briefcase className="h-5 w-5 text-primary" />
        Expérience professionnelle
      </h3>
      <div className="space-y-4">
        {experience.map((exp: Experience, index: number) => (
          <div key={index} className="border-l-2 border-muted pl-4 pb-2">
            <h4 className="font-medium">{exp.role}</h4>
            <p className="text-sm text-muted-foreground">{exp.company}</p>
            <p className="text-sm text-muted-foreground">{exp.period}</p>
            <p className="text-sm mt-1">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
