const actorModel = require("../models/actor");
const createActor = async (req, res) => {
  try {
    const { name, gender, dob, bio } = req.body;

    if (!name || !gender || !dob || !bio) {
      return res.status(409).json({ message: "All the fields are mandatory" });
    }

    let newActor = {
      name: name,
      gender: gender,
      dob: dob,
      bio: bio,
    };

    await actorModel.create(newActor);

    return res.status(201).json({ message: "Actor Created Successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getActor = async (req, res) => {
  try {
    const actors = await actorModel.find({});
    return res.status(200).json({ data: actors });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getActorById = async (req, res) => {
  try {
    let { id } = req.params;

    const actor = await actorModel.findOne({ id });
    if (!actor) {
      return res.status(404).json({ message: "Actor not found" });
    }
    return res.status(200).json({ data: actor });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const updateActor = async (req, res) => {
  try {
    const { name, gender, dob, bio } = req.body;

    if (!name || !gender || !dob || !bio) {
      return res.status(409).json({ message: "All the fields are mandatory" });
    }
    let { id } = req.params;

    let newActor = {
      name: name,
      gender: gender,
      dob: dob,
      bio: bio,
    };

    let actor = await actorModel.findByIdAndUpdate(id, newActor);
    return res.status(201).json({ message: "Actor updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const deleteActor = async (req, res) => {
  try {
    let { id } = req.params;
    await actorModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Actor deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createActor,
  getActor,
  getActorById,
  updateActor,
  deleteActor,
};
