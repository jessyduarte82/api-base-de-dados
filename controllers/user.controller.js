const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
  try {
    const { email, password, passwordConfirmation } = req.body;

    if (password !== passwordConfirmation) {
      return res.status(400).json({ message: 'Os dados introduzidos não são válidos.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Utilizador ja existente!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: 'Utilizador Criado com Sucesso!', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'O utilizador não foi encontrado!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'A password introduzida é inválida!' });
    }

    res.status(200).json({ message: 'Login feito!', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'O utilizador não foi encontrado!' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;

    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const user = await User.findByIdAndUpdate(
      id,
      { email, password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'O utilizador não foi encontrado!' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'O utilizador não foi encontrado!' });
    }

    res.status(200).json({ message: 'O utilizador foi apagado!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
