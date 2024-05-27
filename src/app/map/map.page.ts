import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

declare let google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MapPage implements OnInit {
  @ViewChild('map', { static: true }) mapElement: any;
  map: any;
  location: any;

  constructor(private router: Router) {
    // Get location of the course passed through
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.location = navigation.extras.state['location'];
    }
  }

  async ngOnInit() {
    let latLng = new google.maps.LatLng(-27.962870941643825, 153.38314668679914);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    // create a map using above options
    this.map = await new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    // create a marker
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    // put a heading for the marker
    let infoWindow = new google.maps.InfoWindow({
      content: "<h5>" + this.location + "</h5>"
    });

    // when user clicks the marker, the heading window appears
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

    // using geolocation to get current location to display in the map
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let pos = {
          lat: -27.962870941643825,
          lng: 153.38314668679914
        }
        this.map.setCenter(pos);
      });
    } else {
      alert("Geolocation not supported!");
    }

  }

}
