
import { GraduationCap } from "lucide-react";
import { Education } from "@/data/mockData";

interface TraineeEducationProps {
  education?: Education[];
}

export function TraineeEducation({ education }: TraineeEducationProps) {
  if (!education || education.length === 0) return null;
  
  return (
    <div className="space-y-3">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <GraduationCap className="h-5 w-5 text-primary" />
        Formation académique
      </h3>
      <div className="space-y-4">
        {education.map((edu: Education, index: number) => (
          <div key={index} className="border-l-2 border-muted pl-4 pb-2">
            <h4 className="font-medium">{edu.degree}</h4>
            <p className="text-sm text-muted-foreground">{edu.institution}</p>
            <p className="text-sm text-muted-foreground">{edu.period}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
