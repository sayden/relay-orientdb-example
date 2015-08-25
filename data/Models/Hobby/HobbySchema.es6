import mongoose from 'mongoose';

var HobbySchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  type: String
});

module.exports = mongoose.model('Hobby', HobbySchema);
