import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from 'src/app/_service/pokemon-api.service';
import { PokemonList } from 'src/app/_model/pokemonList';
import { ModalComponent } from '../modal/modal.component';



@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  offset: number=0;
  listPokemones: PokemonList[] = [];


  constructor(
    private pokemonService: PokemonApiService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonList(this.offset)
    .subscribe(data =>{
      this.listPokemones = data;
      console.log(data);
    })
  }

  getPage(offset: number) {
      this.pokemonService.getPokemonList(offset)
     .subscribe((list: PokemonList[]) => {
        this.listPokemones = [...this.listPokemones,...list];
      });
  }

  openDialog(namePokemon:string): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '250px',
      data: {name: namePokemon},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  //Utilitarios

  onScroll(event: Event): void {
    const element: HTMLDivElement = event.target as HTMLDivElement;
    if (element.scrollWidth - element.scrollLeft < 1500) {
      this.offset+=20;
      this.getPage(this.offset);
      console.log("Nuevos 20");
    }
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
