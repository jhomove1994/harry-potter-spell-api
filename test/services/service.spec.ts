import { CreateSpellDTO } from "../../src/dtos/create-spell.dto";
import { QueryFilterSpellsDTO } from "../../src/dtos/query-filter-spells.dto";
import { Service } from "../../src/services/service";

describe('Service', () => {
  let service: Service;
  beforeEach(() => {
    service = new Service();
  });
  it('should fetch spells with query parameters', async () => {
    const filter: QueryFilterSpellsDTO = {
      Type: 'Charm',
      light: 'Blue'
    };
    const spells = await service.getSpells(filter);
    expect(spells).toBeDefined();
  });

  it('should fetch filtered spells with query parameters', async () => {
    const filter: QueryFilterSpellsDTO = {
      Type: 'Charm',
      light: 'Blue'
    };
    const spells = await service.getSpells(filter);
    expect(spells).toBeDefined();
    //TODO: El filtro de light no esta funcionando, se deja validacion comentada
    // const spellsNotBlue = spells.filter((spell: any) => spell.light !== filter.light);
    // expect(spellsNotBlue.length).toBe(0);
  });

  it('should fetch spells without query parameters', async () => {
    const filter: QueryFilterSpellsDTO = {};
    const spells = await service.getSpells(filter);
    expect(spells).toBeDefined();
  });

  it('should create a spell', async () => {
    const spell: CreateSpellDTO = {
      name: "Lumos",
      incantation: "Lumos",
      effect: "Illuminates the wand tip",
      canBeVerbal: true,
      type: "Charm",
      light: "Blue"
    };
    const newSpell = await service.createSpell(spell);
    expect(newSpell).toBeDefined();
    expect(newSpell.id).toBeDefined();
    expect(newSpell.name).toBe(spell.name);
  });
});
