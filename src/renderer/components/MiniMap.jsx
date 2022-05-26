import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

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
      </MapContainer>
    </div>
  );
};

export default MiniMap;
