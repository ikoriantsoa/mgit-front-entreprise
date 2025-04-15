
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TraineeCardProps {
  trainee;
  onOpenProfile: (trainee) => void;
}

export function TraineeCard({ trainee, onOpenProfile }: TraineeCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center space-y-0 gap-4 pb-2">
        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="font-semibold text-xl text-primary">
            {trainee.name.charAt(0)}
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-lg">{trainee.name}</h3>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progression</span>
            <span className="font-medium">{trainee.progress}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full mt-1">
            <div
              className={`h-full rounded-full ${
                trainee.progress >= 80 ? "bg-green-500" : 
                trainee.progress >= 40 ? "bg-amber-500" : "bg-red-500"
              }`}
              style={{ width: `${trainee.progress}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm" onClick={() => onOpenProfile(trainee)}>Voir le profil</Button>
      </CardFooter>
      
    </Card>
  );
}
