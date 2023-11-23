import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscar'
})
export class BuscarPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultPost:any = [] ;

    for (const post of value) {
      const aux = post._id + post.titulo + post.subtitulo + post.categoria + post.nota;

      if (aux.toLowerCase().indexOf(args.toLowerCase()) > -1 && post.categoria !== 'revista') {
        // Verificar si el título ya está en resultPost antes de agregarlo
        const exists = resultPost.some((item:any) => item.titulo === post.titulo); 
        
        if (!exists) {
          resultPost.push(post);
        }
      }
    }

    return resultPost;
  }
}
