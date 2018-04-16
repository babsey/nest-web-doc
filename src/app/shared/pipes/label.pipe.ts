import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'label'
})
export class LabelPipe implements PipeTransform {
    transform(value, args: string): any {
        return value.replace(new RegExp('_', 'g'), ' ');
    }
}
