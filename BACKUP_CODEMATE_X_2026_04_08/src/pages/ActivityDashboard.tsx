import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, Target, Award, Flame, TrendingUp, GitCommit, Code2, BookOpen,
  Clock, CheckCircle2, AlertCircle, Trophy, Zap, Users, Github, ExternalLink, Loader2, AlertTriangle, Settings
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchGitHubProfile, fetchGitHubRepos, convertReposToActivities, calculateGitHubStats, getLanguageBreakdown, validateGitHubUsername } from "@/lib/githubService";

const ActivityDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [gitHubLoading, setGitHubLoading] = useState(false);
  const [gitHubError, setGitHubError] = useState<string | null>(null);
  const [gitHubProfile, setGitHubProfile] = useState<any>(null);
  const [gitHubRepos, setGitHubRepos] = useState<any[]>([]);
  const [gitHubStats, setGitHubStats] = useState<any>(null);
  const [languages, setLanguages] = useState<any[]>([]);
  const [hasGithub, setHasGithub] = useState(false);
  const [githubUsername, setGithubUsername] = useState<string>("");

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
  const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

  // Load GitHub data on mount
  useEffect(() => {
    const loadGitHubData = async () => {
      if (!user?.github) {
        setHasGithub(false);
        return;
      }

      // Extract username from GitHub URL
      let username = "";
      try {
        if (user.github.includes("github.com/")) {
          username = user.github.split("github.com/")[1].split("/")[0];
        } else {
          username = user.github;
        }

        if (!validateGitHubUsername(username)) {
          setGitHubError("Invalid GitHub username format");
          setHasGithub(false);
          return;
        }

        setGithubUsername(username);
        setHasGithub(true);
        setGitHubLoading(true);
        setGitHubError(null);

        // Fetch GitHub data in parallel
        const [profile, repos] = await Promise.all([
          fetchGitHubProfile(username),
          fetchGitHubRepos(username),
        ]);

        if (!profile && !repos.length) {
          setGitHubError("GitHub profile not found. Please check your profile URL.");
          setHasGithub(false);
          setGitHubLoading(false);
          return;
        }

        setGitHubProfile(profile);
        setGitHubRepos(repos);

        // Calculate stats
        const stats = calculateGitHubStats(repos, profile);
        setGitHubStats(stats);

        // Get language breakdown
        const langBreakdown = getLanguageBreakdown(repos);
        setLanguages(langBreakdown);

        setGitHubLoading(false);
      } catch (err) {
        console.error("Error loading GitHub data:", err);
        setGitHubError("Failed to load GitHub data. Please try again later.");
        setHasGithub(false);
        setGitHubLoading(false);
      }
    };

    loadGitHubData();
  }, [user?.github]);

  // Convert repos to activities format
  const gitHubActivities = gitHubRepos.length > 0 ? convertReposToActivities(gitHubRepos) : [];

  // Fallback sample data for when GitHub is not connected
  const sampleActivities = [
    { id: 1, type: "project", title: "AI Campus Navigator", action: "Joined project", points: 50, date: "2 hours ago", icon: Code2, color: "text-blue-500" },
    { id: 2, type: "contribution", title: "Fixed login bug", action: "Pushed 3 commits", points: 25, date: "5 hours ago", icon: GitCommit, color: "text-blue-500" },
    { id: 3, type: "achievement", title: "Team Player", action: "Completed collaboration", points: 100, date: "1 day ago", icon: Trophy, color: "text-yellow-500" },
    { id: 4, type: "skill", title: "React Expert", action: "Mastered new skill", points: 75, date: "2 days ago", icon: Zap, color: "text-purple-500" },
    { id: 5, type: "learning", title: "TypeScript Fundamentals", action: "Completed course", points: 60, date: "3 days ago", icon: BookOpen, color: "text-indigo-500" },
    { id: 6, type: "project", title: "Smart Attendance", action: "Project milestone", points: 80, date: "1 week ago", icon: CheckCircle2, color: "text-blue-500" },
  ];

  const activities = gitHubActivities.length > 0 ? gitHubActivities.slice(0, 6) : sampleActivities;

  // Dynamic stats based on GitHub data or fallback
  const stats = gitHubStats ? [
    { label: "Total Stars", value: gitHubStats.totalStars.toString(), change: "Across all repos", icon: Trophy, color: "from-yellow-500/20 to-orange-500/20" },
    { label: "Streak", value: gitHubStats.contributionStreak.toString(), change: "days active", icon: Flame, color: "from-red-500/20 to-pink-500/20" },
    { label: "Repos", value: gitHubStats.totalRepos.toString(), change: `${gitHubStats.totalForks} forks`, icon: GitCommit, color: "from-sky-500/20 to-blue-500/20" },
    { label: "Followers", value: gitHubStats.followers.toString(), change: `Following ${gitHubStats.following}`, icon: Users, color: "from-blue-500/20 to-cyan-500/20" },
  ] : [
    { label: "Total Points", value: "485", change: "+52 this month", icon: Trophy, color: "from-yellow-500/20 to-orange-500/20" },
    { label: "Streak", value: "12 days", change: "Keep it going!", icon: Flame, color: "from-red-500/20 to-pink-500/20" },
    { label: "Contributions", value: "28", change: "+5 this week", icon: GitCommit, color: "from-sky-500/20 to-blue-500/20" },
    { label: "Projects", value: "4", change: "1 in progress", icon: Target, color: "from-blue-500/20 to-cyan-500/20" },
  ];

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
    { emoji: "🚀", name: "First Step", desc: "Posted your first project", unlocked: true },
    { emoji: "⚡", name: "Speedster", desc: "5 contributions in 1 day", unlocked: true },
    { emoji: "🧠", name: "Brain Power", desc: "Mastered 3 skills", unlocked: gitHubStats?.totalRepos >= 5 },
    { emoji: "🤝", name: "Team Leader", desc: "Led 2 successful projects", unlocked: false },
    { emoji: "🎖️", name: "Legend", desc: "1000+ activity points", unlocked: gitHubStats?.totalStars >= 100 },
    { emoji: "🌟", name: "Rising Star", desc: "Top 10 in leaderboard", unlocked: false },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      {/* Header */}
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold">
            <span className="text-gradient">Activity Dashboard</span>
          </h1>
          {gitHubProfile && (
            <p className="mt-1 text-muted-foreground flex items-center gap-2">
              <Github className="h-4 w-4" /> Connected to @{githubUsername}
            </p>
          )}
          {!hasGithub && (
            <p className="mt-1 text-muted-foreground flex items-center gap-2">
              <AlertCircle className="h-4 w-4" /> Add GitHub profile to see your repositories
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/profile")}
            className="px-3 py-2 rounded-lg border border-border hover:bg-muted/50 transition-colors text-sm font-medium flex items-center gap-2"
          >
            <Settings className="h-4 w-4" /> Add GitHub
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg border border-border hover:bg-muted/50 transition-colors text-sm font-medium"
          >
            ← Back
          </motion.button>
        </div>
      </motion.div>

      {/* GitHub Error Alert */}
      {gitHubError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 flex items-start gap-3"
        >
          <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-destructive">{gitHubError}</p>
            <p className="text-xs text-muted-foreground mt-1">Update your GitHub profile URL in settings</p>
          </div>
        </motion.div>
      )}

      {/* GitHub Profile Section */}
      {gitHubLoading ? (
        <motion.div
          variants={item}
          className="rounded-xl border border-border bg-card p-8 flex items-center justify-center gap-3"
        >
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="text-muted-foreground">Loading GitHub data...</span>
        </motion.div>
      ) : gitHubProfile ? (
        <motion.div
          variants={item}
          className="rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-blue-500/5 p-6 flex items-start gap-6"
        >
          <img
            src={gitHubProfile.avatar_url}
            alt={gitHubProfile.login}
            className="h-20 w-20 rounded-full border-2 border-primary/30"
          />
          <div className="flex-1">
            <h2 className="font-heading text-xl font-bold">{gitHubProfile.login}</h2>
            {gitHubProfile.bio && <p className="text-muted-foreground text-sm mt-1">{gitHubProfile.bio}</p>}
            <div className="flex gap-6 mt-3">
              <div>
                <p className="text-xs text-muted-foreground">Repositories</p>
                <p className="font-bold text-lg">{gitHubProfile.public_repos}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Followers</p>
                <p className="font-bold text-lg">{gitHubProfile.followers}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Following</p>
                <p className="font-bold text-lg">{gitHubProfile.following}</p>
              </div>
            </div>
          </div>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href={`https://github.com/${gitHubProfile.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-primary/20 border border-primary/30 hover:bg-primary/30 transition-colors font-medium text-sm flex items-center gap-2"
          >
            View on GitHub <ExternalLink className="h-4 w-4" />
          </motion.a>
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

      {/* GitHub Repositories (when available) */}
      {gitHubRepos.length > 0 && (
        <motion.div variants={item} className="rounded-xl border border-border bg-card p-6 space-y-4">
          <h2 className="font-heading text-lg font-bold flex items-center gap-2">
            <Github className="h-5 w-5 text-primary" /> Your Repositories ({gitHubRepos.length})
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {gitHubRepos.map((repo, idx) => (
              <motion.a
                key={repo.id}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -2 }}
                className="rounded-lg border border-border/50 bg-muted/30 p-4 hover:bg-muted/50 transition-all group"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-medium text-sm truncate group-hover:text-primary transition-colors flex-1">
                    {repo.name}
                  </h3>
                  <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
                {repo.description && (
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{repo.description}</p>
                )}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-primary"></span> {repo.language}
                    </span>
                  )}
                  {repo.stars > 0 && <span>⭐ {repo.stars}</span>}
                  {repo.forks > 0 && <span>🍴 {repo.forks}</span>}
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
      <motion.div variants={item} className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h2 className="font-heading text-lg font-bold flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" /> Recent Activity
        </h2>
        <div className="space-y-3">
          <AnimatePresence>
            {activities.map((activity, idx) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 rounded-lg border border-border/50 bg-muted/30 p-4 transition-all hover:bg-muted/50"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 ${activity.color}`}
                >
                  {typeof activity.icon === 'string' ? activity.icon : <activity.icon className="h-5 w-5" />}
                </motion.div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.action}</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="text-xs">
                    +{activity.points} pts
                  </Badge>
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
            <Zap className="h-5 w-5 text-primary" /> Contribution Rate
          </h3>
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
        </div>

        {/* Top Skills */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <h3 className="font-heading font-bold flex items-center gap-2">
            <Users className="h-5 w-5 text-success" /> Top Skills
          </h3>
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
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ActivityDashboard;
