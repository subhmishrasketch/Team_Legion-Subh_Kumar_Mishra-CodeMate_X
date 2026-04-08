import { motion } from "framer-motion";

const features = [
  {
    title: "AI-Powered Matching",
    description: "Intelligent algorithm connects you with ideal team members based on skills and goals.",
    icon: "🤖",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Real-World Projects",
    description: "Build production-grade applications and gain hands-on experience with your team.",
    icon: "🚀",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Skill Showcase",
    description: "Display your portfolio, skills, and achievements to potential collaborators.",
    icon: "💼",
    color: "from-sky-500 to-blue-500",
  },
  {
    title: "Collaboration Tools",
    description: "Built-in project management, code sharing, and team communication features.",
    icon: "🔧",
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Mentorship Network",
    description: "Connect with experienced developers and mentors in the CodeMate X community.",
    icon: "👨‍🏫",
    color: "from-indigo-500 to-blue-500",
  },
  {
    title: "Opportunity Discovery",
    description: "Get discovered by recruiters and land your next internship or job opportunity.",
    icon: "🎯",
    color: "from-yellow-500 to-orange-500",
  },
];

export default function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful Features for{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Real Collaboration
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to build amazing projects with your perfect team
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl`}
              />

              {/* Card */}
              <div className="relative p-8 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-purple-500/5 backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300 h-full">
                {/* Icon */}
                <div className="text-5xl mb-4">{feature.icon}</div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>

                {/* Bottom accent line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 40 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className={`mt-6 h-1 bg-gradient-to-r ${feature.color} rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
