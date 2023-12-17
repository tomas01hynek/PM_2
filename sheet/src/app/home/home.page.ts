import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { WeatherModalComponent } from './weather-modal/weather-modal.component';
import { PlacesService } from '../services/places/places.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage 
{
  countriesDataArray: any[] = [];

  constructor(
    public modalCTRL: ModalController, 
    public http: HttpClient, 
    private placesService: PlacesService
   // private placesService: PlacesService
    ) {

      const setName = async() => {
        await Preferences.set({
          key: "name",
          value: "Filip"
        });
      }

      setName();

      const checkName = async() => {
        const { value } = await Preferences.get({
          key: "name"
        });
      }

      checkName();

      const getCountriesData = async() => {
        const { value } = await Preferences.get({
          key: "homeFetchData"
        });

        if (value)
        {
          const fetchedItems = JSON.parse(value);
          this.countriesDataArray = fetchedItems;
        }
      }

      getCountriesData();
    }

  async openModal(){
    const modal = await this.modalCTRL.create({
      component: WeatherModalComponent
    });

    await modal.present();
    const {data: newData, role} = await modal.onWillDismiss();

    // Read data
    if (role === "location"){
      console.log(newData);

      this.fetchData(newData);
    } 
  }

  sendData(data: any){
    this.placesService.data = data;
  }

      fetchData(countries: any){
        this.countriesDataArray = [];
    
        for (var c of countries)
        {
          const url = `https://digi-api.com/api/v1/digimon/${c.label}`;
    
          this.http.get(url).subscribe(data => {
            console.log(data);
            this.countriesDataArray.push(data);
    
            const saveStoredItems = async() => {
              await Preferences.set({
                key: "homeFetchData",
                value: JSON.stringify(this.countriesDataArray)
              });
            }
    
            saveStoredItems();
    
          });

      console.warn(this.countriesDataArray);
    }

    console.log("Load data from API");   
  }
}