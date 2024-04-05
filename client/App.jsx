import React, { Component } from 'react';
import { useState, useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import mapData from './mapData.js';
import '../public/style.css';

require('highcharts/modules/map')(Highcharts);
function App() {
  // mapData.features.forEach(e =>
  //   console.log(e.properties['hc-key'] + ': ' + e.properties.name)
  // );

  const [text, setText] = useState('');
  const [showAudio, setShowAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [translatedLang, setTranslatedLang] = useState(null);
  const [response, setResponse] = useState('');
  const [clickedCountry, setClickedCountry] = useState('');

  const data = [
    {
      'hc-key': 'dk',
      lang: 'Danish',
      // color: 'black',
    },
    {
      'hc-key': 'ph',
      lang: 'Filipino',
    },
    {
      'hc-key': 'mv',
      lang: 'Dhivehi',
    },
    {
      'hc-key': 'as',
      lang: 'Samoan',
    },
    {
      'hc-key': 'gl',
      lang: 'Greenlandic',
    },
    {
      'hc-key': 'gu',
      lang: 'Chamorro',
    },
    {
      'hc-key': 'ws',
      lang: 'Samoan',
    },
    {
      'hc-key': 'to',
      lang: 'Tongan',
    },
    {
      'hc-key': 'pw',
      lang: 'Palauan',
    },
    {
      'hc-key': 'tv',
      lang: 'Tuvaluan',
    },
    {
      'hc-key': 'mh',
      lang: 'Marshallese',
    },
    {
      'hc-key': 'ki',
      lang: 'English',
    },
    {
      'hc-key': 'dm',
      lang: 'English',
    },
    {
      'hc-key': 'um',
      lang: 'English',
    },
    {
      'hc-key': 'jm',
      lang: 'English',
    },
    {
      'hc-key': 'vc',
      lang: 'English',
    },
    {
      'hc-key': 'vi',
      lang: 'English',
    },
    {
      'hc-key': 'sb',
      lang: 'English',
    },
    {
      'hc-key': 'lc',
      lang: 'English',
    },
    {
      'hc-key': 'kn',
      lang: 'English',
    },
    {
      'hc-key': 'mu',
      lang: 'English',
    },
    {
      'hc-key': 'tt',
      lang: 'English',
    },
    {
      'hc-key': 'bs',
      lang: 'English',
    },
    {
      'hc-key': 'mp',
      lang: 'English',
    },
    {
      'hc-key': 'gd',
      lang: 'English',
    },
    {
      'hc-key': 'ag',
      lang: 'English',
    },
    {
      'hc-key': 'pg',
      lang: 'Tok Pisin',
    },
    {
      'hc-key': 'fj',
      lang: 'Fijian',
    },
    {
      'hc-key': 'tj',
      lang: 'Tajik',
    },
    {
      'hc-key': 'ls',
      lang: 'Phuthi',
    },
    {
      'hc-key': 'mw',
      lang: 'Chichewa',
    },
    {
      'hc-key': 'et',
      lang: 'Tigrinya',
    },
    {
      'hc-key': 'er',
      lang: 'Tigrinya',
    },
    {
      'hc-key': 'sz',
      lang: 'Swazi',
    },
    {
      'hc-key': 'lu',
      lang: 'Luxembourgish',
    },
    {
      'hc-key': 'ml',
      lang: 'Bambara',
    },
    {
      'hc-key': 'bf',
      lang: 'Dyula',
    },
    {
      'hc-key': 'cf',
      lang: 'Sango',
    },
    {
      'hc-key': 'mg',
      lang: 'Malagasy',
    },
    {
      'hc-key': 'kg',
      lang: 'Kyrgyz',
    },
    {
      'hc-key': 'sc',
      lang: 'French',
    },
    {
      'hc-key': 'vu',
      lang: 'French',
    },
    {
      'hc-key': 'ht',
      lang: 'French',
    },
    {
      'hc-key': 'ga',
      lang: 'French',
    },
    {
      'hc-key': 'cm',
      lang: 'French',
    },
    {
      'hc-key': 'ca',
      lang: 'French',
    },
    {
      'hc-key': 'sh',
      lang: 'Chinese',
    },
    {
      'hc-key': 'tw',
      lang: 'Chinese',
    },
    {
      'hc-key': 'cn',
      lang: 'Chinese',
    },
    {
      'hc-key': 'lk',
      lang: 'Tamil',
    },
    {
      'hc-key': 'cd',
      lang: 'Swahili',
    },
    {
      'hc-key': 'bi',
      lang: 'Swahili',
    },
    {
      'hc-key': 'rw',
      lang: 'Swahili',
    },
    {
      'hc-key': 'ug',
      lang: 'Swahili',
    },
    {
      'hc-key': 'km',
      lang: 'Swahili',
    },
    {
      'hc-key': 'tz',
      lang: 'Swahili',
    },
    {
      'hc-key': 'sg',
      lang: 'Malay',
    },
    {
      'hc-key': 'nz',
      lang: 'Maori',
    },
    {
      'hc-key': 'tl',
      lang: 'Malay',
    },
    {
      'hc-key': 'za',
      lang: 'Afrikaans',
    },
    {
      'hc-key': 'jk',
      lang: 'Hindi',
    },
    {
      'hc-key': 'in',
      lang: 'Hindi',
    },
    {
      'hc-key': 'zw',
      lang: 'Afrikaans',
    },
    {
      'hc-key': 'zm',
      lang: 'Afrikaans',
    },
    {
      'hc-key': 'be',
      lang: 'Dutch',
    },
    {
      'hc-key': 'nl',
      lang: 'Dutch',
    },
    {
      'hc-key': 'tr',
      lang: 'Turkish',
    },
    {
      'hc-key': 'bd',
      lang: 'Bengali',
    },
    {
      'hc-key': 'nr',
      lang: 'Nauruan',
    },
    {
      'hc-key': 'no',
      lang: 'Norwegian',
    },
    {
      'hc-key': 'fi',
      lang: 'Finnish',
    },
    {
      'hc-key': 'id',
      lang: 'Indonesian',
    },
    {
      'hc-key': 'se',
      lang: 'Swedish',
    },
    {
      'hc-key': 'my',
      lang: 'Malay',
    },
    {
      'hc-key': 'th',
      lang: 'Thai',
    },
    {
      'hc-key': 'ee',
      lang: 'Estonian',
    },
    {
      'hc-key': 'mt',
      lang: 'Maltese',
    },
    {
      'hc-key': 'cnm',
      lang: 'Greek',
    },
    {
      'hc-key': 'cy',
      lang: 'Greek',
    },
    {
      'hc-key': 'gr',
      lang: 'Greek',
    },
    {
      'hc-key': 'it',
      lang: 'Italian',
    },
    {
      'hc-key': 'va',
      lang: 'Italian',
    },
    {
      'hc-key': 'sm',
      lang: 'Italian',
    },
    {
      'hc-key': 'kz',
      lang: 'Kazakh',
    },
    {
      'hc-key': 'az',
      lang: 'Azerbaijani',
    },
    {
      'hc-key': 'am',
      lang: 'Armenian',
    },
    {
      'hc-key': 'uz',
      lang: 'Uzbek',
    },
    {
      'hc-key': 'kh',
      lang: 'Khmer',
    },
    {
      'hc-key': 'pk',
      lang: 'Urdu',
    },
    {
      'hc-key': 'ke',
      lang: 'Swahili',
    },
    {
      'hc-key': 'sp',
      lang: 'Vietnamese',
    },
    {
      'hc-key': 'vn',
      lang: 'Vietnamese',
    },
    {
      'hc-key': 'af',
      lang: 'Persian',
    },
    {
      'hc-key': 'ir',
      lang: 'Persian',
    },
    {
      'hc-key': 'hr',
      lang: 'Croatian',
    },
    {
      'hc-key': 'kp',
      lang: 'Korean',
    },
    {
      'hc-key': 'kr',
      lang: 'Korean',
    },
    {
      'hc-key': 'mm',
      lang: 'Burmese',
    },
    {
      'hc-key': 'sx',
      lang: 'Somali',
    },
    {
      'hc-key': 'tm',
      lang: 'Turkmen',
    },
    {
      'hc-key': 'nc',
      lang: 'Turkish',
    },
    {
      'hc-key': 'lt',
      lang: 'Lithuanian',
    },
    {
      'hc-key': 'si',
      lang: 'Slovenian',
    },
    {
      'hc-key': 'al',
      lang: 'Albanian',
    },
    {
      'hc-key': 'mn',
      lang: 'Mongolian',
    },
    {
      'hc-key': 'ba',
      lang: 'Serbian',
    },
    {
      'hc-key': 'kv',
      lang: 'Serbian',
    },
    {
      'hc-key': 'rs',
      lang: 'Serbian',
    },
    {
      'hc-key': 'me',
      lang: 'Montenegrin',
    },
    {
      'hc-key': 'la',
      lang: 'Lao',
    },
    {
      'hc-key': 'ua',
      lang: 'Ukrainian',
    },
    {
      'hc-key': 'sk',
      lang: 'Slovak',
    },
    {
      'hc-key': 'bg',
      lang: 'Bulgarian',
    },
    {
      'hc-key': 'li',
      lang: 'German',
    },
    {
      'hc-key': 'ch',
      lang: 'German',
    },
    {
      'hc-key': 'de',
      lang: 'German',
    },
    {
      'hc-key': 'at',
      lang: 'German',
    },
    {
      'hc-key': 'hu',
      lang: 'Hungarian',
    },
    {
      'hc-key': 'ro',
      lang: 'Romanian',
    },
    {
      'hc-key': 'ad',
      lang: 'Catalan',
    },
    {
      'hc-key': 'bn',
      lang: 'Malay',
    },
    {
      'hc-key': 'ge',
      lang: 'Georgian',
    },
    {
      'hc-key': 'sr',
      lang: 'Dutch',
    },
    {
      'hc-key': 'il',
      lang: 'Hebrew',
    },
    {
      'hc-key': 'pl',
      lang: 'Polish',
    },
    {
      'hc-key': 'mk',
      lang: 'Macedonian',
    },
    {
      'hc-key': 'by',
      lang: 'Belarusian',
    },
    {
      'hc-key': 'lv',
      lang: 'Latvian',
    },
    {
      'hc-key': 'cz',
      lang: 'Czech',
    },
    {
      'hc-key': 'bt',
      lang: 'Dzongkha',
    },
    {
      'hc-key': 'md',
      lang: 'Romanian',
    },
    {
      'hc-key': 'sw',
      lang: 'Spanish',
    },
    {
      'hc-key': 'bu',
      lang: 'Spanish',
    },
    {
      'hc-key': 'gq',
      lang: 'Spanish',
    },
    {
      'hc-key': 'bo',
      lang: 'Spanish',
    },
    {
      'hc-key': 'py',
      lang: 'Spanish',
    },
    {
      'hc-key': 'cu',
      lang: 'Spanish',
    },
    {
      'hc-key': 've',
      lang: 'Spanish',
    },
    {
      'hc-key': 'is',
      lang: 'Icelandic',
    },
    {
      'hc-key': 'ma',
      lang: 'Arabic',
    },
    {
      'hc-key': 'dz',
      lang: 'Arabic',
    },
    {
      'hc-key': 'so',
      lang: 'Arabic',
    },
    {
      'hc-key': 'iq',
      lang: 'Arabic',
    },
    {
      'hc-key': 'td',
      lang: 'Arabic',
    },
    {
      'hc-key': 'dj',
      lang: 'Arabic',
    },
    {
      'hc-key': 'ly',
      lang: 'Arabic',
    },
    {
      'hc-key': 'eh',
      lang: 'Arabic',
    },
    {
      'hc-key': 'om',
      lang: 'Arabic',
    },
    {
      'hc-key': 'kw',
      lang: 'Arabic',
    },
    {
      'hc-key': 'jo',
      lang: 'Arabic',
    },
    {
      'hc-key': 'sy',
      lang: 'Arabic',
    },
    {
      'hc-key': 'sa',
      lang: 'Arabic',
    },
    {
      'hc-key': 'ye',
      lang: 'Arabic',
    },
    {
      'hc-key': 'qa',
      lang: 'Arabic',
    },
    {
      'hc-key': 'tn',
      lang: 'Arabic',
    },
    {
      'hc-key': 'mr',
      lang: 'Arabic',
    },
    {
      'hc-key': 'lb',
      lang: 'Arabic',
    },
    {
      'hc-key': 'sd',
      lang: 'Arabic',
    },
    {
      'hc-key': 'eg',
      lang: 'Arabic',
    },
    {
      'hc-key': 'bh',
      lang: 'Arabic',
    },
    {
      'hc-key': 'ae',
      lang: 'Arabic',
    },
    {
      'hc-key': 'bb',
      lang: 'English',
    },
    {
      'hc-key': 'au',
      lang: 'English',
    },
    {
      'hc-key': 'gb',
      lang: 'English',
    },
    {
      'hc-key': 'na',
      lang: 'Namibia',
    },
    {
      'hc-key': 'bw',
      lang: 'Namibia',
    },
    {
      'hc-key': 'bz',
      lang: 'English',
    },
    {
      'hc-key': 'gm',
      lang: 'English',
    },
    {
      'hc-key': 'ng',
      lang: 'English',
    },
    {
      'hc-key': 'ss',
      lang: 'English',
    },
    {
      'hc-key': 'sl',
      lang: 'English',
    },
    {
      'hc-key': 'ie',
      lang: 'English',
    },
    {
      'hc-key': 'gy',
      lang: 'English',
    },
    {
      'hc-key': 'np',
      lang: 'Nepali',
    },
    {
      'hc-key': 'ru',
      lang: 'Russian',
    },
    {
      'hc-key': 'fo',
      lang: 'Faroese',
    },
    {
      'hc-key': 'lr',
      lang: 'English',
    },
    {
      'hc-key': 'us',
      lang: 'English',
    },
    {
      'hc-key': 'gh',
      lang: 'English',
    },
    {
      'hc-key': 'jp',
      lang: 'Japanese',
    },
    {
      'hc-key': 'gn',
      lang: 'French',
    },
    {
      'hc-key': 'ci',
      lang: 'French',
    },
    {
      'hc-key': 'sn',
      lang: 'French',
    },
    {
      'hc-key': 'tg',
      lang: 'French',
    },
    {
      'hc-key': 'bj',
      lang: 'French',
    },
    {
      'hc-key': 'cg',
      lang: 'French',
    },
    {
      'hc-key': 'mc',
      lang: 'French',
    },
    {
      'hc-key': 'fr',
      lang: 'French',
    },
    {
      'hc-key': 'ne',
      lang: 'French',
    },
    {
      'hc-key': 'fm',
      lang: 'English',
    },
    {
      'hc-key': 'st',
      lang: 'Portuguese',
    },
    {
      'hc-key': 'cv',
      lang: 'Portuguese',
    },
    {
      'hc-key': 'ao',
      lang: 'Portuguese',
    },
    {
      'hc-key': 'pt',
      lang: 'Portuguese',
    },
    {
      'hc-key': 'mz',
      lang: 'Portuguese',
    },
    {
      'hc-key': 'gw',
      lang: 'Portuguese',
    },
    {
      'hc-key': 'br',
      lang: 'Portuguese',
    },
    {
      'hc-key': 'cr',
      lang: 'Spanish',
    },
    {
      'hc-key': 'gt',
      lang: 'Spanish',
    },
    {
      'hc-key': 'ec',
      lang: 'Spanish',
    },
    {
      'hc-key': 'uy',
      lang: 'Spanish',
    },
    {
      'hc-key': 'ni',
      lang: 'Spanish',
    },
    {
      'hc-key': 'pr',
      lang: 'Spanish',
    },
    {
      'hc-key': 'hn',
      lang: 'Spanish',
    },
    {
      'hc-key': 'sv',
      lang: 'Spanish',
    },
    {
      'hc-key': 'ar',
      lang: 'Spanish',
    },
    {
      'hc-key': 'do',
      lang: 'Spanish',
    },
    {
      'hc-key': 'pe',
      lang: 'Spanish',
    },
    {
      'hc-key': 'co',
      lang: 'Spanish',
    },
    {
      'hc-key': 'cl',
      lang: 'Spanish',
    },
    {
      'hc-key': 'pa',
      lang: 'Spanish',
    },
    {
      'hc-key': 'es',
      lang: 'Spanish',
    },
    {
      'hc-key': 'mx',
      lang: 'Spanish',
    },
  ];
  // data.forEach(e => {
  //   e.color = 'black';
  //   if (e['hc-key'] == clickedCountry && translatedLang == e.lang) {
  //     e.color = '#e90c0c';
  //   } else if () {

  //   }

  //   else {
  //     e.color = '#64e90c';
  //   }
  // });

  const handleClick = e => {
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
    }
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
              if (translatedLang == point.lang) {
                const text =
                    '<b>You are right, </b><br>' +
                    point.name +
                    ' speaks ' +
                    translatedLang,
                  chart = this.series.chart;
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
                // setResponse(
                //   `You are right, ${point.name} speaks ${translatedLang}`
                // );
                this.update({ color: '#64e90c' });
              } else {
                // setResponse(
                //   `You are wrong, ${point.name} does not speak this language`
                // );
                const text =
                    '<b>You are wrong, </b><br> ' +
                    point.name +
                    ' does not speak this language',
                  chart = this.series.chart;
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
                this.update({ color: '#e90c0c' });
              }
            },
          },
        },
      },
    },

    tooltip: {
      formatter: function () {
        return `${this.point.name}: ${this.point.lang}`;
      },
    },
    series: [
      {
        mapData: mapData,
        name: '',
        data: data,
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
          rows={1}
          cols={50}
          value={text}
          onChange={e => setText(e.target.value)}
        ></textarea>
        <button onClick={handleClick}>Translate</button>
        {showAudio && (
          <audio controls>
            <source src={`${audioUrl}?${Date.now()}`} type="audio/mp3" />
          </audio>
        )}
        {/* <div>{response}</div> */}
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
