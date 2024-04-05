const express = require('express');
const url = require('url');
const app = express();
const path = require('path');
require('dotenv').config();
const fs = require('fs');
var bodyParser = require('body-parser');

const Highcharts = require('highcharts/highmaps.js'),
  map = require('@highcharts/map-collection/custom/world.topo.json');
// Highcharts.mapChart('container', {
//   chart: {
//     map,
//   },
//   // ...
// });

const translateController = require('../server/controllers/translateController.js');
const textToSpeechController = require('../server/controllers/textToSpeechController.js');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.post(
  '/translate',
  translateController.translate,
  textToSpeechController.translate,
  (req, res, next) => {
    res.status(200).json({
      message: 'Translation and text-to-speech completed successfully',
      status: 'OK',
      audioUrl: 'http://localhost:3000/output.mp3',
      language: res.locals.lang,
    });
  }
);

app.listen(3000, () => {
  console.log('Server is running');
});
