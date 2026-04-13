const mongoose = require('mongoose');

const eggHarvestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },


  batchId: {
    type: String,
    required: true,
    trim: true,
  },

  totalEggs: {
    type: Number,
    required: true,
    default: 0,
  },

  eggSizes: {
    large: { type: Number, default: 0 },
    extraLarge: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    jumbo: { type: Number, default: 0 },
    small: { type: Number, default: 0 },
    peewee: { type: Number, default: 0 },
    crack: { type: Number, default: 0 },

    // keep if ginagamit mo pa:
    good: { type: Number, default: 0 },
  },

  // ❌ REMOVED: notes (tinanggal na sa frontend requirement)
}, { timestamps: true });

module.exports =
  mongoose.models.EggHarvest ||
  mongoose.model('EggHarvest', eggHarvestSchema);