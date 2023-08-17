export class PokemonDetails {
  name: string;
  types: Type[];
  stats: Stat[];
}

class Type {
  slot: number;
  type: {
      name: string;
  }
}

class Stat {
  base_stat: number;
  stat: {
      name: string;
  }
}
