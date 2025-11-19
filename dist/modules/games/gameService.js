"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGame = exports.getGamesByCategory = exports.getAllGames = exports.associateGameToCategory = exports.createGame = void 0;
const prisma_1 = require("../../db/prisma");
const createGame = async (name, categoryId) => {
    return prisma_1.prisma.game.create({ data: { name, categoryId } });
};
exports.createGame = createGame;
const associateGameToCategory = async (gameId, categoryId) => {
    return prisma_1.prisma.game.update({ where: { id: gameId }, data: { categoryId } });
};
exports.associateGameToCategory = associateGameToCategory;
const getAllGames = async () => {
    return prisma_1.prisma.game.findMany({ include: { category: true }, orderBy: { createdAt: "desc" } });
};
exports.getAllGames = getAllGames;
const getGamesByCategory = async (categoryId) => {
    return prisma_1.prisma.game.findMany({ where: { categoryId }, include: { category: true } });
};
exports.getGamesByCategory = getGamesByCategory;
const deleteGame = async (id) => {
    return prisma_1.prisma.game.delete({ where: { id } });
};
exports.deleteGame = deleteGame;
