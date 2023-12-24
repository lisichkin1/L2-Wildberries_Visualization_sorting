export const resetArr = () => {
  const newArr = [];
  for (let i = 0; i < 100; i++) {
    newArr.push(randomNumber(5, 1000));
  }
  return newArr;
};

export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const clearDivs = () => {
  const body = document.querySelector('.sort');
  body.innerHTML = ''; // Очищаем содержимое родительского элемента
};
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const renderDivs = (current, next, array) => {
  clearDivs();

  const body = document.querySelector('.sort');
  for (let i = 0; i < array.length; i++) {
    const arrDiv = document.createElement('div');
    arrDiv.className = 'array-item';
    if (i === current || i === next) {
      arrDiv.classList.add(i === current ? 'greenItem' : 'redItem');
    }
    arrDiv.innerText = array[i];
    arrDiv.style.height = `${array[i] / 10}%`;
    body.appendChild(arrDiv);
  }
};
