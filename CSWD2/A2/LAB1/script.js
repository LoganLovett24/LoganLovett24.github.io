const synth = speechSynthesis;
let voices = synth.getVoices();
let utterance = new SpeechSynthesisUtterance();
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

synth.text = document.querySelector('[name="text"]').value;

const populateVoices = () => {
    voicesDropdown.innerHTML = voices
    .filter((voice) => voice.lang.includes("en"))
    .map (
        (voice) =>
            `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
    )
    .join('');
};

const setVoice = (e) => {
    utterance.voice = voices.find((voice) => voice.name === e.target.value);
    toggle();
};

const toggle = (startOver = true) => {
    synth.text = document.querySelector('[name="text"]').value;
    utterance.text = synth.text;
    synth.cancel();
    if (startOver){
        synth.speak(utterance);
    }
};

const setOption = (e) => {
    const optionName = e.target.name;
    const optionValue = e.target.value;
    setOptionSpan(optionName, optionValue);
    utterance[optionName] = optionValue;
};

const setOptionSpan = (spanName, spanValue) => {
    document.querySelector(`#${spanName}Value`).textContent = `${spanName}: ${spanValue} times normal ${spanName}`;
};

window.addEventListener('load',populateVoices);
voicesDropdown.addEventListener('change',setVoice);
options.forEach((option) => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));