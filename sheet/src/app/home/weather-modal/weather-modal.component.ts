import { Component } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-weather-modal',
  templateUrl: './weather-modal.component.html',
  styleUrls: ['./weather-modal.component.scss'],
})

export class WeatherModalComponent 
{
  searchTerm: string = '';
  filteredItems: any[] = [];

  items = [
    { label: "Garummon", checked: false},
      { label: "Craniummon", checked: false},
      { label: "Holy Angemon", checked: false},
      { label: "Ancient Beatmon", checked: false},
      { label: "Dukemon(Crimson Mode)", checked: false},
      { label: "Footmon", checked: false},
      { label: "Apocalymon", checked: false},
      { label: "Mush-Upped Mach Leomon", checked: false},
      { label: "Chibickmon", checked: false},
      { label: "Zombiemon", checked: false},
      { label: "Pipismon", checked: false},
      { label: "Greymon (2010 Anime Version)", checked: false},
      { label: "Amon", checked: false},
      { label: "Guilmon (X-Antibody)", checked: false},
      { label: "Craniummon (X-Antibody)", checked: false},
      { label: "Technodramon", checked: false},
      { label: "Grace Novamon", checked: false},
      { label: "Ancient Troiamon", checked: false},
      { label: "Guardromon", checked: false},
      { label: "Etemon", checked: false},
      { label: "Sagittarimon", checked: false},
      { label: "Rhinomon", checked: false},
      { label: "JESmon GX", checked: false},
      { label: "Cyberdramon", checked: false},
      { label: "Cyberdramon (X-Antibody)", checked: false},
      { label: "Pukamon", checked: false},
      { label: "Sand Yanmamon", checked: false},
      { label: "Hackmon", checked: false},
      { label: "Pururumon", checked: false},
      { label: "Arresterdramon", checked: false},
      { label: "Togemon (X-Antibody)", checked: false},
      { label: "Bagramon (Archangel Form)", checked: false}
  ]  

  constructor(private modalCTRL: ModalController) 
  {
    this.items = this.getItems();

    const getStoredItems = async () => {
    const {value} = await Preferences.get({
      key: "jsonData"
    });

    if (value)
    {
      const selectedItems = JSON.parse(value); // get array of objects from string

      this.items.forEach(item => {
        item.checked = selectedItems.some((selectedItem: { label: string; }) => selectedItem.label ===  item.label);
      });

    }
    }

    getStoredItems();
  }

  onSearchChange(event: any) {
    this.filterItems();
  }

  // Metoda pro filtrování položek podle hledaného výrazu
  private filterItems() {
    this.filteredItems = this.items.filter(item =>
      item.label.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  resetCheckboxes(){
    this.items.forEach(item => {
      item.checked = false;
    });
   }

  selectAllCheckboxes(){
    this.items.forEach(item => {
      item.checked = true;
    });
   }

  dismissModal(){
    this.modalCTRL.dismiss(null, "cancel");
   }

  submit(){
    const selectedItems = this.items.filter((item) => item.checked);

    const saveStoredItems = async() => {
      await Preferences.set({ 
        key: "jsonData",
        value: JSON.stringify(selectedItems)
      });
    }

    saveStoredItems();
    this.modalCTRL.dismiss(selectedItems, "location");
  }

  getItems()
  {
    return[
      { label: "Garummon", checked: false},
      { label: "Craniummon", checked: false},
      { label: "Holy Angemon", checked: false},
      { label: "Ancient Beatmon", checked: false},
      { label: "Dukemon(Crimson Mode)", checked: false},
      { label: "Footmon", checked: false},
      { label: "Apocalymon", checked: false},
      { label: "Mush-Upped Mach Leomon", checked: false},
      { label: "Chibickmon", checked: false},
      { label: "Zombiemon", checked: false},
      { label: "Pipismon", checked: false},
      { label: "Greymon (2010 Anime Version)", checked: false},
      { label: "Amon", checked: false},
      { label: "Guilmon (X-Antibody)", checked: false},
      { label: "Craniummon (X-Antibody)", checked: false},
      { label: "Technodramon", checked: false},
      { label: "Grace Novamon", checked: false},
      { label: "Ancient Troiamon", checked: false},
      { label: "Guardromon", checked: false},
      { label: "Etemon", checked: false},
      { label: "Sagittarimon", checked: false},
      { label: "Rhinomon", checked: false},
      { label: "JESmon GX", checked: false},
      { label: "Cyberdramon", checked: false},
      { label: "Cyberdramon (X-Antibody)", checked: false},
      { label: "Pukamon", checked: false},
      { label: "Sand Yanmamon", checked: false},
      { label: "Hackmon", checked: false},
      { label: "Pururumon", checked: false},
      { label: "Arresterdramon", checked: false},
      { label: "Togemon (X-Antibody)", checked: false},
      { label: "Bagramon (Archangel Form)", checked: false}
    ]
  }
}