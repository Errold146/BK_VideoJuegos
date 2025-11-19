[![Node.js](https://img.shields.io/badge/Node.js-22.x-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.x-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Jest](https://img.shields.io/badge/Jest-29.x-C21325?logo=jest&logoColor=white)](https://jestjs.io/)
[![Nodemon](https://img.shields.io/badge/Nodemon-3.x-76D04B?logo=nodemon&logoColor=white)](https://nodemon.io/)
[![Cors](https://img.shields.io/badge/CORS-enabled-blue?logo=fastapi&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

# 🎮 VLA Backend API — Gestión de Videojuegos y Categorías

Este proyecto implementa una API RESTful para la gestión de videojuegos y sus categorías.  
Está desarrollado con **Node.js**, **Express**, **Prisma ORM** y **PostgreSQL**.

---

## 🧠 Objetivo del proyecto

Diseñar un backend que permita:

- Crear videojuegos asociados a categorías.
- Consultar videojuegos por ID o por categoría.
- Re-asociar un videojuego a otra categoría.
- Eliminar videojuegos.
- Autenticación básica de usuarios (login/registro).
- Probar todos los endpoints en **Postman**.

---

## 🏗️ Arquitectura

- **Express**: framework para definir rutas y middlewares.
- **Prisma ORM**: acceso a la base de datos PostgreSQL.
- **PostgreSQL**: base de datos relacional.
- **Cors + JSON**: configuración de servidor.
- **Estructura de carpetas:**

## Estructura del proyecto:
```
Bk_VideoJuegos/
├─ src/
│  ├─ app.ts
│  ├─ server.ts
│  ├─ config/
│  │  └─ env.ts
│  ├─ db/
│  │  └─ prisma.ts
│  ├─ middleware/
│  │  └─ auth.ts
│  ├─ modules/
│  │  ├─ auth/
│  │  │  ├─ auth.controller.ts
│  │  │  ├─ auth.service.ts
│  │  │  └─ auth.routes.ts
│  │  ├─ categories/
│  │  │  ├─ category.controller.ts
│  │  │  ├─ category.service.ts
│  │  │  └─ category.routes.ts
│  │  └─ games/
│  │     ├─ game.controller.ts
│  │     ├─ game.service.ts
│  │     └─ game.routes.ts
│  ├─ utils/
│  │  └─ api.ts
│  └─ types/
│     └─ index.ts
├─ tests/
│  ├─ auth.test.ts
│  ├─ category.test.ts
│  └─ game.test.ts
├─ prisma/
│  └─ schema.prisma
├─ .env
├─ package.json
├─ tsconfig.json
├─ jest.config.ts
└─ README.md
```

# 🚀 Endpoints principales
## 🔐 Autenticación
* POST /api/auth/register — Registrar usuario

* POST /api/auth/login — Login de usuario

## 🎮 Videojuegos
* GET /api/games — Listar todos los juegos

* GET /api/games/:id — Obtener juego por ID

* GET /api/games/category/:categoryId — Listar juegos por categoría

* POST /api/games — Crear nuevo juego (requiere name y categoryName)

* PUT /api/games/:id/category — Cambiar categoría de un juego (requiere categoryName)

* DELETE /api/games/:id — Eliminar juego

## 📘 Categorías
* GET /api/categories — Listar todas las categorías

* POST /api/categories — Crear nueva categoría

* DELETE /api/categories/:id — Eliminar categoría

## 🛠️ Tecnologías utilizadas
* Node.js + Express

* Prisma ORM

* PostgreSQL

* Jest (tests)

* dotenv (configuración de entorno)

## 🔎 Detalles de cada badge
* Node.js → Runtime principal.

* Express → framework para las rutas y middlewares.

* Prisma → ORM para manejar la base de datos.

* PostgreSQL → motor de base de datos.

* TypeScript → tipado estático y compilación.

* Jest → framework de testing.

* Nodemon → hot reload en desarrollo.

* CORS → habilitado para permitir requests desde frontend.

## 🧪 Pruebas Unitarias

Este proyecto incluye pruebas automatizadas con **Jest**, **Supertest** y **Prisma** para validar el correcto funcionamiento de los endpoints.

### 📂 Ubicación de las pruebas
Las pruebas se encuentran en la carpeta:

```
tests/ 
    ├─ auth.test.ts 
    ├─ category.test.ts 
    └─ game.test.ts
```


### 🚀 Ejecución de pruebas
Ejecutar todas las pruebas con:

```bash
npm test
```

## ✅ Cobertura de pruebas
## 🔐 Auth
* POST /api/auth/register — Registra un usuario nuevo.

* POST /api/auth/login — Devuelve un token de acceso válido.

Casos negativos: registro duplicado, login incorrecto, acceso sin token.

## 📘 Categories
* POST /api/categories — Crea una categoría.

* GET /api/categories — Lista todas las categorías.

* DELETE /api/categories/:id — No permite eliminar categorías con juegos asociados.

## 🎮 Games
* POST /api/games — Crea un juego asociado a una categoría.

* GET /api/games/category/:id — Lista juegos por categoría.

* PUT /api/games/:id/category — Re-asocia un juego a otra categoría.

* DELETE /api/games/:id — Elimina un juego.

## 📊 Ejemplo de salida en consola
```bash
 PASS  tests/auth.test.ts
 PASS  tests/category.test.ts
 PASS  tests/game.test.ts

Test Suites: 3 passed, 3 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        4.321s

```

## ✨ Autor
Errold — Backend Developer 🇨🇷 
Especializado en React, Next.js, TypeScript, JavaScript, Node.js, NestJS, Vue.js, TailwindCSS

## ✉️ Contacto
[![GitHub](https://img.shields.io/badge/GitHub-Errold146-181717?logo=github)](https://github.com/Errold146)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ErroldNúñezS-0A66C2?logo=linkedin)](https://linkedin.com/in/errold-núñez-sánchez) 
[![Email](https://img.shields.io/badge/Email-ErroldNúñezS-D14836?logo=gmail)](mailto:errold222@gmail.com)