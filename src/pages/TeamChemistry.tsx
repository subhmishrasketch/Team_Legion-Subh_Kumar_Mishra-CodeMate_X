import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Users, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/DashboardLayout";
import { WORK_STYLE_QUESTIONS, SAMPLE_WORK_PROFILES, calculateChemistry } from "@/lib/teamChemistryTypes";

export function TeamChemistry() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const currentQuestion = WORK_STYLE_QUESTIONS[currentQuestionIdx];
  const progress = Math.round(((currentQuestionIdx + 1) / WORK_STYLE_QUESTIONS.length) * 100);

  const handleAnswer = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value
    });

    if (currentQuestionIdx < WORK_STYLE_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIdx(0);
    setAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold">Your Team Chemistry Profile</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Find teammates with compatible working styles and personalities
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Your Profile Summary */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1 space-y-4"
            >
              <div className="bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-xl p-6 border border-primary/30">
                <h2 className="text-xl font-bold mb-4">Your Profile</h2>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Personality Type</p>
                    <Badge className="bg-blue-500/30 text-blue-600 border-blue-300 capitalize">
                      {answers["personality-1"] || "Balanced"}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Communication Style</p>
                    <Badge className="bg-purple-500/30 text-purple-600 border-purple-300 capitalize">
                      {answers["communication-1"] || "Collaborative"}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Productivity Peak</p>
                    <Badge className="bg-amber-500/30 text-amber-600 border-amber-300 capitalize">
                      {(answers["timezone-1"] || "Flexible").replace("-", " ")}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Team Size Preference</p>
                    <Badge className="bg-green-500/30 text-green-600 border-green-300 capitalize">
                      {(answers["teamsize-1"] || "Medium")}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Work Preference</p>
                    <Badge className="bg-pink-500/30 text-pink-600 border-pink-300 capitalize">
                      {answers["workpref-1"] || "Mixed"}
                    </Badge>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full mt-6 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-colors border border-primary/30"
                >
                  Retake Assessment
                </button>
              </div>
            </motion.div>

            {/* Potential Matches */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 space-y-4"
            >
              <h2 className="text-2xl font-bold mb-4">Potential Teammates</h2>

              <div className="space-y-3">
                {Object.entries(SAMPLE_WORK_PROFILES).map(([email, profile]) => {
                  // Create a hypothetical user profile from answers for chemistry calculation
                  const userProfile = {
                    userId: "current-user",
                    personalityType: (answers["personality-1"] || "balanced") as any,
                    communicationStyle: (answers["communication-1"] || "collaborative") as any,
                    timezone: "IST",
                    peakHoursStart: 9,
                    peakHoursEnd: 18,
                    preferredTeamSize: (answers["teamsize-1"] || "medium") as any,
                    workPreference: answers["workpref-1"] || "mixed",
                    responseTime: "immediate" as const,
                    lastUpdated: new Date(),
                    completedAssessment: true
                  };

                  const chemistry = calculateChemistry(userProfile, profile);
                  const isSelected = selectedProfile === email;

                  return (
                    <motion.div
                      key={email}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => setSelectedProfile(isSelected ? null : email)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{email.split("@")[0]}</h3>
                          
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            <div className="text-sm">
                              <p className="text-muted-foreground">Personality</p>
                              <Badge variant="outline" className="capitalize">
                                {profile.personalityType}
                              </Badge>
                            </div>
                            <div className="text-sm">
                              <p className="text-muted-foreground">Communication</p>
                              <Badge variant="outline" className="capitalize">
                                {profile.communicationStyle}
                              </Badge>
                            </div>
                          </div>

                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              className="space-y-3 mt-4 pt-4 border-t border-border"
                            >
                              <h4 className="font-semibold text-sm">Chemistry Breakdown:</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between items-center">
                                  <span className="text-muted-foreground">Personality Match</span>
                                  <span className="font-semibold text-primary">{chemistry.personalityMatch}%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-muted-foreground">Communication</span>
                                  <span className="font-semibold text-primary">{chemistry.communicationMatch}%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-muted-foreground">Work Style</span>
                                  <span className="font-semibold text-primary">{chemistry.workStyleMatch}%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-muted-foreground">Timezone Compatibility</span>
                                  <span className="font-semibold text-primary">{chemistry.timezoneCompatibility}%</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>

                        {/* Chemistry Score */}
                        <div className="text-right">
                          <div className={`text-3xl font-bold mb-1 ${
                            chemistry.overallScore >= 85 ? "text-green-500" :
                            chemistry.overallScore >= 70 ? "text-blue-500" :
                            "text-yellow-500"
                          }`}>
                            {chemistry.overallScore}%
                          </div>
                          <p className="text-xs text-muted-foreground">Chemistry</p>
                          <p className="text-xs text-green-500 mt-2 font-semibold">
                            {chemistry.overallScore >= 85 ? "⭐ Excellent" :
                             chemistry.overallScore >= 70 ? "✅ Good" :
                             "⚠️ Fair"}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-6">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm mb-1">How Chemistry Works</h4>
                    <p className="text-sm text-muted-foreground">
                      Our algorithm matches personalities, communication styles, timezones, and work preferences to find teammates you'll actually enjoy working with—not just skill matches.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">Team Chemistry Assessment</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Answer a few questions to discover teammates with compatible personalities and work styles
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-2"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold">
              Question {currentQuestionIdx + 1} of {WORK_STYLE_QUESTIONS.length}
            </span>
            <span className="text-sm text-muted-foreground">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Question */}
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-2xl font-bold mb-2">{currentQuestion.question}</h2>
            <p className="text-muted-foreground">Choose the option that best describes you</p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(option.value)}
                className="w-full p-4 rounded-lg border-2 border-border hover:border-primary text-left transition-all group hover:bg-primary/5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg group-hover:text-primary transition-colors">
                    {option.label}
                  </span>
                  <div className="w-5 h-5 rounded-full border-2 border-border group-hover:border-primary group-hover:bg-primary/20 transition-all" />
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Motivation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-muted-foreground"
        >
          <p>This will only take {WORK_STYLE_QUESTIONS.length} minutes</p>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
