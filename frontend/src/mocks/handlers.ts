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
  }),

  http.post('/api/v1/auth/register', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const email = typeof body.email === 'string' ? body.email : '';
    const password = typeof body.password === 'string' ? body.password : '';
    const organization_name =
      typeof body.organization_name === 'string' ? body.organization_name : '';

    if (!email || !password || !organization_name) {
      return HttpResponse.json(
        {
          detail: [
            {
              type: 'missing',
              loc: ['body'],
              msg: 'Campos obligatorios: email, password, organization_name',
            },
          ],
        },
        { status: 422 },
      );
    }

    if (password.length < 8) {
      return HttpResponse.json(
        {
          detail: [
            {
              type: 'value_error',
              loc: ['body', 'password'],
              msg: 'La contraseña debe tener al menos 8 caracteres',
            },
          ],
        },
        { status: 422 },
      );
    }

    if (organization_name.length < 2) {
      return HttpResponse.json(
        {
          detail: [
            {
              type: 'value_error',
              loc: ['body', 'organization_name'],
              msg: 'El nombre de la organización es demasiado corto',
            },
          ],
        },
        { status: 422 },
      );
    }

    // Misma idea que el backend: 400 si el email ya existe (caso de prueba fijo)
    if (email === 'already@mock.local') {
      return HttpResponse.json(
        { detail: 'Email already registered' },
        { status: 400 },
      );
    }

    const createdAt = new Date().toISOString();

    return HttpResponse.json(
      {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy.register',
        token_type: 'bearer',
        user: {
          id: 99,
          email,
          organization_id: 99,
          role: 'admin',
          created_at: createdAt,
        },
        organization: {
          id: 99,
          name: organization_name,
          created_at: createdAt,
        },
      },
      { status: 201 },
    );
  }),
]