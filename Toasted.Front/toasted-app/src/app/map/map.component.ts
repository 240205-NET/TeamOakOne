import { Component, Input, OnInit } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  template: `
    <google-map [center]="center" [options]="mapOptions" [zoom]="zoomLevel" (mapClick)="onMapClick($event)">
      <map-marker [position]="markerPosition"></map-marker>
    </google-map>
  `,
})
export class MapComponent implements OnInit {
  @Input() longitude!: string;
  @Input() latitude!: string;

  center: google.maps.LatLngLiteral = { lat: Number(this.latitude), lng: Number(this.longitude) }; // Default center

  zoomLevel = 12;
  markerPosition: google.maps.LatLngLiteral = this.center;

  mapOptions: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };

  ngOnInit() {
    this.center = { lat: Number(this.latitude), lng: Number(this.longitude) };
    this.markerPosition = this.center;
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) { // Perform null check
      this.markerPosition = event.latLng.toJSON();
    }
  }
}