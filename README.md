# Portafolio de Proyectos

�Bienvenido/a a mi portfolio de proyectos!

Este portfolio exhibe una selecci�n de mis trabajos y habilidades como desarrollador/a. Aqu� encontrar�s informaci�n sobre mis proyectos, experiencia y formaci�n.

## Tecnolog�as Utilizadas

Este proyecto ha sido construido utilizando las siguientes tecnolog�as:

*   **React:** Una biblioteca de JavaScript para construir interfaces de usuario.
*   **Vite:** Un entorno de desarrollo frontend de nueva generaci�n.
*   **Tailwind CSS:** Un framework de CSS de utilidad para estilizar r�pidamente.
*   **Heroicons:** Un conjunto de iconos SVG dise�ados para ser utilizados con Tailwind CSS (utilizado a trav�s de `@heroicons/react` para componentes de React).

## Preparaci�n del Entorno e Instalaci�n

Para configurar y ejecutar este proyecto localmente, sigue los pasos a continuaci�n:

1.  **Clonar el repositorio:** Si a�n no lo has hecho, clona el repositorio del proyecto desde su ubicaci�n (por ejemplo, GitHub).
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
    Esto instalar� todas las librer�as necesarias, incluyendo React, Vite, Tailwind CSS y Heroicons.
4.  **Iniciar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    Esto iniciar� un servidor local y abrir� el portfolio en tu navegador predeterminado. El servidor se recargar� autom�ticamente con los cambios que hagas en el c�digo.

## Despliegue en Firebase

Una vez que los cambios est�n listos para ser publicados, sigue estos pasos para desplegar la aplicaci�n en Firebase Hosting:

1.  **Compilar el proyecto:** Genera la versi�n de producci�n de tu aplicaci�n. Este comando crear� una carpeta `dist` con todos los archivos est�ticos optimizados.
    ```bash
    npm run build
    ```

2.  **Iniciar sesi�n en Firebase (solo la primera vez):** Si no has iniciado sesi�n en Firebase desde la terminal, ejecuta este comando. Se abrir� una ventana en tu navegador para que inicies sesi�n con tu cuenta de Google.
    ```bash
    firebase login
    ```

3.  **Desplegar en Firebase Hosting:** Este comando sube el contenido de la carpeta `dist` a los servidores de Firebase.
    ```bash
    firebase deploy --only hosting
    ```

�Y eso es todo! Despu�s de unos segundos, tu portfolio estar� actualizado y disponible en la URL de tu hosting de Firebase.
