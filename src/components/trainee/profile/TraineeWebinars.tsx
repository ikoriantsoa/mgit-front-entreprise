
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
        Webinaires réalisés
      </h3>
      {attendedWebinars && attendedWebinars.length > 0 ? (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendedWebinars.map((webinar: AttendedWebinar, index: number) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{webinar.title}</TableCell>
                  <TableCell>{webinar.date}</TableCell>
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
