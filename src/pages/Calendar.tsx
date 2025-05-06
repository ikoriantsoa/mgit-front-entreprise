import { Layout } from "@/components/layout/Layout";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useState } from "react";
import { webinarDates, webinars } from "@/data/mockData";
import { addDays, format, isBefore, isSameDay, subDays } from "date-fns";
import { fr } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WebinarCard } from "@/components/webinar/WebinarCard";
import { WebinarCardSkeleton } from "@/components/webinar/WebinarCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import Page from "./Page";

// Simulation de fonctions d'API
const fetchWebinarDates = async () => {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return webinarDates;
};

const fetchWebinars = async () => {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return webinars;
};

const fetchCurrentWebinar = async () => {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 800));
  return webinars.find((w) => w.status === "live");
};

const fetchWebinarsForDate = async (date) => {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Si pas de date, retourner un tableau vide
  if (!date) return [];

  // Vérifier si la date a des webinaires
  const hasWebinars = webinarDates.some((webinarDate) =>
    isSameDay(webinarDate, date)
  );

  // Si la date a des webinaires, retourner 3 webinaires de mock
  if (hasWebinars) {
    return webinars.slice(0, 3);
  }

  return [];
};

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"month" | "day">("month");

  const yesterday = subDays(new Date(), 1);

  const disabledDays = (day: Date) => {
    return isBefore(day, yesterday);
  };

  // Utiliser react-query pour charger les données
  const { data: webinarDatesData, isLoading: datesLoading } = useQuery({
    queryKey: ["webinarDates"],
    queryFn: fetchWebinarDates,
  });

  const { data: webinarsData } = useQuery({
    queryKey: ["webinars"],
    queryFn: fetchWebinars,
  });

  const { data: currentWebinar, isLoading: currentWebinarLoading } = useQuery({
    queryKey: ["currentWebinar"],
    queryFn: fetchCurrentWebinar,
  });

  const { data: webinarsForDate, isLoading: dateWebinarsLoading } = useQuery({
    queryKey: ["webinarsForDate", date ? date.toISOString() : null],
    queryFn: () => fetchWebinarsForDate(date),
    enabled: !!date,
  });

  // Fonction pour déterminer si une date a des webinaires
  const hasWebinarsOnDate = (date: Date) => {
    if (!webinarDatesData) return false;

    return webinarDatesData.some((webinarDate) => isSameDay(webinarDate, date));
  };

  // Fonction pour naviguer entre les jours en vue quotidienne
  const navigateDay = (direction: number) => {
    if (date) {
      const newDate = addDays(date, direction);
      setDate(newDate);
    }
  };

  return (
    // <Layout>

    <Page>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Calendrier des webinaires
          </h1>
          <p className="text-muted-foreground">
            Restez informer sur le calendrier .
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
          <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Calendrier</CardTitle>
                <div className="space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setView("month")}
                    className={view === "month" ? "bg-secondary" : ""}
                  >
                    Mois
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setView("day")}
                    className={view === "day" ? "bg-secondary" : ""}
                  >
                    Jour
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {datesLoading ? (
                <Skeleton className="h-[340px] w-full rounded-md" />
              ) : (
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  locale={fr}
                  className="rounded-md border"
                  modifiers={{
                    webinarDay: webinarDatesData || [],
                  }}
                  modifiersStyles={{
                    webinarDay: {
                      fontWeight: "bold",
                      backgroundColor: "hsl(var(--primary) / 0.2)",
                      color: "hsl(var(--primary))",
                    },
                  }}
                  disabled={disabledDays}
                />
              )}
            </CardContent>
          </Card>

          <Card className="col-span-1 lg:col-span-4">
            <CardHeader className="pb-2">
              {view === "day" && (
                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigateDay(-1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <CardTitle>
                    {date
                      ? format(date, "EEEE d MMMM yyyy", { locale: fr })
                      : "Sélectionnez une date"}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigateDay(1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
              {view === "month" && (
                <CardTitle>
                  {date
                    ? format(date, "d MMMM yyyy", { locale: fr })
                    : "Sélectionnez une date"}
                </CardTitle>
              )}
            </CardHeader>
            <CardContent>
              {date && view === "day" && (
                <div className="space-y-4">
                  {dateWebinarsLoading ? (
                    Array(3)
                      .fill(0)
                      .map((_, index) => (
                        <div
                          key={index}
                          className="p-3 rounded-md border bg-card"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                          <Skeleton className="h-5 w-3/4 mb-1" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      ))
                  ) : webinarsForDate && webinarsForDate.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {webinarsForDate.map((webinar) => (
                        <div
                          key={webinar.id}
                          className="p-3 rounded-md border bg-card hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <Badge>{webinar.time}</Badge>
                            <Badge variant="outline">{webinar.duration}</Badge>
                          </div>
                          <h3 className="font-medium">{webinar.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Présenté par {webinar.presenter}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-semibold text-lg">
                        Aucun webinaire prévu
                      </h3>
                      <p className="text-muted-foreground max-w-md mt-2">
                        Il n'y a pas de webinaire programmé pour cette date.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {date && view === "month" && (
                <>
                  {dateWebinarsLoading ? (
                    <div className="space-y-6">
                      <Skeleton className="h-6 w-48 mb-4" />
                      <div className="space-y-4">
                        {Array(3)
                          .fill(0)
                          .map((_, index) => (
                            <WebinarCardSkeleton key={index} />
                          ))}
                      </div>
                    </div>
                  ) : webinarsForDate && webinarsForDate.length > 0 ? (
                    <div className="space-y-6">
                      <h3 className="font-semibold">
                        Webinaires du {format(date, "d MMMM", { locale: fr })}
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        {webinarsForDate.map((webinar) => (
                          <WebinarCard
                            key={webinar.id}
                            {...webinar}
                            className="w-full"
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="font-semibold text-lg">
                        Aucun webinaire prévu
                      </h3>
                      <p className="text-muted-foreground max-w-md mt-2">
                        Il n'y a pas de webinaire programmé pour cette date.
                      </p>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Webinaires à venir */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Prochains webinaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!webinarsData
              ? // Afficher des skeletons pendant le chargement
                Array(3)
                  .fill(0)
                  .map((_, index) => <WebinarCardSkeleton key={index} />)
              : webinarsData
                  .filter((webinar) => webinar.status === "upcoming")
                  .slice(0, 3)
                  .map((webinar) => (
                    <WebinarCard key={webinar.id} {...webinar} />
                  ))}
          </div>
        </div>
      </div>
    </Page>

    // </Layout>
  );
};

export default CalendarPage;
