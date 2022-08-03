import { Injectable } from '@angular/core';
import { LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map
  private markers: Marker[] = [];

  get isMapReady(): boolean {
    return !!this.map
  }

  setMap(map: Map) {
    this.map = map
  }

  flyTo(coords: LngLatLike) {
    if (!this.isMapReady) throw Error('El mapa no está inicializado');

    this.map?.flyTo({
      zoom: 14, 
      center: coords
    })
  }

  createMarkersFromPlaces (places: Feature[], userLocation: [number, number]) {
    if (!this.map) throw Error('El mapa no está inicializado');
    this.markers.forEach(marker => marker.remove());
    const newMarkers = [];

    for(const place of places){
      const [lng, lat] = place.center;
      const popup = new Popup()
        .setHTML(`
          <h6>${place.text}</h6>
          <h3>${place.place_name}</h3>
          
        `);
      const newMarker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.map);
      newMarkers.push(newMarker)
    }
    this.markers = newMarkers;

    if(places.length === 0) return;

    // Limites del mapa
    const bounds = new LngLatBounds();
    bounds.extend(userLocation);
    newMarkers.forEach(marker => bounds.extend(marker.getLngLat()));
    this.map.fitBounds(bounds, {
      padding: 200
    })
    
  }
}
