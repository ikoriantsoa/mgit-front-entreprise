
import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Trainee } from "@/data/mockData";

interface TraineeProgramProps {
  trainee: Trainee;
}

export function TraineeProgram({ trainee }: TraineeProgramProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-primary" />
        Formation actuelle
      </h3>
      <div className="bg-muted/50 p-4 rounded-md">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-medium">{trainee.program}</h4>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-sm mb-1">
            <span>Progression</span>
            <span className="font-medium">{trainee.progress}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full">
            <div
              className={`h-full rounded-full ${
                trainee.progress >= 80 ? "bg-green-500" : 
                trainee.progress >= 40 ? "bg-amber-500" : "bg-red-500"
              }`}
              style={{ width: `${trainee.progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
