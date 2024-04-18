import { Request, Response } from "express";
import { Service } from "../services/service";
import { LIGHT, QueryFilterSpellsDTO } from "../dtos/query-filter-spells.dto";
import { validateOrReject } from "class-validator";
import { handleError } from "../utils/error";
import { CreateSpellDTO } from "../dtos/create-spell.dto";
import createSpellMapper from "../mappers/create-spell.mapper";

export class Controller {
  constructor(
    private readonly service: Service
  ) {
  }

  health(req: Request, res: Response) {
    res.send("Hello World");
  }

  spells = async ({ query }: Request, res: Response) => {
    const filters = new QueryFilterSpellsDTO();
    filters.Type = query.Type as string;
    filters.light = query.light as LIGHT;
    try {
      await validateOrReject(filters);
      const spells = await this.service.getSpells(filters);
      res.json(spells);
    } catch (error) {
      handleError(error, res);
    }
  }

  create = async ({ body }: Request, res: Response) => {
    const spell = createSpellMapper(body);
    try {
      await validateOrReject(spell);
      const newSpell = await this.service.createSpell(spell);
      return res.status(201).json({ message: "Spell created", data: newSpell });
    } catch (error: unknown) {
      handleError(error, res);
    }
  }
}
