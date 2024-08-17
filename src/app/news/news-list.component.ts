import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { News, NewsResponse } from '../model/news';
import { MatPaginator } from '@angular/material/paginator';

import { MatSelectChange } from '@angular/material/select';
import { MatSort, Sort } from '@angular/material/sort';
import { NewsService } from '../core/services/news-service.service';
import { merge, Observable, of as observableOf, pipe ,Subscription} from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

import  {pageparam} from '../model/pageparam';
@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css'
})
export class NewsListComponent  implements OnInit {
  pageInfo: pageparam = new pageparam();
  newsResponse : NewsResponse = new NewsResponse;
  displayedColumns: string[] = [
    'id',
    'title',
  ];
  dataSource = new MatTableDataSource<News>();
  dataSourceWithPageSize = new MatTableDataSource(this.newsResponse.results);
  isLoading = false;
  totalData: number;
  filterValue: string = "";
  News: News[];
  constructor(private _newsService: NewsService) {}

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginatorPageSize')                                                                     
  paginatorPageSize!: MatPaginator;

  pageSizes = [5, 10, 50];

  ngOnInit(): void {}
  onLoad() {
    this.pageInfo.pageSize =  this.paginator.pageSize;
    this.pageInfo.pageNumber =  this.paginator.pageIndex + 1;
    this.pageInfo.search = this.filterValue;
    this.pageInfo.isFullDataRequired = false;
    return this._newsService.getNews(this.pageInfo)
  }
  applyFilter(event: Event) {
    this.filterValue =  (event.target as HTMLInputElement).value.trim(); // Remove whitespace 
    if(this.filterValue.length > 3)
    {
      this.filterValue = this.filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.loadNewsList();
    }
    else if(this.filterValue.length ==0){
      this.Clear();
    }
  }
  ClearSearch(){
    this.Clear();
}
  ngAfterViewInit() {
    this.loadNewsList()
  }     
  Clear(){
    this.filterValue = ""; // Datasource defaults to lowercase matches
    this.loadNewsList();
  }
  
  loadNewsList = (): void => {
    this.paginator.page
    .pipe(
      startWith({}),
      switchMap((r : any) => {
        this.isLoading = true;
        return this.onLoad()
        .pipe(catchError(() => observableOf(null)));
      }),
      map((newsData) => {
        if (newsData == null && newsData == undefined) return [];
        this.totalData = newsData.pageInfo.totalCount;
        this.isLoading = false;
        return newsData.results;
      })
    )
    .subscribe((newsData) => {
      this.News = newsData;
      this.dataSource = new MatTableDataSource(this.News);
    });
  };
}