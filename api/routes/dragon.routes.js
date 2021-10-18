const axios = require('axios');
const express = require("express");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

const { DRAGON_API } = process.env

router.get("/", verifyToken, async function (req, res) {
  try {
    const { data: dragons } = await axios.get(DRAGON_API)
    return res.status(200).json(dragons)
  } catch (error) {
    return res.status(400).json({ message: error.message || 'Oops! An error has occurred' })
  }
});

router.get("/:id", verifyToken, async function (req, res) {
  try {
    const { data: dragon } = await axios.get(`${DRAGON_API}/${req.params.id}`)
    return res.status(200).json(dragon)
  } catch (error) {
    return res.status(400).json({ message: error.message || 'Oops! An error has occurred' })
  }
});

router.post("/", verifyToken, async function (req, res) {
  try {
    const { data: dragon } = await axios.post(DRAGON_API, req.body)
    return res.status(200).json(dragon)
  } catch (error) {
    return res.status(400).json({ message: error.message || 'Oops! An error has occurred' })
  }
});

router.put("/:id", verifyToken, async function (req, res) {
  try {
    const { data: dragon } = await axios.put(`${DRAGON_API}/${req.params.id}`, req.body)
    return res.status(200).json(dragon)
  } catch (error) {
    return res.status(400).json({ message: error.message || 'Oops! An error has occurred' })
  }
});

router.delete("/:id", verifyToken, async function (req, res) {
  try {
    const { data: dragon } = await axios.delete(`${DRAGON_API}/${req.params.id}`)
    return res.status(200).json(dragon)
  } catch (error) {
    return res.status(400).json({ message: error.message || 'Oops! An error has occurred' })
  }
});

module.exports = router;