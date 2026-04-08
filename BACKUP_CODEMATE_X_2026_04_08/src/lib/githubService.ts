/**
 * GitHub API Service
 * Fetches user repositories, commits, activities, and stats
 */

interface GitHubRepo {
  id: number;
  name: string;
  url: string;
  description: string | null;
  stars: number;
  forks: number;
  language: string | null;
  updated_at: string;
}

interface GitHubUser {
  login: string;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubActivity {
  id: string;
  type: string;
  title: string;
  action: string;
  points: number;
  date: string;
  icon: string;
  color: string;
}

/**
 * Fetch user profile from GitHub
 */
export const fetchGitHubProfile = async (username: string): Promise<GitHubUser | null> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      console.error(`GitHub user not found: ${username}`);
      return null;
    }
    const data = await response.json();
    return {
      login: data.login,
      avatar_url: data.avatar_url,
      bio: data.bio,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
    };
  } catch (error) {
    console.error("Error fetching GitHub profile:", error);
    return null;
  }
};

/**
 * Fetch repositories for a GitHub user
 */
export const fetchGitHubRepos = async (username: string): Promise<GitHubRepo[]> => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`
    );
    if (!response.ok) return [];

    const data = await response.json();
    return data.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      updated_at: repo.updated_at,
    }));
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
};

/**
 * Convert GitHub repos to activity dashboard format
 */
export const convertReposToActivities = (repos: GitHubRepo[]): GitHubActivity[] => {
  const iconMap: { [key: string]: string } = {
    JavaScript: "📝",
    TypeScript: "📘",
    Python: "🐍",
    Java: "☕",
    React: "⚛️",
    Node: "🟢",
    "C++": "⚙️",
    Rust: "🦀",
    Go: "🐹",
  };

  return repos.map((repo, index) => {
    const daysAgo = Math.floor(
      (Date.now() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24)
    );
    const timeStr =
      daysAgo === 0
        ? "today"
        : daysAgo === 1
          ? "1 day ago"
          : daysAgo < 7
            ? `${daysAgo} days ago`
            : `${Math.floor(daysAgo / 7)} weeks ago`;

    const points = Math.max(50, 100 - repo.stars * 2); // Score based on stars
    const icon = repo.language
      ? iconMap[repo.language] || "💻"
      : "💾";

    return {
      id: `repo-${repo.id}`,
      type: "project",
      title: repo.name,
      action: `${repo.stars} ⭐ ${repo.forks} 🍴 • ${repo.language || "No Language"}`,
      points,
      date: timeStr,
      icon,
      color: [
        "text-blue-500",
        "text-purple-500",
        "text-pink-500",
        "text-green-500",
        "text-yellow-500",
        "text-cyan-500",
        "text-indigo-500",
        "text-teal-500",
        "text-orange-500",
        "text-red-500",
      ][index % 10],
    };
  });
};

/**
 * Calculate GitHub contribution stats
 */
export const calculateGitHubStats = (repos: GitHubRepo[], profile: GitHubUser | null) => {
  if (!repos.length) {
    return {
      totalStars: 0,
      totalForks: 0,
      totalRepos: profile?.public_repos || 0,
      followers: profile?.followers || 0,
      following: profile?.following || 0,
      totalPoints: 0,
      contributionStreak: 0,
    };
  }

  const totalStars = repos.reduce((sum, repo) => sum + repo.stars, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks, 0);
  const totalPoints = Math.floor(
    totalStars * 10 + totalForks * 5 + repos.length * 20
  );

  // Calculate contribution streak (days since last update)
  const lastUpdate = new Date(repos[0].updated_at);
  const today = new Date();
  const daysRecent = Math.floor(
    (today.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const contributionStreak = Math.max(0, 30 - daysRecent); // Rough estimation

  return {
    totalStars,
    totalForks,
    totalRepos: profile?.public_repos || repos.length,
    followers: profile?.followers || 0,
    following: profile?.following || 0,
    totalPoints,
    contributionStreak,
  };
};

/**
 * Get language breakdown from repos
 */
export const getLanguageBreakdown = (repos: GitHubRepo[]) => {
  const languages: { [key: string]: number } = {};
  repos.forEach((repo) => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });

  const proficiency = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([lang, count]) => ({
      name: lang,
      proficiency: Math.min(100, 60 + count * 10),
    }));

  return proficiency;
};

/**
 * Validate GitHub username
 */
export const validateGitHubUsername = (username: string): boolean => {
  return /^[a-z0-9](?:[a-z0-9-]{0,38}[a-z0-9])?$/i.test(username);
};
