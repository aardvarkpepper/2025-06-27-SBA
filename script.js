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
    // note:  There should be some limit on the number of added entries per page.  Displaying 200 entries is a lot.
    const indexArray = this.findLastIndexAndInsertIndex(blogEntry.dateString);
    let logNumber = null;
    if (indexArray[0] === -1) {
      logNumber = 1;
      this.blogList.splice(indexArray[1], 0, {blogEntry: blogEntry, logNumber: logNumber})
    } else {
      logNumber = `${(this.blogList[indexArray[0]].logNumber) + 1}` // also casts into string.
      console.log(`aeElse, with ${JSON.stringify(indexArray)} logNumber ${(this.blogList[indexArray[0]].logNumber) + 1}`);
      this.blogList.splice(indexArray[1], 0, {blogEntry: blogEntry, logNumber: (this.blogList[indexArray[0]].logNumber) + 1})
      // If this is weird, try storing indexArray[1].logNumber.  .splice shouldn't be an issue until after it's run.
      // Test for multiple blogEntries on a single date, multiple dates, etc.  Check log output too.
    }
    const clonedBlogEntry = templateBlog.cloneNode(true);
    clonedBlogEntry.dataset.id=`${blogEntry.dateString}-${logNumber}`; 
    // in HTML, data-id="1" is manifestation of javascript htmlElement.dataset.id="3";
    const clonedBlogSection = clonedBlogEntry.children[0]; // hardcoding a index 0 reference is not dynamic.
    const cBSTitle = clonedBlogSection.children[0];
    const cBSContent = clonedBlogSection.children[1];

    cBSTitle.textContent = blogEntry.title;
    cBSContent.textContent = blogEntry.content;

    clonedBlogSection.style.display = 'block';

    container.insertBefore(clonedBlogEntry, container.children[2]); // again, hardcoding reference.
  }
  editEntry = () => {} // 
  deleteEntry = (dateString, logNumber, htmlElement) => {
    console.log(`dE with ${dateString}, ${logNumber}`);
    const arrayIndex = this.findIndex(dateString, logNumber);
    this.blogList.splice(arrayIndex, 1);
    htmlElement.remove();
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
  findIndex = (dateString, logNumber, arrayInput = this.blogList) => {
    logNumber = Number(logNumber);
    let returnIndex = -1, startIndex = 0, endIndex = arrayInput.length - 1; // returnIndex -1 if not found.  But that should never happen as this is only intended to be invoked on an existing element.
    // Also, dateString and logNumber together should constitute a unique identifier.
    while (startIndex <= endIndex) {
      let midIndex = Math.floor((startIndex + endIndex) / 2);
      if (dateString === arrayInput[midIndex].blogEntry.dateString && Number(arrayInput[midIndex].logNumber) === logNumber) {
        returnIndex = midIndex;
      } else if (dateString < arrayInput[midIndex].blogEntry.dateString || (dateString <= arrayInput[midIndex].blogEntry.dateString && Number(arrayInput[midIndex].logNumber)) < logNumber) {
        endIndex = midIndex + 1;
      } else {
        startIndex = midIndex + 1;
      }
      return returnIndex;
    } 
  }

  displayBlogList = (htmlElement) => {

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
    htmlElementOutput.classList.add("error-message");
    htmlElementOutput.textContent = htmlElement.validationMessage;
  });
}

addValueMissingListenerToHTMLElement(inputBlogTitle, 'Please enter a blog title', inputBlogTitleError);
addValueMissingListenerToHTMLElement(inputBlogContent, 'Please enter blog content', inputBlogContentError);

const blogLog = new BlogLog();

formEnterBlog.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = inputBlogTitle.value;
  const content = inputBlogContent.value;
  let blogEntry = new BlogEntry(title, content);
  blogLog.addEntry(blogEntry);
  inputBlogTitle.value = "";
  inputBlogContent.value = "";
});

container.addEventListener('click', (event) => {
  if (event.target.classList.contains('button-delete-blog')) {
    const blogContainer = event.target.parentElement.parentElement;
    const targetId = blogContainer.dataset.id;
    const dateString = targetId.slice(0, 10);
    const logNumber = targetId.slice(11);
    console.log(`caEL triggered.  ${dateString}, ${logNumber}`); // logNumber is a string; this is not working correctly.
    // button to section, section to containing div;
    blogLog.deleteEntry(dateString, logNumber, blogContainer);
  }
  if (event.target.classList.contains('button-edit-blog')) {
    // querySelector also vulnerable to document changes, though perhaps less so.
    const blogContainer = event.target.parentElement.parentElement;
    const blogSection = event.target.parentElement;
    const formSection = blogContainer.children[1];
    const formEdit = formSection.children[0];
    const blogTitle = blogSection.children[0].textContent;
    const blogContent = blogSection.children[1].textContent;
    const formTitle = formEdit.children[2];
    const formTitleError = formEdit.children[4];
    const formContent = formEdit.children[8];
    const formContentError = formEdit.children[10];
    const formButton = formEdit.children[12];
    formTitle.value= blogTitle;
    formContent.value = blogContent;
    blogSection.style.display = 'none';
    formSection.style.display = 'block';
    addValueMissingListenerToHTMLElement(formTitle, 'Please enter a blog title', formTitleError);
    addValueMissingListenerToHTMLElement(formContent, 'Please enter a blog title', formContentError);
  }
  /**
<div id="template-blog">
    <section style="display: none;" class="blog-entry">
      <h2></h2>
      <p></p>
      <button class="button-edit-blog">Edit</button>
      <button class="button-delete-blog">Delete</button>
    </section>
    <section style="display: none;" class="blog-edit">
      <form>
        <label>Post Title</label>
        <br>
        <input type="text" required>
        <br>
        <span></span>
        <br>
        <label>Post Content</label>
        <br>
        <textarea rows="5" cols="66" placeholder="Click and drag lower right corner to resize."></textarea>
        <br>
        <span></span>
        <br>
        <button class="button-submit-edit-blog">Submit Blog Entry</button>
      </form>
    </section>
  </div>
    blogSection.style.display = 'none';
    formSection.style.display = 'block';

   */
});
// container.addEventListener('click' ...)

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
