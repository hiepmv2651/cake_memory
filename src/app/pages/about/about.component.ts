import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

declare var google: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  options: any;

  overlays: any[] = [];

  dialogVisible: boolean = false;

  markerTitle?: string | null;

  selectedPosition: any;

  infoWindow: any;

  draggable: boolean = false;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.options = {
      center: { lat: 12.24185673429074, lng: 109.17723483886463 },
      zoom: 12,
    };

    this.initOverlays();

    this.infoWindow = new google.maps.InfoWindow();
  }

  handleMapClick(event: any) {
    this.dialogVisible = true;
    this.selectedPosition = event.latLng;
  }

  handleOverlayClick(event: any) {
    let isMarker = event.overlay.getTitle != undefined;

    if (isMarker) {
      let title = event.overlay.getTitle();
      this.infoWindow.setContent('' + title + '');
      this.infoWindow.open(event.map, event.overlay);
      event.map.setCenter(event.overlay.getPosition());

      this.messageService.add({
        severity: 'info',
        summary: 'Marker Selected',
        detail: title,
      });
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Shape Selected',
        detail: '',
      });
    }
  }

  addMarker() {
    this.overlays.push(
      new google.maps.Marker({
        position: {
          lat: this.selectedPosition.lat(),
          lng: this.selectedPosition.lng(),
        },
        title: this.markerTitle,
        draggable: this.draggable,
      })
    );
    this.markerTitle = null;
    this.dialogVisible = false;
  }

  handleDragEnd(event: any) {
    this.messageService.add({
      severity: 'info',
      summary: 'Marker Dragged',
      detail: event.overlay.getTitle(),
    });
  }

  initOverlays() {
    if (!this.overlays || !this.overlays.length) {
      this.overlays = [
        new google.maps.Marker({
          position: { lat: 12.24185673429074, lng: 109.17723483886463 },
          title: 'Infodation VN',
        }),
        new google.maps.Marker({
          position: { lat: 12.2682106, lng: 109.1982859 },
          title: 'NTU',
        }),
      ];
    }
  }

  zoomIn(map: any) {
    map.setZoom(map.getZoom() + 1);
  }

  zoomOut(map: any) {
    map.setZoom(map.getZoom() - 1);
  }

  clear() {
    this.overlays = [];
  }
}
