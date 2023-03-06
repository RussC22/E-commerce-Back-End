const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// GET Products
router.get("/", async (req, res) => {
  // find all products
  try {
    const Products = await Product.findAll({
      include: [{ model: Category, model: Tag }],
    });
    res.status(200).json(Products);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a product by its id

  try {
    const Products = await Product.findByPk(req.params.id, {
      include: [{ model: Category, model: Tag }],
    });
    if (!Products) {
      res.status(404).json({ message: "No products with that id found!" });
      return;
    }
    res.status(200).json(Products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// creates a new product
router.post("/", (req, res) => {
  Product.create(req.body)
    .then((product) => {
      // if statement for pruduct tags to be paired to bulk in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond with error
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update the product
router.put("/:id", (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // GET list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // filter which tags to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", async (req, res) => {
  // delete a product by its id
  try {
    const Products = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!Products) {
      res.status(404).json({ message: "No library card with that id found!" });
      return;
    }

    res.status(200).json(Products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
