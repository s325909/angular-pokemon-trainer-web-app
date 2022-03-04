import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon, Result } from '../models/pokemon.model';

const { apiPokemons } = environment;

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private _pokemons: Pokemon[] = [];
  private _loading: boolean = false;
  private _error: string = "";

  get pokemons(): Pokemon[] {
    return this._pokemons;
  }

  get loading(): boolean {
    return this._loading;
  }

  get error(): string {
    return this._error;
  }

  constructor(private readonly http: HttpClient) { }

  public findAllPokemons(): void {
    this._loading = true;
    this.http.get<Result>(apiPokemons + "?limit=151")
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (pokemons: Result) => {
          const {results} = pokemons;
          console.log(results);

          
          this._pokemons = results;
          console.log(this._pokemons);
          
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }
}