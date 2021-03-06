const router = require('express').Router()
const ctrl = require('../controllers')

router.get('/', ctrl.users.index)
router.get('/:id', ctrl.users.show)
router.post('/:id', ctrl.users.create)

module.exports = router
