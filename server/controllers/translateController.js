const axios = require('axios');

const translateController = {};

translateController.translate = async (req, res, next) => {
  const languages = {
    af: 'Afrikaans',
    ar: 'Arabic',
    hy: 'Armenian',
    az: 'Azerbaijani',
    be: 'Belarusian',
    bs: 'Bosnian',
    bg: 'Bulgarian',
    ca: 'Catalan',
    'zh-TW': 'Chinese',
    hr: 'Croatian',
    cs: 'Czech',
    da: 'Danish',
    nl: 'Dutch',
    et: 'Estonian',
    fi: 'Finnish',
    fr: 'French',
    gl: 'Galician',
    de: 'German',
    el: 'Greek',
    iw: 'Hebrew',
    hi: 'Hindi',
    hu: 'Hungarian',
    is: 'Icelandic',
    id: 'Indonesian',
    it: 'Italian',
    ja: 'Japanese',
    kn: 'Kannada',
    kk: 'Kazakh',
    ko: 'Korean',
    lv: 'Latvian',
    lt: 'Lithuanian',
    mk: 'Macedonian',
    ms: 'Malay',
    mi: 'Maori',
    mr: 'Marathi',
    ne: 'Nepali',
    no: 'Norwegian',
    fa: 'Persian',
    pl: 'Polish',
    pt: 'Portuguese',
    ro: 'Romanian',
    ru: 'Russian',
    sr: 'Serbian',
    sk: 'Slovak',
    sl: 'Slovenian',
    es: 'Spanish',
    sw: 'Swahili',
    sv: 'Swedish',
    tg: 'Tajik',
    ta: 'Tamil',
    th: 'Thai',
    tr: 'Turkish',
    uk: 'Ukrainian',
    ur: 'Urdu',
    vi: 'Vietnamese',
    cy: 'Welsh',
  };

  // choosing random language from the list
  const keys = Object.keys(languages);
  const randomLang = Math.floor(Math.random() * (keys.length + 1));

  const { text } = req.body;

  let targetLanguage = keys[randomLang];

  const encodedParams = new URLSearchParams();
  encodedParams.set('source_language', 'en');
  encodedParams.set('target_language', targetLanguage);
  encodedParams.set('text', text);

  const options = {
    method: 'POST',
    url: 'https://text-translator2.p.rapidapi.com/translate',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': process.env.API_2_KEY,
      'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
    },
    data: encodedParams,
  };
  try {
    const response = await axios.request(options);
    console.log(languages[targetLanguage]);
    console.log(response.data.data.translatedText);
    res.locals.text = response.data.data.translatedText;
    res.locals.lang = languages[targetLanguage];
    return next();
  } catch (error) {
    console.error(error);
  }
};

module.exports = translateController;
