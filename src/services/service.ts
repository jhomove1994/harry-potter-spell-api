import { URLSearchParams } from "url";
import { QueryFilterSpellsDTO } from "../dtos/query-filter-spells.dto";
import { CreateSpellDTO } from "../dtos/create-spell.dto";
import { v4 as uuid } from 'uuid';

const BASE_ENDPOINT = "https://wizard-world-api.herokuapp.com";//TODO:Pasar a una variable de entorno

export class Service {
  getSpells = async (filter: QueryFilterSpellsDTO) => {
    const queryParams: URLSearchParams = new URLSearchParams();

    Object.entries(filter).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });
    let endpoint = `${BASE_ENDPOINT}/Spells`;
    const url = new URL(endpoint);
    url.search = queryParams.toString();
    const info = await fetch(url.toString());
    return info.json();
  }

  createSpell = async (spell: CreateSpellDTO) => {
    //TODO: Implementacion quemada, el servicio no esta disponible
    return {
      id: uuid(),
      ...spell,
    }
    // const endpoint = `${BASE_ENDPOINT}/Spells`;
    // const info = await fetch(endpoint, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(spell)
    // });
    // return info.json();
  }
}
