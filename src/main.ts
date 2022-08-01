import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
Mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ6emV0IiwiYSI6ImNsMDd0Mnk1MDBhcmozY3M3b2RxNWZvbGIifQ.XZetMbHUxYIKXIFDCBA3Ug';

if(!navigator.geolocation){
  alert('La Geolocalización no está soportada en este navegador');
  console.log('La Geolocalización no está soportada en este navegador');
  
}


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
