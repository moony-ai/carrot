export type StoreNewsRequest = {
  name: string;
  purpose: "introduce" | "news";
  contents: string;
};

export type StoreNewsResponse = {
  message: string;
};
