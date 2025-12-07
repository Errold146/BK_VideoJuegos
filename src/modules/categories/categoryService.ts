import { prisma } from "../../db/prisma";

export const createCategory = async (name: string) => {
    return prisma.category.create({ data: { name } });
};

export const updateCategory = async (id: string, name: string) => {
    return prisma.category.update({ where: { id }, data: { name } });
};

export const getAllCategories = async () => {
    return prisma.category.findMany({ orderBy: { name: "asc" } });
};

export const getCategoryById = async (id: string) => {
    return prisma.category.findUnique({ where: { id } });
};

export const deleteCategory = async (id: string) => {
    const count = await prisma.game.count({ where: { id } });
    if (count > 0) {
        const error = new Error("Category has associated games");
        (error as any).code = "HAS_GAMES";
        throw error;
    }
    return prisma.category.delete({ where: { id } });
};
