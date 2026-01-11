const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  coverId: String,
  olid: String,
  pdfUrl: String,
  imgUrl: String,  
  imgType: String,
  category: String,
  status: {
    type: String,
    enum: ['pending', 'approved'],
    default: 'pending',
  }
}, { timestamps: true }); // ✅ Adds createdAt field

 
module.exports = mongoose.model('Book', BookSchema);
