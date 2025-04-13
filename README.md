# 📚 BookSave

Aplicación web para guardar, gestionar y visualizar libros que son de tu interés: libros leídos, por leer, interesantes, etc. Desarrollada con Node.js, Express, React y MongoDB.

---

## 🧠 Introducción

**BookSave** es una app fullstack que permite a los usuarios guardar sus libros, visualizarlos en una lista personalizada y acceder a los detalles de cada uno. Ideal para organizar lecturas, hacer seguimiento de libros leídos y descubrir nuevos títulos.

---

## ✨ Funcionalidades principales

- 📝 Añadir nuevos libros a tu colección.
- 📚 Clasificarlos por estado: leídos, por leer, favoritos, etc.
- 🔍 Buscar libros por título.
- 🗑️ Eliminar o actualizar información de un libro.
- 🔐 Registro y login de usuarios con autenticación JWT.

---

## 🌐 Demo

Puedes probar la app aquí 👉 [bookSaveProject](https://booksaveproject.onrender.com/)

---

## ⚙️ Tecnologías utilizadas

### 🖥️ Frontend
- [Vite](https://vitejs.dev/) – Bundler ultrarrápido para desarrollo moderno.
- [React](https://reactjs.org/) – Librería para construir interfaces de usuario.
- [React Router DOM](https://reactrouter.com/en/main) – Enrutamiento de páginas.
- [Axios](https://axios-http.com/) – Cliente HTTP para realizar peticiones al backend
- [Tailwind CSS](https://tailwindcss.com/) – Utilidades CSS modernas.

### 🌐 Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/) – Framework minimalista para Node.
- [JWT](https://jwt.io/) – Autenticación con JSON Web Token para seguridad de las rutas

### 🛢️ Base de datos
- [MongoDB](https://www.mongodb.com/atlas) – Base de datos NoSQL en la nube.

---

### 🚀 Despliegue - Hosting
| Parte       | Plataforma |
|-------------|------------|
| 🌍 Frontend | Render     |
| 🔧 Backend  | Render     |
| 🛢️ Base de datos  | MongoDB Atlas     |

<!-- | 🌍 Frontend | Vercel     | [Ver proyecto](https://booksave.vercel.app) | -->

---

## 📡 Endpoints principales de la API (backend)

| Método | Ruta                | Descripción                     |
|--------|---------------------|---------------------------------|
| POST   | `/api/login`        | Login de usuario                |
| POST   | `/api/users`        | Registro de nuevo usuario       |
| POST   | `/api/users/:id/owners`| Registro de nuevo owner      |
| DELETE | `/api/users/:id/owners/:ownerName`| Eliminar un owner |


| GET    | `/api/books`   | Obtener todos los libros del usuario |
| GET    | `/api/books/search/:searchTerm`| Obtener libro filtrado |
| POST   | `/api/books`        | Añadir un nuevo libro           |
| PUT    | `/api/books/:id`    | Actualizar un libro             |
| DELETE | `/api/books/:id`    | Eliminar un libro               |


---

## 🚀 Cómo ejecutar el proyecto en local

### 1. Clonar el repositorio

```bash
git clone https://github.com/quiquecampos92/bookSaveProject.git
cd booksaveproject
```
### 2. Crear BBDD
Ir a tu base de datos preferida de NoSQL y crear el proyecto con todas las variables necesarias. Recomendado Mongo Atlas. 

### 3. Configura variables de entorno
Copia el archivo `.env.example` y renómbralo como `.env`. Rellena los datos correspondientes con tu base de datos.

### 4. Instalar dependencias
##### FRONTEND
```bash
cd frontend
npm install
```
##### BACKEND
```bash
cd backend
npm install
```

### 5. Arrancar en local
##### FRONTEND
```bash
cd frontend
npm run dev
```
##### BACKEND
```bash
cd backend
npm run dev
```

## 👤 Autor
Desarrollado por Enrique Campos
📬 Contacto: [e.camposmolla@gmail.com](mailto:e.camposmolla@gmail.com)  
💼 GitHub: [quiquecampos92](https://github.com/quiquecampos92)  
🔗 LinkedIn: [Enrique Campos Mollá](https://www.linkedin.com/in/enrique-campos-molla)



## 📝 Licencia
Este proyecto está bajo la licencia MIT.
¡Úsalo, modifícalo y compártelo libremente!