import prisma from "../config/db"
import { CreateRacketDTO } from "../dtos/racket.dto";

export const createRacket = async (data: CreateRacketDTO) => {
    return prisma.racket.create({
      data
    })
}

export const getAllRackets = async () => {
    return prisma.racket.findMany();
}
