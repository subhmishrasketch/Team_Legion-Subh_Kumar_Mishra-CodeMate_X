import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, MapPin, Users, Clock, DollarSign, Ticket, Share2, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface EventDetail {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  status: "Approved" | "Planning" | "Pending" | "Completed";
  registrations: number;
  capacity: number;
  budget: string;
  category: string;
  organizer: string;
  speakers?: string[];
  highlights?: string[];
  reachEstimate: number;
}

const detailedEvents: EventDetail[] = [
  {
    id: "1",
    name: "Annual Hackathon 2024",
    description: "48-hour innovation marathon where students build and showcase cutting-edge projects",
    date: "Mar 15, 2024",
    time: "10:00 AM",
    location: "IIT Bombay, Campus",
    status: "Approved",
    registrations: 342,
    capacity: 400,
    budget: "₹2,00,000",
    category: "Hackathon",
    organizer: "CodeMate Team",
    speakers: ["Industry Experts", "Tech Leaders", "Mentors"],
    highlights: ["48-hour event", "Prize pool ₹1,50,000", "Multiple categories"],
    reachEstimate: 2500,
  },
  {
    id: "2",
    name: "ML/AI Workshop Series",
    description: "Comprehensive workshops covering machine learning basics to advanced deep learning concepts",
    date: "Mar 20, 2024",
    time: "02:00 PM",
    location: "VJTI Mumbai, Auditorium",
    status: "Planning",
    registrations: 89,
    capacity: 150,
    budget: "₹50,000",
    category: "Workshop",
    organizer: "AI Department",
    speakers: ["AI Researchers", "Data Scientists"],
    highlights: ["Hands-on sessions", "Internship opportunities", "Certificate"],
    reachEstimate: 400,
  },
  {
    id: "3",
    name: "Code Sprint Challenge",
    description: "Competitive coding event testing algorithmic skills and speed across multiple difficulty levels",
    date: "Apr 05, 2024",
    time: "03:00 PM",
    location: "Online",
    status: "Approved",
    registrations: 210,
    capacity: 300,
    budget: "₹1,50,000",
    category: "Competition",
    organizer: "Competitive Coding Club",
    speakers: ["Expert Judges", "Former Winners"],
    highlights: ["Online format", "Live leaderboard", "Global participation"],
    reachEstimate: 1200,
  },
  {
    id: "4",
    name: "Open Source Contribution Day",
    description: "Community event focused on contributing to open-source projects and learning collaboration",
    date: "Apr 12, 2024",
    time: "11:00 AM",
    location: "Multiple Colleges",
    status: "Pending",
    registrations: 45,
    capacity: 100,
    budget: "₹25,000",
    category: "Workshop",
    organizer: "Open Source Team",
    speakers: ["Open Source Maintainers", "Contributors"],
    highlights: ["Real contributions", "Networking", "Mentorship"],
    reachEstimate: 300,
  },
  {
    id: "5",
    name: "Career Fair 2024",
    description: "Major recruitment drive featuring 50+ leading tech companies and startups",
    date: "Apr 18, 2024",
    time: "09:00 AM",
    location: "Multiple Venues - Cross College",
    status: "Planning",
    registrations: 567,
    capacity: 800,
    budget: "₹5,00,000",
    category: "Career",
    organizer: "Placement Cell",
    speakers: ["HR Professionals", "Recruiters", "Founders"],
    highlights: ["50+ companies", "Internship drives", "Networking"],
    reachEstimate: 3000,
  },
  {
    id: "6",
    name: "Tech Talk: AI in Production",
    description: "Insights from industry leaders on deploying AI/ML models in production environments",
    date: "Mar 25, 2024",
    time: "05:00 PM",
    location: "KKWIEER, Main Hall",
    status: "Approved",
    registrations: 128,
    capacity: 200,
    budget: "₹75,000",
    category: "Seminar",
    organizer: "Tech Society",
    speakers: ["ML Engineers from FAANG", "Industry Experts"],
    highlights: ["Live Q&A", "Recorded session", "Resource materials"],
    reachEstimate: 600,
  },
];

export default function DetailedEventCards() {
  const [registeredEvents, setRegisteredEvents] = useState<Set<string>>(new Set());
  const [notifiedEvents, setNotifiedEvents] = useState<Set<string>>(new Set());

  const handleRegister = (eventId: string, eventName: string) => {
    const newRegistered = new Set(registeredEvents);
    if (newRegistered.has(eventId)) {
      newRegistered.delete(eventId);
      toast.success(`Unregistered from ${eventName}`);
    } else {
      newRegistered.add(eventId);
      toast.success(`Successfully registered for ${eventName}! 🎉`);
    }
    setRegisteredEvents(newRegistered);
  };

  const handleNotify = (eventId: string, eventName: string) => {
    const newNotified = new Set(notifiedEvents);
    if (newNotified.has(eventId)) {
      newNotified.delete(eventId);
      toast.info(`Notification disabled for ${eventName}`);
    } else {
      newNotified.add(eventId);
      toast.success(`You'll be notified about ${eventName}! 🔔`);
    }
    setNotifiedEvents(newNotified);
  };

  const handleShare = (eventName: string) => {
    const text = `Check out: ${eventName}`;
    if (navigator.share) {
      navigator.share({
        title: "CodeMate Event",
        text: text,
      });
    } else {
      navigator.clipboard.writeText(text);
      toast.success("Event link copied to clipboard! 📋");
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-cyan-500/20 text-cyan-600 border-cyan-500/30";
      case "Planning":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30";
      case "Pending":
        return "bg-orange-500/20 text-orange-600 border-orange-500/30";
      case "Completed":
        return "bg-cyan-500/20 text-cyan-600 border-cyan-500/30";
      default:
        return "bg-gray-500/20 text-gray-600";
    }
  };

  const categoryColor = (category: string) => {
    switch (category) {
      case "Hackathon":
        return "from-red-500 to-pink-600";
      case "Workshop":
        return "from-blue-500 to-cyan-600";
      case "Competition":
        return "from-purple-500 to-violet-600";
      case "Career":
        return "from-cyan-500 to-blue-600";
      case "Seminar":
        return "from-orange-500 to-yellow-600";
      default:
        return "from-gray-500 to-slate-600";
    }
  };

  const totalReach = detailedEvents.reduce((sum, e) => sum + e.reachEstimate, 0);
  const totalRegistrations = detailedEvents.reduce((sum, e) => sum + e.registrations, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="h-6 w-6 text-amber-500" />
          <h2 className="font-heading text-2xl font-bold">Upcoming Events</h2>
          <Badge variant="secondary">{detailedEvents.length} Events</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Complete event catalog with registrations, budget, and community reach
        </p>
      </div>

      {/* Event Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Events", value: detailedEvents.length, icon: "📅" },
          { label: "Total Registrations", value: totalRegistrations, icon: "📝" },
          { label: "Estimated Reach", value: (totalReach / 1000).toFixed(1) + "K", icon: "📢" },
          { label: "Total Budget", value: "₹12.9L", icon: "💰" },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="rounded-lg border border-border bg-muted/30 p-3 text-center"
          >
            <p className="text-lg mb-1">{stat.icon}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="text-sm font-bold text-primary mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Event Cards */}
      <div className="grid gap-4">
        {detailedEvents.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.5 }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="relative rounded-xl border border-border bg-gradient-to-br from-card to-card/50 p-6 overflow-hidden group cursor-pointer transition-all"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Content */}
            <div className="relative z-10">
              <div className="flex gap-4 flex-col md:flex-row md:items-start md:justify-between">
                {/* Left column: Event Info */}
                <div className="flex-1 space-y-4">
                  {/* Header with title and status */}
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${categoryColor(
                        event.category
                      )} text-white text-xs font-bold flex-shrink-0`}
                    >
                      {event.category.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-base">{event.name}</h3>
                        <Badge className={`${statusColor(event.status)} shrink-0`}>
                          {event.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{event.description}</p>
                    </div>
                  </div>

                  {/* Event Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    {/* Date */}
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="text-muted-foreground">Date</p>
                        <p className="font-semibold">{event.date}</p>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="text-muted-foreground">Time</p>
                        <p className="font-semibold">{event.time}</p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="text-muted-foreground">Location</p>
                        <p className="font-semibold line-clamp-1">{event.location}</p>
                      </div>
                    </div>

                    {/* Budget */}
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <div>
                        <p className="text-muted-foreground">Budget</p>
                        <p className="font-semibold">{event.budget}</p>
                      </div>
                    </div>
                  </div>

                  {/* Registration Progress */}
                  <div className="space-y-2 py-3 border-t border-border/50">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Ticket className="h-3.5 w-3.5" />
                        Registrations
                      </span>
                      <span className="font-semibold">
                        {event.registrations}/{event.capacity}
                      </span>
                    </div>
                    <Progress value={(event.registrations / event.capacity) * 100} className="h-2" />
                    <p className="text-[10px] text-muted-foreground">
                      {Math.round((event.registrations / event.capacity) * 100)}% capacity • {event.capacity - event.registrations} spots
                      left
                    </p>
                  </div>

                  {/* Highlights */}
                  {event.highlights && event.highlights.length > 0 && (
                    <div className="space-y-2 py-3 border-t border-border/50">
                      <p className="text-xs font-semibold text-muted-foreground">Event Highlights</p>
                      <div className="flex flex-wrap gap-1">
                        {event.highlights.map((highlight) => (
                          <Badge key={highlight} variant="outline" className="text-[9px] py-0 px-2">
                            ✓ {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Organizer & Reach */}
                  <div className="grid grid-cols-2 gap-3 text-xs py-3 border-t border-border/50">
                    <div>
                      <p className="text-muted-foreground mb-1">Organized By</p>
                      <p className="font-semibold">{event.organizer}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Estimated Reach</p>
                      <p className="font-semibold text-cyan-400">{event.reachEstimate.toLocaleString()} people</p>
                    </div>
                  </div>
                </div>

                {/* Right column: Actions */}
                <div className="flex flex-col gap-2 md:w-32">
                  <motion.button
                    onClick={() => handleRegister(event.id, event.name)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center justify-center gap-1 text-xs font-medium py-2 px-3 rounded-lg transition-all whitespace-nowrap ${
                      registeredEvents.has(event.id)
                        ? "bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/30"
                        : "border border-border hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    <Ticket className="h-3 w-3" />
                    {registeredEvents.has(event.id) ? "✓ Registered" : "Register"}
                  </motion.button>
                  <motion.button
                    onClick={() => handleNotify(event.id, event.name)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center justify-center gap-1 text-xs font-medium py-2 px-3 rounded-lg transition-all whitespace-nowrap ${
                      notifiedEvents.has(event.id)
                        ? "bg-blue-500/20 border border-blue-500/50 text-blue-400 hover:bg-blue-500/30"
                        : "border border-border hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    <Bell className="h-3 w-3" />
                    {notifiedEvents.has(event.id) ? "🔔 On" : "Notify"}
                  </motion.button>
                  <motion.button
                    onClick={() => handleShare(event.name)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center gap-1 text-xs font-medium py-2 px-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all whitespace-nowrap"
                  >
                    <Share2 className="h-3 w-3" />
                    Share
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 font-medium transition-all text-sm"
      >
        View All {detailedEvents.length}+ Events
      </motion.button>
    </motion.div>
  );
}
