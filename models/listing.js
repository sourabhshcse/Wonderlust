const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        default: "https://images.unsplash.com/photo-1732058824460-d89cb7b4a38f?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: function (v) {
            return v === "" ? this.defaultImage : v;
        },
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ]
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing) {
        await review.deleteMany({_id: { $in: listing.reviews }});
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;