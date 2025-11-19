import type { Request, Response } from "express";
import { apiOk, apiError } from "../../utils/api";
import { createGame, associateGameToCategory, getAllGames, getGamesByCategory, deleteGame, getGameById } from "./gameService";
import { prisma } from "../../db/prisma";

export const postGame = async (req: Request, res: Response) => {
    const { name, categoryName } = req.body;

    if (!name || !categoryName) {
        return res.status(400).json(apiError("VALIDATION", null, "Name and categoryName required"));
    }

    try {
        // Buscar la categoría por nombre
        const category = await prisma.category.findUnique({
            where: { name: categoryName }
        });

        if (!category) {
            return res.status(404).json(apiError("CATEGORY_NOT_FOUND", null, "Category not found"));
        }

        const game = await createGame(name, category.id);
        res.status(201).json(apiOk(game, "Game created"));

    } catch (e: any) {
        const unique = e?.code === "P2002";
        res.status(unique ? 409 : 500).json(apiError(unique ? "NAME_EXISTS" : "UNKNOWN", e?.meta, "Create game error"));
    }
};

export const putGameCategory = async (req: Request, res: Response) => {
    const gameId = parseInt(req.params.id!, 10); // 👈 este es el id del juego
    const { categoryName } = req.body;

    if (!Number.isFinite(gameId) || !categoryName) {
        return res.status(400).json(apiError("VALIDATION", null, "Valid gameId and categoryName required"));
    }

    try {
        // Buscar la categoría por nombre
        const category = await prisma.category.findUnique({
            where: { name: categoryName }
        });

        if (!category) {
            return res.status(404).json(apiError("CATEGORY_NOT_FOUND", null, "Category not found"));
        }

        // Re-asociar el juego a la nueva categoría
        const game = await associateGameToCategory(gameId, category.id);
        res.json(apiOk(game, "Game re-associated"));

    } catch (e: any) {
        const notFound = e?.code === "P2025" || e?.code === "P2003";
        res.status(notFound ? 404 : 500).json(
            apiError(notFound ? "NOT_FOUND" : "UNKNOWN", e?.meta, "Update game error")
        );
    }
};

export const getGames = async (_req: Request, res: Response) => {
    const games = await getAllGames();
    res.json(apiOk(games, "Games list"));
};

export const getGame = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id!, 10);
    if (!Number.isFinite(id)) {
        return res.status(400).json(apiError("VALIDATION", null, "Valid id required"));
    }

    try {
        const game = await prisma.game.findUnique({
            where: { id },
            include: { category: true }
        });

        if (!game) {
            return res.status(404).json(apiError("NOT_FOUND", null, "Game not found"));
        }

        res.json(apiOk(game, "Game by id"));
    } catch (e: any) {
        res.status(500).json(apiError("UNKNOWN", e?.meta, "Get game error"));
    }
};

export const getGamesByCat = async (req: Request, res: Response) => {
    const cid = parseInt(req.params.categoryId!, 10);
    if (!Number.isFinite(cid)) {
        return res.status(400).json(apiError("VALIDATION", null, "Valid categoryId required"));
    }

    const games = await getGamesByCategory(cid);
    res.json(apiOk(games, "Games by category"));
};

export const removeGame = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id!, 10);
    if (!Number.isFinite(id)) {
        return res.status(400).json(apiError("VALIDATION", null, "Valid id required"));
    }
    try {
        const deleted = await deleteGame(id);
        res.json(apiOk(deleted, "Game deleted"));
        
    } catch (e: any) {
        const notFound = e?.code === "P2025";
        res.status(notFound ? 404 : 500).json(apiError(notFound ? "NOT_FOUND" : "UNKNOWN", e?.meta, "Delete game error"));
    }
};
