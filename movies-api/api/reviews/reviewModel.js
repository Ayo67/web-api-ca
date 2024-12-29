import mongoose from 'mongoose';

const { Schema } = mongoose;

const ReviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  movieId: { type: Number, required: true }, 
  author: { type: String, required: true },
  content: { 
    type: String, 
    required: true, 
    minlength: 10, 
  }, 
  rating: { 
    type: Number, 
    required: true, 
    enum: [0, 1, 2, 3, 4, 5], // Allowed ratings
  }, // Rating score
  createdAt: { type: Date, default: Date.now }, 
  updatedAt: { type: Date, default: Date.now }, 
});

// Automatically update the `updatedAt` field before saving
ReviewSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('Review', ReviewSchema);