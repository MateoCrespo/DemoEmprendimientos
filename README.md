# PlanGo Mobile

Prototipo mobile de PlanGo hecho con Expo y React Native.

## Requisitos

- Node.js
- Expo Go en el celular, si querés probarlo rápido en un dispositivo real

## Ejecutar localmente

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Arrancar Expo:

   ```bash
   npm start
   ```

3. Escanear el QR con Expo Go.

También podés usar:

```bash
npm run android
npm run ios
npm run web
```

## Notas

- `src/App.tsx` decide qué pantalla se muestra.
- `src/main.tsx` registra la app en Expo.
- `src/screens/` tiene una pantalla por archivo.
- `src/components/` tiene piezas reutilizables simples.
- `src/theme/` tiene colores y estilos compartidos.
- `src/data/` tiene datos de ejemplo para las listas.
