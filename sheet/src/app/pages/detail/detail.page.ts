import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services/places/places.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit 
{
  allData: any; 

  id = "";
  name = "";
  images: string = "empty";
  level = "";
  type = "";
  description_first_language = "";
  description_second_language = "";
  
  constructor(
    private placeService: PlacesService 
  ) { }

  ngOnInit() 
  {
    this.allData = this.placeService.data; 

    console.log("All data");
    console.log(this.allData);

    try 
    {
      this.level = this.allData.levels[0].level;
      this.id = this.allData.id;
      this.type = this.allData.types[0].type;
      this.description_first_language = this.allData.descriptions[1].description;
      this.description_second_language = this.allData.descriptions[0].description;
    } 
    catch (error) 
    {
      this.level = "ERROR";
      this.id = "ERROR";
      this.type = "ERROR";
      this.description_first_language = "ERROR";
      this.description_second_language = "ERROR";
      console.log("ERROR! Jejda UWU, nemohl jsem ziskat data z API. ERROR!");
    }

    this.name = this.allData.name;
    this.images = this.allData.images[0].href;

  }
}