import { delay, renderDivs, resetArr } from './utils.js';
import '../assets/styles/style.css';
let array = [];
const bubbleButton = document.querySelector('.bubble');
const insertionButton = document.querySelector('.insertion');
const quickButton = document.querySelector('.quick');
const selectionButton = document.querySelector('.selection');
const mergeButton = document.querySelector('.merge');
const randomButton = document.querySelector('.random');
const buttonPlay = document.querySelector('.play');
const buttonstop = document.querySelector('.stop');
const userInput = document.querySelector('.input');
const userAddButton = document.querySelector('.user_add');
let isSorting = false;
let isRunning = false;
let currentItem = 0;
let nextItem = 0;
let sortVariant = '';
const Compare = {
  LESS_THAN: -1,
  EQUAL: 0,
  BIGGER_THAN: 1,
};

const userInputArray = () => {
  array = userInput.value.split(' ').map(Number);
  renderDivs(null, null, array);
};
//10 50 100 900 700 400 200 400 300
const stopLoop = () => {
  isRunning = false;
};

const resumeLoop = () => {
  if (!isRunning) {
    isRunning = true;
    if (sortVariant == 'bubble') {
      bubbleSort();
    }
    if (sortVariant == 'insertion') {
      insertionSort();
    }
    if (sortVariant == 'quick') {
      quickSort(array);
    }
    if (sortVariant == 'selection') {
      selectionSort();
    }
    if (sortVariant == 'merge') {
      mergeSort(array);
    }
  }
};
//Bubble sort
const bubbleSort = async () => {
  sortVariant = 'bubble';
  const n = array.length;
  const arrDivs = document.querySelectorAll('.array-item');
  isSorting = true;
  for (let i = currentItem; i < n - 1; i++) {
    currentItem += 1;
    for (let j = nextItem; j < n - i - 1; j++) {
      if (!isRunning) {
        currentItem -= 1;
        nextItem = j;
        isSorting = false;
        return;
      }
      nextItem += 1;
      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;

        renderDivs(j, j + 1, array);
        await delay(100);
      }
      arrDivs[j].classList.remove('greenItem');
      arrDivs[j + 1].classList.remove('redItem');
    }
    nextItem = 0;
  }
  currentItem = 0;
  isSorting = false;
  console.log(array);
};

//Insertion sort
const defaultCompare = (a, b) => {
  if (a === b) {
    return Compare.EQUAL;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
};
const insertionSort = async (compare = defaultCompare) => {
  sortVariant = 'insertion';
  const { length } = array;
  isSorting = true;
  let temp;
  for (let i = 1; i < length; i++) {
    let j = i;
    temp = array[i];
    while (j > 0 && compare(array[j - 1], temp) === Compare.BIGGER_THAN) {
      array[j] = array[j - 1];
      array[j - 1] = temp;
      j--;
      renderDivs(j, j - 1, array);
      await delay(100);
      if (!isRunning) {
        isSorting = false;
        return;
      }
    }
    array[j] = temp;
  }
};

//quick sort
const swap = (arr, a, b) => {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
};

const quickSort = (arr, compare = defaultCompare) => {
  sortVariant = 'quick';

  return quick(arr, 0, arr.length - 1, compare);
};

const quick = async (arr, left, right, compare) => {
  let i;
  if (arr.length > 1) {
    i = await partition(arr, left, right, compare);
    if (left < i - 1) {
      await quick(arr, left, i - 1, compare);
    }
    if (i < right) {
      await quick(arr, i, right, compare);
    }
  }
  return arr;
};

const partition = async (arr, left, right, compare) => {
  const pivot = arr[Math.floor((right + left) / 2)];
  isSorting = true;
  let i = left;
  let j = right;
  while (i <= j) {
    while (compare(arr[i], pivot) === Compare.LESS_THAN) {
      i++;
    }
    while (compare(arr[j], pivot) === Compare.BIGGER_THAN) {
      j--;
    }
    if (i <= j) {
      swap(arr, i, j);
      renderDivs(i, j, arr);
      await delay(100);
      if (!isRunning) {
        isSorting = false;
        return;
      }
      i++;
      j--;
    }
  }
  isSorting = false;
  return i;
};

//selection sort
const selectionSort = async (compare = defaultCompare) => {
  sortVariant = 'selection';
  const { length } = array;
  isSorting = true;
  let minIndex;
  for (let i = 0; i < length - 1; i++) {
    minIndex = i;
    for (let j = i; j < length; j++) {
      if (compare(array[minIndex], array[j]) === Compare.BIGGER_THAN) {
        minIndex = j;
      }
    }
    if (i !== minIndex) {
      swap(array, i, minIndex);
      renderDivs(i, minIndex, array);
      await delay(100);
      if (!isRunning) {
        isSorting = false;
        return;
      }
    }
  }
  isSorting = false;
};

//merge sort
let startMerge = 0;
const mergeSortAnimation = async (arr, start, end, compare = defaultCompare) => {
  if (!isRunning) {
    isSorting = false;
    return;
  }
  if (start < end) {
    const middle = Math.floor((start + end) / 2);

    await mergeSortAnimation(arr, start, middle, compare);
    await mergeSortAnimation(arr, middle + 1, end, compare);

    await merge(arr, start, middle, end, compare);
  }
};

const merge = async (arr, start, middle, end, compare) => {
  const left = arr.slice(start, middle + 1);
  const right = arr.slice(middle + 1, end + 1);
  isSorting = true;
  let i = 0;
  let j = 0;
  let k = start;

  while (i < left.length && j < right.length) {
    if (!isRunning) {
      isSorting = false;
      array = arr;
      return;
    }
    if (compare(left[i], right[j]) === Compare.LESS_THAN) {
      arr[k++] = left[i++];
    } else {
      arr[k++] = right[j++];
    }
    renderDivs(start, end, arr);
    await delay(100);
  }

  while (i < left.length) {
    arr[k++] = left[i++];
    renderDivs(start, end, arr);
    await delay(100);
  }

  while (j < right.length) {
    arr[k++] = right[j++];
    renderDivs(start, end, arr);
    await delay(100);
  }
  isSorting = false;
  renderDivs(start, end, arr);
  await delay(100);
};

const mergeSort = (arr, compare = defaultCompare) => {
  sortVariant = 'merge';
  const copy = [...arr];
  mergeSortAnimation(copy, startMerge, copy.length - 1, compare);
  return copy;
};

bubbleButton.addEventListener('click', () => {
  isRunning = true;
  if (!isSorting) {
    bubbleSort();
  }
});
insertionButton.addEventListener('click', () => {
  isRunning = true;
  if (!isSorting) {
    insertionSort();
  }
});
quickButton.addEventListener('click', () => {
  isRunning = true;
  if (!isSorting) {
    quickSort(array);
  }
});
selectionButton.addEventListener('click', () => {
  isRunning = true;
  if (!isSorting) {
    selectionSort();
  }
});
mergeButton.addEventListener('click', () => {
  isRunning = true;
  if (!isSorting) {
    mergeSort(array);
  }
});
randomButton.addEventListener('click', () => {
  if (!isSorting) {
    array = resetArr();
    renderDivs(null, null, array);
  }
});
buttonPlay.addEventListener('click', () => {
  resumeLoop();
});
buttonstop.addEventListener('click', () => {
  stopLoop();
});
userAddButton.addEventListener('click', () => {
  userInputArray();
});
array = resetArr();
renderDivs(null, null, array);
