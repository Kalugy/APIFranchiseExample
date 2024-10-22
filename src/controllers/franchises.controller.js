import Franchise from "../models/Franchise.js";
import Branch from "../models/Branch.js";

export const createFranchise = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'El campo `name` es obligatorio.' });
    }

    const newFranchise = new Franchise({ name, branches: [] });
    await newFranchise.save();
    res.status(201).json(newFranchise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getTopProducts = async (req, res) => {
  try {
    const franchise = await Franchise.findById(req.params.franchiseId).populate({
      path: 'branches',
      populate: { path: 'products', model: 'Product' }
    });

    if (!franchise) return res.status(404).json({ error: 'Franchise not found' });

    const topProducts = franchise.branches.map((branch) => {
      const topProduct = branch.products.reduce(
        (max, product) => (product.stock > max.stock ? product : max),
        { stock: 0 }
      );

      return { branch: branch.name, product: topProduct };
    });

    res.status(200).json(topProducts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getFranchiseById = async (req, res) => {
  try {
    const franchise = await Franchise.findById(req.params.franchiseId).populate('branches', 'name');
    if (!franchise) return res.status(404).json({ error: 'Franchise not found' });

    res.status(200).json(franchise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFranchise = async (req, res) => {
  try {
    const franchises = await Franchise.find().populate('branches', 'name');
    res.status(200).json(franchises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateFranchiseById = async (req, res) => {
  try {
    const { name } = req.body;
    const franchise = await Franchise.findByIdAndUpdate(
      req.params.franchiseId,
      { name },
      { new: true, runValidators: true }
    );

    if (!franchise) return res.status(404).json({ error: 'Franchise not found' });

    res.status(200).json(franchise);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteFranchiseById = async (req, res) => {
  try {
    const franchise = await Franchise.findById(req.params.franchiseId);

    if (!franchise) return res.status(404).json({ error: 'Franchise not found' });

    // Eliminar todas las sucursales asociadas
    await Branch.deleteMany({ _id: { $in: franchise.branches } });

    // Eliminar la franquicia
    await Franchise.findByIdAndDelete(req.params.franchiseId);

    res.status(200).json({ message: 'Franchise and Branch deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
