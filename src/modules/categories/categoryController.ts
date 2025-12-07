import type { Request, Response } from "express";
import { apiOk, apiError } from "../../utils/api";
import { 
    createCategory, 
    updateCategory, 
    getAllCategories, 
    getCategoryById, 
    deleteCategory 
} from "./categoryService";

export const postCategory = async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json(apiError("VALIDATION", null, "Name required"))
    }
    
    try {
        const cat = await createCategory(name);
        res.status(201).json(apiOk(cat, "Category created"));
    } catch (e: any) {
        const isUnique = e?.code === "P2002";
        res.status(isUnique ? 409 : 500).json(apiError(isUnique ? "NAME_EXISTS" : "UNKNOWN", e?.meta, "Create error"));
    }
};

export const putCategory = async (req: Request, res: Response) => {
    const id = req.params.id!
    const { name } = req.body;

    if (!id || !name) {
        return res.status(400).json(apiError("VALIDATION", null, "Valid id and name required"));
    }

    try {
        const cat = await updateCategory(id, name);
        res.json(apiOk(cat, "Category updated"));

    } catch (e: any) {
        const notFound = e?.code === "P2025";
        const isUnique = e?.code === "P2002";
        const status = notFound ? 404 : isUnique ? 409 : 500;
        const code = notFound ? "NOT_FOUND" : isUnique ? "NAME_EXISTS" : "UNKNOWN";
        res.status(status).json(apiError(code, e?.meta, "Update error"));
    }
};

export const getCategories = async (_req: Request, res: Response) => {
    const cats = await getAllCategories();
    res.json(apiOk(cats, "Categories list"));
};

export const getCategory = async (req: Request, res: Response) => {
    
    const id = req.params.id!;
    if (!id) {
        return res.status(400).json(apiError("VALIDATION", null, "Valid id required"));
    }
    
    const cat = await getCategoryById(id);
    if (!cat) {
        return res.status(404).json(apiError("NOT_FOUND", null, "Category not found"));
    }
    res.json(apiOk(cat));
};

export const removeCategory = async (req: Request, res: Response) => {
    const id = req.params.id!
    if (!id) {
        return res.status(400).json(apiError("VALIDATION", null, "Valid id required"));
    }

    try {
        const cat = await deleteCategory(id);
        res.json(apiOk(cat, "Category deleted"));
        
    } catch (e: any) {
        const code = e?.code === "HAS_GAMES" ? "FORBIDDEN" : "UNKNOWN";
        const status = e?.code === "HAS_GAMES" ? 409 : 500;
        res.status(status).json(apiError(code, null, e.message));
    }
};
