const mongoose = require('mongoose');

const flockSchema = new mongoose.Schema({
  user:           { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  breed:          { type: String, trim: true, default: '' },
  source:         { type: String, trim: true, default: '' },
  dateAcquired:   { type: Date, default: Date.now },
  qtyPurchase:    { type: Number, default: 0 },
  currentQty:     { type: Number, default: 0 },
  notes:          { type: String, trim: true, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Flock', flockSchema);