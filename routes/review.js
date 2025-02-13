const express = require("express");
const router = express.Router({ mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressErrors.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

//Reviews - POST Router
router.post("/", validateReview, wrapAsync(async (req, res) =>  {
    console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
 
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
 
    console.log("New review saved");
    res.redirect(`/listings/${listing._id}`);
 })
 );
 
 //Delte review route
 router.delete("/:reviewId", wrapAsync(async (req, res) => {
     const { id, reviewId } = req.params;
 
     await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
     await Review.findByIdAndDelete(reviewId);
 
     res.redirect(`/listings/${id}`);
 }));

 module.exports = router;