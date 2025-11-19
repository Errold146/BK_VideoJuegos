"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeGame = exports.getGamesByCat = exports.getGames = exports.putGameCategory = exports.postGame = void 0;
const api_1 = require("../../utils/api");
const gameService_1 = require("./gameService");
const prisma_1 = require("../../db/prisma");
const postGame = async (req, res) => {
    const { name, categoryName } = req.body;
    if (!name || !categoryName) {
        return res.status(400).json((0, api_1.apiError)("VALIDATION", null, "Name and categoryName required"));
    }
    try {
        // Buscar la categoría por nombre
        const category = await prisma_1.prisma.category.findUnique({
            where: { name: categoryName }
        });
        if (!category) {
            return res.status(404).json((0, api_1.apiError)("CATEGORY_NOT_FOUND", null, "Category not found"));
        }
        const game = await (0, gameService_1.createGame)(name, category.id);
        res.status(201).json((0, api_1.apiOk)(game, "Game created"));
    }
    catch (e) {
        const unique = e?.code === "P2002";
        res.status(unique ? 409 : 500).json((0, api_1.apiError)(unique ? "NAME_EXISTS" : "UNKNOWN", e?.meta, "Create game error"));
    }
};
exports.postGame = postGame;
const putGameCategory = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { categoryId } = req.body;
    const cid = parseInt(String(categoryId), 10);
    if (!Number.isFinite(id) || !Number.isFinite(cid)) {
        return res.status(400).json((0, api_1.apiError)("VALIDATION", null, "Valid ids required"));
    }
    try {
        const game = await (0, gameService_1.associateGameToCategory)(id, cid);
        res.json((0, api_1.apiOk)(game, "Game re-associated"));
    }
    catch (e) {
        const notFound = e?.code === "P2025" || e?.code === "P2003";
        res.status(notFound ? 404 : 500).json((0, api_1.apiError)(notFound ? "NOT_FOUND" : "UNKNOWN", e?.meta, "Update game error"));
    }
};
exports.putGameCategory = putGameCategory;
const getGames = async (_req, res) => {
    const games = await (0, gameService_1.getAllGames)();
    res.json((0, api_1.apiOk)(games, "Games list"));
};
exports.getGames = getGames;
const getGamesByCat = async (req, res) => {
    const cid = parseInt(req.params.categoryId, 10);
    if (!Number.isFinite(cid)) {
        return res.status(400).json((0, api_1.apiError)("VALIDATION", null, "Valid categoryId required"));
    }
    const games = await (0, gameService_1.getGamesByCategory)(cid);
    res.json((0, api_1.apiOk)(games, "Games by category"));
};
exports.getGamesByCat = getGamesByCat;
const removeGame = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
        return res.status(400).json((0, api_1.apiError)("VALIDATION", null, "Valid id required"));
    }
    try {
        const deleted = await (0, gameService_1.deleteGame)(id);
        res.json((0, api_1.apiOk)(deleted, "Game deleted"));
    }
    catch (e) {
        const notFound = e?.code === "P2025";
        res.status(notFound ? 404 : 500).json((0, api_1.apiError)(notFound ? "NOT_FOUND" : "UNKNOWN", e?.meta, "Delete game error"));
    }
};
exports.removeGame = removeGame;
