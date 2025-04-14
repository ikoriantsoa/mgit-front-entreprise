
import { TraineeCard } from "./TraineeCard";
import { TraineeCardSkeleton } from "./TraineeCardSkeleton";
import { Search } from "lucide-react";

interface TraineeListProps {
  trainees;
  isLoading: boolean;
  onOpenProfile: (traineeœ) => void;
}

export function TraineeList({ trainees, isLoading, onOpenProfile }: TraineeListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <TraineeCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (trainees.length === 0) {
    return (
      <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-12 text-center">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-lg">Aucun stagiaire trouvé</h3>
        <p className="text-muted-foreground max-w-md mt-2">
          Aucun stagiaire ne correspond à vos critères de recherche. Essayez d'ajuster vos filtres.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {trainees.map((trainee) => (
        <TraineeCard 
          key={trainee.id} 
          trainee={trainee} 
          onOpenProfile={onOpenProfile} 
        />
      ))}
    </div>
  );
}
