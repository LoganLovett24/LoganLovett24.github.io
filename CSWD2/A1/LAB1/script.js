const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const takePhotoButton = document.querySelector('#takePhoto');

const getVideo = () => {
    navigator.mediaDevices
    .getUserMedia({video: true, audio: false})
    .then((localMediaStream) => {
        video.srcObject = localMediaStream;
        video.play();
    })
    .catch((err) => {
        console.log("[ERROR]",err)
    });
};

const paintToCanvas = () => {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    return setInterval(() => {
        ctx.drawImage(video,0,0,width,height);
        //Take pixels out
        let pixels = ctx.getImageData(0,0,width,height);
        //Mess with pixels
        //Red effect
        //pixels = redEffect(pixels);
        //Rgb split
        //pixels = rgbSplit(pixels);
        //Green screen
        pixels = greenScreen(pixels);
        //Put the altered pixels back
        ctx.putImageData(pixels,0,0);
    },16)
};

const takePhoto = () => {
    //Sound effect
    snap.currentTime = 0;
    snap.play();
    //Grab data for the video screenshot
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download','handsome');
    link.innerHTML = `<img src="${data}" alt="handsome">`
    strip.insertBefore(link,strip.firstChild);
};

const redEffect = (pixels) => {
    for (let i = 0; i < pixels.data.length; i+=4){
        pixels.data[i] = pixels.data[i]+100; //Red
        pixels.data[i+1] = pixels.data[i+1]-50; //Green
        pixels.data[i+2] = pixels.data[i+2]*0.05; //Blue
    }
    return pixels;
};

const rgbSplit = (pixels) => {
    for (let i = 0; i < pixels.data.length; i+=4){
        pixels.data[i-150] = pixels.data[i]; //Red
        pixels.data[i+500] = pixels.data[i+1]; //Green
        pixels.data[i+550] = pixels.data[i+2]; //Blue
    }
    return pixels;
};

const greenScreen = (pixels) => {
    const levels = {}
    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    })
    for (let i = 0; i < pixels.data.length; i+=4){
        red = pixels.data[i];
        blue = pixels.data[i+1];
        green = pixels.data[i+2];
        alpha = pixels.data[i+3];

        if(
            red >= levels.rmin && 
            green >= levels.gmin && 
            blue >= levels.bmin &&
            red >= levels.rmax && 
            green >= levels.gmax && 
            blue >= levels.bmax
        ) {
            pixels.data[i+3] = 0;
        }
    }
    return pixels;
};

getVideo();
video.addEventListener('canplay',paintToCanvas);
takePhotoButton.addEventListener('click',takePhoto);