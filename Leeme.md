# Crear PWA en _React_

`npm install -D vite-plugin-pwa`

`npm install -D @vite-pwa/assets-generator`

1. Descargar el icono svg de la pagina https://www.svgrepo.com/
2. En este caso el archivo se llama *"calendario.svg"*
3. Guarda el icono svg en la carpeta *"public"*

**Crear el archivo *pwa-assets.config.js* en la carpeta raíz del proyecto**

Debería de quedar algo así:

```
import { defineConfig, minimalPreset as preset } from '@vite-pwa/assets-generator/config'

export default defineConfig({
  preset,
  images: [
    'public/calendario.svg',
  ]
})
```

4. Añadir el siguiente script al *"package.json"*

```
{
  "scripts":{
    "generar-iconos": "pwa-assets-generator"
  }
}
```

`npm run generar-iconos`

Se crearan los iconos necesarios en la carpeta "public"


5. Editar "vite.config.js" agregando el objeto *manifest* y dentro todas las propiedades para la **PWA**, debería de quedar algo así:

```
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
  },
  base: "/horarios/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        background_color: "#ffffff",
        categories: ["transporte", "trabajo"],
        description:
          "Esta es una PWA para Controlar los horarios del transporte publico",
        dir: "ltr",
        display_override: ["standalone", "fullscreen"],
        display: "standalone",
        scope: "/",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        lang: "es-MX",
        name: "PWA Horarios urbanos rojos",
        orientation: "portrait",
        prefer_related_application: false,
        short_name: "PWA Horarios",
        start_url: "/horarios/",
        theme_color: "#317EFB",
      },
    }),
  ],
});
```
### Descargar PWA

Dependiendo del navegador y dispositivo recibirás una notificación que te indique cómo descargar la app desde el celular. Si estás en PC podrás hacerlo a través de un icono junto a la barra de direcciones.

Si deseas tener un botón claro y directo para descargar la aplicación puedes guiarte del siguiente código.

**Escuchar evento de instalación**

Añadimos un evento a la ventana que nos indica que la app está lista para instalarse. Guardamos esto en un estado (true/false), así como guardamos también el evento en el objeto de ventana para acceder a él más adelante.

```
const [isReadyForInstall, setIsReadyForInstall] = React.useState(false);

useEffect(() => {
  window.addEventListener("beforeinstallprompt", (event) => {
    // Evita que el mini-infobar aparezca en el móvil.
    event.preventDefault();
    console.log("👍", "beforeinstallprompt", event);
    // Guarde el evento para que pueda activarse más tarde.
    window.deferredPrompt = event;
    // Elimine la clase 'oculta' del contenedor del botón de instalación.
    setIsReadyForInstall(true);
  });
}, []);
```

**Botón de instalación de PWA**

Ya que guardamos el evento en el objeto de window, podemos acceder a él y sus propiedades desde un botón con la siguiente función como evento de click.


```
async function downloadApp() {
  console.log("👍", "butInstall-clicked");
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    // El mensaje diferido no está disponible.
     console.log("Ups, no se guardó ningún evento de aviso en window");
    return;
  }
  // Muestra el mensaje de instalación.
  promptEvent.prompt();
  // Registra el resultado
  const result = await promptEvent.userChoice;
  console.log("👍", "userChoice", result);
  // Restablezca la variable de solicitud diferida, ya que
  //Prompt() solo se puede llamar una vez.
  window.deferredPrompt = null;
  // Oculta el botón de instalación.
  setIsReadyForInstall(false);
}
```

Renderizamos el boton condicional

```
{isReadyForInstall && (
        <button className="button-app" onClick={downloadApp}>Instalar App <FontAwesomeIcon icon={faFileDownload} /> </button>
      )}
```

### Desplegar

`npm run build`