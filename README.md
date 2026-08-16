# Artesanías D Mitzy — App de escritorio (Windows)

Esta carpeta contiene tu Sistema Administrativo empaquetado como app de
escritorio con **Electron**. El sistema (módulos, cálculos, etc.) es
exactamente el mismo que ya conoces; lo único que cambia es que ahora
corre en su propia ventana con ícono, y guarda los datos en un archivo
dentro de la carpeta de la aplicación en tu equipo, no en el navegador.

No puedo generar el archivo `.exe` yo mismo (mi entorno no tiene acceso
a internet, y compilar Electron necesita descargar sus componentes). Pero
dejé todo listo para que tú lo generes en unos minutos, de dos maneras.

---

## Opción A — Sin instalar nada en tu computadora (recomendada)

Usa **GitHub Actions**, que compila el `.exe` en la nube gratis.

1. Crea una cuenta gratuita en [github.com](https://github.com) si no tienes una.
2. Crea un repositorio nuevo (botón verde "New"), márcalo como **privado**, dale
   cualquier nombre (por ejemplo `artesanias-d-mitzy-app`).
3. En la página del repositorio, usa la opción **"uploading an existing file"**
   (o arrastra la carpeta) y sube **todo el contenido de esta carpeta**
   (`main.js`, `preload.js`, `package.json`, `index.html`, la carpeta `assets`,
   la carpeta `.github`, `.gitignore` y este `README.md`), conservando la
   estructura de carpetas.
4. Ve a la pestaña **"Actions"** del repositorio. Debe aparecer un flujo llamado
   **"Generar instalador de Windows"**. Si no arrancó solo, dale clic y luego
   **"Run workflow"**.
5. Espera 2–4 minutos a que termine (ícono verde ✔).
6. Entra a esa ejecución terminada y baja hasta **"Artifacts"** — ahí está
   **ArtesaniasDMitzy-Instalador-Windows**. Descárgalo (es un .zip que contiene
   el instalador `.exe`).
7. Copia ese `.exe` a la computadora de la empresa y ejecútalo como cualquier
   instalador de Windows.

Cada vez que quieras una nueva versión (si te ayudo a hacer cambios al
sistema), solo actualizas los archivos en el repositorio y repites del
paso 4 en adelante.

---

## Opción B — En una computadora con Node.js instalado

Si tienes o instalas [Node.js](https://nodejs.org) (versión 20 o superior):

```bash
cd carpeta-de-la-app
npm install
npm run dist
```

El instalador quedará en la carpeta `dist/` (archivo `.exe`).

---

## Dónde quedan guardados los datos

La app guarda su información en:

```
%APPDATA%\Artesanias D Mitzy\admy_data.json
```

(la ruta exacta también se muestra dentro de la app, en el módulo
**Respaldo / Nube**). Sigue usando el botón de **Respaldo** dentro de la
app para descargar copias y enviarlas a tu correo — eso no cambia.

## Sobre Excel y PDF sin internet

Los botones para exportar a Excel y PDF usan dos librerías que se cargan
desde internet la primera vez que se abren (son ligeras, tardan segundo y
medio). Si la computadora del taller casi nunca tiene internet, avísame y
te preparo una versión con esas librerías incluidas dentro de la app para
que funcione 100% sin conexión.

## Actualizar el ícono o el nombre

- Ícono: reemplaza `assets/icon.ico` por el que prefieras (formato .ico).
- Nombre del programa: cámbialo en `package.json`, en `"productName"`.
