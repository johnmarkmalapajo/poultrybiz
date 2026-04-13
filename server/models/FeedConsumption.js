const mongoose = require('mongoose');

// Matches FeedConsumption.jsx columns exactly
const feedConsumptionSchema = new mongoose.Schema({
  user:            { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date:            { type: Date, default: Date.now },
  batchId:         { type: String, trim: true, default: '' }, // Batch ID
  qualityConsumed: { type: String, trim: true, default: '' },
  notes:           { type: String, trim: true, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('FeedConsumption', feedConsumptionSchema);