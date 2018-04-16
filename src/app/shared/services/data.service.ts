import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Configuration } from "../../app.constants"

@Injectable()
export class DataService {
    private nestAPI: string;

    constructor(private http: HttpClient, private config: Configuration) {
        this.nestAPI = config.ServerWithApiUrl;
    }

    public commandsSLI() {
        return this.http.get(this.nestAPI + 'help?return_text=true&obj=helpindex')
    }

    public commandsPyNEST() {
        return this.http.get(this.nestAPI + '__dict__')
    }

    public models(mtype) {
        if (mtype) {
            return this.http.get(this.nestAPI + 'Models?mtype=' + mtype)
        } else {
            return this.http.get(this.nestAPI + 'Models')
        }
    }

    public getDefaults(model) {
        return this.http.get(this.nestAPI + 'GetDefaults?model=' + model)
    }

    public help(model) {
        return this.http.get(this.nestAPI + 'help?return_text=true&obj=' + model)
    }

    public doc(command) {
        return this.http.get(this.nestAPI + command + '?return_doc=true')
    }
}
