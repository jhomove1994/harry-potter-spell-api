import { CreateSpellDTO } from "../../src/dtos/create-spell.dto";
import createSpellMapper from "../../src/mappers/create-spell.mapper";

describe('CreateSpellMapper', () => {
  it('should create an instance', () => {
    const body = {
      name: 'name',
      incantation: 'incantation',
      effect: 'effect',
      canBeVerbal: true,
      type: 'type',
      light: 'light'
    };
    const result = createSpellMapper(body);
    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(CreateSpellDTO);
  });

  it('should throw an error if body is not provided', () => {
    expect(() => createSpellMapper(null)).toThrowError('Body is required');
  });
  it('should throw an error if body is not an object', () => {
    expect(() => createSpellMapper('string')).toThrowError('Body must be an object');
  });
});
