import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterCommands'
})
export class FilterCommandsPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;

        searchText = searchText.toLowerCase();

        return items.filter(it => {
            return it[0].toLowerCase().includes(searchText);
        });
    }
}

@Pipe({
    name: 'filterModels'
})
export class FilterModelsPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
        if (!items) return [];
        if (!searchText) return items;

        searchText = searchText.toLowerCase();

        return items.filter(it => {
            return it.toLowerCase().includes(searchText);
        });
    }
}
