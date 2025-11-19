"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.getCategoryById = exports.getAllCategories = exports.updateCategory = exports.createCategory = void 0;
const prisma_1 = require("../../db/prisma");
const createCategory = async (name) => {
    return prisma_1.prisma.category.create({ data: { name } });
};
exports.createCategory = createCategory;
const updateCategory = async (id, name) => {
    return prisma_1.prisma.category.update({ where: { id }, data: { name } });
};
exports.updateCategory = updateCategory;
const getAllCategories = async () => {
    return prisma_1.prisma.category.findMany({ orderBy: { name: "asc" } });
};
exports.getAllCategories = getAllCategories;
const getCategoryById = async (id) => {
    return prisma_1.prisma.category.findUnique({ where: { id } });
};
exports.getCategoryById = getCategoryById;
const deleteCategory = async (id) => {
    const count = await prisma_1.prisma.game.count({ where: { categoryId: id } });
    if (count > 0) {
        const error = new Error("Category has associated games");
        error.code = "HAS_GAMES";
        throw error;
    }
    return prisma_1.prisma.category.delete({ where: { id } });
};
exports.deleteCategory = deleteCategory;
