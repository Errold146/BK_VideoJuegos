export type ApiResponse<T> = {
    ok: boolean;
    message?: string;
    data?: T;
    error?: { code: string; details?: unknown };
};

export const apiOk = <T>(data: T, message?: string): ApiResponse<T> => ({ ok: true, data, message });

export const apiError = (code: string, details?: unknown, message?: string): ApiResponse<null> => ({
    ok: false, error: { code, details }, message
});
