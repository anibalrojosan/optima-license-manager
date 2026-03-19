import * as z from "zod";

export const registerSchema = z.object({
  organizationName: z.string().min(2, "El nombre de la organización es muy corto"),
  email: z.string().email("Email corporativo inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export type RegisterValues = z.infer<typeof registerSchema>;