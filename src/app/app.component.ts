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
    public height: string;
    public title: string;
    public object: string;
    public progress: boolean;
    public selected: string;
    public helptext: string;
    public defaults: any = {};
    public hasDefaults: boolean;
    public viewDefaults: boolean;

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
        this.title = 'NEST Documentation';
        this.object = '';
        this.selected = '';
        this.defaults = {};
        this.hasDefaults = false;
        this.viewDefaults = false;
        this.resize()
    }

    resize() {
        this.height = (window.innerHeight - (this.mobileQuery.matches ? 58 : 66)).toString() + 'px';
    }

    changed(events) {
        this.object = events[0];
        this.selected = events[1];
        let helpOrDoc = events[2];
        if (helpOrDoc == 'help') {
            var responseJSON = this._dataService.getHelp(this.selected);
        } else {
            var responseJSON = this._dataService.getDoc(this.selected);
        }
        var key = helpOrDoc == 'help' ? 'response' : '__doc__';
        var errorText = 'No ' + helpOrDoc + ' found.';

        this.progress = true;
        responseJSON.subscribe(
            data => {
                setTimeout(() => {
                    this.progress = false;
                    this.helptext = ((data['status'] == 'ok'
                    && key in data)
                    ? data[key] : errorText);
                }, 1000)
            },
            error => {
                this.progress = false;
                this.helptext = errorText;
            }
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

    clear() {
        this.selected = '';
        this.helptext = '';
    }

}
