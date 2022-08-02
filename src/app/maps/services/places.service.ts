import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlacesApiClient } from '../api';
import { Feature, PlacesResponse } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor(private placesApi: PlacesApiClient) {
    this.getUserLocation();
   }

  public async getUserLocation(): Promise<[number,number]>{

    return new Promise( (resolve, reject) =>{

      navigator.geolocation.getCurrentPosition( 
        ({coords}) => {
          this.userLocation = [coords.longitude, coords.latitude ];
          resolve(this.userLocation);
        },
        (err) => {
          alert('No se pudo obtener la gelocalización');
          console.log(err);
          reject();
        }
      )
    });
  }
  
  getPlacesByQuery(query: string = '') {
    
    if(query.length === 0) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }

    if(!this.userLocation) throw Error ('No hay localización');

    this.isLoadingPlaces = true;

    return this.placesApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.userLocation.join(',')
      }
    })
      .subscribe(resp =>{
        
        this.isLoadingPlaces = false;
        this.places = resp.features;
      } );
  }
}
