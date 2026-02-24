# ADR-012: Simplificación Arquitectónica mediante SQLModel

## Estado
Aceptado

## Contexto
Tradicionalmente, las aplicaciones FastAPI requieren duplicar modelos: uno para SQLAlchemy (Base de Datos) y otro para Pydantic (Validación/API). Para mantener el desacoplamiento, se suele implementar el **Repository Pattern** para traducir entre estas capas. En un equipo pequeño buscando un MVP rápido, esto genera una sobrecarga de código (*boilerplate*) y aumenta el riesgo de errores de mapeo.

## Decisión
Adoptar **SQLModel** como la única librería para definir modelos de datos y persistencia, eliminando la necesidad de un **Repository Pattern** explícito en esta etapa del proyecto.

### Justificación Técnica

1. **Unificación de Modelos:** SQLModel hereda tanto de SQLAlchemy como de Pydantic. Una sola clase define la tabla de la DB y el esquema de la API, eliminando la "doble definición".
2. **Desacoplamiento Nativo:** Al ser compatibles con Pydantic, los objetos de SQLModel pueden pasarse a la lógica de negocio (como el `FinOpsEngine`) sin acoplar la lógica a la base de datos, ya que se comportan como objetos de datos puros.
3. **Reducción de Boilerplate:** La eliminación del Repository Pattern permite que los `Services` interactúen directamente con la DB de forma segura, reduciendo la cantidad de archivos y líneas de código en un ~40%.
4. **Mantenibilidad:** Menos capas significan una curva de aprendizaje más baja para el equipo y una sincronización instantánea entre la DB y la API.

## Consecuencias

### Positivas
- **Velocidad de Desarrollo:** Implementación de CRUDs significativamente más rápida.
- **Consistencia:** Menor probabilidad de que la API y la DB estén desincronizadas.
- **Tipado Estricto:** Mejor soporte de autocompletado y detección de errores en el IDE.

### Negativas
- **Acoplamiento Directo:** Los modelos de la API están vinculados a la estructura de la tabla (aunque SQLModel permite crear "herencia de modelos" para separar campos sensibles si es necesario).