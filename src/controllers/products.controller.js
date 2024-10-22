import Product from "../models/Product.js";
import Branch from "../models/Branch.js";


export const createProduct = async (req, res) => {
  try {
    const { name, stock } = req.body;
    const branch = await Branch.findById(req.params.branchId);

    if (!branch) return res.status(404).json({ error: 'Branch not found' });

    const newProduct = new Product({ name, stock });
    await newProduct.save();

    branch.products.push(newProduct._id);
    await branch.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProductById = async (req, res) => {
  try {
    const { name, stock } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      { name, stock },
      { new: true, runValidators: true }
    );

    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.branchId);

    if (!branch) return res.status(404).json({ error: 'Branch not found' });

    branch.products = branch.products.filter(
      (product) => product.toString() !== req.params.productId
    );

    await branch.save();
    await Product.findByIdAndDelete(req.params.productId);

    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
