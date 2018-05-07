import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DataService } from '../shared/services/data.service';

@Component({
    selector: 'app-models',
    templateUrl: './models.component.html',
    styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {
    @Input() selected: string;
    @Output() selectedChange: EventEmitter<any[]> = new EventEmitter<any[]>();
    public filterModels: string;
    public models: any[] = [];
    public mtypes: string[];
    public mtype: string = '';


    constructor(private _dataService: DataService) {
        this.mtypes = ['nodes', 'synapses'];
    }

    ngOnInit() {
        this.getModels()
    }

    getModels() {
        this._dataService.getModels(this.mtype)
            .subscribe(data => {
                this.models = data['response'];
            })
    }

    getModel(model) {
        this.selected = model;
        this.selectedChange.emit(['Model', model, 'help']);
    }

}
