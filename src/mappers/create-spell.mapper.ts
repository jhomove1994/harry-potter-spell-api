import { CreateSpellDTO } from "../dtos/create-spell.dto";

const createSpellMapper = (body: any) => {
  if (!body) {
    throw new Error('Body is required');
  }
  if (typeof body !== 'object') {
    throw new Error('Body must be an object');
  }
  const spell = new CreateSpellDTO();
  spell.name = body.name;
  spell.incantation = body.incantation;
  spell.effect = body.effect;
  spell.canBeVerbal = body.canBeVerbal;
  spell.type = body.type;
  spell.light = body.light;
  return spell;
};

export default createSpellMapper;
