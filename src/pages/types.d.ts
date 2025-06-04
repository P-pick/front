export type ApiResponse<T> = {
  response: { header: ResponseHeader; body: ResponseBody<T> };
};

export type ResponseHeader = {
  resultCode: string;
  resultMsg: string;
};

export type ResponseBody<T> = {
  resultCode: string;
  resultMsg: string;
  numOfRows: number;
  pageNo: number;
  totalCount: number;
  items: { item: T };
};
