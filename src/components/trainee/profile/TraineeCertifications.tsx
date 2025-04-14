
import { Award } from "lucide-react";
import { Certification } from "@/data/mockData";

interface TraineeCertificationsProps {
  certifications?: Certification[];
}

export function TraineeCertifications({ certifications }: TraineeCertificationsProps) {
  if (!certifications || certifications.length === 0) return null;
  
  return (
    <div className="space-y-3">
      <h3 className="text-xl font-semibold flex items-center gap-2">
        <Award className="h-5 w-5 text-primary" />
        Certifications
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {certifications.map((cert: Certification, index: number) => (
          <div key={index} className="border rounded-md p-3">
            <h4 className="font-medium">{cert.name}</h4>
            <p className="text-sm text-muted-foreground">{cert.issuer}</p>
            <p className="text-sm text-muted-foreground">{cert.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
