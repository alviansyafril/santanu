import React from 'react';
import faker from 'faker';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { add, format } from 'date-fns';
import 'chartjs-adapter-date-fns';
import utils from '../utils';
import dataset from '../../../assets/chartjs-data.json';

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const currentFormat = 'yyyy-MM-dd HH:mm:ss';
const currentDateHour = new Date(
  new Date().setMinutes(new Date().getMinutes() > 30 ? 30 : 0, 0, 0)
);

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

const pointStyles = [
  'circle',
  // 'cross',
  // 'crossRot',
  // 'dash',
  // 'line',
  'rect',
  'rectRounded',
  'rectRot',
  // 'star',
  'triangle',
];

const options = {
  interaction: { intersect: false, mode: 'index' },
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: { usePointStyle: true },
    },
    title: {
      display: true,
      text: 'Daerah Terdampak',
      padding: { bottom: 15, top: 5 },
      font: { size: 15, weight: 'bold' },
    },
    tooltip: { usePointStyle: true },
  },
  scales: {
    x: {
      type: 'time',
      min: format(
        new Date(dataset.history[dataset.history.length - 1].datetime_utc),
        currentFormat
      ),
      max: format(new Date(dataset.history[0].datetime_utc), currentFormat),
      time: {
        unit: 'minute',
        stepSize: 15,
        displayFormats: { hour: 'HH:mm', minute: 'HH:mm' },
        tooltipFormat: 'dd/MM/yyyy HH:mm',
      },
      // ticks: { source: 'labels' },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'DBZ',
      },
      min: 0,
      max: 20,
      ticks: { stepSize: 10 },
    },
  },
};

const getDatasets = () => {
  return areas.map((area) => {
    const color = utils.getRandomRGB();

    return {
      label: area.label,
      data: dataset.history.map((x) => {
        return {
          x: format(new Date(x.datetime_utc), currentFormat),
          y: x.chart[area.area_id].mean,
        };
      }),
      borderColor: color,
      backgroundColor: color.replace('rgb', 'rgba').replace(')', ', 0.5)'),
      cubicInterpolationMode: 'monotone',
      fill: false,
      tension: 1,
      pointStyle:
        pointStyles[faker.datatype.number({ min: 0, max: pointStyles.length })],
      pointRadius: 4,
      pointHoverRadius: 8,
    };
  });
};

const data = { datasets: getDatasets() };

const Statistics = () => {
  return (
    <div className="col-start-3 row-span-1 p-2">
      <Line options={options} data={data} className="!w-full !h-full" />
    </div>
  );
};

export default Statistics;
