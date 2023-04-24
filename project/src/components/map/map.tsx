import { useRef, useEffect, useState } from 'react';
import { MarkerUrls } from '../../const';
import { FeatureGroup, Icon, Marker } from 'leaflet';
import City from '../../types/city';
import Offer from '../../types/offer';
import useMap from '../../hooks/use-map';
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import { getActiveOfferId } from '../../store/app-data/selectors';

type MapProps = {
  city: City;
  offers: Offer[];
  currentOffer?: Offer;
  classNameMap: string | undefined;
}

const defaultCustomIcon = new Icon({
  iconUrl: MarkerUrls.Default,
  iconSize: [27, 39],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: MarkerUrls.Current,
  iconSize: [27, 39],
  iconAnchor: [20, 40],
});

function Map({city, offers, currentOffer, classNameMap}: MapProps) {

  const activeCardId = useSelector(getActiveOfferId);
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const [markersGroup] = useState<FeatureGroup>(new FeatureGroup());

  useEffect(() => {
    if (map && city) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });
        marker.setIcon((offer.id === activeCardId) ? currentCustomIcon : defaultCustomIcon);
        markersGroup.addLayer(marker);
      });

      if (currentOffer) {
        const marker = new Marker({
          lat: currentOffer.location.latitude,
          lng: currentOffer.location.longitude,
        });
        marker.setIcon(currentCustomIcon);
        markersGroup.addLayer(marker);
      }

      markersGroup.addTo(map);
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);
    }

    return () => {markersGroup.clearLayers(); };
  }, [map, offers, activeCardId, currentOffer, markersGroup, city]);

  return (
    <section className={classNameMap} ref={mapRef} data-testid="map"/>
  );
}

export default Map;
