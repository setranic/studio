
# Setranic - Administración de Contenido

Este documento proporciona una guía detallada sobre cómo gestionar el contenido del sitio web, específicamente las publicaciones del blog.

El sitio está construido como un **sitio estático**, lo que significa que todas las páginas se generan durante un proceso de construcción (build) antes de ser publicadas. Esto ofrece un gran rendimiento y seguridad, pero requiere un proceso específico para añadir nuevo contenido dinámico como las publicaciones de un blog.

## Cómo Crear una Nueva Publicación del Blog

Para añadir una nueva publicación, debes seguir estos 4 pasos en orden. Es crucial que no te saltes ninguno.

---

### Paso 1: Preparar y Subir las Imágenes

Antes de crear la publicación en el panel de administración, necesitas tener listas las imágenes que usarás.

1.  **Prepara tus imágenes**:
    *   **Imagen de Portada**: Esta es la imagen grande que aparece en la parte superior del detalle de la publicación. Se recomienda un formato panorámico (ej. 1280x720 píxeles).
    *   **Imagen para Carrusel/Miniatura**: Esta es la imagen más pequeña que se muestra en la página de "Updates" y en la página de inicio. Se recomienda un formato más cuadrado o rectangular (ej. 600x400 píxeles).

2.  **Nombra tus imágenes de forma clara**: Usa nombres descriptivos en minúsculas y sin espacios (ej. `mi-nueva-publicacion-portada.jpg`).

3.  **Sube las imágenes a la carpeta correcta**:
    *   Navega a la carpeta `public/` en la estructura de tu proyecto.
    *   Dentro de `public/`, abre la carpeta `publicaciones/`.
    *   Sube tus dos imágenes a esta carpeta `public/publicaciones/`.

---

### Paso 2: Registrar el Slug de la Nueva Publicación (Paso Crítico)

Para que el sitio estático sepa que debe crear una página para tu nueva publicación, debes "registrarla" manualmente en el código.

1.  **Define un `slug` para tu publicación**: El `slug` es la parte de la URL que identifica tu post. Debe ser único, en minúsculas y usar guiones en lugar de espacios. Por ejemplo, si tu título es "Nuevas Rutas Aduaneras", un buen slug sería `nuevas-rutas-aduaneras-2024`.

2.  **Abre el archivo `src/lib/static-paths.ts`**: Este archivo contiene una lista (un array) de todos los slugs de las publicaciones existentes.

3.  **Añade tu nuevo `slug` a la lista**: Agrega el slug que definiste en el paso anterior al array `staticSlugs`.

    ```javascript
    // src/lib/static-paths.ts

    export async function getPostSlugs(): Promise<string[]> {
      const staticSlugs = [
        'regulaciones-permisos-aduaneros',
        'recomendaciones-carga-internacional-nicaragua',
        'rutas-aduaneras-terrestres-nicaragua',
        'tu-nuevo-slug-aqui' // <--- AÑADE TU NUEVO SLUG AQUÍ
      ];

      return staticSlugs;
    }
    ```

4.  **Guarda el archivo**. Este es el paso más importante para que tu publicación sea visible públicamente.

---

### Paso 3: Crear la Publicación en el Panel de Administración

Ahora que las imágenes están subidas y el slug está registrado, puedes crear la publicación en la base de datos.

1.  **Accede al Panel de Administración**: Ve a `[URL_DEL_SITIO]/admin` e inicia sesión.
2.  **Ve a "Gestionar Publicaciones"**: Haz clic en el enlace para ir a la página de administración de publicaciones (`/admin/publicaciones`).
3.  **Completa el formulario "Crear Nueva Publicación"**:
    *   **Título**: El título principal de tu publicación.
    *   **Subtítulo**: Un subtítulo o descripción corta.
    *   **Slug (Opcional)**: **MUY IMPORTANTE**. Escribe aquí el **mismo slug exacto** que registraste en el archivo `static-paths.ts` en el Paso 2. Si lo dejas en blanco, se generará uno a partir del título, pero es **altamente recomendable** que lo introduzcas manualmente para asegurar que coincida.
    *   **Contenido**: El cuerpo completo de tu artículo.
    *   **URL Imagen de Portada**: Escribe la ruta a la imagen de portada que subiste. La ruta debe empezar con `/studio/publicaciones/`. Ejemplo: `/studio/publicaciones/mi-nueva-publicacion-portada.jpg`.
    *   **URL Imagen para Carrusel/Miniatura**: Escribe la ruta a la imagen de miniatura. Ejemplo: `/studio/publicaciones/mi-nueva-publicacion-miniatura.jpg`.

4.  **Haz clic en "Crear Publicación"**. La publicación se guardará en la base de datos de Firestore.

---

### Paso 4: Desplegar los Cambios

El último paso es publicar los cambios que hiciste en el código (el `slug` en `static-paths.ts`).

1.  **Haz `commit` y `push` de tus cambios a GitHub**:
    *   Añade los cambios a `git`.
    *   Crea un `commit` (ej. `git commit -m "feat: add new blog post 'tu-nuevo-slug-aqui'"`).
    *   Empuja los cambios a la rama `main` (`git push origin main`).

Una vez que los cambios estén en GitHub, la acción de despliegue (GitHub Actions) se ejecutará automáticamente, construirá el sitio de nuevo incluyendo tu nueva página de publicación, y la desplegará en GitHub Pages. ¡Tu nueva publicación estará en línea!
