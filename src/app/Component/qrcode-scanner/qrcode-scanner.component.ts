import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ZXingScannerComponent, ZXingScannerModule } from '@zxing/ngx-scanner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-qrcode-scanner',
  standalone: true,
  imports: [CommonModule, RouterModule, ZXingScannerModule],
  templateUrl: './qrcode-scanner.component.html',
  styleUrl: './qrcode-scanner.component.scss',
})
export class QRCodeScannerComponent implements AfterViewInit {
  @ViewChild(ZXingScannerComponent) scanner!: ZXingScannerComponent;
  devices: MediaDeviceInfo[] = [];
  selectedDevice!: MediaDeviceInfo;
  isCameraAvailable: boolean = false;
  permissionDenied: boolean = false;

  constructor(private toast: ToastrService) {}

  ngAfterViewInit() {
    this.checkCameraAvailability();
  }

  // Check if camera is available and permissions are granted
  checkCameraAvailability() {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      this.devices = devices.filter((device) => device.kind === 'videoinput');
      if (this.devices.length) {
        this.isCameraAvailable = true;
        // Set the first available device (or you can choose a specific one)
        this.selectedDevice = this.devices[0];
        this.scanner.device = this.selectedDevice;
        this.requestCameraPermission();
      } else {
        this.isCameraAvailable = false;
        this.permissionDenied = false;
      }
    }).catch(error => {
      console.error('Error accessing media devices', error);
      this.permissionDenied = true;
      this.isCameraAvailable = false;
    });
  }

  // Request camera access
  requestCameraPermission() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        console.log('Camera permission granted');
      })
      .catch((error) => {
        console.error('Camera permission denied', error);
        this.permissionDenied = true;
        this.isCameraAvailable = false;
        this.toast.error('Camera permission denied. Please allow camera access.', 'Permission Denied', { progressBar: true });
      });
  }

  // Success callback when QR code is scanned
  onScanSuccess(result: string) {
    console.log('QR Code scanned:', result);
    this.toast.success(result, "Success!!", { progressBar: true });

    // Add the product to the cart
    this.addToCart(result);
  }

  // Handle adding the product to the cart
  addToCart(productId: string) {
    console.log('Adding product to cart:', productId);
  }

  // Handle the case when no camera is available
  handleNoCamera() {
    if (!this.isCameraAvailable) {
      this.toast.error('No camera device detected.', 'Error!', { progressBar: true });
    } else if (this.permissionDenied) {
      this.toast.error('Camera permission denied. Please allow access to the camera.', 'Permission Denied', { progressBar: true });
    }
  }
}