import { Component, Input, Output, EventEmitter } from '@angular/core';

import { DataService } from '../shared/services/data.service';

@Component({
    selector: 'app-commands',
    templateUrl: './commands.component.html',
    styleUrls: ['./commands.component.css']
})
export class CommandsComponent {
    @Input() commands: any[];
    @Output() selectedChange: EventEmitter<any[]> = new EventEmitter<any[]>();
    public interface: string;
    public filterCommands: string;


    constructor(private _dataService: DataService) {
        this.commands = [];
        this.interface = 'SLI';
    }

    getCommands() {
        this.commands = [];
        this._dataService.getCommands(this.interface)
            .subscribe(data => {
                if (this.interface == 'SLI') {
                    this.commands = data['response']
                        .split('\n')
                        .sort()
                        .map((i) => {
                            let c = i.split('\t')
                            return [c[0], c[c.length - 1]]
                        })
                } else {
                    this.commands = data['response']
                        .sort()
                        .map((i) => [i.split('\t')[0], ''])
                }
            })
    }

    getCommand(command) {
        this.selectedChange.emit([this.interface + ' command', command, this.interface == 'SLI' ? 'help' : 'doc']);
    }

}
