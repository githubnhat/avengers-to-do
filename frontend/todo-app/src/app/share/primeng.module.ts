import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { TabViewModule } from 'primeng/tabview';
import { DragDropModule } from 'primeng/dragdrop';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
const PRIMENG_MODULE = [
  ButtonModule,
  InputTextModule,
  MenubarModule,
  TabViewModule,
  ToastModule,
  DragDropModule,
  PanelModule,
  TableModule,
  DialogModule
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
