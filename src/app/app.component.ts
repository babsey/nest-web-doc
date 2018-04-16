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
        this.height = (window.innerHeight - document.getElementById('content').offsetTop).toString() + 'px';
    }

    changed(events) {
        let grp = events[0];
        this.selected = events[1];
        let helpOrDoc = events[2];
        if (helpOrDoc == 'help') {
            this._dataService.help(this.selected)
                .subscribe(
                data => {
                    if (data['status'] == 'ok' && 'response' in data) {
                        this.helptext = data['response'];
                    } else {
                        this.helptext = 'No help found.';
                    }
                },
                error => this.helptext = 'No help found.'
                )
        } else {
            this._dataService.doc(this.selected)
                .subscribe(
                data => {
                    if (data['status'] == 'ok' && '__doc__' in data) {
                        this.helptext = data['__doc__'];
                    } else {
                        this.helptext = 'No doc found.';
                    }
                },
                error => this.helptext = 'No doc found.'
                )
        }

        if (this.selected == 'sli_neuron' || grp == 'command') {
            this.defaults = {};
            this.hasDefaults = false;
            this.viewDefaults = false;
        } else {
            this._dataService.getDefaults(this.selected)
                .subscribe(
                data => {
                    this.defaults = data['response'];
                    this.hasDefaults = true;
                })
        }
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

}
