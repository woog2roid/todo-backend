const express = require('express');
const router = express.Router();

const controller = require('./controller');

router.get('/', (req, res, next) => controller.getTodo(req, res, next));
router.post('/', (req, res, next) => controller.addTodo(req, res, next));
router.delete('/:id', (req, res, next) => controller.deleteTodo(req, res, next));
router.patch('/', (req, res, next) => controller.patchTodo(req, res, next));

module.exports = router;