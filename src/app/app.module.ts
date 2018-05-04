import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatTabsModule,
    MatTooltipModule,
    MatToolbarModule,
} from '@angular/material';

import { DataService } from './shared/services/data.service';
import { FilterCommandsPipe, FilterModelsPipe } from './shared/pipes/filter.pipe';
import { KeysPipe } from './shared/pipes/keys.pipe';
import { LabelPipe } from './shared/pipes/label.pipe';

import { AppComponent } from './app.component';
import { ModelsComponent } from './models/models.component';
import { CommandsComponent } from './commands/commands.component';

import { Configuration } from './app.constants';

@NgModule({
    declarations: [
        AppComponent,
        CommandsComponent,
        FilterCommandsPipe,
        FilterModelsPipe,
        KeysPipe,
        LabelPipe,
        ModelsComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatProgressBarModule,
        MatSelectModule,
        MatSidenavModule,
        MatTabsModule,
        MatTooltipModule,
        MatToolbarModule,
    ],
    providers: [
        Configuration,
        DataService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
