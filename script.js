const template = document.getElementById('template');

const BlogEntry = class {
  constructor(title, content, id) {
    this.title = title;
    this.content = content;
    this.id = id;
  }
}

const BlogLog = class {
  constructor (arrayLog = []) {
    this.blogList = arrayLog;
  }
}


const testArray = [0,0,1,1,3,3,3,3,3,6,7,8];

const findLastIndex = (arrayInput, x) => {
  let returnIndex = -1, startIndex = 0, endIndex = arrayInput.length - 1; // will return -1 if not found.
  while (startIndex <= endIndex) {
    let midIndex = Math.floor((startIndex + endIndex) / 2);
    if (x === arrayInput[midIndex]) {
      returnIndex = midIndex;
      startIndex = midIndex + 1;
    } else if (x < arrayInput[midIndex]) {
      endIndex = midIndex - 1;
    } else {
      startIndex = midIndex + 1;
    }
  }
  return [returnIndex, endIndex, startIndex];
}

console.log(findLastIndex(testArray, 1)) // insert at startIndex.  If -1 then date not found and start at 0.
// If not -1 then lift the entry number off returnIndex, and stick a new item in.
console.log(findLastIndex(testArray, 2));

console.log(findLastIndex(testArray, 9));
testArray.splice(4, 0, "rabbit");

console.log(testArray);

const today = new Date().toISOString().slice(0,10); // 2025-06-27


// onSubmit sends form data to array of objects.
// edit or remove does . . . well, let's see about assigning dataset ids or something.
// How do we ensure that dataset ids are unique?  Set on date, but also . . . 
// Let's say that we have a date entry as well that is default set to current date.
// When an entry is made, looks through database for all dates binary search, finds first and last, so knows
// how many entries exist for that date. Then assigns ID of index.
// If no entry found for that date, then no ID.

// Suppose I input a date and a bunch of logs for that date.  Then I delete one of the logs in the middle.
// How do I maintain . . . well, I just find the last index with that date, get its log number, then add 1.





// cloneButton.addEventListener('click', () => {
// const clonedCard = template.cloneNode(true); // Deep clone
// clonedCard.style.display = 'block';
// container.appendChild(clonedCard);
// });