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

2. Arrancar el programa:

   ```bash
   npm run start
   ```

3. Se puede escanear el QR con Expo Go o mas facil abrir desde el navegador con el link de localhost que te da. Si lo abris desde el navegador es recomenable ponerlo en tamaño celular, ya que de esa forma lo vamos a ver no

## Notas

- `src/App.tsx` decide qué pantalla se muestra.
- `src/main.tsx` registra la app en Expo.
- `src/screens/` tiene una pantalla por archivo.
- `src/components/` tiene piezas reutilizables simples.
- `src/theme/` tiene colores y estilos compartidos.
- `src/data/` tiene datos de ejemplo para las listas.
