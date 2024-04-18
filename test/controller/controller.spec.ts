import { Request, Response } from "express";
import { Controller } from "../../src/controller/controller"
import { Service } from "../../src/services/service"

describe('Controller', () => {
  let controller: Controller;
  let mockService: Service;
  beforeEach(() => {
    mockService = new Service();
    controller = new Controller(mockService);
  })

  it('should return "Hello World" when health is called', () => {
    const req: Partial<Request> = {
      query: {}
    };
    const res: Partial<Response> = {
      send: jest.fn()
    };
    controller.health(req as Request, res as Response);
    expect(res.send).toHaveBeenCalledWith("Hello World");
  });
  it('should respond with spells for valid query parameters', async () => {
    const req: Partial<Request> = {
      query: {
        Type: 'Charm',
        light: 'Blue'
      }
    };
    const res: Partial<Response> = {
      json: jest.fn()
    };
    await controller.spells(req as Request, res as Response);
    expect(res.json).toHaveBeenCalled();
  });

  it('should respond with error for invalid type query param', async () => {
    const req: Partial<Request> = {
      query: {
        light: 'Blue'
      }
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),//mockReturnThis es para que el metodo status retorne el objeto res
      json: jest.fn()
    };

    await controller.spells(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: [{ isString: 'Type must be a string' }] });
  });
  it('should respond with error for invalid light query param', async () => {
    const req: Partial<Request> = {
      query: {
        Type: 'Charm',
        light: 'yellow'
      }
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await controller.spells(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: [{ isIn: 'light must be one of the following values: Blue, Red' }] });
  });

  it('should respond with new spell created for valid body', async () => {
    const req: Partial<Request> = {
      body: {
        name: "Lumos",
        incantation: "Lumos",
        effect: "Illuminates the wand tip",
        canBeVerbal: true,
        type: "Charm",
        light: "Blue"
      }
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await controller.create(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(201);
    // expect(res.json).toHaveBeenCalledWith({ message: "Spell created" });
  });

  it('should respond with error for invalid body', async () => {
    const req: Partial<Request> = {
      body: {
      }
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await controller.create(req as Request, res as Response);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: [
        {
          isNotEmpty: 'name should not be empty',
          isString: 'name must be a string',
        },
        {
          isNotEmpty: 'incantation should not be empty',
          isString: 'incantation must be a string',
        },
        {
          isNotEmpty: 'effect should not be empty',
          isString: 'effect must be a string',
        },
        {
          isBoolean: 'canBeVerbal must be a boolean value',
          isNotEmpty: 'canBeVerbal should not be empty',
        },
        {
          isNotEmpty: 'type should not be empty',
          isString: 'type must be a string',
        },
        {
          isIn: 'light must be one of the following values: Blue, Red',
          isNotEmpty: 'light should not be empty',
          isString: 'light must be a string',
        }
      ]
    });
  });
})
