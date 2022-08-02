import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getPlacesByQuery(query: string){
    return this.http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=2.1618256155152835%2C41.41453974625071&types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1IjoiYXJ6emV0IiwiYSI6ImNsMDd0Mnk1MDBhcmozY3M3b2RxNWZvbGIifQ.XZetMbHUxYIKXIFDCBA3Ug`)
  }

}
