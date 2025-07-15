const reviewSchema = new mongoose.Schema({
    productId: String,
    name: String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});
