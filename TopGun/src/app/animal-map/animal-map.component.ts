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

@Component({
  selector: 'app-animal-map',
  templateUrl: './animal-map.component.html',
  styleUrls: ['./animal-map.component.css']
})
export class AnimalMapComponent implements OnInit {

  constructor() { }

  @ViewChild('popup', { static: true }) popupElement: ElementRef;
  public map: Map;
  public vectorSource = new VectorSource();
  public vectorLayer = new VectorLayer();
  



  ngOnInit(): void {

    this.addMarkers();
    this.creatMap();
    this.addPopup();
  }


  addMarkers(){

    let mapMarkList = [];

   var markers = [
    {longitud: 9.2, latitud: 48.8, name: 'Cities1', description: " test test test", like: 10},
    {longitud: 8.4, latitud: 49.0, name: 'Cities2', description: " test test test", like: 9},
    {longitud: 6.2, latitud: 48.7, name: 'Cities3', description: " test test test", like: 8},
    {longitud: 2.5, latitud: 48.9, name: 'Cities4', description: " test test test", like: 7},
    {longitud: -1.4, latitud: 50.9, name: 'Cities5', description: " test test test", like: 6},
    {longitud: 6.6, latitud: 51.8, name: 'Citiess6', description: " test test test", like: 5},
    {longitud: 8.6, latitud:  49.4, name: 'Cities7', description: " test test test", like: 4},
    {longitud: 11.6, latitud:  48.1, name: 'Cities8', description: " test test test", like: 2}
  ];

  for (let mark of markers) {
    console.log(mark); // 1, "string", false

    let iconFeature = new Feature({
      geometry: new Point(olProj.fromLonLat([mark.longitud, mark.latitud])),
      name: mark.name,
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

    let element = this.popupElement.nativeElement;
  
const popupBox = new Overlay({
      element: element,
      positioning: 'bottom-center',
      stopEvent: false,
    });

    this.map.addOverlay(popupBox);

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
  
    console.info("open box " + evt.coordinate)
    console.info(feature.get('name'))
    console.info(feature.get('description'))
    console.info(feature.get('like'))
  } else {
    //element.popover('dispose');
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
