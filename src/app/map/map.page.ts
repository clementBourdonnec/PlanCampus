import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit,OnDestroy {
  map: Leaflet.Map;
  propertyList = [];

  constructor() { }

  ngOnInit() { this.leafletMapInit();
  }
  ionViewDidEnter() { this.leafletMap();
    //Fetch des données du json
    fetch('./assets/data.json')
    .then(res => res.json())
    .then(data => {
      this.propertyList = data.properties;
      this.leafletMap();
    })
   }

  leafletMapInit() {
    this.map = Leaflet.map('mapId');
  }


  leafletMap() {
    
    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © Angular LeafLet',
     }).addTo(this.map);
   
    //this.map.dragging.disable();


     //Leaflet.marker([48.1181139, -1.6363665,21]).addTo(this.map).bindPopup('Batiment 42').openPopup();

     //For pour ajouter nos marqueur qui viennent du fetch sur le json
      for (const property of this.propertyList) {
      Leaflet.marker([property.lat, property.long]).addTo(this.map)
        .bindPopup(property.name)
        .openPopup();
    }
    
    this.map.setMinZoom(17);
    this.map.setMaxBounds([
      [48.114, -1.649],
      [48.1245, -1.63]
  ]);
  this.map.setView([	48.117266, -1.64], 17); //Latitude/longitude/zoomlevel
  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }


}
