import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { DataService } from './shared/services/data.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    mobileQuery: MediaQueryList;
    public height: string = '500px';
    public title = 'NEST Documentation';
    public selected: string = '';
    public helptext: string;
    public defaults: any = {};
    public hasDefaults: boolean = false;
    public viewDefaults: boolean = false;

    private _mobileQueryListener: () => void;

    constructor(
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        private _dataService: DataService
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit() {
        this.resize()
    }

    resize() {
        this.height = (window.innerHeight - document.getElementById('content')
            .offsetTop).toString() + 'px';
    }

    changed(events) {
        this.selected = events[0];
        let helpOrDoc = events[1];
        if (helpOrDoc == 'help') {
            var responseJSON = this._dataService.getHelp(this.selected);
        } else {
            var responseJSON = this._dataService.getDoc(this.selected);
        }
        var key = helpOrDoc == 'help' ? 'response' : '__doc__';
        var errorText = 'No ' + helpOrDoc + ' found.';
        responseJSON.subscribe(
            data => {
                this.helptext = ((data['status'] == 'ok'
                    && key in data)
                    ? data[key] : errorText);
            },
            error => this.helptext = errorText
        )

        if (this._dataService.modelsDefaultValues.indexOf(this.selected) == -1) {
            this.defaults = {};
            this.hasDefaults = false;
            this.viewDefaults = false;
        } else {
            this._dataService.getDefaults(this.selected)
                .subscribe(data => {
                    this.defaults = data['response'];
                    this.hasDefaults = true;
                })
        }
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

}
