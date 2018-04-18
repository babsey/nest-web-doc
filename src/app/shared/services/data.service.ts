import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Configuration } from "../../app.constants"

@Injectable()
export class DataService {
    public modelsDefaultValues: any;
    private nestServerUrl: string;

    constructor(private http: HttpClient, private config: Configuration) {
        this.nestServerUrl = config.ServerWithApiUrl;
        this.getModels(null).subscribe((data) => {
            this.modelsDefaultValues = data['response'].filter((d) => d != 'sli_neuron');
        });
    }

    public getCommands(language) {
        return this.http.get(this.nestServerUrl
            + ((language == 'PyNEST') ?
            '__dict__' : 'help?return_text=true&obj=helpindex'))
    }

    public getModels(mtype) {
        return this.http.get(this.nestServerUrl + 'Models'
            + (mtype ? '?mtype=' + mtype : ''))
    }

    public getDefaults(model) {
        if (this.modelsDefaultValues.indexOf(model) != -1) {
            return this.http.get(this.nestServerUrl + 'GetDefaults?model=' + model)
        }
    }

    public getHelp(model) {
        return this.http.get(this.nestServerUrl + 'help?return_text=true&obj=' + model)
    }

    public getDoc(command) {
        return this.http.get(this.nestServerUrl + command + '?return_doc=true')
    }
}
