import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
    imports: [
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatIconModule,
        MatDividerModule,
        FlexLayoutModule
    ],
    exports: [
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatIconModule,
        MatDividerModule,
        FlexLayoutModule
    ]
})

export class AppMaterial {

}
