# Match 2 simple

Todos los componentes necesarios estan en la carpeta components/Match2Games.

Requiere pixi.js para su funcionamiento, y probablemente @pixi/react pero no estoy seguro porque no llege a utilizarlo

El proyecto esta hecho en deno 2.5.x, descargalo [aqui](https://deno.com/)

Usando deno, para instalar las dependencias:

```
deno install
```

Para ejectuar la pagina web

```
deno task dev
```

Si quieres colocar el proyecto en otro proyecto, deberas utilizar react con vite y deno. Un buen punto de partida es

```
deno init --npm vite <nombre de tu proyecto> --template react
```

Necesitaras incluir las dependencias del componente, corre este comando.

```
deno add npm:pixi.js npm:@pixi/react
```

Hay un ejemplo de uso en src/App.jsx. El componente ocupa 400x400 pixeles a su alrededor, independientemente de la resolucion de la pantalla.

El proyecto esta escrito en react y javascript. Es posible en teoria utilizar el componente en un proyecto con typescript, mientras no se cambie el tipo del archivo jsx a tsx.

En la carpeta del proyecto hay una carpeta llamada assets, ahi se encuentran los sprites actuales. Remplazalos por tus propios sprites manteniendo el mismo nombre y tipo de archivo.
