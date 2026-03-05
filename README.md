# CodeMate

**Code together. Build better.**

CodeMate is a collaborative platform designed to help students find their perfect teammates, collaborate on innovative projects, and build something amazing together. Whether you're looking for teammates with specific skills, reviving abandoned ideas, or tracking your contributions through a competitive leaderboard, CodeMate makes it all seamless.

> **Tip:** if you install the app or create a desktop shortcut and the icon looks fuzzy, make sure you have proper PWA/app icons. Run `npm run generate:icons` to produce 192×192 and 512×512 PNGs from the source logo and rebuild – these higher‑resolution files prevent the launcher from scaling up the tiny favicon.


## Authentication flow

## Theme & colors

The app now features a fresh teal/purple color palette with warm accents. Light
mode is the default, but you can toggle between light and dark themes using
the sun/moon button in the header (or on the login/signup screens before you
sign in). The colour variables are defined in `src/index.css` and automatically
apply across all pages; dark mode overrides are provided as well.


The app now supports a full sign‑up page (`/signup`) where users can enter their
name, email, password, department, skills, and other profile details. The login
screen displays a link to "Sign up" and will redirect you to the dashboard once
authenticated.

For demo/testing purposes there is a **demo mode** toggle on both login and
signup pages. When enabled the email/password fields are ignored and the
application simply signs in as a pre‑configured student or admin user. Toggle it
off to use real credentials; the underlying auth methods are stubbed but ready
for you to plug in a backend call.

The UI has received some finishing touches:

* Gradient backgrounds, animated blobs and glass cards on auth screens.
* A sticky header and collapsible sidebar wrap all protected pages via
  `DashboardLayout`.
* Components throughout (badges, cards, inputs) now use the updated palette.
* Dark mode support with a theme switcher is built in.
* Layout container provides consistent spacing on dashboard and inner pages.


---
#Deployed Link:
https://codemate1609-ten.vercel.app/
---

## 💡 Why CodeMate?

In traditional educational settings, finding the right teammates for projects is often a challenge. Students struggle with:
- **Skill Matching**: Difficulty finding teammates with complementary skills
- **Project Collaboration**: Lack of a centralized platform for project management
- **Idea Revival**: Great project ideas get abandoned due to team dissolution
- **Performance Tracking**: No unified system to recognize contributions and achievements

CodeMate solves these problems by providing a comprehensive ecosystem for student collaboration.

---

## ✨ Features

### 🤝 Smart Matching
Find the perfect teammates based on:
- **Skill Compatibility**: Filter students by required skills (React, Python, Node.js, ML/AI, etc.)
- **Availability**: See who's available to join your project
- **Collaboration Score**: Check their track record and collaboration potential
- **Points & Achievements**: View their activity points and completed projects

### 📋 Project Management
- **Post Projects**: Share your ideas and requirements with the community
- **My Projects**: Track your active and completed projects
- **Revival Hub**: Adopt abandoned project ideas and give them a second chance
- **Detailed Analytics**: Monitor project progress and team performance

### 🏆 Leaderboard System
- **Activity Points**: Earn points through completed projects and events
  - Completing a project: 2 points
  - Attending an event: 1 point
- **Curriculum Integration**: Track real-world contribution metrics
- **Rankings**: Compete with peers and celebrate achievements

### 💬 Smart Notifications
- **Real-time Updates**: Get notified about project opportunities, team invites, and milestones
- **Customizable Alerts**: Control notification preferences
- **Event Reminders**: Never miss important workshops, seminars, or deadlines

### 👤 User Profiles
- **Complete Profile Management**: Showcase your skills, projects, and achievements
- **Adopted Ideas**: Display projects you've taken up from Revival Hub
- **Department & Semester Info**: Help others understand your background
- **Social Links**: Connect via LinkedIn and GitHub profiles

### 📊 Admin Dashboard
- **Analytics & Statistics**: Monitor platform usage and student engagement
- **Event Management**: Organize workshops, hackathons, and collaborative events
- **Performance Tracking**: View departmental and individual contributions
- **Notifications Management**: Send important updates to students

---

## 🎨 Design & User Experience

CodeMate features:
- **Modern UI**: Built with React and Tailwind CSS
- **Smooth Animations**: Framer Motion for fluid interactions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Accessibility**: Designed with all users in mind
- **Dark Mode Support**: Easy on the eyes in any lighting

---

## 🛠️ Technology Stack

**Frontend**:
- React 18+ with TypeScript
- Vite for blazing-fast development
- Tailwind CSS for styling
- Framer Motion for animations
- shadcn/ui for high-quality components
- TanStack Query for data fetching

**Forms & Validation**:
- React Hook Form
- Zod for schema validation

**State Management**:
- React Context API
- Custom Hooks

**Testing**:
- Vitest for unit testing
- React Testing Library

---

## 📱 App Routes

| Route | Description | Role |
|-------|-------------|------|
| `/` | Landing page with login | Public |
| `/dashboard` | Main hub with recommendations | Student/Admin |
| `/smart-matching` | Find teammates by skills | Student |
| `/revival-hub` | Adopt abandoned ideas | Student |
| `/leaderboard` | View rankings and achievements | Student |
| `/my-projects` | Manage your projects | Student |
| `/post-project` | Create a new project | Student |
| `/profile` | Manage profile and adopted ideas | Student |
| `/notifications` | View all notifications | Student |
| `/help` | Help & support documentation | Student |
| `/analytics` | Admin panel with statistics | Admin |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm or Bun package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/codemate.git
cd codemate

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Build for Production

```bash
npm run build
# or
bun build
```

### Testing

```bash
# Run tests
npm run test
# or
bun test

# Watch mode
npm run test:watch
```

---

## 📊 Key Metrics & System

### Activity Points System
Students earn points based on their contributions:
- **Project Completion**: 2 points per project
- **Event Participation**: 1 point per event
- **Leaderboard Position**: Displayed monthly

### Skill Categories
CodeMate supports 20+ skills across:
- **Frontend**: React, Flutter, UI/UX, Figma
- **Backend**: Node.js, Python, Java, MongoDB, PostgreSQL
- **AI/ML**: TensorFlow, ML/AI, Python
- **DevOps**: Docker, AWS, DevOps
- **Languages**: TypeScript, C++, Rust, Go, Kotlin

---

## 🔐 Security & Privacy

- Secure authentication with email verification
- Role-based access control (Student/Admin)
- Data validation on all inputs
- Protected routes for authenticated users
- Privacy-respecting notification system

---

## 🎯 Roadmap

- [ ] Real-time chat and collaboration
- [ ] Video call integration
- [ ] Project portfolio showcase
- [ ] Advanced analytics dashboard
- [ ] Integration with GitHub for project tracking
- [ ] Mobile app (React Native)
- [ ] AI-powered skill recommendations
- [ ] Certification system

---
## 👥 Team Legion

### Leadership
- **Team Leader**: Subh Kumar Mishra

### Core Members
- **Shivam Mishra** - Full-stack Development
- **Vinit Mishra** - UI/UX & Frontend

## 📝 License

CodeMate is developed for educational purposes.
 
