const headerTrigger = document.getElementById('headerTrigger');
const header = document.getElementById('header');

headerTrigger.addEventListener('click', () => {
  if (header.classList.contains('mob-open')) {
    header.classList.remove('mob-open');
  } else {
    header.classList.add('mob-open');
  }
})