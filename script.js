const container = document.getElementById('container');
const templateBlog = document.getElementById('template-blog');
const formEnterBlog = document.getElementById('form-enter-blog');
const inputBlogTitle = document.getElementById('input-blog-title');
const inputBlogTitleError = document.getElementById('input-blog-title-error');
const inputBlogContent = document.getElementById('input-blog-content');
const inputBlogContentError = document.getElementById('input-blog-content-error');

const clearLocalStorage = document.getElementById('button-clear-localstorage')

clearLocalStorage.addEventListener('click', (event) => {
  // Note:  Clearing localStorage then adding a new entry results in existing log data being saved when new entry is entered.  To wipe localStorage and current data, clear then refresh page.  Then works.
  localStorage.removeItem("mod5sba");
})

let blogLogStored = null;

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
  moveLocalStorageDataIntoBlogLog = (arrayLog) => {
    this.blogList = arrayLog;
    //console.log(`Testing first element; ${this.blogList[0].blogEntry.title}, ${this.blogList[0].blogEntry.content}, ${this.blogList[0].blogEntry.dateString}, ${this.blogList[0].logNumber}`);
  }
  storeDataInLocalStorage = () => {
    localStorage.setItem("mod5sba", JSON.stringify(this.blogList));
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
      //console.log(`aeElse, with ${JSON.stringify(indexArray)} logNumber ${(this.blogList[indexArray[0]].logNumber) + 1}`);
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
    this.storeDataInLocalStorage();
    //console.log(`aEL post localStorage; ${JSON.stringify(this)}`)
  }
  editEntry = (dateString, logNumber, newTitle, newContent) => {
    //console.log(`editEntry triggered with ${dateString}, ${logNumber}, ${newTitle}, ${newContent} `)
    const arrayIndex = this.findIndex(dateString, logNumber);
//    console.log(`editEntry attempting to read index ${arrayIndex}`);
    // arrayIndex is returning -1.  This should be impossible.
//    console.log(`editEntry attempting to read element ${JSON.stringify(this.blogList[arrayIndex])}`);
    this.blogList[arrayIndex].blogEntry.title = newTitle;
    this.blogList[arrayIndex].blogEntry.content = newContent;
    this.storeDataInLocalStorage();
  } 
  deleteEntry = (dateString, logNumber, htmlElement) => {
    //console.log(`dE with ${dateString}, ${logNumber}`);
    const arrayIndex = this.findIndex(dateString, logNumber);
    this.blogList.splice(arrayIndex, 1);
    htmlElement.remove();
    this.storeDataInLocalStorage();
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
    //console.log (`findIndex triggered.  dateString ${dateString}, logNumber ${logNumber}`);
    logNumber = Number(logNumber);
    let returnIndex = -1, startIndex = 0, endIndex = arrayInput.length - 1; // returnIndex -1 if not found.  But that should never happen as this is only intended to be invoked on an existing element.
    // Also, dateString and logNumber together should constitute a unique identifier.
    while (startIndex <= endIndex) {
      //console.log(`findIndex startIndex ${startIndex}, endIndex ${endIndex}`)
      let midIndex = Math.floor((startIndex + endIndex) / 2);
      if (dateString === arrayInput[midIndex].blogEntry.dateString && (Number(arrayInput[midIndex].logNumber) === Number(logNumber))) {
        returnIndex = midIndex;
        //console.log(`findIndex matched with index ${returnIndex}`);
        return returnIndex;
      } else if (dateString < arrayInput[midIndex].blogEntry.dateString || (dateString === arrayInput[midIndex].blogEntry.dateString && (Number(logNumber) < Number(arrayInput[midIndex].logNumber)))) {
        endIndex = midIndex - 1;
        //console.log(`findIndex lessThan, startIndex ${startIndex}, endIndex ${endIndex}`);
      } else {
        startIndex = midIndex + 1;
        //console.log(`findIndex moreThan, startIndex ${startIndex}, endIndex ${endIndex}`);
      }
    } 
    //console.log(`findIndex returning ${returnIndex}`);
    return returnIndex;
  }

  displayBlogList = () => {
    for (let i = 0; i < this.blogList.length; i++) {
      //console.log(`dBL, item ${i}, ${JSON.stringify(this.blogList[i])}`);
    }
    // console.log(`displayBlogList with ${JSON.stringify(this.blogList)}`);

    const fragment = document.createDocumentFragment();

    for (let i = this.blogList.length - 1; i >= 0; i--) {
      const clonedBlogEntry = templateBlog.cloneNode(true);
      clonedBlogEntry.dataset.id=`${this.blogList[i].blogEntry.dateString}-${this.blogList[i].logNumber}`;
      // in HTML, data-id="1" is manifestation of javascript htmlElement.dataset.id="3";
      const clonedBlogSection = clonedBlogEntry.children[0]; // hardcoding a index 0 reference is not dynamic.
      const cBSTitle = clonedBlogSection.children[0];
      const cBSContent = clonedBlogSection.children[1];

      cBSTitle.textContent = this.blogList[i].blogEntry.title;
      cBSContent.textContent = this.blogList[i].blogEntry.content;

      clonedBlogSection.style.display = 'block';
      fragment.appendChild(clonedBlogEntry);
    }
    container.insertBefore(fragment, container.children[2])
    // Test to see if this fragment disrupts any functionality - children references and such may break.  Just CRUD will do.
    // Note:  I think it breaks because I'm not attaching listeners.

    /**
     * script.js:74 Uncaught TypeError: Cannot read properties of undefined (reading 'blogEntry')
    at BlogLog.editEntry (script.js:74:31)
    at HTMLFormElement.<anonymous> (script.js:202:15)
editEntry	@	script.js:74
(anonymous)	@	script.js:202
     */
  }
}

const addValueMissingListenerToHTMLElement = (htmlElement, errorMessage, htmlElementOutput) => {
  htmlElement.addEventListener('input', (event) => {
    //console.log(`Triggering aVMLTHE on ${htmlElement}; input change detected; current value '${htmlElement.value}'`);
    if (htmlElement.validity.valueMissing) {
      //console.log(`Error message should trigger on ${htmlElement}, current value ${htmlElement.value}`);
      htmlElement.setCustomValidity(`${errorMessage}`)
    } else {
      htmlElement.setCustomValidity(``);
    }
    htmlElementOutput.classList.add("error-message");
    htmlElementOutput.textContent = htmlElement.validationMessage;
  });
}

addValueMissingListenerToHTMLElement(inputBlogTitle, '**Please enter a blog title**', inputBlogTitleError);
addValueMissingListenerToHTMLElement(inputBlogContent, '**Please enter blog content**', inputBlogContentError);

let blogLog = new BlogLog();

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
    //console.log(`caEL triggered.  ${dateString}, ${logNumber}`);
    blogLog.deleteEntry(dateString, logNumber, blogContainer);
  }
  if (event.target.classList.contains('button-edit-blog')) {
    // querySelector also vulnerable to document changes, though perhaps less so.
    const blogContainer = event.target.parentElement.parentElement;
    const targetId = blogContainer.dataset.id;
    const dateString = targetId.slice(0, 10);
    const logNumber = targetId.slice(11);
    const blogSection = event.target.parentElement;
    const formSection = blogContainer.children[1];
    const formEdit = formSection.children[0];
    const blogTitle = blogSection.children[0];
    const blogContent = blogSection.children[1];
    const formTitle = formEdit.children[2];
    const formTitleError = formEdit.children[4];
    const formContent = formEdit.children[8];
    const formContentError = formEdit.children[10];
    formTitle.value= blogTitle.textContent;
    formContent.value = blogContent.textContent;
    blogSection.style.display = 'none';
    formSection.style.display = 'block';
    addValueMissingListenerToHTMLElement(formTitle, '**Please enter a blog title**', formTitleError);
    addValueMissingListenerToHTMLElement(formContent, '**Please enter a blog title**', formContentError);
    // console.log(`Currently referencing formContent value ${formContent.value}`);
    // formContentError.textContent = "Triggered";
      formEdit.addEventListener('submit', (event) => {
      event.preventDefault();
      //console.log(`fbAEL triggered.`)
      blogLog.editEntry(dateString, logNumber, formTitle.value, formContent.value);
      blogTitle.textContent = formTitle.value;
      blogContent.textContent = formContent.value;
      //console.log(`fbAEL populated with ${blogTitle.textContent}, ${blogContent.textContent}`);
      blogSection.style.display = 'block';
      formSection.style.display = 'none';
    });
    // formEdit.addEventListener('submit' ...)
  }
});
// container.addEventListener('click' ...)

// Stick in something to jump navigation from current blog to form input to back.

const retrieveData = () => {
  try {
    blogLogStored = JSON.parse(localStorage.getItem('mod5sba'));
  } catch (errorMessage) {
    console.error('Error parsing settings from localStorage', errorMessage);
    blogLogStored = null;
  }
  if (blogLogStored) {
    //console.log(`Attempting retrieve data on existing data, ${JSON.stringify(blogLogStored)}`);
    blogLog.moveLocalStorageDataIntoBlogLog(blogLogStored);
    //console.log(`retrieveData test ${blogLogStored}`);
    blogLog.displayBlogList();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  retrieveData();
})