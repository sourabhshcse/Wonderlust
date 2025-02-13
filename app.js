const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressErrors.js");
const { istingSchema, reviewSchema } = require("./schema.js");
const Review = require("./models/review.js");
const wrapAync = require("./utils/wrapAsync.js");
const listing = require("./routes/listing.js")
const reviews = require("./routes/review.js");

main()
.then( () => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URL);
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));




app.get("/", (req, res) => {
    res.send("Hey, I'm root");
});

app.use("/listings", listing);
app.use("/listings/:id/reviews", reviews);

app.listen(8080, () => {
    console.log("server is listing to 8080");
});