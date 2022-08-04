# Marvel challenge

![Marvel Challenge](https://repository-images.githubusercontent.com/520288136/8454c9a7-e002-4b28-9fcf-29a0da52314a)

Este CHALLENGE consiste en desarrollar un SPA que permita encontrar:

- Personajes de Marvel desde un buscador.
- Ver el detalle de los cómics asociados a los personajes.

Para desarrollar te enviaremos una carpeta comprimida donde encontrarás todos los
recursos que vas a utilizar para esta prueba. Para los diseños que no se encuentran
especificados te lo dejamos a tu imaginación.

El buscador de Personajes debe consumir el [MARVEL API REST](https://developer.marvel.com/), en este link puede
registrarse como desarrollador y encontrar una documentación apropiada para consumir el
API.

### El buscador:

- Sólo debe mostrar un máximo de 10 resultados a la vez, pero no limitado a solo 10
  resultados.
- Cuando se seleccione el personaje deseado se debe desplegar la lista de comics
  asociados a él, de los cuales se debe:
  - poder visualizar el detalle y también se debe poder guardar en mi lista de
    comics favoritos.

### Con respecto a la lista de cómics favoritos:

- No puede haber cómics repetidos en dicha lista.
- Adicionalmente, se requiere un mecanismo para añadir tres cómics al azar ,
  estos tres cómics tienen que ser seleccionados de los que se encuentran asociados
  a la lista de Personajes.
- Por último, la lista de cómics debe ser persistida en localStorage, para que no se
  pierda en caso que el usuario cierre la SPA y se pueda visualizar cuando regrese a
  ella.

Una vez haya terminado el código describa en un documento brevemente:

1. Las capas de la aplicación (por ejemplo capa de persistencia, vista, de aplicación, etc) y
   qué clases o objetos pertenecen a cual
2. La responsabilidad de cada clase o objeto creada Recibirá puntos extra si:
   1. Usa git o SVN y la historia del programa muestra su progreso en el desarrollo, usando
      commits con unidades de funcionalidad
   2. Usa pruebas unitarias y/o de validación (acceptance) que demuestran el buen
      funcionamiento del programa

Al completar el challenge, por favor enviarnos la url con la app funcional , el código que lo
soluciona o el link al repositorio donde se encuentra el código, el documento con la breve
descripción de su solución.
