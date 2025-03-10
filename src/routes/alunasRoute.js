const express = require("express")
const router = express.Router()
const controller = require("../controllers/alunasController")
const authMiddleware = require("../middlewares/auth")

router.get("/", controller.get)
router.post("/", controller.post)  //não é protegido pq é um usuário novo que está se cadastrando, gera um hash da senha cadastrada
router.use(authMiddleware)
router.get("/nasceuSp", controller.getSp)
router.get("/:id", controller.getById)
router.get("/:id/books", controller.getBooks)
router.get("/:id/getAge", controller.getAge)
router.post("/:id/books", controller.postBooks)

module.exports = router
