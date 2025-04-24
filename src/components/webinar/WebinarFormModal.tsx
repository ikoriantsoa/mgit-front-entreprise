
import { useState, useEffect, ChangeEvent } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface WebinarFormModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  webinar?; // Le webinaire à éditer (null pour un nouveau webinaire)
  onSubmit: (webinar) => void;
}

export function WebinarFormModal({ isOpen, setIsOpen, webinar, onSubmit }: WebinarFormModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    presenter: "",
    date: "",
    time: "",
    duration: "",
    category: "",
    status: "upcoming",
    imageUrl: "/placeholder.svg",
    thumbnailUrl: ""
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (webinar) {
      // Si on édite un webinaire existant, pré-remplir le formulaire
      const dateObj = new Date(webinar.date);
      setFormData({
        ...webinar,
        date: format(dateObj, 'yyyy-MM-dd'),
        time: format(dateObj, 'HH:mm'),
        imageUrl: webinar.imageUrl || webinar.thumbnailUrl || "/placeholder.svg",
        thumbnailUrl: webinar.thumbnailUrl || webinar.imageUrl || ""
      });
      
      // Si une image existe, l'afficher dans l'aperçu
      if (webinar.imageUrl || webinar.thumbnailUrl) {
        setPreviewUrl(webinar.imageUrl || webinar.thumbnailUrl);
      }
    } else {
      // Réinitialiser le formulaire pour un nouveau webinaire
      setFormData({
        title: "",
        description: "",
        presenter: "",
        date: "",
        time: "",
        duration: "",
        category: "",
        status: "upcoming",
        imageUrl: "/placeholder.svg",
        thumbnailUrl: ""
      });
      
      setFile(null);
      setPreviewUrl("");
    }
  }, [webinar, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const selectedFile = e.target.files[0];
    
    // Vérifier le type du fichier (images uniquement)
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner un fichier image");
      return;
    }
    
    // Vérifier la taille du fichier (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB en octets
    if (selectedFile.size > maxSize) {
      toast.error("Le fichier est trop volumineux (max 5MB)");
      return;
    }
    
    setFile(selectedFile);
    
    // Créer une URL pour l'aperçu de l'image
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
    
    // Dans un cas réel, vous téléchargeriez le fichier sur un serveur et obtiendriez une URL
    // Pour cette démo, simulons que l'imageUrl est l'URL d'aperçu
    setFormData(prev => ({ 
      ...prev, 
      imageUrl: objectUrl,
      thumbnailUrl: objectUrl 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Combiner la date et l'heure pour créer un objet Date
    const combinedDateTime = new Date(`${formData.date}T${formData.time}`);
    
    // Dans un cas réel, vous téléchargeriez d'abord le fichier puis soumettriez le formulaire
    // Dans cette démo, nous utilisons directement l'URL d'aperçu
    
    const submittedData = {
      ...formData,
      date: combinedDateTime,
      id: webinar?.id,
      imageUrl: formData.imageUrl || formData.thumbnailUrl,
      thumbnailUrl: formData.thumbnailUrl || formData.imageUrl
    };
    
    onSubmit(submittedData);
    
    // Libérer l'URL d'aperçu si elle existe
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{webinar ? "Modifier le webinaire" : "Ajouter un nouveau webinaire"}</DialogTitle>
            <DialogDescription>
              {webinar ? "Modifiez les détails du webinaire existant." : "Remplissez le formulaire pour créer un nouveau webinaire."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Titre du webinaire</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Entrez un titre"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Décrivez le contenu du webinaire"
                rows={3}
                required
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="presenter">Présentateur</Label>
                <Input
                  id="presenter"
                  name="presenter"
                  value={formData.presenter}
                  onChange={handleChange}
                  placeholder="Nom du présentateur"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="category">Catégorie</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Développement">Développement</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Éducation">Éducation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="time">Heure</Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="duration">Durée (minutes)</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="60"
                  min="1"
                  required
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="status">Statut</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Sélectionnez un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">À venir</SelectItem>
                  <SelectItem value="live">En direct</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                  <SelectItem value="cancelled">Annulé</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Nouveau champ d'upload d'image */}
            <div className="grid gap-2">
              <Label htmlFor="imageUpload">Image du webinaire</Label>
              <div className="flex flex-col items-center gap-4">
                {previewUrl && (
                  <div className="relative w-full h-40 rounded-md overflow-hidden border border-gray-200 mb-2">
                    <img 
                      src={previewUrl} 
                      alt="Aperçu" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex items-center justify-center w-full">
                  <label 
                    htmlFor="imageUpload" 
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Cliquez pour upload</span> ou glissez-déposez
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG ou GIF (max 5MB)</p>
                    </div>
                    <Input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
            
            {/* Champ URL d'image externe (facultatif) */}
            <div className="grid gap-2">
              <Label htmlFor="imageUrl">URL de l'image (facultatif)</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-xs text-muted-foreground">
                Si vous n'avez pas d'image à uploader, vous pouvez fournir une URL externe.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>
              Annuler
            </Button>
            <Button type="submit">{webinar ? "Mettre à jour" : "Créer"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
