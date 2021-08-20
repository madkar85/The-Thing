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
  
  public iconFeature = new Feature({
  geometry: new Point([14, 18]),
  name: 'Marco Island',
  population: 4000,
  rainfall: 500,
});

public iconStyle = new Style({
  image: new Icon({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: 'https://openlayers.org/en/latest/examples/data/icon.png',
  }),
});

public vectorSource = new VectorSource({
  features: [this.iconFeature],
});

public vectorLayer = new VectorLayer({
  source: this.vectorSource,
});


  ngOnInit(): void {

    
    this.creatMap();
    this.addPopup();
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

    this.iconFeature.setStyle(this.iconStyle);

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }), this.vectorLayer
      ],
      view: new View({
        center: olProj.fromLonLat([18.643501, 60.128161]),
        zoom: 2
      })
    });

  }

}
