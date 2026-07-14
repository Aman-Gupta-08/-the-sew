const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany();
    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res, next) => {
  try {
    const { name, slug, description } = req.body;
    const category = await prisma.category.create({
      data: { name, slug, description },
    });
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

module.exports = { getCategories, createCategory };
