import Franchise from "../models/Franchise.js";
import Branch from "../models/Branch.js";


export const createBranches = async (req, res) => {
  try {
    const { name } = req.body;
    const franchise = await Franchise.findById(req.params.franchiseId);

    if (!franchise) return res.status(404).json({ error: 'Franchise not found' });

    const newBranch = new Branch({ name, franchise: franchise._id, products: [] });
    await newBranch.save();

    franchise.branches.push(newBranch._id);
    await franchise.save();

    res.status(201).json(newBranch);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getBranchById = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.branchId).populate({
      path: 'franchise',
      select: 'name'  // Trae solo el nombre de la franquicia
    });

    if (!branch) return res.status(404).json({ error: 'Sucursal no encontrada' });

    res.status(200).json(branch);
  } catch (error) {
    console.error('Error al obtener la sucursal por ID:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getBranch = async (req, res) => {
  try {
    const branches = await Branch.find().populate({
      path: 'franchise',
      select: 'name'  // Trae solo el nombre de la franquicia
    });

    res.status(200).json(branches);
  } catch (error) {
    console.error('Error al obtener las sucursales:', error);
    res.status(500).json({ error: error.message });
  }
};

export const updateBranchById = async (req, res) => {
  try {
    const { name } = req.body;
    const branch = await Branch.findByIdAndUpdate(
      req.params.branchId,
      { name },
      { new: true, runValidators: true }
    );

    if (!branch) return res.status(404).json({ error: 'Branch not found' });

    res.status(200).json(branch);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteBranchById = async (req, res) => {
  try {
    const branch = await Branch.findByIdAndDelete(req.params.branchId);
    if (!branch) return res.status(404).json({ error: 'Branch not found' });

    await Franchise.updateOne(
      { branches: branch._id },
      { $pull: { branches: branch._id } }
    );

    res.status(200).json({ message: 'Sucursal eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
