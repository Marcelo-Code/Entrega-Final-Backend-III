# 🐾 Entrega Final - Backend III

Bienvenido al backend del sistema de adopción de mascotas, desarrollado como proyecto final del curso **Programación Backend III** en **Coderhouse**.

Este servidor está construido con **Node.js**, **Express** y **MongoDB**, e implementa generación de datos mockeados, manejo de usuarios, sesiones, autenticación y documentación con **Swagger**.

---

## 🚀 Tecnologías utilizadas

- Node.js + Express
- MongoDB con Mongoose
- Swagger para documentación
- bcrypt para encriptación
- passport para autenticación
- dotenv para variables de entorno
- faker para generación de datos

## 📬 Rutas principales

| Ruta                                       | Método | Descripción                                     |
| ------------------------------------------ | ------ | ----------------------------------------------- |
| `/api/adoptions/:uid/:pid`                 | POST   | Crear una adopción.                             |
| `/api/adoptions`                           | GET    | Obtener todas las adopciones.                   |
| `/api/adoptions/:aid`                      | GET    | Obtener una adopción por su ID.                 |
| `/api/mocks/mockingusers`                  | GET    | Obtener usuarios mockeados                      |
| `/api/mocks/mockingpets`                   | GET    | Obtener mascotas mockeadas                      |
| `/api/mocks/generateData`                  | POST   | Generar usuarios y mascotas aleatorias          |
| `/api/sessions/register`                   | POST   | Registrar usuario.                              |
| `/api/sessions/login`                      | POST   | Iniciar sesión.                                 |
| `/api/sessions/current`                    | GET    | Obtener usuario logueado.                       |
| `/api/sessions/current/unprotectedLogin`   | POST   | Login sin protección.                           |
| `/api/sessions/current/unprotectedCurrent` | GET    | Obtener usuario desde cookie no protegida.      |
| `/api/pets`                                | GET    | Obtener todos las mascotas.                     |
| `/api/pets/:pid`                           | GET    | Obtener una mascota por su ID.                  |
| `/api/pets/:pid`                           | DELETE | Eliminar una mascota.                           |
| `/api/pets/:pid`                           | PUT    | Actualizar una mascota.                         |
| `/api/pets/withimage`                      | POST   | Crear mascota con imagen (multipart/form-data). |
| `/api/users`                               | GET    | Obtener todos los usuarios.                     |
| `/api/users/:uid`                          | GET    | Obtener un usuario por su ID                    |
| `/api/users/:uid`                          | PUT    | Actualizar un usuario.                          |
| `/api/users/:uid`                          | DELETE | Eliminar un usuario.                            |

## 🧪 Datos mockeados

POST /api/mocks/generateData
Content-Type: application/json

{
"userQuantity": 10,
"petQuantity": 15
}

## 📚 Documentación Swagger

La documentación de la API está disponible en:

> [http://localhost:8080/api-docs](http://localhost:8080/api-docs)

## 🗄️ Imagen en DockerHub

> [https://hub.docker.com/repository/docker/marcelonicolas/entrega-final-backend-3/general](https://hub.docker.com/repository/docker/marcelonicolas/entrega-final-backend-3/general)

## ✅ Tests con Mocha y Supertest

Se incluyen tests de integración para usuarios, mascotas y adopciones. Ejecución:

```bash
npm run test
```

## 👤 Autor

**Marcelo Feltes**

GitHub: [Marcelo-Code](https://github.com/Marcelo-Code)

## 🌱 Aprendizajes

Este proyecto me permitió integrar conocimientos de backend, arquitectura en capas, manejo de rutas protegidas, generación de datos mockeados y documentación profesional de APIs REST.
