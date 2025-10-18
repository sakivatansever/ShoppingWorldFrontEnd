export interface IValidationErrorResponse {
    type: string;
    title: string;
    status: number;
    traceId: string;
    errors: Record<string, string[]>; 
  }