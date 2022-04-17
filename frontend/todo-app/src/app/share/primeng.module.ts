import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview';
import { DragDropModule } from 'primeng/dragdrop';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';


const PRIMENG_MODULE = [
    ButtonModule,
    InputTextModule,
    MenubarModule,
    TabViewModule,
    DragDropModule,
    PanelModule,
    TableModule,
]

@NgModule({
    exports: [
        ...PRIMENG_MODULE
    ],
    imports: [
        ...PRIMENG_MODULE
    ],
})
export class PrimeNgModule { }
