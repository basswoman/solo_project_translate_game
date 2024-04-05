const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

const path = require('path');
const fs = require('fs');

const _output = path.resolve('./public/output.mp3');
console.log(_output);

const textToSpeechController = {};
textToSpeechController.translate = async (req, res, next) => {
  try {
    // console.log('Speech synthesis initializing.');
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: 'onyx',
      input: res.locals.text,
    });

    if (fs.existsSync(_output)) {
      fs.unlinkSync(_output);
    }

    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(_output, buffer);
    console.log('Speech synthesis complete.');
    return next();
  } catch (error) {
    console.log('Speech synthesis failed.');
    console.error(error);
  }
};
module.exports = textToSpeechController;
