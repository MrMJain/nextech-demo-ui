import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NewsListComponent } from './news-list.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [  NewsListComponent],
  imports: [
    MatTableModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,MatFormFieldModule
  ],
  exports: [
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule
  ],
})
export class NewsModule { }
