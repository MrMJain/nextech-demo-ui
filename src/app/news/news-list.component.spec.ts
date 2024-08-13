import { TestBed } from '@angular/core/testing';
import { NewsListComponent } from './news-list.component';
import { NewsService } from '../core/services/news-service.service';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { pipe,Observable, of } from 'rxjs';
import { NewsResponse } from '../model/news';
import { pageparam } from '../model/pageparam';


 
describe('NewsListComponent', () => {
 
  let fixture :any;
    let app : any;
    let service :  NewsService
    let newsData  = NewsResponse;
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
      imports: [HttpClientModule,
        MatFormFieldModule,MatPaginatorModule,MatButtonModule,MatInputModule,MatProgressSpinnerModule,MatFormField
      ],
     declarations: [NewsListComponent],
      providers:[HttpClient,NewsService]
    })
    .compileComponents();
    fixture = TestBed.createComponent(NewsListComponent);
    app = fixture.componentInstance;
    service = fixture.debugElement.injector.get(NewsService);
    // Set up paginator and filterValue mock values
    app.paginator = { pageSize: 10, pageIndex: 0 } as any;
    app.filterValue = 'testFilter';
    
    //service = TestBed.inject(NewsService) as jasmine.SpyObj<NewsService>;
  });
  
  it('should create', () => {
    expect(NewsListComponent).toBeTruthy();
  });
  it('should return  List of News',()=>{
     
    const mockNewsRequest: pageparam= {
      pageSize : 10,
      pageNumber : 1,
      isFullDataRequired : false,
      search : 'the'
    };
    let result : any;
    spyOn(service,"getNews").and.callFake(() => {
      return of(mockNewsResponse);
    });
    app.onLoad().subscribe((newsData: NewsResponse) => expect(newsData.results.length).toBeGreaterThan(0)); 
      
  });
 
  // it('should return news data if search value found',()=>{
   
  //   let searchValue = "Test";
  //   const event = { target: { value: searchValue }};

  //   const myServiceObj = jasmine.createSpyObj(service, [
  //     'getNews',
  //   ]);
  //   myServiceObj.getNews.and.returnValue(of(mockNewsResponse));

  //     // app.applyFilter(event).subscribe((newsData: NewsResponse) => expect(newsData.results.length).toBeGreaterThan(0));;
  // });
});