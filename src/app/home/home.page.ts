import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map!: L.Map;
  osmLayer!: L.TileLayer;
  satelliteLayer!: L.TileLayer;
  terrainLayer!: L.TileLayer;

  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    // Menginisialisasi peta dengan tampilan awal
    this.map = L.map('mapId').setView([ -7.78333, 110.37450], 14);  // Mengarahkan ke lokasi Tugu Jogja

    // Menambahkan TileLayer untuk OpenStreetMap
    this.osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map); // Menambahkan ke peta

    // Menambahkan TileLayer untuk Satelit
    this.satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles © Esri'
    });

    // Menambahkan TileLayer untuk Terrain
    this.terrainLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data © OpenStreetMap contributors, SRTM'
    });

    // Menambahkan Layer Control
    const baseLayers = {
      'OpenStreetMap': this.osmLayer,
      'Satellite': this.satelliteLayer,
      'Terrain': this.terrainLayer
    };

    L.control.layers(baseLayers).addTo(this.map);

    // Menambahkan TileLayer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

//marker
const gramediaMarker = L.marker([-7.78333, 110.37450], {
  icon: L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41]
  })
}).addTo(this.map);
  
    //pop up
    const popupContent = `
      <b>Gramedia Sudirman</b><br>
      Yogyakarta, Indonesia.<br>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI3_1ALbglWOtLQ0OTtC7AI-2cRn-ubBOssg&s" alt="Gramedia" width="150" height="100"><br>
      Gramedia Sudirman.
    `;
    gramediaMarker.bindPopup(popupContent).openPopup();
  }
}