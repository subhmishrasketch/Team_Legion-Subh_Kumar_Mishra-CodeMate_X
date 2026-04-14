# Phase 999.2: Smart Team Chemistry Engine

**Goal:** Match teams based on personality + work style compatibility, not just technical skills.

**Timeline:** 3-4 weeks

---

## Requirements

### Core Features
1. **Work Style Profile**
   - Personality type (Leader/Executor/Balanced)
   - Communication style (Direct/Collaborative/Independent)
   - Work timezone preferences
   - Peak productivity hours
   - Preferred team size

2. **Behavioral Analysis**
   - GitHub contribution patterns (night coder vs day coder)
   - Commit message analysis for communication style
   - Project leadership detection (commits, PRs, reviews)
   - Collaboration frequency vs solo work

3. **Chemistry Scoring**
   - 1v1 chemistry % with potential teammates
   - Team composition score for project requirements
   - Personality balance detection (avoid all leaders)
   - Communication style compatibility

4. **Smart Recommendations**
   - "Who would be a good fit for your project?"
   - "Your team is missing a leader/executor"
   - "These 3 people have 94% chemistry"
   - Timezone-aware recommendations

---

## Implementation Plan

### Wave 1: Profile System (Days 1-6)
- [ ] Create WorkStyleProfile data model
- [ ] Build personality assessment questionnaire
- [ ] GitHub data extraction for patterns
- [ ] User work style profile page
- [ ] Store and update profiles

### Wave 2: Behavioral Analysis (Days 7-12)
- [ ] Extract patterns from GitHub commits
- [ ] Timezone detection and storage
- [ ] Peak hours analysis from commit timestamps
- [ ] Leadership score calculation
- [ ] Communication style scoring

### Wave 3: Chemistry Engine (Days 13-18)
- [ ] Implement compatibility algorithm
- [ ] 1v1 chemistry calculation
- [ ] Team composition scoring
- [ ] Balance detection logic
- [ ] Caching for performance

### Wave 4: UI & Recommendations (Days 19-25)
- [ ] Team chemistry dashboard
- [ ] 1v1 preview with potential teammates
- [ ] Recommended matches modal
- [ ] Team composition analyzer
- [ ] Chemistry improvement suggestions

---

## Technical Approach

### Data Model
```
WorkStyleProfile {
  userId, personalityType, communicationStyle, 
  preferredTeamSize, leadingStyle, timezone, peakHours,
  workSolo/Collaboration preference, lastUpdated
}

BehavioralAnalysis {
  userId, avgCommitTime, nightCoderScore, 
  leadershipCount, collaborationRate, reviewFrequency,
  messageAnalysisSentiment
}

ChemistryScore {
  user1Id, user2Id, overallScore, 
  personalityMatch, communicationMatch, 
  timezoneMatch, workStyleMatch, leadershipBalance
}
```

### Components to Create
- `WorkStyleAssessment.tsx` - Questionnaire component
- `BehavioralProfile.tsx` - Show user's work style
- `ChemistryMatcher.tsx` - Find compatible teammates
- `TeamCompositionAnalyzer.tsx` - Analyze team balance
- `ChemistryScore.tsx` - Display 1v1 chemistry %
- `SmartRecommendations.tsx` - AI suggestions

### API Endpoints
- `POST /api/profile/work-style` - Save assessment
- `GET /api/profile/work-style` - Get profile
- `POST /api/analyze/github-behavior` - Analyze patterns
- `GET /api/chemistry/{userId1}/{userId2}` - Get chemistry score
- `GET /api/recommendations/team-mates` - Get matched candidates
- `POST /api/team/composition-analysis` - Analyze team balance

---

## Algorithm: Chemistry Score

```
Chemistry(A, B) = (
  0.25 * PersonalityMatch +
  0.20 * CommunicationMatch +
  0.20 * WorkStyleMatch +
  0.20 * TimezoneMatch +
  0.15 * LeadershipBalance
) * 100

Where:
- PersonalityMatch: Do their types complement?
- CommunicationMatch: Can they understand each other?
- WorkStyleMatch: Similar work pace/frequency?
- TimezoneMatch: Overlapping work hours?
- LeadershipBalance: One shouldn't dominate
```

---

## Success Criteria

- [ ] Users complete work style assessment
- [ ] GitHub behavioral analysis runs automatically
- [ ] Chemistry scores calculate between users
- [ ] Smart recommendations appear when viewing profiles
- [ ] Team composition analyzer shows balance
- [ ] Mobile responsive
- [ ] Performance optimized (caching)

---

## Competitive Advantages

1. **First-to-market** for work style matching in student platforms
2. **GitHub integration** makes authenticity hard to fake
3. **Timezone awareness** solves real collaboration problem
4. **Leadership balance detection** prevents team conflicts
5. **Chemistry % metric** makes team selection scientific

---

## Notes

**Challenges:**
- Privacy: Analyzing GitHub behavior
- Accuracy: Work patterns from limited data
- Cold start: New users with no history
- Fairness: Handle students from different timezones

**Future:**
- ML model training from successful projects
- Temporal analysis (semester patterns)
- Skill-based chemistry weighting
- Predictive churn detection
