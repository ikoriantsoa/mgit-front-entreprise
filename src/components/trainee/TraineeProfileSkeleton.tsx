
import { Skeleton } from "@/components/ui/skeleton";

export function TraineeProfileSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <Skeleton className="h-32 w-32 rounded-full" />
        <div className="flex-grow space-y-2 text-center md:text-left">
          <Skeleton className="h-8 w-48 mx-auto md:mx-0" />
          <Skeleton className="h-6 w-72 mx-auto md:mx-0" />
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-6 w-16" />
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-2 text-sm">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-16 w-full" />
      </div>

      {/* Current Formation */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-40" />
        <div className="bg-muted/50 p-4 rounded-md">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-6 w-20" />
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-sm mb-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-2 w-full" />
          </div>
        </div>
      </div>

      {/* Webinars */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-48" />
        <div className="border rounded-md overflow-hidden">
          <div className="p-3 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-5 w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="space-y-3">
        <Skeleton className="h-6 w-48" />
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="border-l-2 border-muted pl-4 pb-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-32 mt-1" />
              <Skeleton className="h-4 w-32 mt-1" />
              <Skeleton className="h-12 w-full mt-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
