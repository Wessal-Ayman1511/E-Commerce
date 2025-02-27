import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(arryOfObject: any[], klma: string): any[] {
    return arryOfObject.filter((el) =>
      el.description.toLowerCase().includes(klma.toLowerCase())
    );
  }
}
