const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

router.get("/", async (req, res) => {
  // find tags

  try {
    const Tags = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(Tags);
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET Tag by the id
router.get("/:id", async (req, res) => {
  try {
    const Tags = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!Tags) {
      res.status(404).json({ message: "No Tags with that id found!" });
      return;
    }
    res.status(200).json(Tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // creates a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});
//update the tag_name
router.put("/:id", async (req, res) => {
  // update a tags name by the id
  try {
    const Tags = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!Tags[0]) {
      res.status(404).json({ message: "No tags with this id found!" });
      return;
    }
    res.status(200).json({ message: "Updated!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a tag by the id
  try {
    const Tags = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!Tags) {
      res.status(404).json({ message: "No Tag with that id found!" });
      return;
    }

    res.status(200).json(Tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
