(function() {
  let width = 500,
      height = 0,
      filter = 'none',
      streaming = false;

  // DOM elements
  const video = document.getElementById('video');
  const canvas = document.getElementById('canvas');
  const photos = document.getElementById('photos');
  const photoButton = document.getElementById('photo-button');
  const clearButton = document.getElementById('clear-button');
  const photoFilter = document.getElementById('photo-filter');

  // Get media stream
  navigator.mediaDevices
    .getUserMedia({video: true, audio: false})
    .then(function(stream) {
      // Link to the video src
      video.srcObject = stream;
      video.play();
    })
    .catch(function(error) {
      console.log(`Error: ${error}`);
    });

  // Play when ready
  video.addEventListener('canplay', function(e) {
    if(!streaming) {
      // Set video / canvas height
      height = video.videoHeight / (video.videoWidth / width);

      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);

      streaming = true;
    }
  }, false);

  photoButton.addEventListener('click', function(e) {
    e.preventDefault();
    takePicture();
  }, false);

  // Filter event
  photoFilter.addEventListener('change', function(e) {
    e.preventDefault();
    filter = e.target.value;
    video.style.filter = filter;
  });

  // Clear event
  clearButton.addEventListener('click', function(e) {
    // Clear photos
    photos.innerHTML = '';
    filter = 'none';
    video.style.filter = filter;
    photoFilter.selectedIndex = 0;
  })
  // Take picture from canvas and append to photo list
  function takePicture() {
    // Create canvas
    const context = canvas.getContext('2d');
    if(width && height) {
      canvas.width = width;
      canvas.height = height;
      // Draw image of the video on the canvas
    }
    context.drawImage(video, 0, 0, width, height);

    // Create image from the canvas
    const imgUrl = canvas.toDataURL('image/png');

    // Create img element
    const img = document.createElement('img');
    img.style.filter = filter;
    // Set img src
    img.setAttribute('src', imgUrl);

    // Add iamge to photos
    photos.appendChild(img);
  }
}());