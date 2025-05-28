const express = require("express");
const router = express.Router();
const {
  createActor,
  getActor,
  getActorById,
  updateActor,
  deleteActor,
} = require("../controllers/actorControllers");
const authValidate = require("../middlewares/authMiddlewares");

router.post("/actors", authValidate, createActor);
router.get("/actors", authValidate, getActor);
router.get("/actors/:id", authValidate, getActorById);
router.put("/actors/:id", authValidate, updateActor);
router.delete("/actors/:id", authValidate, deleteActor);

module.exports = router;
