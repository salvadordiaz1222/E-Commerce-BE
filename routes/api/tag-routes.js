const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  try {
    const data = await Tag.findAll({
      include: [Product],
    });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  try {
    const { id } = req.params;
    const data = await Tag.findByPk(id, {
      include: [{ all: true, nested: true }],
    });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    await Tag.create(req.body);
    res.json({ message: "Tag Created!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  const { id } = req.params;
  try {
    const result = await Tag.update(req.body, { where: { id } });
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  const { id } = req.params;
  try {
    const result = await Tag.destroy({ where: { id } });
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
