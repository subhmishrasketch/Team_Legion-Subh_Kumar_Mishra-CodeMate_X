// Types for Skill Challenges and Verification System

export interface SkillChallenge {
  id: string;
  skillName: string; // "React", "Python", "Node.js", etc.
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  timeLimit: number; // in minutes
  starterCode: string;
  solution: string;
  testCases: TestCase[];
  createdAt: Date;
}

export interface TestCase {
  id: string;
  input: any;
  expectedOutput: any;
  description: string;
}

export interface ChallengeAttempt {
  id: string;
  userId: string;
  challengeId: string;
  code: string;
  passed: boolean;
  score: number; // 0-100
  testsPassed: number;
  testsTotal: number;
  timeSpent: number; // in seconds
  attemptedAt: Date;
  submittedAt?: Date;
}

export interface UserSkillVerification {
  userId: string;
  skillName: string;
  verifiedDate: Date;
  trustScore: number; // 0-100
  source: "challenge" | "github" | "project" | "endorsement";
  badge: "bronze" | "silver" | "gold" | "platinum";
}

export interface SkillTrustScore {
  userId: string;
  skillName: string;
  score: number; // 0-100
  badge: "bronze" | "silver" | "gold" | "platinum";
  challengesPassed: number;
  lastVerified: Date;
  githubScore?: number;
  projectScore?: number;
}

// Sample Challenges Database
export const SKILL_CHALLENGES: SkillChallenge[] = [
  {
    id: "react-hooks-1",
    skillName: "React",
    title: "React Hooks: useState Basics",
    description: "Create a counter component using React hooks",
    difficulty: "beginner",
    timeLimit: 20,
    starterCode: `function Counter() {
  // implement your counter here
  return (
    <div>
      <p>Count: {/* display count */}</p>
      <button onClick={() => {}}>Increment</button>
    </div>
  );
}`,
    solution: `function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`,
    testCases: [
      {
        id: "test-1",
        input: { action: "render" },
        expectedOutput: "Count: 0",
        description: "Should render with initial count of 0"
      }
    ],
    createdAt: new Date("2026-04-01")
  },
  {
    id: "python-functions-1",
    skillName: "Python",
    title: "Python: Factorial Function",
    description: "Write a function that calculates factorial",
    difficulty: "beginner",
    timeLimit: 15,
    starterCode: `def factorial(n):
    # implement factorial calculation
    pass`,
    solution: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)`,
    testCases: [
      { id: "test-1", input: 5, expectedOutput: 120, description: "factorial(5) should be 120" },
      { id: "test-2", input: 1, expectedOutput: 1, description: "factorial(1) should be 1" }
    ],
    createdAt: new Date("2026-04-01")
  },
  {
    id: "nodejs-api-1",
    skillName: "Node.js",
    title: "Node.js: Express API Endpoint",
    description: "Create a GET endpoint that returns user data",
    difficulty: "beginner",
    timeLimit: 25,
    starterCode: `const express = require('express');
const app = express();

// implement your endpoint here

app.listen(3000);`,
    solution: `const express = require('express');
const app = express();

app.get('/api/user', (req, res) => {
  res.json({ id: 1, name: 'John' });
});

app.listen(3000);`,
    testCases: [
      { 
        id: "test-1", 
        input: { method: "GET", path: "/api/user" }, 
        expectedOutput: { id: 1, name: 'John' }, 
        description: "GET /api/user should return user object"
      }
    ],
    createdAt: new Date("2026-04-01")
  }
];
