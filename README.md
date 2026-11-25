# INCLUTEC

Demo web de una plataforma educativa inclusiva para estudiantes de secundaria. Prototipo universitario para una propuesta de investigación en la Universidad Nacional del Santa (UNS), Chimbote, Perú. Promueve la valoración de la diversidad cultural, social y de necesidades de aprendizaje, en relación con el ODS 4.

## Ejecutar

Requiere Node.js 20.19+ o 22.12+ y npm.

```bash
npm install
npm run dev
```

Abre la dirección que imprime Vite (normalmente http://localhost:5173).

```bash
npm run build
npm run preview
```

`build` verifica TypeScript y genera la web estática en `dist/`.

## Desplegar en Vercel

1. Sube esta carpeta a un repositorio Git e impórtalo desde Vercel.
2. Usa el preset **Vite**. El comando de compilación es `npm run build` y la carpeta de salida es `dist` (valores detectados automáticamente).
3. Despliega. No requiere variables de entorno ni servicios externos.

Se incluye `vercel.json` con rewrite a `index.html` para que las rutas de React Router funcionen al recargar o acceder directamente. La demo no está desplegada automáticamente desde este proyecto.

## Funciones implementadas

- Bienvenida, selección persistente de rol simulado Estudiante/Docente y dashboard con cinco módulos.
- Navegación lateral adaptable, menú móvil, rutas y página de enlace no encontrado.
- Barra fija: tamaño de texto (90–150 %), modo oscuro, alto contraste, tipografía Atkinson Hyperlegible y lectura con Web Speech API. Selecciona voz es-PE o una voz española disponible; la compatibilidad depende del navegador/sistema. La lectura se detiene al cambiar de página.
- Seis experiencias culturales, cada una con lectura, detalle y quiz de tres preguntas, corrección y registro local de resultados.
- Muro con nombre opcional, reacciones que pueden retirarse y contador por participante. Un identificador de navegador agrupa los aportes propios aunque se cambie el nombre. Indicador ilustrativo de equilibrio: al menos dos participantes y diferencia máxima de un aporte entre quienes publican. No incluye estudiantes sin publicaciones ni mide calidad.
- Panel exclusivo del rol docente: recomendaciones predefinidas, checklist persistente y notas locales que simulan colaboración en un dispositivo.
- Encuesta de ocho ítems Likert, seis respuestas precargadas, gráficos de barras/radar y tabla accesible. El botón de reinicio restaura **solo la encuesta** tras confirmar. Cada envío agrega una respuesta para facilitar la demostración; no hay control de identidad ni deduplicación.
- Avisos visibles de demo; preferencias, rol, publicaciones, reacciones, quizzes, prácticas, notas y resultados almacenados en `localStorage` bajo claves `inclutec-*`.
- Foco visible, enlace de salto al contenido, formularios etiquetados, HTML semántico y movimiento reducido. Ilustración original con CSS y descripción accesible. Google Fonts es opcional: si no carga se usan fuentes del sistema.

## Organización

```text
src/
  components/  Navegación, accesibilidad, iconos y elementos compartidos
  pages/       Bienvenida/aula, cultura, participación, docente, impacto y futuro
  data/        Contenido cultural, preguntas y datos de ejemplo
  hooks/       Persistencia local
  App.tsx      Rutas y rol simulado
  styles.css   Tokens, diseño adaptable, temas y accesibilidad
```

Stack: Vite, React, TypeScript, Tailwind CSS (plugin de Vite y utilidades), React Router, Recharts y Lucide. Los estilos de componentes usan CSS con variables para mantener un diseño propio y aplicar las preferencias.

## Trabajo futuro (no implementado)

- Realidad aumentada.
- Subtitulado automático en tiempo real.
- Modo offline con sincronización.
- Backend y base de datos real.
- Autenticación y autorización reales.

## Alcance y datos

No hay backend, envío de formularios a servidores, cuentas reales ni sincronización. El rol docente solo controla la interfaz. Las notas colaborativas son una simulación. Limpiar los datos del navegador elimina los cambios. En navegadores que bloquean almacenamiento aparece un aviso y los cambios duran solo la sesión.

Los textos y el vocabulario cultural son introductorios, con variaciones por comunidad; se propone revisarlos con especialistas y hablantes locales antes de uso educativo real. La encuesta no es un instrumento validado y sus gráficos no acreditan impacto de investigación. Los números iniciales son ficticios.

## Comprobación manual sugerida

1. Elegir cada rol y comprobar el acceso al panel docente.
2. Resolver un quiz y recargar para comprobar el avance.
3. Publicar como anónimo, reaccionar, retirar la reacción y recargar.
4. Marcar una práctica y escribir una nota en rol docente; volver al panel.
5. Completar los ocho ítems; comprobar que aumenta el total y cambia la tabla. Reiniciar y comprobar que vuelve a seis.
6. Probar teclado, tamaños de texto, contraste, oscuro y pantallas móvil/tableta/escritorio.
7. Probar la lectura con una voz española instalada en un navegador compatible.
