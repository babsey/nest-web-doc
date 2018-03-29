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
  public commands: any[] = [];
  public term: string;


  constructor(private _dataService: DataService) {
  }

  ngOnInit() {
    this.getCommands()
  }

  getCommands() {
    this._dataService.commands()
      .subscribe(data => {
        let res = data['response'];
        let a = res.split('\n');
        let b = a.map((i) => {
          let c = i.split('\t')
          return [c[0], c[c.length - 1]]
        })
        this.commands = b;
      })
  }

  onClick(selected) {
    this.selected = selected;
    this.selectedChange.emit([this.selected, true]);
  }

}
