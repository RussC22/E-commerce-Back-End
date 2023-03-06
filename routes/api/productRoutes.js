const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const Tags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(Tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const Tags = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!Tags) {
      res.status(404).json({ message: "No Tags found with that id!" });
      return;
    }
    res.status(200).json(Tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});
// we updating tag_name
router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const Tags = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!Tags[0]) {
      res.status(404).json({ message: "No tags with this id!" });
      return;
    }
    res.status(200).json({ message: "Updated" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const Tags = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!Tags) {
      res.status(404).json({ message: "No Tag found with that id!" });
      return;
    }

    res.status(200).json(Tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
