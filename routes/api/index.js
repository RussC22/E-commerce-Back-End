const router = require("express").Router();
const productRoutes = require("./productRoutes");
const categoryRoutes = require("./categoryRoutes");
const tagRoutes = require("./tagRoutes");

router.use("/categories", categoryRoutes);
router.use("/tags", tagRoutes);
router.use("/products", productRoutes);

module.exports = router;
