const express = require('express');
const router = express.Router();
const controller = require('../api/controller');

router.get('/:id', controller.getById);
router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.del);

module.exports = router;
