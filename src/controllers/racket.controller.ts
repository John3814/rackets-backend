import { Request, Response, NextFunction } from "express"
import * as racketService from '../services/racket.service'
import { createRacketSchema } from "../validations/racket.validation"
import { ApiError } from "../utils/ApiError"

export const createRacket = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validation = createRacketSchema.safeParse(req.body)

    if (!validation.success) {
      throw new ApiError("Datos inválidos", 400)
    }

    const racket = await racketService.createRacket(validation.data)
    res.status(201).json(racket)
  } catch (error) {
    next(error)
  }
}

export const getAllRackets = async (_req: Request, res: Response) => {
  try {
    const rackets = await racketService.getAllRackets()
    res.json(rackets)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rackets'})
  }
}