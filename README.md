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

- **Gestión de Inventarios:** Añadir, actualizar, eliminar y ver detalles de los ítems en el inventario.
- **Autenticación de Usuarios:** Los usuarios deben iniciar sesión para acceder a las funciones de gestión del inventario.
- **Interfaz de Usuario:** Aplicación web con un diseño simple y funcional.
- **Despliegue:** El backend está desplegado en AWS Lambda y el frontend puede ser desplegado en cualquier servidor de hosting.

## Requisitos del Sistema

- **Node.js:** v18 o superior.
- **Angular CLI:** v16 o superior.
- **SQLite:** Base de datos embebida.
- **AWS CLI:** Configurado para despliegue en AWS Lambda.

## Instalación

### Backend

1. Clona el repositorio:
   ```bash
   git clone https://github.com/luhiguera/mi-proyecto-fullstack.git
