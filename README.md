# Mi Proyecto Fullstack de Inventarios

## Descripción

Este es un proyecto fullstack para la gestión de inventarios de una empresa de suministros mercantiles. La aplicación permite listar el inventario actual, añadir nuevos ítems, actualizar y eliminar ítems existentes, así como manejar la autenticación de usuarios para evitar fraudes.

## Tecnologías Utilizadas

- **Frontend:** Angular v16 con componentes standalone.
- **Backend:** Node.js v18 en AWS Lambda.
- **Base de Datos:** SQLite.
- **Autenticación:** JWT (JSON Web Token).
- **Análisis de Código:** SonarQube.
- **Pruebas Unitarias:** Mocha y Chai para el backend, Jasmine para el frontend.
- **CI/CD:** GitHub Actions.

## Características

- **Autenticación de Usuarios:** Registro, inicio de sesión y protección de rutas mediante JWT.
- **Gestión de Inventarios:** Operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los ítems del inventario.
- **Seguridad:** Protección de rutas con Guards e Interceptors en Angular, sanitización de entradas y CORS en el backend.
- **Cobertura de Pruebas:** Se garantiza una cobertura de pruebas unitarias superior al 85% en ambos lados, frontend y backend.

## Requisitos Previos

- **Node.js** v18.x.x o superior.
- **Angular CLI** v16.x.x o superior.
- **SQLite** para la base de datos.
- **Git** para la gestión del código fuente.
- **Cuenta de AWS** para el despliegue del backend en AWS Lambda.
- **SonarQube** para el análisis de código estático (opcional).

## Instalación

### Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/mi-proyecto-fullstack.git
cd mi-proyecto-fullstack
