import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import MainMap from '../components/MainMap';
import MiniMap from '../components/MiniMap';
import Statistics from '../components/Statistics';
import Header from '../components/Header';
import dataset from '../../../assets/chartjs-data.json';
import 'react-toastify/dist/ReactToastify.css';

const areas = [
  { label: 'Sukarame', area_id: 49 },
  { label: 'Majalaya', area_id: 51 },
  { label: 'Area2', area_id: 52 },
  { label: 'Cihanjuang SMD', area_id: 74 },
  { label: 'Cikadut', area_id: 75 },
  { label: 'Jatihandap', area_id: 78 },
  { label: 'Pagarsih', area_id: 82 },
  { label: 'Rancasari', area_id: 96 },
  { label: 'Panyileukan', area_id: 97 },
  { label: 'Mengger', area_id: 98 },
  { label: 'Margasuka', area_id: 102 },
  { label: 'Cigondewah Rahayu', area_id: 103 },
  { label: 'Cigondewah', area_id: 104 },
  { label: 'Sukahaji', area_id: 110 },
  { label: 'Suka Asih', area_id: 111 },
  { label: 'Cijerah', area_id: 112 },
  { label: 'Sukasari', area_id: 113 },
  { label: 'Karang Pamulang', area_id: 114 },
];

const _MS_PER_DAY = 1000 * 60;

// date_1 and date_2 are javascript Date objects
function dateDiffInDays(date_1, date_2) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(
    date_1.getFullYear(),
    date_1.getMonth(),
    date_1.getDate(),
    date_1.getHours(),
    date_1.getMinutes()
  );
  const utc2 = Date.UTC(
    date_2.getFullYear(),
    date_2.getMonth(),
    date_2.getDate(),
    date_2.getHours(),
    date_2.getMinutes()
  );
  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

const showAlert = () => {
  const existed = [];
  areas.map((area) => {
    return dataset.history.map((x) => {
      if (x.chart[area.area_id].mean > 20) {
        const idx = existed.findIndex((data) => data.id === area.area_id);
        if (idx === -1) {
          existed.unshift({
            id: area.area_id,
            date: new Date(x.chart[area.area_id].datetime_utc),
          });
          return toast.error(
            `Terdeteksi berpotensi banjir pada daerah ${
              area.label
            } pada pukul ${new Date(
              x.chart[area.area_id].datetime_utc
            ).toLocaleTimeString()}`,
            {
              toastId: `${area.area_id}-${x.chart[area.area_id].datetime_utc}`,
            }
          );
        } else if (
          idx != -1 &&
          dateDiffInDays(
            new Date(x.chart[area.area_id].datetime_utc),
            existed[idx].date
          ) >= 30
        ) {
          existed.unshift({
            id: area.area_id,
            date: new Date(x.chart[area.area_id].datetime_utc),
          });
          return toast.error(
            `Terdeteksi berpotensi banjir pada daerah ${
              area.label
            } pada pukul ${new Date(
              x.chart[area.area_id].datetime_utc
            ).toLocaleTimeString()}`,
            {
              toastId: `${area.area_id}-${x.chart[area.area_id].datetime_utc}`,
            }
          );
        }
      } else if (x.chart[area.area_id].mean > 18) {
        const idx = existed.findIndex((data) => data.id === area.area_id);
        if (idx === -1) {
          existed.unshift({
            id: area.area_id,
            date: new Date(x.chart[area.area_id].datetime_utc),
          });
          return toast.warn(
            `Terdeteksi berpotensi banjir pada daerah ${
              area.label
            } pada pukul ${new Date(
              x.chart[area.area_id].datetime_utc
            ).toLocaleTimeString()}`,
            {
              toastId: `${area.area_id}-${x.chart[area.area_id].datetime_utc}`,
            }
          );
        } else if (
          idx != -1 &&
          dateDiffInDays(
            new Date(x.chart[area.area_id].datetime_utc),
            existed[idx].date
          ) >= 30
        ) {
          existed.unshift({
            id: area.area_id,
            date: new Date(x.chart[area.area_id].datetime_utc),
          });
          return toast.warn(
            `Terdeteksi berpotensi banjir pada daerah ${
              area.label
            } pada pukul ${new Date(
              x.chart[area.area_id].datetime_utc
            ).toLocaleTimeString()}`,
            {
              toastId: `${area.area_id}-${x.chart[area.area_id].datetime_utc}`,
            }
          );
        }
      }
      return null;
    });
  });
};

const Dashboard = () => {
  showAlert();
  return (
    <>
      <Header />
      <ToastContainer autoClose={15000} position="top-center" />
      <div className="w-screen h-screen grid grid-cols-3 grid-rows-2">
        <MainMap />
        <MiniMap />
        <Statistics />
      </div>
    </>
  );
};

export default Dashboard;
