import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const FavouriteSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movieIds: [{ type: Number, required: true }],
});

FavouriteSchema.pre('save', function (next) {
  this.movieIds = [...new Set(this.movieIds)];
  next();
});

export default mongoose.model('Favourites', FavouriteSchema);