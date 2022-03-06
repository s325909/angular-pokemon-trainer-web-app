import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon, Result } from '../models/pokemon.model';

const { apiPokemons, urlPokemonImage } = environment;

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  // private _pokemon: Pokemon[] = [];
  private _pokemon: Pokemon[] = JSON.parse(sessionStorage.getItem(StorageKeys.Pokemon) || "[]");

  private _loading: boolean = false;
  private _error: string = "";

  get pokemons(): Pokemon[] {
    return this._pokemon;
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
        next: (pokemon: Result) => {

          this._pokemon = pokemon.results;

          this.setPokemonIdsAndImg();
          
          // save pokemon to session storage
          sessionStorage.setItem(StorageKeys.Pokemon, JSON.stringify(this._pokemon));

          console.log(this._pokemon);
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }

  public pokemonById(id: number): Pokemon | undefined {
    return this._pokemon.find((pokemon: Pokemon) => pokemon.id === id)
  }

  public setPokemonIdsAndImg(): void{
    // const pokemon = this._pokemon.find((pokemon: Pokemon) => pokemon.name)
    this._pokemon.forEach((pokemon, index) => {
      const id = index + 1;
      pokemon.id = id;
      pokemon.img = urlPokemonImage + id + ".png"
    });
  }
}