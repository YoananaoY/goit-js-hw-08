import throttle from 'lodash.throttle';
import Player from '@vimeo/player';


const player = new Player('vimeo-player');

const localStorageKey = 'videoplayer-current-time';

// Funkcja zapisująca aktualny czas odtwarzania do local storage

const saveCurrentTime = () => {
  player.getCurrentTime().then((currentTime) => {
    localStorage.setItem(localStorageKey, currentTime.toString());
  });
};

// Funkcja odczytująca zapisany czas odtwarzania z local storage

const getSavedTime = () => {
  const savedTime = localStorage.getItem(localStorageKey);
  return savedTime ? parseFloat(savedTime) : 0;
};

// Ustawienie czasu odtwarzania na zapisany czas

player.setCurrentTime(getSavedTime());


// Nasłuchiwanie zdarzenia timeupdate z ograniczeniem częstotliwości

player.on('timeupdate', throttle(saveCurrentTime, 1000));