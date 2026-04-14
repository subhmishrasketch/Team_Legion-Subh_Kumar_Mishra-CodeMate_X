// Types for Team Chemistry Engine

export type PersonalityType = "leader" | "executor" | "balanced" | "support";
export type CommunicationStyle = "direct" | "collaborative" | "independent" | "listener";
export type TimezonePreference = "early-bird" | "night-owl" | "flexible";

export interface WorkStyleProfile {
  userId: string;
  personalityType: PersonalityType;
  communicationStyle: CommunicationStyle;
  timezone: string; // "UTC-5", "IST", etc.
  peakHoursStart: number; // 0-23
  peakHoursEnd: number;
  preferredTeamSize: "small" | "medium" | "large";
  workPreference: "solo" | "collaborative" | "mixed";
  leadingStyle?: "visionary" | "democratic" | "delegative";
  responseTime: "immediate" | "same-day" | "flexible";
  lastUpdated: Date;
  completedAssessment: boolean;
}

export interface BehavioralAnalysis {
  userId: string;
  avgCommitTime: number; // hour of day (0-23)
  nightCoderScore: number; // 0-100
  leadershipCount: number; // PRs reviewed, issues managed
  collaborationRate: number; // % of collaborative commits
  reviewFrequency: number; // reviews per month
  commitConsistency: number; // 0-100 (how regular)
  gitHubConnected: boolean;
}

export interface ChemistryScore {
  user1Id: string;
  user2Id: string;
  overallScore: number; // 0-100
  personalityMatch: number;
  communicationMatch: number;
  workStyleMatch: number;
  timezoneCompatibility: number;
  leadershipBalance: number;
  recommendation: string;
  lastCalculated: Date;
}

export interface TeamCompositionAnalysis {
  projectId: string;
  teamMembers: string[];
  leaderCount: number;
  executorCount: number;
  balancedCount: number;
  supportCount: number;
  overallBalance: number; // 0-100
  recommendations: string[];
  averageChemistry: number;
}

// Assessment Questions
export const WORK_STYLE_QUESTIONS = [
  {
    id: "personality-1",
    question: "How do you prefer to work?",
    type: "personality",
    options: [
      { value: "leader", label: "I like to lead and make decisions" },
      { value: "executor", label: "I prefer following clear instructions" },
      { value: "balanced", label: "I adapt to what's needed" },
      { value: "support", label: "I support others and fill gaps" }
    ]
  },
  {
    id: "communication-1",
    question: "How do you communicate with teammates?",
    type: "communication",
    options: [
      { value: "direct", label: "Direct and to the point" },
      { value: "collaborative", label: "Collaborative and inclusive" },
      { value: "independent", label: "I prefer minimal communication" },
      { value: "listener", label: "I listen more than I speak" }
    ]
  },
  {
    id: "timezone-1",
    question: "When are you most productive?",
    type: "timezone",
    options: [
      { value: "early-bird", label: "Early mornings (5AM-9AM)" },
      { value: "flexible", label: "Throughout the day equally" },
      { value: "night-owl", label: "Late nights (9PM-3AM)" }
    ]
  },
  {
    id: "teamsize-1",
    question: "What's your ideal team size?",
    type: "preference",
    options: [
      { value: "small", label: "Small (2-3 people)" },
      { value: "medium", label: "Medium (4-5 people)" },
      { value: "large", label: "Large (6+ people)" }
    ]
  },
  {
    id: "workpref-1",
    question: "How do you prefer to work?",
    type: "preference",
    options: [
      { value: "solo", label: "Solo with clear ownership" },
      { value: "collaborative", label: "Collaborative on everything" },
      { value: "mixed", label: "Mix of both" }
    ]
  }
];

// Sample profiles for matching
export const SAMPLE_WORK_PROFILES: Record<string, WorkStyleProfile> = {
  "rahul@college.edu": {
    userId: "rahul@college.edu",
    personalityType: "leader",
    communicationStyle: "direct",
    timezone: "IST",
    peakHoursStart: 9,
    peakHoursEnd: 18,
    preferredTeamSize: "medium",
    workPreference: "collaborative",
    leadingStyle: "delegative",
    responseTime: "immediate",
    lastUpdated: new Date(),
    completedAssessment: true
  },
  "priya@college.edu": {
    userId: "priya@college.edu",
    personalityType: "executor",
    communicationStyle: "collaborative",
    timezone: "IST",
    peakHoursStart: 14,
    peakHoursEnd: 23,
    preferredTeamSize: "small",
    workPreference: "mixed",
    responseTime: "same-day",
    lastUpdated: new Date(),
    completedAssessment: true
  },
  "neha@college.edu": {
    userId: "neha@college.edu",
    personalityType: "balanced",
    communicationStyle: "listener",
    timezone: "IST",
    peakHoursStart: 20,
    peakHoursEnd: 5,
    preferredTeamSize: "small",
    workPreference: "solo",
    responseTime: "flexible",
    lastUpdated: new Date(),
    completedAssessment: true
  }
};

// Chemistry calculation algorithm
export function calculateChemistry(profile1: WorkStyleProfile, profile2: WorkStyleProfile): ChemistryScore {
  // Personality match: Leaders and Executors pair well, Balanced can work with anyone
  const personalityMatch = getPersonalityMatch(profile1.personalityType, profile2.personalityType);
  
  // Communication match: Similar styles work better
  const communicationMatch = getCommunicationMatch(profile1.communicationStyle, profile2.communicationStyle);
  
  // Work style match: Solo-solo people might clash, collaborative-collaborative is ideal
  const workStyleMatch = getWorkStyleMatch(profile1.workPreference, profile2.workPreference);
  
  // Timezone compatibility: Overlap in peak hours matters
  const timezoneCompatibility = getTimezoneCompatibility(profile1, profile2);
  
  // Leadership balance: Team shouldn't have all leaders or all executors
  const leadershipBalance = getLeadershipBalance(profile1.personalityType, profile2.personalityType);
  
  const overallScore = Math.round(
    (personalityMatch * 0.25 +
      communicationMatch * 0.20 +
      workStyleMatch * 0.20 +
      timezoneCompatibility * 0.20 +
      leadershipBalance * 0.15) / 100 * 100
  );

  return {
    user1Id: profile1.userId,
    user2Id: profile2.userId,
    overallScore,
    personalityMatch,
    communicationMatch,
    workStyleMatch,
    timezoneCompatibility,
    leadershipBalance,
    recommendation: getRecommendation(overallScore),
    lastCalculated: new Date()
  };
}

function getPersonalityMatch(type1: PersonalityType, type2: PersonalityType): number {
  const matches: Record<string, Record<string, number>> = {
    leader: { leader: 60, executor: 95, balanced: 85, support: 90 },
    executor: { leader: 95, executor: 75, balanced: 85, support: 80 },
    balanced: { leader: 85, executor: 85, balanced: 90, support: 85 },
    support: { leader: 90, executor: 80, balanced: 85, support: 75 }
  };
  return matches[type1]?.[type2] || 70;
}

function getCommunicationMatch(style1: CommunicationStyle, style2: CommunicationStyle): number {
  const matches: Record<string, Record<string, number>> = {
    direct: { direct: 80, collaborative: 70, independent: 50, listener: 85 },
    collaborative: { direct: 70, collaborative: 95, independent: 60, listener: 80 },
    independent: { direct: 50, collaborative: 60, independent: 75, listener: 65 },
    listener: { direct: 85, collaborative: 80, independent: 65, listener: 70 }
  };
  return matches[style1]?.[style2] || 70;
}

function getWorkStyleMatch(pref1: string, pref2: string): number {
  const matches: Record<string, Record<string, number>> = {
    solo: { solo: 70, collaborative: 60, mixed: 80 },
    collaborative: { solo: 60, collaborative: 95, mixed: 85 },
    mixed: { solo: 80, collaborative: 85, mixed: 90 }
  };
  return (matches[pref1]?.[pref2] as number) || 70;
}

function getTimezoneCompatibility(profile1: WorkStyleProfile, profile2: WorkStyleProfile): number {
  // Check if peak hours overlap
  const overlap1 = isWithinRange(profile2.peakHoursStart, profile1.peakHoursStart, profile1.peakHoursEnd);
  const overlap2 = isWithinRange(profile1.peakHoursStart, profile2.peakHoursStart, profile2.peakHoursEnd);
  
  if (overlap1 && overlap2) return 95; // Strong overlap
  if (overlap1 || overlap2) return 75; // Some overlap
  return 50; // Different hours
}

function isWithinRange(hour: number, start: number, end: number): boolean {
  if (start <= end) {
    return hour >= start && hour <= end;
  }
  return hour >= start || hour <= end;
}

function getLeadershipBalance(type1: PersonalityType, type2: PersonalityType): number {
  // Avoid all leaders or all executors
  if (type1 === type2) return 70;
  if ((type1 === "leader" && type2 === "executor") || (type1 === "executor" && type2 === "leader")) return 95;
  return 85;
}

function getRecommendation(score: number): string {
  if (score >= 90) return "Excellent match! High chemistry expected.";
  if (score >= 75) return "Good match! Compatible working styles.";
  if (score >= 60) return "Decent match. May need some adjustment.";
  return "Different styles. Communication key to success.";
}
