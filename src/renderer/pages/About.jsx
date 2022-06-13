import React from 'react';
import '../App.css';
import Header from '../components/Header';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './about.css';
import imgSantanu from '../../../assets/img-1.png';
import lapan from '../../../assets/logo-lapan.png';
import inti from '../../../assets/logo-pt-inti.png';
import bmkg from '../../../assets/logo-bmkg.png';
import brin from '../../../assets/logo-brin.png';

export default function About() {
  return (
    <>
      <Header />
      <body>
        <div className="container">
          <div className="row">
            <div className="col-6 left pl-3 pr-3 pt-3 pb-3">
              <p className="title">SANTANU - Sistem Pemantauan Hujan</p>
              <p className="desc">
                SANTANU adalah sistem monitoring untuk pemantauan hujan skala
                lokal sebagai teknologi alternatif untuk mengisi daerah-daerah
                yang tidak terpantau oleh radar cuaca yang sudah ada. SANTANU
                merupakan produk litbang Pusat Sains dan Teknologi Atmosfer
                LAPAN bekerjasama dengan PT. INTI untuk produksi dan
                komersialisasi, difasilitasi oleh Ristekdikti serta didukung
                oleh BMKG sebagai pembuat standar dan pengguna.
              </p>
            </div>
            <div className="col-6 right pl-3 pr-3 pt-3 pb-3">
              <img alt="santanu" src={imgSantanu} className="img-right" />
            </div>
          </div>
          <div className="row bg-img">
            <div className="col-3 text-center">
              <img alt="santanu" src={lapan} className="img-lapan" />
            </div>
            <div className="col-3 text-center">
              <img alt="santanu" src={inti} className="img-inti" />
            </div>
            <div className="col-3 text-center">
              <img alt="santanu" src={bmkg} className="img-bmkg" />
            </div>
            <div className="col-3 text-center brin">
              <img alt="santanu" src={brin} className="img-brin" />
            </div>
          </div>
        </div>
      </body>
    </>
  );
}
