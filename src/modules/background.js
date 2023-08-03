const unsplashAccessKey = 'XgK8K70K3KIJdzJUlEQRm-GgqODayfcdNLPnOtjo81o';

function setBackgroundFromUnsplash(city) {
  const query = encodeURIComponent(`${city} city`); // Append "city" to the query
  const unsplashUrl = `https://api.unsplash.com/photos/random?query=${query}&client_id=${unsplashAccessKey}`;

  fetch(unsplashUrl)
    .then((response) => response.json())
    .then((data) => {
      const imageUrl = data.urls.regular;
      document.body.style.backgroundImage = `url(${imageUrl})`;
    })
    .catch((error) => {
      console.error('Error fetching background image:', error);
    });
}
export default setBackgroundFromUnsplash;
