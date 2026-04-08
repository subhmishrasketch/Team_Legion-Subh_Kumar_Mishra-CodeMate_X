import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, Target, Award, Flame, TrendingUp, GitCommit, Code2, BookOpen,
  Clock, CheckCircle2, AlertCircle, Trophy, Zap, Users, Github, ExternalLink, Loader2, AlertTriangle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchGitHubProfile, fetchGitHubRepos, convertReposToActivities, calculateGitHubStats, getLanguageBreakdown } from "@/lib/githubService";

const ActivityDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [gitHubLoading, setGitHubLoading] = useState(true);
  const [gitHubError, setGitHubError] = useState<string | null>(null);
  const [gitHubData, setGitHubData] = useState<any>(null);
  const [gitHubRepos, setGitHubRepos] = useState<any[]>([]);
  const [gitHubStats, setGitHubStats] = useState<any>(null);
  const [languages, setLanguages] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [useGitHub, setUseGitHub] = useState(false);

  // Load GitHub data if user has GitHub profile
  useEffect(() => {
    const loadGitHubData = async () => {
      setGitHubLoading(true);
      const githubUsername = user?.github?.replace("https://github.com/", "").replace("http://github.com/", "").split("/")[0];
      
      if (githubUsername && githubUsername.trim()) {
        try {
          const profile = await fetchGitHubProfile(githubUsername);
          const repos = await fetchGitHubRepos(githubUsername);
          
          if (profile && repos.length > 0) {
            setGitHubData(profile);
            setGitHubRepos(repos);
            const stats = calculateGitHubStats(repos, profile);
            setGitHubStats(stats);
            const langs = getLanguageBreakdown(repos);
            setLanguages(langs);
            const convertedActivities = convertReposToActivities(repos);
            setActivities(convertedActivities);
            setUseGitHub(true);
            setGitHubError(null);
          } else {
            setUseGitHub(false);
            setGitHubError("No GitHub data available");
          }
        } catch (error) {
          setUseGitHub(false);
          setGitHubError("Failed to load GitHub data");
          console.error(error);
        }
      } else {
        setUseGitHub(false);
        setGitHubError(null);
      }
      setGitHubLoading(false);
    };

    loadGitHubData();
  }, [user?.github]);

  // Fallback mock data if no GitHub
  const mockActivities = [
    { id: 1, type: "project", title: "AI Campus Navigator", action: "Joined project", points: 50, date: "2 hours ago", icon: Code2, color: "text-blue-500" },
    { id: 2, type: "contribution", title: "Fixed login bug", action: "Pushed 3 commits", points: 25, date: "5 hours ago", icon: GitCommit, color: "text-blue-500" },
    { id: 3, type: "achievement", title: "Team Player", action: "Completed collaboration", points: 100, date: "1 day ago", icon: Trophy, color: "text-yellow-500" },
    { id: 4, type: "skill", title: "React Expert", action: "Mastered new skill", points: 75, date: "2 days ago", icon: Zap, color: "text-purple-500" },
    { id: 5, type: "learning", title: "TypeScript Fundamentals", action: "Completed course", points: 60, date: "3 days ago", icon: BookOpen, color: "text-indigo-500" },
    { id: 6, type: "project", title: "Smart Attendance", action: "Project milestone", points: 80, date: "1 week ago", icon: CheckCircle2, color: "text-blue-500" },
  ];

  const displayActivities = useGitHub && activities.length > 0 ? activities : mockActivities;

  // Dynamic stats based on GitHub or mock data
  const getStats = () => {
    if (useGitHub && gitHubStats) {
      return [
        { label: "Total Stars", value: gitHubStats.totalStars.toString(), change: `${gitHubStats.totalRepos} repos`, icon: Trophy, color: "from-yellow-500/20 to-orange-500/20" },
        { label: "Followers", value: gitHubStats.followers.toString(), change: `Following ${gitHubStats.following}`, icon: Users, color: "from-blue-500/20 to-cyan-500/20" },
        { label: "Points", value: gitHubStats.totalPoints.toString(), change: `${gitHubStats.contributionStreak} day streak`, icon: Flame, color: "from-red-500/20 to-pink-500/20" },
        { label: "Forks", value: gitHubStats.totalForks.toString(), change: `From ${gitHubStats.totalRepos} projects`, icon: GitCommit, color: "from-sky-500/20 to-blue-500/20" },
      ];
    }
    
    return [
      { label: "Total Points", value: "485", change: "+52 this month", icon: Trophy, color: "from-yellow-500/20 to-orange-500/20" },
      { label: "Streak", value: "12 days", change: "Keep it going!", icon: Flame, color: "from-red-500/20 to-pink-500/20" },
      { label: "Contributions", value: "28", change: "+5 this week", icon: GitCommit, color: "from-sky-500/20 to-blue-500/20" },
      { label: "Projects", value: "4", change: "1 in progress", icon: Target, color: "from-blue-500/20 to-cyan-500/20" },
    ];
  };

  const stats = getStats();

  const monthlyData = [
    { week: "Wk1", points: 120 },
    { week: "Wk2", points: 95 },
    { week: "Wk3", points: 140 },
    { week: "Wk4", points: 130 },
  ];

  const weeklyBreakdown = [
    { day: "Mon", activities: 4, points: 85 },
    { day: "Tue", activities: 3, points: 65 },
    { day: "Wed", activities: 5, points: 95 },
    { day: "Thu", activities: 2, points: 45 },
    { day: "Fri", activities: 6, points: 120 },
    { day: "Sat", activities: 2, points: 30 },
    { day: "Sun", activities: 1, points: 20 },
  ];

  const achievements = [
    { emoji: "🚀", name: "First Step", desc: "Posted your first project", unlocked: useGitHub && gitHubRepos.length > 0 },
    { emoji: "⚡", name: "Speedster", desc: "5 contributions in 1 day", unlocked: useGitHub && gitHubStats?.totalStars > 5 },
    { emoji: "🧠", name: "Brain Power", desc: "Mastered 3 skills", unlocked: useGitHub && languages.length >= 3 },
    { emoji: "🤝", name: "Team Leader", desc: "Led 2 successful projects", unlocked: useGitHub && gitHubRepos.length >= 2 },
    { emoji: "🎖️", name: "Legend", desc: "1000+ activity points", unlocked: useGitHub && gitHubStats?.totalPoints >= 1000 },
    { emoji: "🌟", name: "Rising Star", desc: "Top 10 in leaderboard", unlocked: false },
  ];

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
  const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">
            <span className="text-gradient">{useGitHub ? "🐙 GitHub Dashboard" : "Activity Dashboard"}</span>
          </h1>
          <p className="mt-1 text-muted-foreground">
            {useGitHub ? `Tracking ${gitHubData?.login}'s GitHub activity` : "Track your progress and achievements"}
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-lg border border-border hover:bg-muted/50 transition-colors text-sm font-medium"
        >
          ← Back
        </motion.button>
      </motion.div>

      {/* GitHub Connection Alert */}
      {gitHubLoading ? (
        <motion.div variants={item} className="rounded-xl border border-border bg-primary/10 p-4 flex items-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <div>
            <p className="text-sm font-medium">Loading GitHub data...</p>
            <p className="text-xs text-muted-foreground">Fetching your repositories and stats</p>
          </div>
        </motion.div>
      ) : gitHubError && !useGitHub ? (
        <motion.div variants={item} className="rounded-xl border border-warning/50 bg-warning/10 p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium">No GitHub profile connected</p>
            <p className="text-xs text-muted-foreground">Add your GitHub profile in your Profile page to see real repositories and stats</p>
            <button onClick={() => navigate("/profile")} className="text-xs text-primary underline mt-2 hover:no-underline">
              Update Profile →
            </button>
          </div>
        </motion.div>
      ) : useGitHub ? (
        <motion.div variants={item} className="rounded-xl border border-primary/50 bg-primary/10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">✓ GitHub Connected</p>
              <p className="text-xs text-muted-foreground">Real-time data from {gitHubData?.login}</p>
            </div>
          </div>
          <a 
            href={`https://github.com/${gitHubData?.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            <ExternalLink className="h-3 w-3" /> View Profile
          </a>
        </motion.div>
      ) : null}

      {/* Stats Grid */}
      <motion.div variants={item} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -4 }}
            className={`rounded-xl border border-border bg-gradient-to-br ${stat.color} p-5 backdrop-blur-sm transition-all`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-2 font-heading text-3xl font-bold">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.change}</p>
              </div>
              <motion.div whileHover={{ rotate: 12, scale: 1.1 }} className="rounded-lg bg-white/10 p-2">
                <stat.icon className="h-5 w-5" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts & Activity Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Points Chart */}
        <motion.div variants={item} className="lg:col-span-2 rounded-xl border border-border bg-card p-6 space-y-4">
          <h2 className="font-heading text-lg font-bold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" /> Monthly Progress
          </h2>
          <div className="space-y-4">
            {monthlyData.map((data, idx) => (
              <div key={data.week}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{data.week}</span>
                  <span className="text-sm font-semibold text-primary">{data.points} pts</span>
                </div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="origin-left"
                >
                  <Progress value={(data.points / 150) * 100} className="h-2" />
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Heatmap */}
        <motion.div variants={item} className="rounded-xl border border-border bg-card p-6 space-y-4">
          <h2 className="font-heading text-lg font-bold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-warning" /> This Week
          </h2>
          <div className="space-y-3">
            {weeklyBreakdown.map((day, idx) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
              >
                <div className="text-sm font-medium">{day.day}</div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{day.activities} activities</p>
                    <p className="text-sm font-bold text-primary">{day.points} pts</p>
                  </div>
                  <motion.div
                    className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold text-white ${
                      day.points > 100 ? "bg-blue-600" : day.points > 50 ? "bg-blue-500" : "bg-slate-500"
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {Math.round(day.points / 20)}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity Feed */}
      <motion.div variants={item} className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="font-heading text-lg font-bold flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" /> {useGitHub ? "Recent Repositories" : "Recent Activity"}
        </h2>
        <div className="space-y-3">
          <AnimatePresence>
            {displayActivities.map((activity, idx) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 rounded-lg border border-border/50 bg-muted/30 p-4 transition-all hover:bg-muted/50 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-bold text-lg`}
                >
                  {activity.icon || "💻"}
                </motion.div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{activity.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{activity.action}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  {useGitHub && activity.url ? (
                    <a 
                      href={activity.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-primary underline hover:no-underline flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ExternalLink className="h-3 w-3" /> View
                    </a>
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      +{activity.points} pts
                    </Badge>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div variants={item} className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="font-heading text-lg font-bold flex items-center gap-2">
          <Award className="h-5 w-5 text-warning" /> Achievements
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, idx) => (
            <motion.div
              key={achievement.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              className={`rounded-xl border p-4 text-center transition-all ${
                achievement.unlocked
                  ? "border-primary/50 bg-primary/10"
                  : "border-muted/50 bg-muted/30 opacity-60"
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="text-4xl mb-2"
              >
                {achievement.emoji}
              </motion.div>
              <p className="font-semibold text-sm">{achievement.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{achievement.desc}</p>
              {achievement.unlocked && (
                <Badge className="mt-3 gap-1" variant="default">
                  <CheckCircle2 className="h-3 w-3" /> Unlocked
                </Badge>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={item} className="grid gap-6 md:grid-cols-2">
        {/* Contribution Rate */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <h3 className="font-heading font-bold flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" /> {useGitHub ? "Language Stats" : "Contribution Rate"}
          </h3>
          {useGitHub && languages.length > 0 ? (
            <div className="space-y-3">
              {languages.map((lang) => (
                <div key={lang.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{lang.name}</span>
                    <span className="font-bold text-primary">{lang.proficiency}%</span>
                  </div>
                  <Progress value={lang.proficiency} className="h-2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Code Quality</span>
                  <span className="font-bold text-primary">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Collaboration</span>
                  <span className="font-bold text-primary">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Consistency</span>
                  <span className="font-bold text-primary">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </div>
          )}
        </div>

        {/* Top Skills */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <h3 className="font-heading font-bold flex items-center gap-2">
            <Users className="h-5 w-5 text-success" /> {useGitHub ? "Repository Stats" : "Top Skills"}
          </h3>
          {useGitHub && gitHubRepos.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <span className="text-sm">Total Repositories</span>
                <Badge variant="outline">{gitHubRepos.length}</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <span className="text-sm">Total Stars Received</span>
                <Badge variant="outline">{gitHubStats?.totalStars || 0}</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <span className="text-sm">Followers</span>
                <Badge variant="outline">{gitHubStats?.followers || 0}</Badge>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {["React", "Node.js", "TypeScript", "Python", "UI/UX"].map((skill, idx) => (
                <div key={skill} className="flex items-center gap-2">
                  <Badge variant="secondary">{skill}</Badge>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-primary to-primary/50 origin-left"
                      style={{ width: `${80 + Math.random() * 20}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ActivityDashboard;
