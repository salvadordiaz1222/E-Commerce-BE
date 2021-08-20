const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  try {
    const data = await Category.findAll({
      // be sure to include its associated Products
      include: [Product],
    });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  try {
    const { id } = req.params;
    const data = await Category.findByPk(id, {
      // be sure to include its associated Products
      include: [Product],
    });
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    await Category.create(req.body);
    res.json({ message: "Category Created!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  const { id } = req.params;
  try {
    const result = await Category.update(req.body, { where: { id } });
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  const { id } = req.params;
  try {
    const result = await Category.destroy({ where: { id } });
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
