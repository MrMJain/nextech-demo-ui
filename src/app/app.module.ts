import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NewsModule } from './news/news.module';
import { AppComponent } from './app.component';
import { NewsListComponent } from './news/news-list.component';
import { RouterModule, Routes } from '@angular/router';
const appRoutes: Routes = [
  { path: '', component: NewsListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
  ],                                                                                        
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    NewsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }