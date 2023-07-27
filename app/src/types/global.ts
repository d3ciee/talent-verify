export interface APIResponse<T> {
  status: "success" | "error";
  description?: string;
  message?: string;
  data?: T;
}
