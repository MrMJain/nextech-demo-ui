import { TestBed } from '@angular/core/testing';
import { NewsListComponent } from './news-list.component';
import { NewsService } from '../core/services/news-service.service';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { pipe,Observable, of, Subject } from 'rxjs';
import { NewsResponse } from '../model/news';
import { pageparam } from '../model/pageparam';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EventEmitter } from '@angular/core';
 
describe('NewsListComponent', () => {
 
  let fixture :any;
    let app : any;
    let service :  NewsService
    let pageEmitter: EventEmitter<PageEvent>;
    let mockPaginator: Partial<MatPaginator>;
    const mockNewsResponse: NewsResponse = {
      results: [
        { id: 1, title: 'Test News 1' },
        { id: 2, title: 'Test News 2' },
      ],
      pageInfo: {
        totalCount: 2,
        pageSize: 1,
        totalPages: 0,
        isFullDataRequired: false
      },
      isSuccess: false,
      message: ''
    };
     
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,FormsModule,BrowserAnimationsModule,NoopAnimationsModule,
        MatFormFieldModule,MatPaginatorModule,MatButtonModule,MatProgressBarModule, MatInputModule,MatProgressSpinnerModule,MatFormField,MatTableModule
      ],
     declarations: [NewsListComponent],
      providers:[HttpClient,NewsService,   { 
          provide: MatPaginator, 
          useValue: { 
            page: pageEmitter,
            pageIndex: 0,
            pageSize: 10,
            length: 100,
          } 
        }]
    })
    .compileComponents();
    fixture = TestBed.createComponent(NewsListComponent);
    app = fixture.componentInstance;
    service = fixture.debugElement.injector.get(NewsService);
    pageEmitter = new EventEmitter<PageEvent>();
    mockPaginator = {
      page: pageEmitter as any, // Mock the page EventEmitter
      pageIndex: 0,
      pageSize: 10,
      length: 10,
    };
    
    app.filterValue = '';
    app.paginator = mockPaginator as MatPaginator;;
  });
  
  it('should create', () => {
    expect(NewsListComponent).toBeTruthy();
  });
  it('should return  List of News',()=>{
    const mockNewsRequest: pageparam= {
      pageSize : 10,
      pageNumber : 1,
      isFullDataRequired : false,
      search : ''
    };
    spyOn(service,"getNews").and.callFake(() => {
      return of(mockNewsResponse);
    });
    app.onLoad().subscribe((newsData: NewsResponse) => expect(newsData.results.length).toBeGreaterThan(0)); 
      
  });
  it('should call getNews$ and update dataSource on ngAfterViewInit', () => {
      
    let pageInfo: pageparam = new pageparam();
    pageInfo.pageNumber = 1;
    pageInfo.pageSize = 5;
    pageInfo.search ='';
    pageInfo.isFullDataRequired = false;
    
    spyOn(service,"getNews").and.callFake(() => {
      return of(mockNewsResponse);
    });
    fixture.componentInstance.ngAfterViewInit(); // triggers ngAfterViewInit
    fixture.detectChanges();

    expect(service.getNews).toHaveBeenCalledWith(pageInfo);
    expect(app.News.length).toBe(2);
    expect(app.isLoading).toBeFalse();
  });
  
  it('should apply filter and load data if filter length > 3', () => {
    // Arrange
    const event = { target: { value: 'Test' } };
          let pageInfo: pageparam = new pageparam();
          pageInfo.pageNumber = 1;
          pageInfo.pageSize = 10;
          pageInfo.search ='test';
          pageInfo.isFullDataRequired = false;
    // Act
     //Emit a PageEvent to simulate paginator interaction
   pageEmitter.emit({
    pageIndex: 0,
    pageSize: 10,
    length: 20,
  });
    spyOn(service,"getNews").and.callFake(() => {
            return of(mockNewsResponse);
          });
         
    app.applyFilter(event);
   
    // Assert
    expect(service.getNews).toHaveBeenCalledWith(pageInfo);
    expect(app.News.length).toEqual(2);
    expect(service.getNews).toHaveBeenCalled();
  });
  afterAll(() => {
    // Cleanup code
    fixture.destroy();
  });
});