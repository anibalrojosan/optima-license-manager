import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('/api/v1/auth/login', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;

    // Simulación del contrato acordado con Backend
    if (body?.email === 'user@empresa.com' && body?.password === 'password123') {
      return HttpResponse.json({
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy.token",
        token_type: "bearer",
        user: {
          id: 1,
          email: "user@empresa.com",
          organization_id: 1,
          role: "admin",
          created_at: "2026-03-12T10:00:00Z"
        },
        organization: {
          id: 1,
          name: "Empresa S.A.",
          created_at: "2026-03-12T10:00:00Z"
        }
      });
    }

    return HttpResponse.json(
      { detail: "Credenciales inválidas" }, 
      { status: 401 }
    );
  })
]