const template = document.getElementById('template');

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
  displayBlogList = () => {

  }
}


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