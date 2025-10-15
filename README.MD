# RemoteVars

RemoteVars es una librería de Node.js para **gestionar variables de entorno de manera remota**, sin depender de `.env` locales. Permite cargar variables desde múltiples providers (`local`, `GitHub`, `HTTP`) y guardarlas en cache. También incluye un **CLI** y soporte para **preload** en Node o frameworks como React/Next.js.

---

## 🔹 Instalación

Instala desde tu carpeta local (ajusta la ruta):

```bash
npm install ../remotevars
```

Opcionalmente, para probar el CLI globalmente:

```bash
npm link ../remotevars
```

---

## 🔹 Estructura del proyecto

```
remotevars/
├─ src/
│  ├─ core/
│  │  ├─ loader.js       # Función principal loadRemoteVars
│  │  └─ cache.js        # Cache: save, load, clear
│  ├─ providers/
│  │  ├─ local.js
│  │  ├─ github.js
│  │  ├─ http.js
│  │  └─ index.js        # Exporta todos los providers
│  ├─ register.js        # Preload automático
│  └─ cli.js             # Interfaz de línea de comandos
├─ package.json
└─ src/index.js          # Punto de entrada de la librería
```

---

## 🔹 Configuración: `.remotevars.json`

Archivo de ejemplo para configurar providers:

```json
{
  "defaultProvider": "local",
  "defaultEnv": "dev",
  "local": {
    "filePath": "./demo-config.json"
  },
  "github": {
    "repo": "usuario/mi-repo",
    "path": "config/dev.json",
    "branch": "main",
    "token": "ghp_TU_TOKEN"
  },
  "http": {
    "url": "https://mi-servidor.com/config/dev.json"
  }
}
```

- `defaultProvider` → provider por defecto si no se pasa `--provider`.  
- `defaultEnv` → env por defecto si no se pasa `--env`.  
- Configuración específica por provider (`local`, `github`, `http`).

Archivo local de ejemplo (`demo-config.json`):

```json
{
  "VAR1": "value1",
  "VAR2": "value2"
}
```

---

## 🔹 Uso en Node

```js
import { loadRemoteVars, cache } from "remotevars";

(async () => {
  // Cargar variables desde local
  const vars = await loadRemoteVars({ provider: "local", filePath: "./demo-config.json" });
  console.log(vars);
  console.log(process.env.VAR1);

  // Guardar en cache
  await cache.save(vars);

  // Cargar desde cache
  const cached = await cache.load();
  console.log(cached);
})();
```

---

## 🔹 CLI

Comandos disponibles:

```bash
remotevars pull           # Carga variables desde el provider y guarda en .env.local
remotevars load           # Carga variables en process.env
remotevars print          # Imprime variables por consola
remotevars clear-cache    # Elimina cache de variables
```

Ejemplo:

```bash
remotevars pull --provider=local --filePath=./demo-config.json
remotevars load --provider=github --repo="user/repo" --path="config/dev.json"
```

- Si no pasas `--provider`, se usa `defaultProvider` del `.remotevars.json`.

---

## 🔹 Preload automático

Para cargar variables **antes de ejecutar tu app**, usa el flag `-r` de Node:

```bash
node -r remotevars/register index.js
```

- Compatible con Node puro y frameworks como **Next.js** o **Vite/React**.

---

## 🔹 Tests

- Se usan **Jest** y mocks para providers remotos.  
- Ejecuta tests:

```bash
npm test
```

- Cubre:
  - Local, GitHub y HTTP providers  
  - Cache  
  - Loader E2E

## 🔹 Licencia

MIT

