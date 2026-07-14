const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true, images: true },
    });
    res.json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(req.params.id) },
      include: { category: true, images: true },
    });
    if (product) {
      res.json({ success: true, data: product });
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res, next) => {
  try {
    const { name, slug, categoryId, description, price, stock, sku, material, colors } = req.body;
    
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        categoryId: Number(categoryId),
        description,
        price,
        stock: Number(stock),
        sku,
        material,
        colors
      },
    });
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProducts, getProductById, createProduct };
