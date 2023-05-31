class HttpException extends Error {
  message: string;
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default HttpException;
