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

module.exports = {
  getEggHarvests,
  addEggHarvest,
  updateEggHarvest,
  deleteEggHarvest
};