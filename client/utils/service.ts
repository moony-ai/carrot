export interface GenerateStoreNewsRequest {
  name: string;
  purpose: "introduce" | "news";
  contents: string;
}

export interface GenerateStoreNewsResponse {
  message: string;
}