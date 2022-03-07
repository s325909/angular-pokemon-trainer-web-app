import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon, Result } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private _trainer?: Trainer;

  get trainer(): Trainer | undefined {
    return this._trainer;
  }

  set trainer(trainer: Trainer | undefined) {
    StorageUtil.storageSave<Trainer>(StorageKeys.Trainer, trainer!);
    this._trainer = trainer;
  }

  constructor() {
    this._trainer = StorageUtil.storageRead<Trainer>(StorageKeys.Trainer);
  }

  public inTrainerPokemon(pokemonName: string): boolean {


    if (this._trainer) {
      console.log(this.trainer?.pokemon.find((pokemon: Result) => pokemon.toString() === pokemonName));

      return Boolean(this.trainer?.pokemon.find((pokemon: Result) => pokemon.toString() === pokemonName))
    }

    return false;
  }


  // public inPokemon(pokemonId: number): boolean {
  //   if (this._trainer) {
  //     return Boolean(this.trainer?.pokemon.find((pokemon: Pokemon) => pokemon.id === pokemonId))
  //   }

  //   return false;
  // }

  // public trainerCaughtPokemon() {
  //   if (this.trainer !== undefined) {
  //     const pokemon = servie
  //   }

  // }
}
