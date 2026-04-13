const mongoose = require('mongoose');

// Matches MortalityRecord.jsx columns exactly
const mortalityRecordSchema = new mongoose.Schema({
  user:             { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date:             { type: Date, default: Date.now },
  batchId:          { type: String, trim: true, default: '' }, // Batch ID
  numberOfDeadHens: { type: Number, default: 0 },
  reasonCause:      { type: String, trim: true, default: '' },
  notes:            { type: String, trim: true, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('MortalityRecord', mortalityRecordSchema);