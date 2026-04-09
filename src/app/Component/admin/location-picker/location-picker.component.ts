import { Component, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-picker',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],
  templateUrl: './location-picker.component.html',
  styles: [`.map-wrapper { height: 400px; position: relative; }`]
})
export class LocationPickerComponent implements OnInit {
  center: google.maps.LatLngLiteral = { lat: 23.8103, lng: 90.4125 }; // Default: Dhaka
  zoom = 15;
  markerPosition: google.maps.LatLngLiteral = this.center;
  
  oComplain = { complainAddressLat: '', complainAddressLong: '' };
  isLocationLoading = false;
  showLocationModal = false;
  isLocationGranted = false;
  locationRequiredMessage = "অর্ডার ডেলিভারি নিশ্চিত করতে আপনার সঠিক লোকেশন প্রয়োজন।";

  mapOptions: google.maps.MapOptions = {
    scrollwheel: true,
    disableDefaultUI: false,
  };

  markerOptions: google.maps.MarkerOptions = { draggable: true };

  constructor(private router: Router) {}
  
  ngOnInit() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    this.isLocationLoading = true;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.isLocationGranted = true;
          this.isLocationLoading = false;
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.updateMarker(this.center.lat, this.center.lng);
        },
        (error) => {
          this.isLocationLoading = false;
          this.showLocationModal = true;
          console.error('Geolocation error:', error);
        }
      );
    }
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.updateMarker(event.latLng.lat(), event.latLng.lng());
    }
  }

  onMarkerDragEnd(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.updateMarker(event.latLng.lat(), event.latLng.lng());
    }
  }

  updateMarker(lat: number, lng: number) {
    this.markerPosition = { lat, lng };
    this.oComplain.complainAddressLat = lat.toString();
    this.oComplain.complainAddressLong = lng.toString();
  }

  retryLocation() {
    this.showLocationModal = false;
    this.getCurrentLocation();
  }

  confirmLocation() {
  if (this.oComplain.complainAddressLat && this.oComplain.complainAddressLong) {
    // এখানে আপনি লোকেশনটি লোকাল স্টোরেজে রাখতে পারেন অথবা সার্ভারে পাঠাতে পারেন
    const selectedLocation = {
      lat: this.oComplain.complainAddressLat,
      lng: this.oComplain.complainAddressLong
    };
    
    localStorage.setItem('selectedDeliveryLocation', JSON.stringify(selectedLocation));
    
    // কনফার্ম করার পর ইউজারকে আগের পেজে (যেমন: অর্ডার বা ড্যাশবোর্ড) পাঠিয়ে দিন
    this.router.navigate(['/orders']); // আপনার প্রয়োজন অনুযায়ী রাউট দিন
  } else {
    alert("অনুগ্রহ করে মানচিত্র থেকে সঠিক লোকেশন নির্বাচন করুন।");
  }
}
}