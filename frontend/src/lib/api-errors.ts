/**
 * Convierte el campo `detail` típico de errores HTTP de FastAPI en un mensaje legible.
 * Acepta `detail` como string (401, 400, …) o lista de validación (422).
 */
export function formatFastApiDetail(detail: unknown, fallback: string): string {
    if (typeof detail === "string" && detail.trim().length > 0) {
      return detail;
    }
  
    if (Array.isArray(detail)) {
      const parts = detail.flatMap((item) => {
        if (typeof item === "string") return [item];
        if (typeof item === "object" && item !== null) {
          const row = item as Record<string, unknown>;
          if (typeof row.msg === "string") return [row.msg];
          if (typeof row.message === "string") return [row.message];
        }
        return [];
      });
      if (parts.length > 0) {
        return parts.join(" ");
      }
    }
  
    return fallback;
  }