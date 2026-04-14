# Phase 999.1: AI Skill Proof Engine

**Goal:** Implement automated skill verification system to replace fake skill claims with verified competency proof.

**Timeline:** 2-3 weeks

---

## Requirements

### Core Features
1. **Skill Assessment Challenges**
   - Mini coding challenges for each tech skill (React, Python, Node.js, etc.)
   - Auto-graded with AI evaluation
   - Time-boxed (15-30 minutes per challenge)
   - Store completion history

2. **GitHub Integration**
   - Connect user's GitHub account
   - Analyze commit patterns and code quality
   - Extract language proficiency from repos
   - Calculate contribution authenticity score

3. **Skill Trust Score**
   - Badge system: Bronze (1-2 verified) → Silver → Gold → Platinum (10+)
   - Visible on user profile
   - Factors: Completed challenges + GitHub analysis + Project history

4. **Skill Profile**
   - Show verified vs claimed skills
   - Challenge completion history
   - Trust score by skill
   - Latest verification date

---

## Implementation Plan

### Wave 1: Challenge System (Days 1-5)
- [ ] Create Challenge data model
- [ ] Build Challenge Editor component (admin)
- [ ] Create Challenge UI components
- [ ] Implement challenge submission & grading
- [ ] Add challenge completion tracking to user profile

### Wave 2: GitHub Integration (Days 6-10)
- [ ] GitHub OAuth setup
- [ ] Repository analysis engine
- [ ] Language detection from repos
- [ ] Contribution scoring algorithm
- [ ] User GitHub profile page

### Wave 3: Trust Score & Badges (Days 11-15)
- [ ] Calculate trust score algorithm
- [ ] Badge design and implementation
- [ ] Profile updates to show certificates
- [ ] Trust score visualization

### Wave 4: Verification Dashboard (Days 16-20)
- [ ] Skills verification page
- [ ] Available challenges list
- [ ] Real-time progress tracking
- [ ] Achievement notifications

---

## Technical Approach

### Database Schema
```
SkillChallenge {
  id, skillName, difficulty, description, testCases, timeLimit
}

UserSkillVerification {
  userId, skillName, verifiedDate, trustScore, source (challenge/github/project)
}

ChallengeAttempt {
  userId, challengeId, code, passed, score, attemptDate, timeSpent
}
```

### Components to Create
- `SkillChallengesPage.tsx` - List and attempt challenges
- `ChallengePlayer.tsx` - IDE-like challenge interface
- `SkillVerificationProfile.tsx` - Show verified skills
- `TrustScoreBadge.tsx` - Display trust score
- `GitHubLinker.tsx` - GitHub integration modal

### API Endpoints
- `POST /api/skills/verify/github` - Analyze GitHub
- `POST /api/challenges/{id}/submit` - Submit challenge
- `GET /api/user/skills/verified` - Get verified skills
- `GET /api/user/trust-score` - Calculate trust score

---

## Success Criteria

- [ ] User can link GitHub account
- [ ] User can attempt skill challenges
- [ ] Challenges auto-grade code submissions
- [ ] Trust score calculates and displays
- [ ] Profile shows verified vs claimed skills
- [ ] GitHub contribution analysis works
- [ ] Mobile responsive implementation

---

## Notes

**Challenges to solve:**
- How to safely execute user code for grading?
- How to make assessments fair but flexible?
- Handling partial credit for challenges
- Preventing gaming the system

**Future enhancements:**
- Peer review for senior challenges
- Skill endorsements from teammates
- Difficulty scaling based on performance
- Leaderboard for challenge completions
