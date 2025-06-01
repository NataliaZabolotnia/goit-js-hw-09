let formData = {
  email: '',
  message: '',
};
const form = document.querySelector('.feedback-form');

const savedData = localStorage.getItem('feedback-form-state');
if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    formData.email = parsedData.email?.trim() || '';
    formData.message = parsedData.message?.trim() || '';
    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  } catch (e) {
    console.error('Помилка при парсингу з localStorage:', e);
  }
}

form.addEventListener('input', event => {
  const { name, value } = event.target;
  if (!['email', 'message'].includes(name)) return;

  formData[name] = value.trim();
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const { email, message } = formData;
  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);
  localStorage.removeItem('feedback-form-state');
  formData.email = '';
  formData.message = '';
  form.reset();
});
