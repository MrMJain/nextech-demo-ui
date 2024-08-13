import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NewsService } from './news-service.service';
import { NewsResponse } from '../../model/news';
import { pageparam } from '../../model/pageparam';

describe('NewsService', () => {
  let service: NewsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsService]
    });
    service = TestBed.inject(NewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch news list successfully', () => {
    const dummyNewsResponse: NewsResponse = {
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

    const reqParams: pageparam = {
        pageSize : 10,
        pageNumber : 1,
        isFullDataRequired : false,
        search : 'the'
      };

    service.getNews(reqParams).subscribe((res: NewsResponse) => {
      expect(res).toEqual(dummyNewsResponse);
    });

    const req = httpMock.expectOne("https://localhost:7062/NextechDemo/GetNewsList");
    expect(req.request.method).toBe("POST");
    req.flush(dummyNewsResponse);
  });

  it('should handle errors correctly', () => {
    const reqParams: pageparam = {
        pageSize : 10,
        pageNumber : 1,
        isFullDataRequired : false,
        search : 'the'
      };

    service.getNews(reqParams).subscribe(
      () => fail('Expected an error, not a successful response'),
      (error) => {
        expect(error.message).toBe(' ');
      }
    );

    const req = httpMock.expectOne("https://localhost:7062/NextechDemo/GetNewsList");
    req.flush('Something went wrong', { status: 500, statusText: 'Server Error' });
  });
});