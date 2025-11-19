import { prisma } from "../../db/prisma";

export const createGame = async (name: string, categoryId: number) => {
    return prisma.game.create({ data: { name, categoryId } });
};

export const associateGameToCategory = async (gameId: number, categoryId: number) => {
    return prisma.game.update({ where: { id: gameId }, data: { categoryId } });
};

export const getAllGames = async () => {
    return prisma.game.findMany({ include: { category: true }, orderBy: { createdAt: "desc" } });
};

export const getGameById = async (id: number) => {
    return prisma.game.findUnique({
        where: { id },
        include: { category: true }
    });
};

export const getGamesByCategory = async (categoryId: number) => {
    return prisma.game.findMany({ where: { categoryId }, include: { category: true } });
};

export const deleteGame = async (id: number) => {
    return prisma.game.delete({ where: { id } });
};
