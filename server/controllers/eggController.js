const EggHarvest = require('../models/EggHarvest');

// ── GET ALL ──
const getEggHarvests = async (req, res) => {
  try {
    const harvests = await EggHarvest.find({})
      .sort({ date: -1 })
      .populate('user', 'name email');

    res.status(200).json({
      success: true,
      count: harvests.length,
      data: harvests
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── CREATE ──
const addEggHarvest = async (req, res) => {
  try {
    console.log("FULL BODY:", req.body);

    const {
      date,
      batchId,
      totalEggs,
      eggSizes
    } = req.body;

    const harvest = await EggHarvest.create({
      user: req.user.id,
      date,
      batchId,       
      totalEggs,
      eggSizes,
    });

    console.log("🔥 SAVED DATA:", harvest);

    res.status(201).json({
      success: true,
      data: harvest
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── UPDATE ──
const updateEggHarvest = async (req, res) => {
  try {
    const isAdmin = req.user.role === 'Admin';

    const query = isAdmin
      ? { _id: req.params.id }
      : { _id: req.params.id, user: req.user.id };

    const {
      batchId,
      date,
      totalEggs,
      eggSizes
    } = req.body;

    const harvest = await EggHarvest.findOneAndUpdate(
      query,
      {
        batchId,
        date,
        totalEggs,
        eggSizes,
      },
      { new: true, runValidators: true }
    );

    if (!harvest) {
      return res.status(403).json({
        success: false,
        message: 'Not allowed or record not found'
      });
    }

    res.status(200).json({
      success: true,
      data: harvest
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── DELETE ──
const deleteEggHarvest = async (req, res) => {
  try {
    const isAdmin = req.user.role === 'Admin';

    const query = isAdmin
      ? { _id: req.params.id }
      : { _id: req.params.id, user: req.user.id };

    const harvest = await EggHarvest.findOneAndDelete(query);

    if (!harvest) {
      return res.status(403).json({
        success: false,
        message: 'Not allowed or record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Record deleted'
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getEggRecords = async (req, res) => {
  try {
    const { date, flock_id, sortBy, order, page = 1, limit = 10 } = req.query;

    let filter = {};

    if (date) {
      filter.date = date;
    }

    if (flock_id) {
      filter.flock_id = flock_id;
    }


    let sortOptions = { date: -1 }; // default: latest first

    if (sortBy) {
      sortOptions[sortBy] = order === 'desc' ? -1 : 1;
    }


    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const records = await EggHarvest.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNumber);

    const total = await EggHarvest.countDocuments(filter);

    res.status(200).json({
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      data: records
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEggHarvests,
  addEggHarvest,
  updateEggHarvest,
  deleteEggHarvest
};