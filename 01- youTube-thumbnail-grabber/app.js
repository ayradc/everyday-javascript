const ytUrl = document.getElementById('inputUrl');
const buttun = document.getElementById('buttun');
const thumbDetails = document.getElementById('thumbnail-details');
const thumnImg = document.getElementById('thumbnailimg');
const downImg = document.getElementById('downloadImg');

function getThumbnail() {
  // grab the url id
  let id = youtubeParse(ytUrl.value);
  let fullSizeThumbnail = `http://i3.ytimg.com/vi/${id}/maxresdefault.jpg`;
  thumbDetails.classList.remove('hidden');
  thumnImg.src = fullSizeThumbnail;
  return fullSizeThumbnail;
}

function forceDownload(url, fileName) {
  let xhr = new XMLHttpRequest();
  let proxy = 'https://cors-anywhere.herokuapp.com/';
  xhr.open('GET', proxy + url, true);
  xhr.responseType = 'blob';
  xhr.onload = function() {
    let urlCreator = window.URL || window.webkitURL;
    let imageUrl = urlCreator.createObjectURL(this.response);
    let tag = document.createElement('a');
    tag.href = imageUrl;
    tag.download = fileName;
    document.body.appendChild(tag);
    tag.click();
    document.body.removeChild(tag);
  };
  xhr.send();
}

function youtubeParse(url) {
  let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  let match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

buttun.addEventListener('click', getThumbnail);

downloadImg.addEventListener('click', () => {
  forceDownload(getThumbnail(), 'download.jpg');
  ytUrl.value = '';
});
