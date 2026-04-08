import { useState } from "react";
import { motion } from "framer-motion";
import { Star, MessageCircle, Flag, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ProjectRatingProps {
  projectId: string;
  projectTitle: string;
}

export default function ProjectRating({ projectId, projectTitle }: ProjectRatingProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [reviews, setReviews] = useState([
    { id: 1, author: "Priya K.", rating: 5, comment: "Excellent project ideas and execution!", date: "2 days ago", helpful: 12 },
    { id: 2, author: "Arjun S.", rating: 4, comment: "Good concept but could use better documentation", date: "1 week ago", helpful: 8 },
  ]);

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (review.trim().length < 10) {
      toast.error("Review must be at least 10 characters");
      return;
    }

    const newReview = {
      id: reviews.length + 1,
      author: "You",
      rating,
      comment: review,
      date: "now",
      helpful: 0,
    };

    setReviews([newReview, ...reviews]);
    setRating(0);
    setReview("");
    setSubmitted(true);
    toast.success("Review submitted! Thank you!");
    setTimeout(() => setSubmitted(false), 3000);
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

  return (
    <div className="space-y-6">
      {/* Rating Overview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border bg-card p-6"
      >
        <h3 className="font-heading font-bold mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" /> Project Ratings ({reviews.length})
        </h3>

        {/* Overall Rating */}
        <div className="flex items-center gap-6 mb-6">
          <div>
            <p className="text-4xl font-bold text-yellow-500">{avgRating}</p>
            <div className="flex gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i <= Math.round(parseFloat(avgRating))
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-muted-foreground"
                    }`}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Based on {reviews.length} reviews</p>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1 space-y-1">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-2">
                <span className="text-xs w-8">{stars}★</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-yellow-500 origin-left"
                    style={{
                      width: `${(reviews.filter(r => r.rating === stars).length / reviews.length) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs w-6 text-right text-muted-foreground">
                  {reviews.filter(r => r.rating === stars).length}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Write Review Section */}
        <div className="border-t border-border pt-6">
          <h4 className="font-medium text-sm mb-3">Rate this project</h4>

          {/* Star Rating Input */}
          <div className="flex gap-3 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="transition-transform"
              >
                <Star
                  className={`h-6 w-6 transition-colors ${
                    star <= (hoverRating || rating)
                      ? "fill-yellow-500 text-yellow-500"
                      : "text-muted-foreground"
                  }`}
                />
              </motion.button>
            ))}
            {rating > 0 && (
              <span className="ml-2 text-sm font-medium">
                {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
              </span>
            )}
          </div>

          {/* Review Text Area */}
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience with this project... (minimum 10 characters)"
            className="w-full min-h-24 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 resize-none"
          />

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmitReview}
            className="mt-3 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Submit Review
          </motion.button>

          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-cyan-600"
            >
              ✓ Your review has been submitted!
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Reviews List */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <h4 className="font-heading font-semibold">Latest Reviews</h4>
        {reviews.map((r, idx) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="rounded-lg border border-border bg-card p-4 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{r.author}</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i <= r.rating
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{r.date}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][r.rating]}
              </Badge>
            </div>

            <p className="text-sm text-foreground">{r.comment}</p>

            {/* Review Actions */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <Flag className="h-3.5 w-3.5" /> Report
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <Share2 className="h-3.5 w-3.5" /> Share
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
