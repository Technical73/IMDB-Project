const express = require("express");
const router = express.Router();
const {
  createProducer,
  getProducer,
  getProducerById,
  updateProducer,
  deleteProducer,
} = require("../controllers/producerControllers");
const authValidate = require("../middlewares/authMiddlewares");

router.post("/producers", authValidate, createProducer);
router.get("/producers", authValidate, getProducer);
router.get("/producers/:id", authValidate, getProducerById);
router.put("/producers/:id", authValidate, updateProducer);
router.delete("/producers/:id", authValidate, deleteProducer);

module.exports = router;
