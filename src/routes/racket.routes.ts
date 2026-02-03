import { Router } from "express";
import { createRacket, getAllRackets } from '../controllers/racket.controller'

const router = Router()

router.post('/', createRacket)
router.get('/', getAllRackets)

export default router
