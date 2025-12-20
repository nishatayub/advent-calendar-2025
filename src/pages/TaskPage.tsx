import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { calendarData } from "@/data/calendarData";
import { PixelIcon } from "@/components/PixelIcon";
import { SnowfallEffect } from "@/components/Snowflake";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Camera, X, Save, CheckCircle } from "lucide-react";
import cottageBg from "@/assets/cottage-bg.png";
import { toast } from "sonner";

interface TaskEntry {
  photos: string[];
  journal: string;
  completed: boolean;
}

const TaskPage = () => {
  const { day } = useParams();
  const navigate = useNavigate();
  const dayNum = parseInt(day || "1", 10);
  const taskData = calendarData.find((d) => d.day === dayNum);

  const [photos, setPhotos] = useState<string[]>([]);
  const [journal, setJournal] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem(`task-${dayNum}`);
    if (saved) {
      const entry: TaskEntry = JSON.parse(saved);
      setPhotos(entry.photos);
      setJournal(entry.journal);
      setIsCompleted(entry.completed);
    }
  }, [dayNum]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotos((prev) => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const entry: TaskEntry = {
      photos,
      journal,
      completed: true,
    };
    localStorage.setItem(`task-${dayNum}`, JSON.stringify(entry));
    setIsCompleted(true);
    toast.success("Adventure saved! Great job! 🎉");
    // Redirect to My Adventures page after a short delay
    setTimeout(() => {
      navigate("/my-adventures");
    }, 1500);
  };

  if (!taskData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Task not found</p>
      </div>
    );
  }

  return (
    <main
      className="min-h-screen py-6 px-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${cottageBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
      <SnowfallEffect />

      <div className="relative z-20 max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-cream hover:text-honey mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Calendar
          </Button>

          <div className="bg-card/95 backdrop-blur-sm border-4 border-deep-brown rounded-xl p-6 shadow-xl">
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                <PixelIcon icon={taskData.icon} className="text-5xl" />
              </motion.div>
              <div>
                <p className="text-sage-light font-pixel text-sm">Day {dayNum}</p>
                <h1 className="font-pixel text-xl text-primary">Today's Adventure</h1>
              </div>
              {isCompleted && (
                <CheckCircle className="ml-auto w-8 h-8 text-honey" />
              )}
            </div>

            <p className="text-lg text-foreground font-serif leading-relaxed">
              {taskData.task}
            </p>

            {taskData.hint && (
              <p className="mt-3 text-sm text-muted-foreground italic">
                💡 Hint: {taskData.hint}
              </p>
            )}
          </div>
        </motion.div>

        {/* Photo Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card/95 backdrop-blur-sm border-4 border-deep-brown rounded-xl p-6 shadow-xl mb-6"
        >
          <h2 className="font-pixel text-lg text-primary mb-4 flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Share Your Adventure
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="relative aspect-square rounded-lg overflow-hidden border-2 border-deep-brown"
              >
                <img
                  src={photo}
                  alt={`Adventure photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => removePhoto(index)}
                  className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 hover:scale-110 transition-transform"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}

            <label className="aspect-square rounded-lg border-2 border-dashed border-sage-light/50 flex flex-col items-center justify-center cursor-pointer hover:border-honey hover:bg-sage-light/10 transition-colors">
              <Camera className="w-8 h-8 text-sage-light/70 mb-2" />
              <span className="text-xs text-sage-light/70">Add Photo</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          </div>
        </motion.div>

        {/* Journal Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card/95 backdrop-blur-sm border-4 border-deep-brown rounded-xl p-6 shadow-xl mb-6"
        >
          <h2 className="font-pixel text-lg text-primary mb-4">📔 My Adventure Journal</h2>
          <Textarea
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            placeholder="How was your adventure today? What did you experience? How did it make you feel? Write your story here..."
            className="min-h-[150px] bg-cream/50 border-2 border-deep-brown/30 font-serif text-foreground placeholder:text-muted-foreground/60 resize-none"
          />
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={handleSave}
            className="w-full font-pixel py-6 text-lg bg-primary hover:bg-sage-light text-primary-foreground border-4 border-deep-brown"
          >
            <Save className="w-5 h-5 mr-2" />
            {isCompleted ? "Update My Adventure" : "Complete Adventure"}
          </Button>
        </motion.div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-4 bg-deep-brown/20 backdrop-blur-sm z-30" />
    </main>
  );
};

export default TaskPage;
