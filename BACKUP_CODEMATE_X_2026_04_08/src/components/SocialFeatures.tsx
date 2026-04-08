import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Share2, UserPlus, Users, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface UserRecommendation {
  id: string;
  name: string;
  role: string;
  avatar: string;
  skills: string[];
  compatibility: number;
  following: boolean;
}

const recommendedUsers: UserRecommendation[] = [
  {
    id: "1",
    name: "Shivam M.",
    role: "ML Engineer",
    avatar: "ShM",
    skills: ["Python", "ML/AI", "TensorFlow"],
    compatibility: 92,
    following: false,
  },
  {
    id: "2",
    name: "Harsh M.",
    role: "Backend Developer",
    avatar: "HM",
    skills: ["Node.js", "PostgreSQL", "DevOps"],
    compatibility: 85,
    following: false,
  },
  {
    id: "3",
    name: "Ananya P.",
    role: "Frontend Developer",
    avatar: "AP",
    skills: ["React", "TypeScript", "UI/UX"],
    compatibility: 78,
    following: false,
  },
  {
    id: "4",
    name: "Rohan S.",
    role: "Full Stack Developer",
    avatar: "RS",
    skills: ["MERN", "Docker", "AWS"],
    compatibility: 88,
    following: false,
  },
];

export default function SocialFeatures() {
  const [users, setUsers] = useState(recommendedUsers);
  const [liked, setLiked] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleFollow = (userId: string) => {
    setUsers(users.map(u =>
      u.id === userId ? { ...u, following: !u.following } : u
    ));
    const user = users.find(u => u.id === userId);
    toast.success(user?.following ? "Unfollowed" : "Following!");
  };

  const handleLike = (userId: string) => {
    setLiked(liked.includes(userId) ? liked.filter(id => id !== userId) : [...liked, userId]);
  };

  const getCompatibilityColor = (compatibility: number) => {
    if (compatibility >= 85) return "from-cyan-500/20 to-blue-500/20";
    if (compatibility >= 70) return "from-blue-500/20 to-cyan-500/20";
    return "from-yellow-500/20 to-orange-500/20";
  };

  return (
    <div className="space-y-8">
      {/* Recommended Users for Collaboration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border bg-card p-6"
      >
        <h3 className="font-heading text-lg font-bold mb-1 flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" /> Recommended for You
        </h3>
        <p className="text-sm text-muted-foreground mb-6">Based on your skills and interests</p>

        <div className="grid gap-4 md:grid-cols-2">
          {users.map((user, idx) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              className="rounded-lg border border-border/50 bg-gradient-to-br from-muted/30 to-muted/10 p-4 space-y-3 group hover:border-primary/50 transition-all"
            >
              {/* Header with avatar */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold">
                      {user.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.role}</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleLike(user.id)}
                  className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
                >
                  <Heart
                    className={`h-5 w-5 transition-colors ${
                      liked.includes(user.id)
                        ? "fill-red-500 text-red-500"
                        : "text-muted-foreground hover:text-red-500"
                    }`}
                  />
                </motion.button>
              </div>

              {/* Compatibility Score */}
              <div className={`rounded-lg bg-gradient-to-r ${getCompatibilityColor(user.compatibility)} p-2`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold">Compatibility</span>
                  <span className="text-sm font-bold text-primary">{user.compatibility}%</span>
                </div>
                <div className="h-1.5 bg-background/30 rounded-full overflow-hidden mt-1">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 + idx * 0.05 }}
                    className="h-full bg-primary origin-left"
                    style={{ width: `${user.compatibility}%` }}
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1">
                {user.skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2 border-t border-border/30">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleFollow(user.id)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    user.following
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "bg-primary/20 text-primary hover:bg-primary/30"
                  }`}
                >
                  <UserPlus className="h-3.5 w-3.5 inline mr-1" />
                  {user.following ? "Following" : "Follow"}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-muted hover:bg-muted/80 transition-colors"
                >
                  <Share2 className="h-3.5 w-3.5 inline" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/smart-matching")}
          className="w-full mt-6 py-2.5 rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary font-medium text-sm transition-colors flex items-center justify-center gap-2"
        >
          View All Users <ArrowRight className="h-4 w-4" />
        </motion.button>
      </motion.div>

      {/* Following Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <div className="rounded-lg border border-border bg-card p-4 text-center space-y-2">
          <p className="text-3xl font-bold text-primary">{users.filter(u => u.following).length}</p>
          <p className="text-xs text-muted-foreground">Following</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 text-center space-y-2">
          <p className="text-3xl font-bold text-primary">{liked.length}</p>
          <p className="text-xs text-muted-foreground">Liked Profiles</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 text-center space-y-2">
          <p className="text-3xl font-bold text-primary">
            {Math.round(users.filter(u => u.following).reduce((sum, u) => sum + u.compatibility, 0) / (users.filter(u => u.following).length || 1))}%
          </p>
          <p className="text-xs text-muted-foreground">Avg Compatibility</p>
        </div>
      </motion.div>
    </div>
  );
}
