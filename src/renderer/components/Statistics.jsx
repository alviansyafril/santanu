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
  'Sukarame',
  'Majalaya',
  'Area2',
  'Cihanjuang SMD',
  'Cikadut',
  'Jatihandap',
  'Pagarsih',
  'Rancasari',
  'Panyileukan',
  'Mengger',
  'Margasuka',
  'Cigondewah Rahayu',
  'Cigondewah',
  'Sukahaji',
  'Suka Asih',
  'Cijerah',
  'Sukasari',
  'Karang Pamulang',
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
      min: format(currentDateHour, currentFormat),
      max: format(add(currentDateHour, { minutes: 60 }), currentFormat),
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

const totalData = Array.from(Array(50).keys());

const getDatasets = () => {
  return areas.map((area) => {
    const color = utils.getRandomRGB();

    return {
      label: area,
      data: totalData.map((x, i) => {
        return {
          x: format(
            add(currentDateHour, { minutes: i * (x + 1) }),
            currentFormat
          ),
          y: faker.datatype.number({ min: 0, max: 20 }),
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
