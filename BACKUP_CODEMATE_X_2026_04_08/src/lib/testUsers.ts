/**
 * Test Users Helper - For testing multi-user functionality
 * Switch between different test users to verify recommendation logic and notifications
 */

export interface TestUser {
  id: string;
  name: string;
  email: string;
  college: string;
  skills: string[];
  phone: string;
  github: string;
  linkedin: string;
  department: string;
  bio: string;
}

export const TEST_USERS: TestUser[] = [
  {
    id: "user1",
    name: "Alice Sharma",
    email: "alice.sharma@college.edu",
    college: "Tech Institute",
    skills: ["React", "TypeScript", "Node.js"],
    phone: "+91 98765 11111",
    github: "https://github.com/alice-sharma",
    linkedin: "https://linkedin.com/in/alice-sharma",
    department: "Computer Science",
    bio: "Full-stack developer passionate about building scalable applications"
  },
  {
    id: "user2",
    name: "Bob Johnson",
    email: "bob.johnson@college.edu",
    college: "Tech Institute",
    skills: ["Python", "Machine Learning", "Data Science"],
    phone: "+91 98765 22222",
    github: "https://github.com/bob-johnson",
    linkedin: "https://linkedin.com/in/bob-johnson",
    department: "Computer Science",
    bio: "AI/ML enthusiast working on intelligent systems"
  },
  {
    id: "user3",
    name: "Carol White",
    email: "carol.white@college.edu",
    college: "Tech Institute",
    skills: ["UI/UX Design", "Figma", "Frontend"],
    phone: "+91 98765 33333",
    github: "https://github.com/carol-white",
    linkedin: "https://linkedin.com/in/carol-white",
    department: "Information Technology",
    bio: "Designer creating intuitive and beautiful user interfaces"
  },
  {
    id: "user4",
    name: "David Patel",
    email: "david.patel@college.edu",
    college: "Tech Institute",
    skills: ["DevOps", "Docker", "Kubernetes"],
    phone: "+91 98765 44444",
    github: "https://github.com/david-patel",
    linkedin: "https://linkedin.com/in/david-patel",
    department: "Computer Science",
    bio: "Infrastructure engineer focused on cloud-native solutions"
  },
  {
    id: "user5",
    name: "Emma Chen",
    email: "emma.chen@college.edu",
    college: "Tech Institute",
    skills: ["Java", "Android", "Backend"],
    phone: "+91 98765 55555",
    github: "https://github.com/emma-chen",
    linkedin: "https://linkedin.com/in/emma-chen",
    department: "Information Technology",
    bio: "Mobile and backend developer with 2+ years experience"
  }
];

/**
 * Switch test user for multi-user testing
 * Usage: Call this function to switch between different test user accounts
 */
export function switchTestUser(email: string): boolean {
  const testUser = TEST_USERS.find(u => u.email === email);
  if (!testUser) {
    console.error(`Test user with email ${email} not found`);
    return false;
  }

  // Update localStorage to simulate login with different user
  const userObj = {
    name: testUser.name,
    email: testUser.email,
    college: testUser.college,
    skills: testUser.skills,
    phone: testUser.phone,
    github: testUser.github,
    linkedin: testUser.linkedin,
    department: testUser.department,
    bio: testUser.bio,
    timestamp: new Date().toISOString()
  };

  localStorage.setItem("currentUser", JSON.stringify(userObj));
  console.log(`🔄 Switched to test user: ${testUser.name} (${testUser.email})`);
  
  // Reload page to reflect the change
  window.location.reload();
  return true;
}

/**
 * Get available test users for UI selector
 */
export function getTestUsersForSelector() {
  return TEST_USERS.map(user => ({
    label: `${user.name} (${user.email})`,
    value: user.email,
    name: user.name,
    email: user.email
  }));
}

/**
 * Simulate a join request from one user to another user's project
 * This is useful for testing the notification system
 */
export function simulateJoinRequest(projectTitle: string, fromUserEmail: string) {
  const fromUser = TEST_USERS.find(u => u.email === fromUserEmail);
  if (!fromUser) {
    console.error(`User with email ${fromUserEmail} not found`);
    return;
  }

  // Get projects from localStorage
  const projects = JSON.parse(localStorage.getItem("postedProjects") || "[]");
  const project = projects.find((p: any) => p.title === projectTitle);

  if (!project) {
    console.error(`Project "${projectTitle}" not found`);
    return;
  }

  // Add join request to project
  const joinRequest = {
    name: fromUser.name,
    email: fromUser.email,
    phone: fromUser.phone,
    department: fromUser.department,
    skills: fromUser.skills,
    github: fromUser.github,
    linkedin: fromUser.linkedin,
    requestedDate: new Date().toLocaleString()
  };

  if (!project.joinRequests) {
    project.joinRequests = [];
  }

  // Check if already requested
  if (!project.joinRequests.some((r: any) => r.email === fromUser.email)) {
    project.joinRequests.push(joinRequest);
    localStorage.setItem("postedProjects", JSON.stringify(projects));

    // Add notification for project owner
    const ownerNotifKey = `ownerNotifs_${project.owner.email}`;
    const ownerNotifs = JSON.parse(localStorage.getItem(ownerNotifKey) || "[]");
    
    ownerNotifs.push({
      id: `notif_${Date.now()}`,
      title: `New Join Request - ${projectTitle}`,
      message: `${fromUser.name} (${fromUser.email}) requested to join your project "${projectTitle}"`,
      time: new Date().toLocaleString(),
      read: false,
      type: "success",
      projectTitle: projectTitle,
      fromEmail: fromUser.email,
      fromName: fromUser.name,
      notificationType: "joinRequest"
    });

    localStorage.setItem(ownerNotifKey, JSON.stringify(ownerNotifs));
    console.log(`✅ Join request from ${fromUser.name} added to "${projectTitle}"`);
    console.log(`📧 Notification sent to project owner ${project.owner.email}`);
  } else {
    console.warn(`${fromUser.name} has already requested to join "${projectTitle}"`);
  }
}

/**
 * Clear all test data and localStorage
 */
export function clearTestData() {
  localStorage.removeItem("postedProjects");
  localStorage.removeItem("currentUser");
  TEST_USERS.forEach(user => {
    localStorage.removeItem(`ownerNotifs_${user.email}`);
  });
  console.log(`🗑️ Cleared all test data`);
  window.location.reload();
}

/**
 * Log test helper info to console
 */
export function logTestHelperInfo() {
  console.log(`
🧪 ===== CODEMATE TEST HELPER =====

Available Test Users:
${TEST_USERS.map((u, i) => `  ${i + 1}. ${u.name} - ${u.email}`).join("\n")}

Usage Examples:
  switchTestUser('alice.sharma@college.edu')
  simulateJoinRequest('My Project Title', 'bob.johnson@college.edu')
  clearTestData()
  logTestHelperInfo()

To use in browser console:
  1. Open DevTools (F12)
  2. Go to Console tab
  3. Paste command and press Enter
  
Example Workflow:
  1. switchTestUser('alice.sharma@college.edu')  // Login as Alice
  2. Create a project in the UI
  3. switchTestUser('bob.johnson@college.edu')   // Login as Bob
  4. You should see Alice's project in Recommended Projects
  5. Click Join to send a request
  6. switchTestUser('alice.sharma@college.edu')  // Login back as Alice
  7. Check My Projects - Bob's request should appear

🎯 This helps verify multi-user functionality across different email accounts!
  `);
}
