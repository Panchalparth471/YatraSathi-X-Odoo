const mongoose = require("mongoose");

// Define the RatingAndReview schema
const ratingAndReviewSchema = new mongoose.Schema({
	Users: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Users"
	},

	rating: {
		type: Number,
		required: true,
        enum: [1,2,3,4,5]
	},

	review: {
		type: String
	}
});

// Export the RatingAndReview model
module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);