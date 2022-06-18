/* eslint-disable */
import { useState, useEffect } from 'react';
import L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Circle,
  Polyline,
  ImageOverlay,
  useMap,
  GeoJSON,
  Tooltip,
} from 'react-leaflet';
import utils from 'renderer/utils';
import dataawan from '../../../assets/miniMapDataset.js';
import geojson from '../../../assets/area-pantauan.json';

const currentPosition = [-6.894941, 107.58648];

const MarkerRadar = () => {
  const map = useMap();
  const [indexImage, setIndexImage] = useState(0);
  const radiusCrossHair = 12100;
  const xyCoordinate = map.options.crs.project(L.latLng(currentPosition));

  const right = L.point(xyCoordinate).add([radiusCrossHair, 0]);
  const left = L.point(xyCoordinate).subtract([radiusCrossHair, 0]);
  const top = L.point(xyCoordinate).add([0, radiusCrossHair]);
  const bottom = L.point(xyCoordinate).subtract([0, radiusCrossHair]);

  const crossHairPolyline = [left, right, top, bottom].map((point) =>
    map.options.crs.unproject(point)
  );

  const radarBounds = new L.LatLngBounds(
    ...utils.sliceArrayIntoGroups(crossHairPolyline, 2)
  );

  useEffect(() => {
    if (indexImage < dataawan.length - 1) {
      setTimeout(() => setIndexImage(indexImage + 1), 2000);
    } else {
      setIndexImage(0);
    }
  }, [indexImage]);

  return (
    <ImageOverlay
      url={dataawan[indexImage].img}
      bounds={radarBounds}
      opacity={1}
      zIndex={10}
      className="portrait"
    />
  );
};

const MiniMap = () => {
  return (
    <div className="col-start-3 row-span-1 border-b border-slate-900">
      <MapContainer
        className="w-full h-full"
        center={[-6.8943788, 107.5867193]}
        zoom={11}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerRadar />
        {geojson.map((area) => (
          <GeoJSON
            key={JSON.parse(area.geojson)}
            data={JSON.parse(area.geojson)}
            style={{ color: area.color }}
          >
            <Tooltip>{area.area_name}</Tooltip>
          </GeoJSON>
        ))}
      </MapContainer>
    </div>
  );
};

export default MiniMap;
