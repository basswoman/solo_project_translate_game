import React, { Component } from 'react';
import { useState, useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import mapData from './mapData.js';
import languageData from './languageData.js';
import '../public/style.css';

require('highcharts/modules/map')(Highcharts);

function App() {
  // mapData.features.forEach(e =>
  //   console.log(e.properties['hc-key'] + ': ' + e.properties.name)
  // );

  const [text, setText] = useState('');
  const [showAudio, setShowAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [translatedLang, setTranslatedLang] = useState(null); // null
  const [showTranslatedLang, setShowTranslatedLang] = useState(false);

  const regionsData = {};
  mapData.features.forEach(e => {
    if (!regionsData[e.properties.subregion]) {
      regionsData[e.properties.subregion] = 1;
    } else {
      regionsData[e.properties.subregion]++;
    }
  });
  // console.log(regionsData);

  const handleClick = e => {
    setShowTranslatedLang(false);
    setShowAudio(false);
    e.preventDefault();

    fetch('http://localhost:3000/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text }),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data.language);
        setTranslatedLang(data.language);
        if (data.status === 'OK' && data.audioUrl) {
          setAudioUrl(data.audioUrl);
          setShowAudio(true);
        }
      })
      .catch(error => {
        console.log(error, 'error');
      });

    const chart = Highcharts.charts[0]; // Assuming there's only one chart in the application

    if (chart && chart.clickLabel) {
      chart.clickLabel.destroy(); // Destroy the label if it exists
      chart.clickLabel = null; // Reset the clickLabel property
      chart.series[0].points.forEach(point => {
        point.update({ color: null }, false); // Reset color to default
      });
    }
  };

  const showAnswer = e => {
    setShowTranslatedLang(true);
  };

  const mapOptions = {
    title: {
      text: '',
    },
    chart: {
      height: 530,
    },
    mapNavigation: {
      enabled: true,
    },

    plotOptions: {
      series: {
        point: {
          events: {
            click() {
              let point = this;
              let text, color;
              let langTrimmed = point.lang.map(s => s.trim());
              if (langTrimmed.includes(translatedLang)) {
                text =
                  '<b>You are right, </b><br>' +
                  point.name +
                  ' speaks ' +
                  translatedLang;
                color = '#64e90c';
              } else {
                text =
                  '<b>You are wrong, </b><br> ' +
                  point.name +
                  ' does not speak this language';
                color = '#e90c0c';
              }
              const chart = this.series.chart;
              if (!chart.clickLabel) {
                chart.clickLabel = chart.renderer
                  .label(text, 0, 250)
                  .css({
                    width: '180px',
                  })
                  .attr({
                    zIndex: 10,
                  })
                  .add();
              } else {
                chart.clickLabel.attr({
                  text: text,
                });
              }
              this.update({ color: color });
            },
          },
        },
      },
    },

    tooltip: {
      formatter: function () {
        const lang = '';
        return `${this.point.name}: ${this.point.lang}`;
      },
    },
    series: [
      {
        mapData: mapData,
        name: '',
        data: languageData,
      },
    ],
  };

  return (
    <div>
      <div className="input">
        <label htmlFor="">
          Type text in English and click translate. Play an audio, guess the
          language and choose a country in which this language is spoken
        </label>{' '}
        <textarea
          // maxlength={80}
          rows={1}
          cols={80}
          value={text}
          onChange={e => setText(e.target.value)}
        ></textarea>
        <button onClick={handleClick}>Translate</button>
        {showAudio && (
          <audio controls>
            <source src={`${audioUrl}?${Date.now()}`} type="audio/mp3" />
          </audio>
        )}
        <div className="answer">
          <button onClick={showAnswer}>No idea</button>
          {translatedLang && showTranslatedLang && <div>{translatedLang}</div>}
        </div>
      </div>

      <HighchartsReact
        class="map"
        options={mapOptions}
        constructorType={'mapChart'}
        highcharts={Highcharts}
      />
    </div>
  );
}

export default App;
