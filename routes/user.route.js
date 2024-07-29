const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');

router.post('/signup', registerUser);
router.post('/login', loginUser);

router.get('/', getUsers); 
router.get('/:id', getUser); 
router.put('/:id', updateUser); 
router.delete('/:id', deleteUser); 

module.exports = router;
