export function initializeSampleData(userEmail: string, userName: string) {
  const postedKey = "postedProjects";
  let posted = localStorage.getItem(postedKey);
  let postedProjects = posted ? JSON.parse(posted) : [];

  // Check if current user has any projects
  const userProjects = postedProjects.filter((p: any) => p.owner?.email === userEmail);
  
  if (userProjects.length === 0) {
    // Add 5 sample projects for the current user
    const sampleProjects = [
      {
        title: "AI Campus Navigator",
        desc: "An intelligent campus navigation system using computer vision and AR to help new students find classrooms, labs, and facilities.",
        owner: { name: userName, email: userEmail },
        joinRequests: [
          {
            name: "Priya Sharma",
            email: "priya@college.edu",
            phone: "+91 99887 11223",
            department: "CSE",
            skills: ["React", "Python", "TensorFlow"],
            github: "https://github.com/priya",
            linkedin: "https://linkedin.com/in/priya",
            requestedDate: new Date().toLocaleString()
          },
          {
            name: "Rahul Mehta",
            email: "rahul@college.edu",
            phone: "+91 98765 44332",
            department: "CSE",
            skills: ["React", "Node.js", "IoT"],
            github: "https://github.com/rahul",
            linkedin: "https://linkedin.com/in/rahul",
            requestedDate: new Date().toLocaleString()
          }
        ],
        acceptedMembers: [],
        tags: ["React", "Python", "AR"],
        deadline: "Mar 15, 2026"
      },
      {
        title: "Green Energy Dashboard",
        desc: "Real-time monitoring dashboard for campus solar panels and energy consumption with predictive analytics.",
        owner: { name: userName, email: userEmail },
        joinRequests: [
          {
            name: "Neha Rao",
            email: "neha@college.edu",
            phone: "+91 91234 56789",
            department: "IT",
            skills: ["Python", "OpenCV", "Flask"],
            github: "https://github.com/neha",
            linkedin: "https://linkedin.com/in/neha",
            requestedDate: new Date().toLocaleString()
          },
          {
            name: "Vikram Patel",
            email: "vikram@college.edu",
            phone: "+91 88776 55443",
            department: "CSE",
            skills: ["React Native", "Node.js", "MongoDB"],
            github: "https://github.com/vikram",
            linkedin: "https://linkedin.com/in/vikram",
            requestedDate: new Date().toLocaleString()
          }
        ],
        acceptedMembers: [],
        tags: ["React", "Node.js", "IoT"],
        deadline: "Apr 01, 2026"
      },
      {
        title: "Smart Attendance System",
        desc: "Face recognition based attendance system for lecture halls with real-time analytics.",
        owner: { name: userName, email: userEmail },
        joinRequests: [
          {
            name: "Ananya Iyer",
            email: "ananya@college.edu",
            phone: "+91 77665 44332",
            department: "IT",
            skills: ["TypeScript", "PostgreSQL", "React"],
            github: "https://github.com/ananya",
            linkedin: "https://linkedin.com/in/ananya",
            requestedDate: new Date().toLocaleString()
          }
        ],
        acceptedMembers: [],
        tags: ["Python", "OpenCV", "Flask"],
        deadline: "Mar 28, 2026"
      },
      {
        title: "Campus Food Ordering App",
        desc: "Mobile-first food ordering platform for campus canteens with pre-order and live tracking.",
        owner: { name: userName, email: userEmail },
        joinRequests: [
          {
            name: "Rohan Gupta",
            email: "rohan@college.edu",
            phone: "+91 66554 33221",
            department: "CSE",
            skills: ["React", "Node.js", "Docker"],
            github: "https://github.com/rohan",
            linkedin: "https://linkedin.com/in/rohan",
            requestedDate: new Date().toLocaleString()
          },
          {
            name: "Priya Sharma",
            email: "priya@college.edu",
            phone: "+91 99887 11223",
            department: "CSE",
            skills: ["React", "Python", "UI/UX"],
            github: "https://github.com/priya",
            linkedin: "https://linkedin.com/in/priya",
            requestedDate: new Date().toLocaleString()
          }
        ],
        acceptedMembers: [],
        tags: ["React Native", "Node.js", "Stripe"],
        deadline: "Apr 15, 2026"
      },
      {
        title: "Library Seat Booking System",
        desc: "Web app to check real-time seat availability and book seats with QR-based check-in.",
        owner: { name: userName, email: userEmail },
        joinRequests: [
          {
            name: "Neha Rao",
            email: "neha@college.edu",
            phone: "+91 91234 56789",
            department: "IT",
            skills: ["Python", "React", "PostgreSQL"],
            github: "https://github.com/neha",
            linkedin: "https://linkedin.com/in/neha",
            requestedDate: new Date().toLocaleString()
          }
        ],
        acceptedMembers: [],
        tags: ["TypeScript", "PostgreSQL", "React"],
        deadline: "Apr 20, 2026"
      }
    ];

    postedProjects = [...postedProjects, ...sampleProjects];
    localStorage.setItem(postedKey, JSON.stringify(postedProjects));
  }
}
