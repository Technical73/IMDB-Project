const producerModel = require("../models/producer");

const createProducer = async (req, res) => {
  try {
    const { name, gender, dob, bio } = req.body;

    if (!name || !gender || !dob || !bio) {
      return res.status(409).json({ message: "All the fields are mandatory" });
    }

    let newProducer = {
      name: name,
      gender: gender,
      dob: dob,
      bio: bio,
    };
    await producerModel.create(newProducer);

    return res.status(201).json({ message: "Producer Created Successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getProducer = async (req, res) => {
  try {
    const Producers = await producerModel.find({});
    return res.status(200).json({ data: Producers });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const getProducerById = async (req, res) => {
  try {
    let { id } = req.params;

    const Producer = await producerModel.findOne({ id });
    if (!Producer) {
      return res.status(404).json({ message: "Producer not found" });
    }
    return res.status(200).json({ data: Producer });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const updateProducer = async (req, res) => {
  try {
    const { name, gender, dob, bio } = req.body;

    if (!name || !gender || !dob || !bio) {
      return res.status(409).json({ message: "All the fields are mandatory" });
    }
    let { id } = req.params;

    let newProducer = {
      name: name,
      gender: gender,
      dob: dob,
      bio: bio,
    };

    let Producer = await producerModel.findByIdAndUpdate(id, newProducer);
    return res.status(201).json({ message: "Producer updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const deleteProducer = async (req, res) => {
  try {
    let { id } = req.params;
    await producerModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Producer deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createProducer,
  getProducer,
  getProducerById,
  updateProducer,
  deleteProducer,
};
