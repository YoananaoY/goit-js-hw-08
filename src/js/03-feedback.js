

import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const storageKey = 'feedback-form-state';

// Funkcja zapisująca stan formularza do local storage

const saveFormState = () => {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(storageKey, JSON.stringify(formState));
};

// Funkcja wczytująca stan formularza z local storage

const loadFormState = () => {
  const storedFormState = localStorage.getItem(storageKey);
  if (storedFormState) {
    const formState = JSON.parse(storedFormState);
    emailInput.value = formState.email;
    messageInput.value = formState.message;
  }
};

// Funkcja czyszcząca storage i pola formularza

const clearForm = () => {
  localStorage.removeItem(storageKey);
  emailInput.value = '';
  messageInput.value = '';
};

// Funkcja obsługująca wysłanie formularza

const handleSubmit = (event) => {
  event.preventDefault();
  console.log('Form submitted');
  console.log('Email:', emailInput.value);
  console.log('Message:', messageInput.value);
  clearForm();
};

// Nasłuchiwanie zdarzeń input na polach formularza z ograniczeniem częstotliwości

emailInput.addEventListener('input', throttle(saveFormState, 500));
messageInput.addEventListener('input', throttle(saveFormState, 500));

// Wypełnienie formularza danymi z local storage podczas ładowania strony

window.addEventListener('DOMContentLoaded', loadFormState);

// Obsługa zdarzenia submit formularza

form.addEventListener('submit', handleSubmit);