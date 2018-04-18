import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DataService } from '../shared/services/data.service';

@Component({
    selector: 'app-commands',
    templateUrl: './commands.component.html',
    styleUrls: ['./commands.component.css']
})
export class CommandsComponent implements OnInit {
    @Input() selected: string = '';
    @Output() selectedChange: EventEmitter<any[]> = new EventEmitter<any[]>();
    public language: string = 'SLI';
    public commands: any[] = [];
    public filterTerm: string;


    constructor(private _dataService: DataService) {
    }

    ngOnInit() {
        this.getCommands()
    }

    getCommands() {
        this._dataService.getCommands(this.language)
            .subscribe(data => {
                if (this.language == 'PyNEST') {
                    this.commands = data['response'].sort().map((i) => [i.split('\t')[0], ''])
                } else {
                    this.commands = data['response'].split('\n').sort()
                        .map((i) => {
                            let c = i.split('\t')
                            return [c[0], c[c.length - 1]]
                        })
                }
            })
    }


    onClick(selected) {
        this.selected = selected;
        this.selectedChange.emit([selected, this.language == 'SLI' ? 'help' : 'doc']);
    }

}
