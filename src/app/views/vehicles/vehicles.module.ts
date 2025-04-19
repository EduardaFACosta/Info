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
import { MatInputModule } from '@angular/material/input';

// Para as apis
import { HttpClientModule } from '@angular/common/http'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

//Para os popups
import { MatDialogModule } from '@angular/material/dialog';
import { MessageDialogComponent } from './components/message-dialog/message-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ListComponent,
    DetailComponent,
    EditComponent,
    AddComponent,
    DeleteDialogComponent,
    MessageDialogComponent
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatDialogModule,
    MatProgressBarModule,
    HttpClientModule 
  ],
})
export class VehiclesModule { }
