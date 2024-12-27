const bookController = require('../controller/bookController');

const router = require('express').Router();

router.post('/addbook', bookController.addBook);

router.get('/', bookController.getBook);

router.get('/book/:id', bookController.getABook);

router.put('/updatebook/:id', bookController.updateBook);

router.delete('/deletebook/:id', bookController.deleteBook);

module.exports = router;