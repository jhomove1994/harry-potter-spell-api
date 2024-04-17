import { Response } from "express";
import { handleError } from "../../src/utils/error";
import { ValidationError } from "class-validator";

describe('Error', () => {
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it('should return 400 status code and error message when error is an instance of Error', () => {
    const mockError = new Error('Error message');
    handleError(mockError, mockResponse as Response);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Error message' });
  });

  it('should return 400 status code and error message when error is an instance of Array and ValidationError', () => {
    const validationError = new ValidationError();
    validationError.constraints = { message: 'Error message' };
    const mockError = [validationError];
    handleError(mockError, mockResponse as Response);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: [{ message: 'Error message' }] });
  });
});
