
import { Layout } from "@/components/layout/Layout";
import { useState } from "react";
import { 
  Plus, 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { trainees } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { TraineeFilters } from "@/components/trainee/TraineeFilters";
import { TraineeList } from "@/components/trainee/TraineeList";
import { TraineeProfile } from "@/components/trainee/TraineeProfile";

const fetchTrainees = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return trainees;
};

const Trainees = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTrainee, setSelectedTrainee] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const { toast } = useToast();

  const { data: traineeData, isLoading, error } = useQuery({
    queryKey: ['trainees'],
    queryFn: fetchTrainees,
  });

  if (error) {
    toast({
      title: "Erreur",
      description: "Impossible de charger les données des stagiaires.",
      variant: "destructive",
    });
  }

  const filteredTrainees = traineeData ? traineeData.filter((trainee) => {
    const matchesSearch = 
      trainee.name.toLowerCase().includes(search.toLowerCase()) ||
      trainee.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || trainee.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) : [];

  const handleOpenProfile = (trainee) => {
    setSelectedTrainee(trainee);
    setProfileOpen(true);
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatusFilter("all");
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Stagiaires</h1>
            <p className="text-muted-foreground">
              Regarder les profils de nos stagiaires et décrochez votre nouveau collaborateur.
            </p>
          </div>
        </div>

        <TraineeFilters
          search={search}
          statusFilter={statusFilter}
          onSearchChange={setSearch}
          onStatusFilterChange={setStatusFilter}
          onResetFilters={handleResetFilters}
        />

        <TraineeList
          trainees={filteredTrainees}
          isLoading={isLoading}
          onOpenProfile={handleOpenProfile}
        />

        <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <TraineeProfile trainee={selectedTrainee} />
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Trainees;
