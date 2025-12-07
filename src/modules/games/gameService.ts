import { prisma } from "../../db/prisma";

export const createGame = async (name: string, categoryId: string, platformId: string) => {
    return prisma.game.create({
        data: {
            name,
            platformId, // 👈 obligatorio
            categories: {
                create: [{ categoryId }]
            }
        },
        include: { categories: { include: { category: true } }, platform: true }
    });
};



export const associateGameToCategory = async (gameId: string, categoryId: string) => {
    return prisma.categoryOnGame.create({
        data: { gameId, categoryId },
        include: { category: true, game: true }
    });
};


export const getAllGames = async () => {
    return prisma.game.findMany({
        include: { 
            categories: { include: { category: true } },
            platform: true,
            images: true
        },
        orderBy: { createdAt: "desc" }
    });
};
;

export const getGameById = async (id: string) => {
    return prisma.game.findUnique({
        where: { id },
        include: { 
            categories: { include: { category: true } },
            platform: true,
            images: true
        },
    });
};


export const getGamesByCategory = async (categoryId: string) => {
    return prisma.game.findMany({
        where: {
            categories: {
                some: { categoryId }
            }
        },
        include: { categories: { include: { category: true } } }
    });
};


export const deleteGame = async (id: string) => {
    return prisma.game.delete({ where: { id } });
};
