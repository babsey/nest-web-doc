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
        if (this.language == 'SLI') {
            this._dataService.commandsSLI()
                .subscribe(data => {
                    let res = data['response'];
                    let a = res.split('\n').sort();
                    let b = a.map((i) => {
                        let c = i.split('\t')
                        return [c[0], c[c.length - 1]]
                    })
                    this.commands = b;
                })
        } else {
            this._dataService.commandsPyNEST()
                .subscribe(data => {
                    let res = data['response'].sort();
                    let b = res.map((i) => {
                        let c = i.split('\t')
                        return [c[0], '']
                    })
                    this.commands = b;
                })
        }

    }

    onClick(selected) {
        this.selected = selected;
        this.selectedChange.emit(['command', this.selected, this.language == 'SLI' ? 'help' : 'doc']);
    }

}
