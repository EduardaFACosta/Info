import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclesRoutingModule } from './vehicles-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//  Imports dos componentes criados
import { ListComponent } from './pages/list/list.component';
import { DetailComponent } from './pages/detail/detail.component';
import { EditComponent } from './pages/edit/edit.component';
import { AddComponent } from './pages/add/add.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

// Imports do Angular Material
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';

// Para as apis
import { HttpClientModule } from '@angular/common/http'; 


@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    EditComponent,
    AddComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatTooltipModule,
    HttpClientModule 
  ]
})
export class VehiclesModule { }
