export class NewsResponse{
  pageInfo : PageInfo;
  results : News[];
  isSuccess : boolean;
  message : string;
}
export class PageInfo{
  pageSize :number;

  /// <summary>
  ///     Total no of pages
  /// </summary>
  totalPages : number;
 
  /// <summary>
  ///     Total no of records
  /// </summary>
  totalCount : number;
 
  /// <summary>
  ///     Flag to check if full data set required
  /// </summary>
  isFullDataRequired : boolean;
}

 
  export class News{
    id : number;	
    title : string;
  }
   
  