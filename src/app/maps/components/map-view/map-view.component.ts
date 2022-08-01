import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {Map, Marker, Popup} from 'mapbox-gl';
import { PlacesService } from '../../services';
import Mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef

  constructor(private placesService: PlacesService) { }

  ngAfterViewInit(): void {
    if (!this.placesService.userLocation) throw Error('No hay places service user location')
    
    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      // style: 'mapbox://styles/arzzet/cl6arxqb4000y14nf13pukacq',
      center: this.placesService.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
      projection: {name: 'globe'} // display the map as a 3D globe
    });
    map.getContainer().classList.remove('mapboxgl-map');
    
    const popup = new Popup()
      .setHTML(`
        <h6>Aquí estoy</h6>
        <span>Estoy en este lugar del mundo</span>
      `);

    new Marker({color: 'red'})
      .setLngLat(this.placesService.userLocation)
      .setPopup(popup)
      .addTo(map);
  }

}
