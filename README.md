![Cat Writing Blog Entry](./personalLog2.png)

## Reflection

The project is Create / Read / Update / Delete on form entries, using HTML, CSS, and Javascript.  Included are form validation through the Constraint Validation API, form processing through addEventListener using 'submit' and event.preventDefault on forms, event delegation to cut down on separate eventListeners, assigning unique characterstics to HTML so data can identify HTML, getting and setting data in localStorage, and loading data on page load or page refresh.  Also, operations on the Date object, Javascript classes, binary searches, cloning, changing display type to hide or reveal elements, casting strings to numbers for comparison, structuring around DOM references including .children, createDocumentFragment, appendChild, insertBefore, using methods for Don't Repeat Yourself (DRY) coding.  Optional utility functions used; I tend to stick everything in utility functions anyways. Used Google Fonts, CSS styling for validity indication, button hover indicator, button press animation.

I tried to think of the least computationally expensive and fastest ways to do things but am not sure how speed compares on different browsers / hardware.  E.g. cloning elements really being faster or not than creating elements and adding them, or switching between display:block and display:none to trigger visibility.  I went by what I read in some fast research.

Data editing and deletion is O(log n), as new entries are sorted into the array by date and log order, allowing binary search.  Entries on the same date have different log numbers; the log number of the last entry equalling the log number of the previous entry + 1.  Combining date and log numbers is effectively a unique ID.

The application may be run by opening index.html in a browser, with that file, script.js, and styles.css files in the same folder.

I designed the development to reflect assignment requirements, material covered in class, and personal preference.  For example, I did not wipe the list and recreate it on each deletion or edit, as those aren't strictly necessary for the implementation.  I did write and invoke a function to display the entire list as that's necessary when loading data from localStorage and refreshing the page.

Challenges, as they were, were mostly from insufficient consideration or unclear ideation.  I was a little rusty on binary searches, and ended up mis-ordering some variables.  That took a long while to track down, as the issue did not appear until after restoring data from localStorage so I thought the issue was related.  I wanted to address the break in user experience continuity when jumping from entering a blog entry to skipping to the end of the list, but when looking into it I found blog entries are typically done in reverse chronological anyways.  Just small things in design and such, really.

Overcoming undesired behaviors, just a matter of console.log and comparing expected to actual, tracking step by step.

No outstanding issues.  All required assignment features implemented, excepting "re-render the list of posts on the page" under "Handle New Post Form Submission", and "Re-render the posts" under "Handle Delete Post". It just isn't necessary to iterate through the entire list to get the elements to show / be removed; the entire list need only be rendered on initial load where data exists in localStorage.   If it's a question of what I might add, I might implement controls for people to view and change date and log numbers, both of which are currently hidden from the user.  Might also implement a button to jump from a blog entry that's low on the list to the data form at the start of the list, or possibly replacement - at any rate removing jumping around.  Could limit displayed log items to 10-20 per page, add some random cheerful backgrounds using CSS, do additional styling with custom fonts.

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
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors
https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child
https://kinsta.com/blog/css-text-outline/
https://stackoverflow.com/questions/11323813/how-to-outline-text-in-html-css
https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration
https://developer.mozilla.org/en-US/docs/Web/CSS/font-size
https://www.w3schools.com/howto/howto_css_animate_buttons.asp
https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow
https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate
https://www.w3schools.com/cssref/pr_font_weight.php