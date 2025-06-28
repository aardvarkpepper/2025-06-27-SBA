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
    const clonedBlogEntry = templateBlog.cloneNode(true);
    clonedBlogEntry.style.display = 'block';
  }
  editEntry = () => {}
  deleteEntry = (arrayIndex) => {
    this.blogList.splice(arrayIndex, 1); // correction, this must rely on unique date/log -based ID.
    // After all, if an element is removed in the middle then all the old IDs are going to be out of date.
    // Switching to a "display one element remove one element" instead of full render of list each time
    // means that index numbers CAN be duplicated
    
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
    const clonedBlogEntry = templateBlog.cloneNode(true);
    clonedBlogEntry.style.display = 'block';

    //Clone.  Assign datasetId based on array index, to pass to deleteEntry.
    // Remember, data array is most recent last, but render is most recent first.
    // slower to unshift than push, I think, as all existing array references have to be updated.  Maybe.
    // at any rate, just reverse the for loop on render.
  }
}

const addValueMissingListenerToHTMLElement = (htmlElement, errorMessage, htmlElementOutput) => {
  htmlElement.addEventListener('input', (event) => {
    if (htmlElement.validity.valueMissing) {
      htmlElement.setCustomValidity(`${errorMessage}`)
    } else {
      htmlElement.setCustomValidity(``);
    }
    htmlElementOutput.textContent = htmlElement.validationMessage;
  });
}

addValueMissingListenerToHTMLElement(inputBlogTitle, 'Please enter a blog title', inputBlogTitleError);
addValueMissingListenerToHTMLElement(inputBlogContent, 'Please enter blog content', inputBlogContentError);

formEnterBlog.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = inputBlogTitle.value;

  const content = inputBlogContent.value;
  



});

// Top of page is submit blog entry with validation methods.
// Submitting prepends or whatever blog to first element of list in html as it's reverse chronological order
// and the user has no ability to edit date of blog entry.  A hidden unique ID is assigned based on hidden date
//  and hidden log number.  This ID is referenced when adding or removing logs.  It CANNOT be index.
// Removing a blog entry sends a reference to delete the data from the array, and just removes the current element.
// Editing a blog entry switches visibility. I don't know that it's really cheaper computationally to
// render an invisible form and switch visibility.  But whatever.

// To do;  Look up exactly how dataset works.

// Stick in something to jump navigation from current blog to form input to back.

// If I *delete* an element then I need to . . . re-render the whole list?  Maybe I just delete from data
// and delete the element, and leave it at that. CSS styling handles change in look.
// Well really, do I even need to render the whole list at all?  I have to populate the list on initialization,
// sure.  


// cloneButton.addEventListener('click', () => {
// const clonedCard = template.cloneNode(true); // Deep clone
// clonedCard.style.display = 'block';
// container.appendChild(clonedCard);
// });