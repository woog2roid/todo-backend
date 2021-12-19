const express = require('express');
const router = express.Router();

const controller = require('./controller');

router.get('*', (req, res, next) => controller.getTodo(req, res, next));
router.delete('*', controller.deleteTodo);
router.patch('*', controller.patchTodo);

module.exports = router;