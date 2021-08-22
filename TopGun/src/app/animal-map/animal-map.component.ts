import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Overlay } from 'ol';
import { MapService } from '../Service/map.service';
import { MapMarker } from '../model/map-marker';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-animal-map',
  templateUrl: './animal-map.component.html',
  styleUrls: ['./animal-map.component.css']
})
export class AnimalMapComponent implements OnInit {

  constructor(private mapService: MapService) { }

  @ViewChild('popup', { static: true }) popupElement: ElementRef;
  public map: Map;
  public vectorSource = new VectorSource();
  public vectorLayer = new VectorLayer();
  public markers: any;
  public MarkerInfo = MapMarker.empty();
  public showInfoBox = false;

  @ViewChild('mapForm', { static: false }) registerForm: NgForm;


  ngOnInit(): void {

    if(this.mapService.checkMapMarkerLis()){
      this.mapService.getAllMapMarkers();
      }
  
      this.mapService.currentMapMarkerList.subscribe(mapMarkerListData => {
        console.info('Marker test' + Object.keys(mapMarkerListData).length);

        if (mapMarkerListData.length != 0) {
          this.markers = mapMarkerListData;
          this.addMarkers();
          this.creatMap();
          this.addPopup();
        }
  

  
      });

  }



  addMarkers(){

    let mapMarkList = [];

  for (let mark of this.markers) {
    console.log(mark); // 1, "string", false

    let iconFeature = new Feature({
      geometry: new Point(olProj.fromLonLat([mark.longitud, mark.latitud])),
      id: mark.id,
      name: mark.name,
      longitud: mark.longitud,
      latitud: mark.latitud,
      description: mark.description,
      like: mark.like,
      population: 4000,
      rainfall: 500,
    });
    
    let iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://openlayers.org/en/latest/examples/data/icon.png',
      }),
    });
  
    iconFeature.setStyle(iconStyle);

    mapMarkList.push(iconFeature);

  }



  this.vectorSource = new VectorSource({
    features: mapMarkList,
  });
  
  this.vectorLayer = new VectorLayer({
    source: this.vectorSource,
  });
  


  }



  addPopup(){

    console.info("test")
    console.info(this.popupElement.nativeElement)
    console.info(this.popupElement)


        // display popup on click
this.map.on('click', (evt) => {
  const feature = this.map.forEachFeatureAtPixel(evt.pixel, (feature) => {
    return feature;
  });
  if (feature) {
   /* popupBox.setPosition(evt.coordinate);
    element.popover({
      placement: 'top',
      html: true,
      content: feature.get('name'),
    });
    element.popover('show');*/
    console.info("test");
    this.showInfoBox = true;

    this.MarkerInfo.id = feature.get('id');
    this.MarkerInfo.Name = feature.get('name');
    this.MarkerInfo.Latitud = feature.get('Latitud');
    this.MarkerInfo.Longitud = feature.get('Longitud');
    this.MarkerInfo.Description = feature.get('description');
    

  } else {
    //element.popover('dispose');
    this.showInfoBox= false;
    console.info("close box " + evt.coordinate)
  }
});


        // change mouse cursor when over marker
this.map.on('pointermove', (e) => {
  const pixel =this.map.getEventPixel(e.originalEvent);
  const hit = this.map.hasFeatureAtPixel(pixel);
  this.map.getViewport().style.cursor = hit ? 'pointer' : '';
});
// Close the popup when the map is moved
this.map.on('movestart', () => {
  //element.popover('dispose');
  console.info("close box on move" )
  this.showInfoBox= false;
});
  
  }
  

  creatMap(){

    

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }), this.vectorLayer
      ],
      view: new View({
        center: olProj.fromLonLat([18.643501, 60.128161]),
        zoom: 5
      })
    });

  }

}
