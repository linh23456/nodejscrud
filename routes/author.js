const authorController = require("../controller/authorController");
const token = require("../middleware/token");
const router = require("express").Router();

router.post("/addauthor" , authorController.addAuthor);

router.get("/" ,  authorController.getAuthors);

router.get("/:id" , authorController.getAnAuthor);

router.put("/edit/:id" , authorController.updateAuthor);

router.delete("/delete/:id" , authorController.deleteAuthor);

module.exports = router;