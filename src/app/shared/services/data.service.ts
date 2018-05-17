import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Configuration } from "../../app.constants"

@Injectable()
export class DataService {
    public modelsDefaultValues: any;
    private url: any = 'nest/';

    constructor(private http: HttpClient, private config: Configuration) {
        this.getModels(null).subscribe((data) => {
            this.modelsDefaultValues = data['response']['data'].filter((d) => d != 'sli_neuron');
        });
    }

    public getCommands(mode) {
        this.url = (mode == 'PyNEST_topology' ? 'nest_topology/' : 'nest/');
        return this.http.get(this.config.nestServerUrl + this.url
            + ((mode.startsWith('PyNEST')) ?
                '__dict__' : 'help?return_text=true&obj=helpindex')
        );
    }

    public getModels(mtype) {
        return this.http.get(this.config.nestServerUrl + 'nest/Models'
            + (mtype ? '?mtype=' + mtype : ''))
    }

    public getDefaults(model) {
        if (this.modelsDefaultValues.indexOf(model) != -1) {
            return this.http.get(this.config.nestServerUrl + 'nest/GetDefaults?model=' + model)
        }
    }

    public getHelp(model) {
        return this.http.get(this.config.nestServerUrl + 'nest/help?return_text=true&obj=' + model)
    }

    public getDoc(command) {
        return this.http.get(this.config.nestServerUrl + this.url + command + '?return_doc=true')
    }

}
