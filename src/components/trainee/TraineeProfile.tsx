
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { TraineeProfileSkeleton } from "./TraineeProfileSkeleton";
import { TraineeHeader } from "./profile/TraineeHeader";
import { TraineeBio } from "./profile/TraineeBio";
import { TraineeProgram } from "./profile/TraineeProgram";
import { TraineeWebinars } from "./profile/TraineeWebinars";
import { TraineeExperience } from "./profile/TraineeExperience";
import { TraineeEducation } from "./profile/TraineeEducation";
import { TraineeCertifications } from "./profile/TraineeCertifications";
import { Trainee } from "@/data/mockData";

interface TraineeProfileProps {
  trainee: Trainee | null;
}

export function TraineeProfile({ trainee }: TraineeProfileProps) {
  if (!trainee) {
    return <TraineeProfileSkeleton />;
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">CV - {trainee.name}</DialogTitle>
        <DialogDescription>
          Profil de formation et parcours professionnel
        </DialogDescription>
      </DialogHeader>
      
      <div className="mt-4 space-y-8">
        <TraineeHeader trainee={trainee} />
        <TraineeBio bio={trainee.bio} />
        <TraineeProgram trainee={trainee} />
        <TraineeWebinars 
          webinarsAttended={trainee.webinarsAttended} 
          totalWebinars={trainee.totalWebinars} 
          attendedWebinars={trainee.attendedWebinars} 
        />
        <TraineeExperience experience={trainee.experience} />
        <TraineeEducation education={trainee.education} />
        <TraineeCertifications certifications={trainee.certifications} />
      </div>
    </>
  );
}
