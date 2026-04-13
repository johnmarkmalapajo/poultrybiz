const mongoose = require('mongoose');

// Matches HealthRecord.jsx columns exactly
const healthRecordSchema = new mongoose.Schema({
  user:                   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date:                   { type: Date, default: Date.now },
  batchId:                { type: String, trim: true, default: '' },  // Batch ID
  noOfBirds:              { type: Number, default: 0 },
  nameOfVaccine:          { type: String, trim: true, default: '' },
  targetAge:              { type: String, trim: true, default: '' },
  routeOfAdministration:  { type: String, trim: true, default: '' },
  dosageFrequency:        { type: String, trim: true, default: '' },
  administeredBy:         { type: String, trim: true, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('HealthRecord', healthRecordSchema);