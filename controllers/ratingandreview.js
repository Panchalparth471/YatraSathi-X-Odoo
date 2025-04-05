const express = require("express");
const router = express.Router();
const RatingAndReview = require("../models/RatingandReview");
const ServiceRequest = require("../models/Requests");
const User = require("../models/User");

// Add a new rating and review after service completion
router.post("/add", async (req, res) => {
    try {
        const { userId, mechanicId, serviceId, rating, review } = req.body;
        
        // Check if service was completed
        const service = await ServiceRequest.findById(serviceId);
        if (!service || service.status !== "Completed") {
            return res.status(400).json({ message: "Service must be completed before leaving a review" });
        }
        
        // Save the rating and review
        const newReview = new RatingAndReview({
            Users: userId,
            rating,
            review: review || ""
        });
        await newReview.save();

        res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (error) {
        res.status(500).json({ message: "Error adding review", error: error.message });
    }
});

// Get all reviews for a specific mechanic and calculate average rating
router.get("/mechanic/:mechanicId", async (req, res) => {
    try {
        const { mechanicId } = req.params;
        const reviews = await RatingAndReview.find({ Users: mechanicId });
        
        if (reviews.length === 0) {
            return res.status(200).json({ message: "No reviews yet", averageRating: 0, reviews: [] });
        }

        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / reviews.length;

        res.status(200).json({ averageRating, reviews });
    } catch (error) {
        res.status(500).json({ message: "Error fetching reviews", error: error.message });
    }
});

// Update a review
router.put("/update/:reviewId", async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { rating, review } = req.body;
        const updatedReview = await RatingAndReview.findByIdAndUpdate(
            reviewId,
            { rating, review },
            { new: true }
        );
        if (!updatedReview) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ message: "Review updated successfully", review: updatedReview });
    } catch (error) {
        res.status(500).json({ message: "Error updating review", error: error.message });
    }
});

// Delete a review
router.delete("/delete/:reviewId", async (req, res) => {
    try {
        const { reviewId } = req.params;
        const deletedReview = await RatingAndReview.findByIdAndDelete(reviewId);
        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting review", error: error.message });
    }
});

module.exports = router;
