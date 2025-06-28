const container = document.getElementById('container');
const templateBlog = document.getElementById('template-blog');
const formEnterBlog = document.getElementById('form-enter-blog');
const inputBlogTitle = document.getElementById('input-blog-title');
const inputBlogTitleError = document.getElementById('input-blog-title-error');
const inputBlogContent = document.getElementById('input-blog-content');
const inputBlogContentError = document.getElementById('input-blog-content-error');

const BlogEntry = class {
  constructor(title, content, dateString = new Date().toISOString().slice(0, 10)) {
    this.title = title;
    this.content = content;
    this.dateString = dateString; // 2025-06-27
  }
}

const BlogLog = class {
  constructor(arrayLog = []) {
    this.blogList = arrayLog;
  }
  /**
   * @param BlogEntry instance, blogEntry 
   * @param [{}] array of objects of {blogEntry: blogEntry, logNumber: number}
   * Takes instance of blogEntry and sorts into place in blogList.
   * If there are no entries that date, then indexArray[0] === -1, and logNumber set to 1.
   * If there are other entries for that date, then logNumber = the last logNumber+1.
   */
  addEntry = (blogEntry, arrayInput = this.blogList) => {
    const indexArray = findLastIndexAndInsertIndex(blogEntry.date);
    if (indexArray[0] === -1) {
      this.blogList.splice(indexArray[1], 0, {blogEntry: blogEntry, logNumber: 1})
    } else {
      this.blogList.splice(indexArray[1], 0, {blogEntry: blogEntry, logNumber: blogEntry[indexArray[0]].logNumber + 1})
      // If this is weird, try storing indexArray[1].logNumber.  .splice shouldn't be an issue until after it's run.
      // Test for multiple blogEntries on a single date, multiple dates, etc.  Check log output too.
    }
  }
  deleteEntry = (arrayIndex) => {
    this.blogList.splice(arrayIndex, 1);
  }
  findLastIndexAndInsertIndex = (dateString, arrayInput = this.blogList) => {
    let returnIndex = -1, startIndex = 0, endIndex = arrayInput.length - 1; // returnIndex = -1 if not found.
    while (startIndex <= endIndex) {
      let midIndex = Math.floor((startIndex + endIndex) / 2);
      if (dateString === arrayInput[midIndex].blogEntry.dateString) {
        returnIndex = midIndex;
        startIndex = midIndex + 1;
      } else if (dateString < arrayInput[midIndex].blogEntry.dateString) {
        endIndex = midIndex - 1;
      } else {
        startIndex = midIndex + 1;
      }
    }
    return [returnIndex, startIndex];
  }
  displayBlogList = (htmlElement) => {
    const clonedBlogEntry = template.cloneNode(true);
    clonedBlogEntry.style.display = 'block';

    //Clone.  Assign datasetId based on array index, to pass to deleteEntry.
  }
}

inputBlogTitle.addEventListener('input', (event) => {
  if (inputBlogTitle.validity.valueMissing) {
    inputBlogTitle.setCustomValidity(`Please enter a blog title.`);
  } else {
    inputBlogTitle.setCustomValidity(``);
  }
  inputBlogTitleError.textContent = inputBlogTitleError.validationMessage;
});

inputBlogContent.addEventListener('input', (event) => {
  if (inputBlogContent.validity.valueMissing) {
    inputBlogContent.setCustomValidity('Please enter blog content');
  } else {
    inputBlogContent.setCustomValidity('');
  }
  inputBlogContentError.textContent = inputBlogContentError.validationMessage;
});

formEnterBlog.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = inputBlogTitle.value;

  const content = inputBlogContent.value;
  



});


// onSubmit sends form data to array of objects.
// edit or remove does . . . well, let's see about assigning dataset ids or something.
// How do we ensure that dataset ids are unique?  Set on date, but also . . . 
// Let's say that we have a date entry as well that is default set to current date.
// When an entry is made, looks through database for all dates binary search, finds first and last, so knows
// how many entries exist for that date. Then assigns ID of index.
// If no entry found for that date, then no ID.

// Suppose I input a date and a bunch of logs for that date.  Then I delete one of the logs in the middle.
// How do I maintain . . . well, I just find the last index with that date, get its log number, then add 1.


// Stick in something to jump navigation from current blog to form input to back.
// Or would it be better to hide the existing element and reveal the current form?
// Well, hiding creates 2-3 times the element (for form and add).
// So how many times will they really use that?
// When specifically do I render? If I edit an element, I don't need to do much, just .replace
// If I *delete* an element then I need to . . . re-render the whole list?  Maybe I just delete from data
// and delete the element, and leave it at that. CSS styling handles change in look.
// Well really, do I even need to render the whole list at all?  I have to populate the list on initialization,
// sure.  


// cloneButton.addEventListener('click', () => {
// const clonedCard = template.cloneNode(true); // Deep clone
// clonedCard.style.display = 'block';
// container.appendChild(clonedCard);
// });