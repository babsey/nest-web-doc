import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

import { DataService } from './shared/services/data.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    mobileQuery: MediaQueryList;
    public height: string;
    public sideNavWidth: string;
    public contentHeight: string;
    public title: string;
    public object: string;
    public models: any[];
    public commands: any[];
    public progress: boolean;
    public selected: string;
    public helptext: string;
    public defaults: any;
    public params: any;
    public hasParams: boolean;
    public viewParams: boolean;
    displayedColumns = ['name', 'value'];

    @ViewChild(MatSort) sort: MatSort;

    private _mobileQueryListener: () => void;

    constructor(
        changeDetectorRef: ChangeDetectorRef,
        media: MediaMatcher,
        private _dataService: DataService
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
        this.title = this.mobileQuery.matches ? 'NEST User Doc' : 'NEST User Documentation';
        this.object = '';
        this.models = [];
        this.commands = [];
        this.selected = '';
        this.defaults = {};
        this.params = [];
        this.hasParams = this.params.length > 0;
        this.viewParams = false;
    }

    resize() {
        var offset = this.mobileQuery.matches ? 58 : 66;
        this.height = (window.innerHeight - offset).toString() + 'px';
        this.contentHeight = (window.innerHeight - offset - 100).toString() + 'px';
        this.sideNavWidth = (this.mobileQuery.matches ? window.innerWidth : 350).toString() + 'px';
    }

    ngOnInit() {
        this.resize()
    }

    getModels() {
        if (this.models.length > 0) return
        console.log('Get models')
        this._dataService.getModels('')
            .subscribe(data => {
                this.models = data['response']['data'];
            })
    }

    getCommands() {
        if (this.commands.length > 0) return
        console.log('Get commands')
        this._dataService.getCommands('PyNEST')
            .subscribe(data => {
                this.commands = data['response']['data']
                    .sort()
                    .map((i) => [i.split('\t')[0], '']);
            })
    }

    onSelectChange() {
        this.getModels()
        this.getCommands()
    }

    changed(event) {
        this.object = event[0];
        this.selected = event[1];
        let helpOrDoc = event[2];
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
                    this.helptext = ((data['response']['status'] == 'ok'
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
            this.params = [];
            this.hasParams = this.params.length > 0;
            this.viewParams = false;
        } else {
            this._dataService.getDefaults(this.selected)
                .subscribe(data => {
                    setTimeout(() => {
                        this.defaults = data['response']['data'];
                        let params = [];
                        for (let key in this.defaults) {
                            params.push({ name: key, value: JSON.stringify(this.defaults[key]) });
                        }
                        this.params = new MatTableDataSource(params);
                        this.params.sort = this.sort;
                        this.hasParams = params.length > 0;
                    }, 500)
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
