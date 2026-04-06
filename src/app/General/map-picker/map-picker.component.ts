/// <reference types="@types/google.maps" />

import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-picker.component.html',
  styleUrl: './map-picker.component.scss'
})
export class MapPickerComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;

  map!: google.maps.Map;
  marker!: google.maps.Marker;
  geocoder!: google.maps.Geocoder;
  infoWindow!: google.maps.InfoWindow;

  latitude: number | null = null;
  longitude: number | null = null;

  formattedAddress = '';
  country = '';
  district = '';
  city = '';
  area = '';
  road = '';
  postalCode = '';

  loading = false;
  errorMessage = '';

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  initializeMap(): void {
    const defaultCenter: google.maps.LatLngLiteral = {
      lat: 23.8103,
      lng: 90.4125
    };

    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: defaultCenter,
      zoom: 15,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true
    });

    this.marker = new google.maps.Marker({
      position: defaultCenter,
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP
    });

    this.geocoder = new google.maps.Geocoder();
    this.infoWindow = new google.maps.InfoWindow();

    this.moveMarkerAndResolveAddress(defaultCenter.lat, defaultCenter.lng);

    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      if (!event.latLng) return;

      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      this.ngZone.run(() => {
        this.moveMarkerAndResolveAddress(lat, lng);
      });
    });

    this.marker.addListener('dragend', (event: google.maps.MapMouseEvent) => {
      if (!event.latLng) return;

      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      this.ngZone.run(() => {
        this.moveMarkerAndResolveAddress(lat, lng);
      });
    });
  }

  moveMarkerAndResolveAddress(lat: number, lng: number): void {
    this.loading = true;
    this.errorMessage = '';

    const position: google.maps.LatLngLiteral = { lat, lng };

    this.marker.setPosition(position);
    this.map.panTo(position);

    this.latitude = lat;
    this.longitude = lng;

    this.geocoder.geocode({ location: position }, (results, status) => {
      this.ngZone.run(() => {
        this.loading = false;

        if (status === 'OK' && results && results.length > 0) {
          const result = results[0];

          this.formattedAddress = result.formatted_address || '';
          this.country = this.getAddressComponent(result.address_components, 'country');
          this.postalCode = this.getAddressComponent(result.address_components, 'postal_code');

          this.district =
            this.getAddressComponent(result.address_components, 'administrative_area_level_2') ||
            this.getAddressComponent(result.address_components, 'administrative_area_level_1');

          this.city =
            this.getAddressComponent(result.address_components, 'locality') ||
            this.getAddressComponent(result.address_components, 'administrative_area_level_2');

          this.area =
            this.getAddressComponent(result.address_components, 'sublocality') ||
            this.getAddressComponent(result.address_components, 'sublocality_level_1') ||
            this.getAddressComponent(result.address_components, 'neighborhood');

          this.road = this.getAddressComponent(result.address_components, 'route');

          this.infoWindow.setContent(`
            <div style="font-size:14px; line-height:1.6; max-width:260px;">
              <strong>Selected Location</strong><br/>
              ${this.formattedAddress}<br/><br/>
              <small>Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}</small>
            </div>
          `);

          this.infoWindow.open({
            anchor: this.marker,
            map: this.map
          });
        } else {
          this.clearAddressFields();
          this.errorMessage = `Address not found. Status: ${status}`;
        }
      });
    });
  }

  getAddressComponent(
    components: google.maps.GeocoderAddressComponent[],
    type: string
  ): string {
    const component = components.find(x => x.types.includes(type));
    return component ? component.long_name : '';
  }

  clearAddressFields(): void {
    this.formattedAddress = '';
    this.country = '';
    this.district = '';
    this.city = '';
    this.area = '';
    this.road = '';
    this.postalCode = '';
  }

  useCurrentLocation(): void {
    if (!navigator.geolocation) {
      this.errorMessage = 'Geolocation is not supported by this browser.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.ngZone.run(() => {
          this.moveMarkerAndResolveAddress(
            position.coords.latitude,
            position.coords.longitude
          );
        });
      },
      (error) => {
        this.ngZone.run(() => {
          this.loading = false;

          switch (error.code) {
            case error.PERMISSION_DENIED:
              this.errorMessage = 'Location permission denied.';
              break;
            case error.POSITION_UNAVAILABLE:
              this.errorMessage = 'Location unavailable.';
              break;
            case error.TIMEOUT:
              this.errorMessage = 'Location request timeout.';
              break;
            default:
              this.errorMessage = 'Failed to get current location.';
              break;
          }
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }
}