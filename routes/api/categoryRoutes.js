const router = require("express").Router();
const {
  Location,
  Traveller,
  Trip,
  Product,
  Category,
} = require("../../models");

// GET Categories
router.get("/", async (req, res) => {
  try {
    const Categories = await Location.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(Categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get category by id
router.get("/:id", async (req, res) => {
  try {
    const Categories = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    // if statement for no id
    if (Categories) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    res.status(200).json(Categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its id
  try {
    const Update = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!Update[0]) {
      res.status(404).json({ message: "No Category with this id!" });
      return;
    }
    res.status(200).json({ message: "Updated" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its id
  try {
    const idCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!idCategory) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }

    res.status(200).json(idCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
