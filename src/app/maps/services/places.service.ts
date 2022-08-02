import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(private http: HttpClient) {
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
    // TODO: Evaluar quando query sea vacio

    this.isLoadingPlaces = true;

    return this.http.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=2.1618256155152835%2C41.41453974625071&types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1IjoiYXJ6emV0IiwiYSI6ImNsMDd0Mnk1MDBhcmozY3M3b2RxNWZvbGIifQ.XZetMbHUxYIKXIFDCBA3Ug`)
      .subscribe(resp =>{
        console.log(resp.features);
        
        this.isLoadingPlaces = false;
        this.places = resp.features;
      } );
  }
}
