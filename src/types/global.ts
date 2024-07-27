export type TError = {
  data: {
    message: string;
    stack: string;
    sucess: boolean;
  };
  status: number;
};

export type TResponse = {
  data: any;
  error: TError;
};
