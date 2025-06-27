const template = document.getElementById('template');

const BlogEntry = class {
  constructor(title, content, date = 0, id = 0) {
    const today = new Date().toISOString().slice(0,10); // 2025-06-27
  }
}


// onSubmit sends form data to array of objects.
// edit or remove does . . . well, let's see about assigning dataset ids or something.
// How do we ensure that dataset ids are unique?  Set on date, but also . . . 
// Let's say that we have a date entry as well that is default set to current date.
// When an entry is made, looks through database for all dates binary search, finds first and last, so knows
// how many entries exist for that date. Then assigns ID of index.
// If no entry found for that date, then no ID.




// cloneButton.addEventListener('click', () => {
// const clonedCard = template.cloneNode(true); // Deep clone
// clonedCard.style.display = 'block';
// container.appendChild(clonedCard);
// });