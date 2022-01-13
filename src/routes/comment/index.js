const express = require('express');
const router = express.Router();

const controller = require('./controller');

router.get('/', (req, res, next) => controller.getComments(req, res, next));
router.post('/', (req, res, next) => controller.addComment(req, res, next));
router.delete('/:id', (req, res, next) => controller.deleteComment(req, res, next));

module.exports = router;