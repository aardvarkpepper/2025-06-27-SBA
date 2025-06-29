![Cat Writing Blog Entry](./personalLog2.png)

## Reflection

The project is Create / Read / Update / Delete on form entries, using HTML, CSS, and Javascript.  Included are form validation through the Constraint Validation API, form processing through addEventListener using 'submit' and event.preventDefault on forms, event delegation to cut down on separate eventListeners, assigning unique characterstics to HTML so data can identify HTML, getting and setting data in localStorage, and loading data on page load or page refresh.  Also, operations on the Date object, Javascript classes, binary searches, cloning, changing display type to hide or reveal elements, casting strings to numbers for comparison, structuring around DOM references including .children, createDocumentFragment, appendChild, insertBefore, using methods for Don't Repeat Yourself (DRY) coding.

I tried to think of the least computationally expensive and fastest ways to do things but am not sure how speed compares on different browsers / hardware.  E.g. cloning elements really being faster or not than creating elements and adding them, or switching between display:block and display:none to trigger visibility.  I went by what I read in some fast research.

Data editing and deletion is O(log n), as new entries are sorted into the array by date and log order, allowing binary search.  Entries on the same date have different log numbers; the log number of the last entry equalling the log number of the previous entry + 1.  Combining date and log numbers is effectively a unique ID.

The application may be run by opening index.html in a browser, with script.js and styles.css files in the same folder.

I designed the development to reflect assignment requirements, material covered in class, and personal preference.  For example, I did not wipe the list and recreate it on each deletion or edit, as those aren't strictly necessary.  I did write and invoke a function to display the entire list as that's necessary when loading data from localStorage and refreshing the page, for instance.

Challenges were mostly from insufficient consideration or unclear ideation.  For example, I initially thought to display items in increasing chronological order, but realized anyone wanting to edit their most recent entry would have to leap to the top of the page, creating discontinuity.  I looked into it; apparently most blogs are written in reverse chronological order, so I made adjustments.  I was a little rusty on binary searches, and ended up mis-ordering a couple elements that I took quite a while to track down, as the issue did not appear until after restoring data from localStorage, so I tried tracking down an issue there when I think perhaps I might have just needed a more vigorous test suite.  Can't really say for sure I know what happened still; I did try editing and deleting items in the middle, adding more items, repeating, thought I covered the edge cases, but tests worked pre-localStorage and not post-localStorage.  Possibly I'll track it down checking git history, but I think not - I expect it'll be more productive for me to build out more projects to get more used to quick ideation and implementation.  I've improved some in that regard in the past couple weeks, so I think I'll stick with what works.

Overcoming undesired behaviors, just a matter of console.log, tracking down issues step by step.

At this time, no known issues.  No features not implemented that were required by assignment.  If it's a question of what I might add, I might implement controls for people to view and change date and log numbers, both of which are currently hidden from the user.  Might also implement a button to jump from a blog entry that's low on the list to the data form at the start of the list, or possibly replacement - at any rate removing jumping around.  Could limit displayed log items to 10-20 per page, add some random cheerful backgrounds using CSS, do additional styling with custom fonts.

## Resources

https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/textarea
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
https://www.geeksforgeeks.org/binary-search-in-javascript/
https://www.geeksforgeeks.org/dsa/find-first-and-last-positions-of-an-element-in-a-sorted-array/
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
https://www.geeksforgeeks.org/html/how-to-set-dom-element-as-first-child/
https://developer.mozilla.org/en-US/docs/Web/API/Element/prepend
https://www.w3schools.com/js/js_htmldom_elements.asp
https://developer.mozilla.org/en-US/docs/Web/API/Element/children
https://developer.mozilla.org/en-US/docs/Web/API/Element/firstElementChild
https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement
https://developer.mozilla.org/en-US/docs/Web/API/Element/remove
https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
https://www.w3schools.com/js/js_object_accessors.asp
https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
https://www.w3schools.com/jsref/met_document_createdocumentfragment.asp