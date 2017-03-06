export const generate_uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const generateState = () => {
  const state = generate_uuid();
  localStorage.state = state;
  return state;
};

export const getState = () => {
  return localStorage.state;
};

export const getURLParams = query => {
  if (!query) {
    return { };
  }

  return (/^[?#]/.test(query) ? query.slice(1) : query)
    .split('&')
    .reduce((params, param) => {
      let [key, value] = param.split('=');
      params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
      return params;
    }, { });
};

const imagesStock = [
  './photos/pexels-photo-286280.jpeg',
  'https://static.pexels.com/photos/286280/pexels-photo-286280.jpeg',
  'https://static.pexels.com/photos/24962/pexels-photo.jpg',
  'http://www.mrwallpaper.com/wallpapers/space-stars-road.jpg',
  'https://www.bhmpics.com/wallpapers/rain_water_inspiring-3840x2160.jpg',
];
export const ImageProvider = {
  picOfDay: () => imagesStock[0],
};
