# Anti-Social Net — TP2

Red social para la materia **Construcción de Interfaces de Usuario** · UNAHUR 2025

> *"Porque a veces el código es suficiente compañía."*

---

## Descripción

Anti-Social Net es una red social con estética hacker/terminal donde los usuarios pueden publicar posts, comentar, explorar contenido por tags y buscar publicaciones. Incluye un modo terminal que transforma toda la interfaz a un estilo de línea de comandos.

**Tecnologías:**
- React 19 + TypeScript + Vite
- Tailwind CSS v4
- React Router v7

---

## Requisitos previos

- Node.js 18+
- El backend corriendo en `http://localhost:3001`

---

## Instalación y ejecución

### Frontend

```bash
cd antisocial-net
npm install
npm run dev
```

La app queda disponible en `http://localhost:5173`

### Backend

```bash
cd backendLucas
npm install
node app.js
```

El servidor corre en `http://localhost:3001`

---

## API

URL base: `http://localhost:3001`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/users` | Registro de usuario |
| GET | `/users` | Listar usuarios |
| GET | `/users/:id` | Obtener usuario por ID |
| GET | `/posts` | Listar posts (acepta `?userId=`) |
| GET | `/posts/:id` | Obtener post por ID |
| POST | `/posts` | Crear post (`description`, `userId`, `tagIds[]`) |
| GET | `/comments/post/:id` | Comentarios de un post |
| POST | `/comments` | Crear comentario (`content`, `userId`, `postId`) |
| GET | `/tags` | Listar etiquetas |
| GET | `/postimages/post/:id` | Imágenes de un post |
| POST | `/postimages` | Agregar imagen a post (`url`, `postId`) |

---

## Funcionalidades implementadas

- Registro e inicio de sesión
- Feed con posts en tiempo real desde la API
- Quick post desde el feed (texto + imagen opcional)
- Página completa de nueva publicación con tags e imágenes
- Detalle de post con comentarios reales
- Comentarios inline desde el feed
- Perfil de usuario con posts propios
- Explorar por tags
- Búsqueda de posts y tags desde la API
- Modo terminal (toggle en la barra lateral)
- Diseño responsive mobile/desktop

---

## Estructura del proyecto

```
src/
├── components/
│   ├── feed/          # FeedLayout, ActivitySidebar, FeedComposeBox
│   ├── layout/        # DesktopSidebar, MobileNav, SearchBar
│   ├── posts/         # PostCard, PostDetail, LikeButton, comentarios
│   ├── profile/       # ProfileHeader, UserProfileContent
│   └── ui/            # Button, Badge, GlitchText, Toast, Skeleton...
├── context/           # AuthContext, ToastContext, UiContext
├── pages/             # Home, Explore, Search, PostDetail, NewPost, Profile...
├── services/          # postService.ts, userService.ts (calls a la API)
└── types/             # index.ts
```
