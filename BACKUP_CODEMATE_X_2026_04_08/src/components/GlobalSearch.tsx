import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Users, Code2, Trophy, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface SearchResult {
  id: string;
  type: "project" | "user" | "skill";
  title: string;
  description: string;
  icon: any;
  color: string;
  action: () => void;
}

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();

  // Mock search data
  const allData: SearchResult[] = [
    // Projects
    { id: "1", type: "project", title: "AI Campus Navigator", description: "Using ML to optimize campus routes", icon: Code2, color: "text-blue-500", action: () => navigate("/project-details") },
    { id: "2", type: "project", title: "Smart Attendance System", description: "Biometric attendance with IoT", icon: Zap, color: "text-yellow-500", action: () => navigate("/project-details") },
    { id: "3", type: "project", title: "RevivalHub Platform", description: "Community revival and engagement", icon: Trophy, color: "text-purple-500", action: () => navigate("/project-details") },
    // Users
    { id: "4", type: "user", title: "Shivam M.", description: "ML Engineer • IIT Delhi", icon: Users, color: "text-violet-500", action: () => navigate("/profile") },
    { id: "5", type: "user", title: "Harsh M.", description: "Backend Developer • VIT Chennai", icon: Users, color: "text-emerald-500", action: () => navigate("/profile") },
    // Skills
    { id: "6", type: "skill", title: "React", description: "JavaScript UI library", icon: Code2, color: "text-cyan-500", action: () => {} },
    { id: "7", type: "skill", title: "Machine Learning", description: "AI/ML expertise", icon: Zap, color: "text-orange-500", action: () => {} },
  ];

  useEffect(() => {
    if (query.length > 0) {
      const filtered = allData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      {/* Search Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/50 bg-muted/30 text-muted-foreground text-sm hover:bg-muted/50 transition-colors"
      >
        <Search className="h-4 w-4" />
        <span className="hidden lg:inline">Search...</span>
        <kbd className="ml-auto hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-background/50 text-xs">
          <span className="text-xs">⌘K</span>
        </kbd>
      </motion.button>

      {/* Search Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl"
            >
              <div className="mx-4 rounded-xl border border-border bg-card shadow-2xl">
                {/* Search Input */}
                <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search projects, users, skills..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 outline-none bg-transparent text-sm placeholder-muted-foreground"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setOpen(false)}
                    className="p-1 rounded hover:bg-muted/50 transition-colors"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </motion.button>
                </div>

                {/* Results */}
                <div className="max-h-96 overflow-y-auto">
                  {results.length > 0 ? (
                    <div className="space-y-1 p-2">
                      {results.map((result, idx) => (
                        <motion.button
                          key={result.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          onClick={() => {
                            result.action();
                            setOpen(false);
                          }}
                          className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-colors text-left group"
                        >
                          <div className={`p-2 rounded-lg bg-muted/50 ${result.color}`}>
                            <result.icon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm group-hover:text-primary transition-colors">{result.title}</p>
                            <p className="text-xs text-muted-foreground truncate">{result.description}</p>
                          </div>
                          <Badge variant="secondary" className="text-xs capitalize flex-shrink-0">{result.type}</Badge>
                          <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.button>
                      ))}
                    </div>
                  ) : query.length > 0 ? (
                    <div className="flex items-center justify-center py-12 text-muted-foreground">
                      <div className="text-center">
                        <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No results found for "{query}"</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 p-4">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-2">Recent Projects</p>
                        <div className="space-y-1">
                          {allData.filter(r => r.type === "project").slice(0, 3).map(r => (
                            <button
                              key={r.id}
                              onClick={() => { r.action(); setOpen(false); }}
                              className="w-full text-left text-xs p-2 rounded hover:bg-muted/50 transition-colors"
                            >
                              {r.title}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-border px-4 py-2.5 text-xs text-muted-foreground flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">↑↓</kbd> Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">⌘K</kbd> Close
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
