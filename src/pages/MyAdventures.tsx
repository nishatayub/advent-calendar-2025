import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { calendarData } from "@/data/calendarData";
import { PixelIcon } from "@/components/PixelIcon";
import { SnowfallEffect } from "@/components/Snowflake";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Calendar, Image as ImageIcon } from "lucide-react";
import cottageBg from "@/assets/cottage-bg.png";

interface TaskEntry {
  photos: string[];
  journal: string;
  completed: boolean;
}

interface SavedAdventure {
  day: number;
  task: string;
  icon: string;
  entry: TaskEntry;
}

const MyAdventures = () => {
  const navigate = useNavigate();
  const [adventures, setAdventures] = useState<SavedAdventure[]>([]);

  useEffect(() => {
    // Load all saved adventures from localStorage
    const savedAdventures: SavedAdventure[] = [];
    
    calendarData.forEach((day) => {
      const saved = localStorage.getItem(`task-${day.day}`);
      if (saved) {
        const entry: TaskEntry = JSON.parse(saved);
        if (entry.completed && (entry.photos.length > 0 || entry.journal)) {
          savedAdventures.push({
            day: day.day,
            task: day.task,
            icon: day.icon,
            entry,
          });
        }
      }
    });

    // Sort by day number (most recent first)
    savedAdventures.sort((a, b) => b.day - a.day);
    setAdventures(savedAdventures);
  }, []);

  const formatDate = (day: number) => {
    const date = new Date(2025, 11, day); // December 2025
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

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

      <div className="relative z-20 max-w-3xl mx-auto">
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
            <div className="flex items-center gap-4">
              <Calendar className="w-8 h-8 text-primary" />
              <div>
                <h1 className="font-pixel text-2xl text-primary">My Adventures</h1>
                <p className="text-sm text-muted-foreground font-serif">
                  {adventures.length} {adventures.length === 1 ? "adventure" : "adventures"} completed
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Adventures List */}
        {adventures.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card/95 backdrop-blur-sm border-4 border-deep-brown rounded-xl p-12 shadow-xl text-center"
          >
            <Calendar className="w-16 h-16 text-sage-light/50 mx-auto mb-4" />
            <h2 className="font-pixel text-xl text-primary mb-2">No Adventures Yet</h2>
            <p className="text-muted-foreground font-serif">
              Start completing daily tasks to build your adventure collection!
            </p>
            <Button
              onClick={() => navigate("/")}
              className="mt-6 font-pixel bg-primary hover:bg-sage-light"
            >
              Start an Adventure
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card/95 backdrop-blur-sm border-4 border-deep-brown rounded-xl p-6 shadow-xl"
          >
            <Accordion type="single" collapsible className="w-full">
              {adventures.map((adventure, index) => (
                <AccordionItem key={adventure.day} value={`day-${adventure.day}`}>
                  <AccordionTrigger className="hover:no-underline group">
                    <div className="flex items-center gap-4 w-full text-left">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="shrink-0"
                      >
                        <PixelIcon icon={adventure.icon} className="text-3xl" />
                      </motion.div>
                      <div className="flex-1">
                        <p className="font-pixel text-primary group-hover:text-honey transition-colors">
                          Day {adventure.day}
                        </p>
                        <p className="text-xs text-muted-foreground font-serif">
                          {formatDate(adventure.day)}
                        </p>
                      </div>
                      {adventure.entry.photos.length > 0 && (
                        <div className="flex items-center gap-1 text-sage-light">
                          <ImageIcon className="w-4 h-4" />
                          <span className="text-sm">{adventure.entry.photos.length}</span>
                        </div>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-14 pr-4 space-y-4">
                      {/* Task Description */}
                      <div className="bg-sage-light/10 rounded-lg p-4 border border-sage-light/20">
                        <p className="text-sm font-serif text-foreground">
                          {adventure.task}
                        </p>
                      </div>

                      {/* Photos */}
                      {adventure.entry.photos.length > 0 && (
                        <div>
                          <h3 className="font-pixel text-sm text-primary mb-3 flex items-center gap-2">
                            <ImageIcon className="w-4 h-4" />
                            Photos
                          </h3>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {adventure.entry.photos.map((photo, photoIndex) => (
                              <motion.div
                                key={photoIndex}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: photoIndex * 0.1 }}
                                className="aspect-square rounded-lg overflow-hidden border-2 border-deep-brown shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                                onClick={() => window.open(photo, '_blank')}
                              >
                                <img
                                  src={photo}
                                  alt={`Day ${adventure.day} - Photo ${photoIndex + 1}`}
                                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Journal Entry */}
                      {adventure.entry.journal && (
                        <div>
                          <h3 className="font-pixel text-sm text-primary mb-3">📔 Journal Entry</h3>
                          <div className="bg-cream/50 rounded-lg p-4 border-2 border-deep-brown/20">
                            <p className="text-sm font-serif text-foreground whitespace-pre-wrap leading-relaxed">
                              {adventure.entry.journal}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Edit Button */}
                      <Button
                        onClick={() => navigate(`/task/${adventure.day}`)}
                        variant="outline"
                        className="w-full font-pixel text-sm border-2 border-sage-light hover:bg-sage-light/20"
                      >
                        Edit Adventure
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 h-4 bg-deep-brown/20 backdrop-blur-sm z-30" />
    </main>
  );
};

export default MyAdventures;
