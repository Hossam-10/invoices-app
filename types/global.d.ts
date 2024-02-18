export {};

declare global {
  type Maybe<T> = T | null | undefined;

  type RequestData<T = any> = {
    id?: string | number;
    data?: T["data"];
    params?: T["params"];
  };

  type ApiFunctionData<T = any> = {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";
    key?: string
  } & Omit<RequestData<T>, "id">;

  type ApiFunction<RequestType = any> = (
    data?: RequestData<RequestType>
  ) => ApiFunctionData<RequestType>;

  type CachedRequest<T> = {
    data: T;
    fetchedAt: Date;
  };
}
