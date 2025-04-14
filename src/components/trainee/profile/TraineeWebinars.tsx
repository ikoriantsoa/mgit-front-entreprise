
import { Video } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { AttendedWebinar } from "@/data/mockData";

interface TraineeWebinarsProps {
  webinarsAttended: number;
  totalWebinars: number;
  attendedWebinars?: AttendedWebinar[];
}

export function TraineeWebinars({ webinarsAttended, totalWebinars, attendedWebinars }: TraineeWebinarsProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <Video className="h-5 w-5 text-primary" />
        Webinaires suivis ({webinarsAttended}/{totalWebinars})
      </h3>
      {attendedWebinars && attendedWebinars.length > 0 ? (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Présentateur</TableHead>
                <TableHead>Note</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendedWebinars.map((webinar: AttendedWebinar, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{webinar.title}</TableCell>
                  <TableCell>{webinar.date}</TableCell>
                  <TableCell>{webinar.presenter}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {webinar.rating ? `${webinar.rating}/5` : "Non noté"}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-muted-foreground">Aucun webinaire suivi pour le moment.</p>
      )}
    </div>
  );
}
