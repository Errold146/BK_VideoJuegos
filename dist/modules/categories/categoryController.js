"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCategory = exports.getCategory = exports.getCategories = exports.putCategory = exports.postCategory = void 0;
const api_1 = require("../../utils/api");
const categoryService_1 = require("./categoryService");
const postCategory = async (req, res) => {
    const { name } = req.body;
    if (!name)
        return res.status(400).json((0, api_1.apiError)("VALIDATION", null, "Name required"));
    try {
        const cat = await (0, categoryService_1.createCategory)(name);
        res.status(201).json((0, api_1.apiOk)(cat, "Category created"));
    }
    catch (e) {
        const isUnique = e?.code === "P2002";
        res.status(isUnique ? 409 : 500).json((0, api_1.apiError)(isUnique ? "NAME_EXISTS" : "UNKNOWN", e?.meta, "Create error"));
    }
};
exports.postCategory = postCategory;
const putCategory = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name } = req.body;
    if (!Number.isFinite(id) || !name) {
        return res.status(400).json((0, api_1.apiError)("VALIDATION", null, "Valid id and name required"));
    }
    try {
        const cat = await (0, categoryService_1.updateCategory)(id, name);
        res.json((0, api_1.apiOk)(cat, "Category updated"));
    }
    catch (e) {
        const notFound = e?.code === "P2025";
        const isUnique = e?.code === "P2002";
        const status = notFound ? 404 : isUnique ? 409 : 500;
        const code = notFound ? "NOT_FOUND" : isUnique ? "NAME_EXISTS" : "UNKNOWN";
        res.status(status).json((0, api_1.apiError)(code, e?.meta, "Update error"));
    }
};
exports.putCategory = putCategory;
const getCategories = async (_req, res) => {
    const cats = await (0, categoryService_1.getAllCategories)();
    res.json((0, api_1.apiOk)(cats, "Categories list"));
};
exports.getCategories = getCategories;
const getCategory = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
        return res.status(400).json((0, api_1.apiError)("VALIDATION", null, "Valid id required"));
    }
    const cat = await (0, categoryService_1.getCategoryById)(id);
    if (!cat) {
        return res.status(404).json((0, api_1.apiError)("NOT_FOUND", null, "Category not found"));
    }
    res.json((0, api_1.apiOk)(cat));
};
exports.getCategory = getCategory;
const removeCategory = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!Number.isFinite(id)) {
        return res.status(400).json((0, api_1.apiError)("VALIDATION", null, "Valid id required"));
    }
    try {
        const cat = await (0, categoryService_1.deleteCategory)(id);
        res.json((0, api_1.apiOk)(cat, "Category deleted"));
    }
    catch (e) {
        const code = e?.code === "HAS_GAMES" ? "FORBIDDEN" : "UNKNOWN";
        const status = e?.code === "HAS_GAMES" ? 409 : 500;
        res.status(status).json((0, api_1.apiError)(code, null, e.message));
    }
};
exports.removeCategory = removeCategory;
