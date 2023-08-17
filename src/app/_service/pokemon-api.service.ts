import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonList } from '../_model/pokemonList';
import { Observable } from 'rxjs';
import { PokemonDetails } from '../_model/pokemonDetails';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  private baseUrl: string = `${environment.HOST}/pokemon`;

  constructor(private http: HttpClient) { }


  getPokemonList(offset: number, limit: number = 20) : Observable<PokemonList[]> {
    return this.http.get<PokemonList[]>(this.baseUrl + '?offset=' + offset + '&limit=' + limit)
    .pipe(
        map((x: any) => x.results)
    );
}

  getPokemonDetail(pokemon: string): Observable<PokemonDetails> {
    return this.http.get<PokemonDetails>(this.baseUrl +"/"+ pokemon);
  }
}
