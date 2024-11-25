document.querySelector('.form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const delay = Number(formData.get('delay'));
    const state = formData.get('state');
  
    createPromise(delay, state)
      .then((message) => {
        iziToast.success({
          title: 'Success',
          message: `✅ Fulfilled promise in ${delay}ms`,
        });
        console.log(`✅ Fulfilled promise in ${delay}ms`);
      })
      .catch((message) => {
        iziToast.error({
          title: 'Error',
          message: `❌ Rejected promise in ${delay}ms`,
        });
        console.log(`❌ Rejected promise in ${delay}ms`);
      });
  
    // Обнуляємо значення інпутів після натискання кнопки
    event.target.reset();
  });
  
  function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(`Fulfilled promise in ${delay}ms`);
        } else {
          reject(`Rejected promise in ${delay}ms`);
        }
      }, delay);
    });
  }
  