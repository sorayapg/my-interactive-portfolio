# Portafolio de Proyectos

¡Bienvenido/a a mi portfolio de proyectos!

Este portfolio exhibe una selección de mis trabajos y habilidades como desarrollador/a. Aquí encontrarás información sobre mis proyectos, experiencia y formación.

## Tecnologías Utilizadas

Este proyecto ha sido construido utilizando las siguientes tecnologías:

*   **React:** Una biblioteca de JavaScript para construir interfaces de usuario.
*   **Vite:** Un entorno de desarrollo frontend de nueva generación.
*   **Tailwind CSS:** Un framework de CSS de utilidad para estilizar rápidamente.
*   **Heroicons:** Un conjunto de iconos SVG diseñados para ser utilizados con Tailwind CSS (utilizado a través de `@heroicons/react` para componentes de React).

## Preparación del Entorno e Instalación

Para configurar y ejecutar este proyecto localmente, sigue los pasos a continuación:

1.  **Clonar el repositorio:** Si aún no lo has hecho, clona el repositorio del proyecto desde su ubicación (por ejemplo, GitHub).
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```
2.  **Navegar al directorio del proyecto:**
    ```bash
    cd <NOMBRE_DEL_DIRECTORIO>
    ```
3.  **Instalar dependencias:** Utiliza npm para instalar las dependencias del proyecto.
    ```bash
    npm install
    ```
    Esto instalará todas las librerías necesarias, incluyendo React, Vite, Tailwind CSS y Heroicons.
4.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    Esto iniciará un servidor local y abrirá el portfolio en tu navegador predeterminado. El servidor se recargará automáticamente con los cambios que hagas en el código.

## Despliegue en Firebase

Una vez que los cambios están listos para ser publicados, sigue estos pasos para desplegar la aplicación en Firebase Hosting:

1.  **Compilar el proyecto:** Genera la versión de producción de tu aplicación. Este comando creará una carpeta `dist` con todos los archivos estáticos optimizados.
    ```bash
    npm run build
    ```

2.  **Iniciar sesión en Firebase (solo la primera vez):** Si no has iniciado sesión en Firebase desde la terminal, ejecuta este comando. Se abrirá una ventana en tu navegador para que inicies sesión con tu cuenta de Google.
    ```bash
    firebase login
    ```

3.  **Desplegar en Firebase Hosting:** Este comando sube el contenido de la carpeta `dist` a los servidores de Firebase.
    ```bash
    firebase deploy --only hosting
    ```

¡Y eso es todo! Después de unos segundos, tu portfolio estará actualizado y disponible en la URL de tu hosting de Firebase.