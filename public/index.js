/*
 * Write your client-side JS code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Savannah Loberger
 * Email: loberges@oregonstate.edu
 */

/* Using the addhike function from assignment 5 */ 
 
function insertNewHike(hikeName, hikeImg, hikeText, hikeAuthor) {

  var hikeTemplate = Handlebars.templates.hike;
  var newhike = hikeTemplate({
    name: hikeName,
	image: hikeImg,
	text: hikeText,
	author: hikeAuthor
  });
  
  var hikeContainer = document.querySelector('.hike-container');
  hikeContainer.insertAdjacentHTML('beforeend', newhike);

  
  /*   
  // Create a new twit <article> element.
  var twitElem = document.createElement('article');
  twitElem.classList.add('twit');


   * Create a new twit-icon <div> element, insert bullhorn with innerHTML
   * (which is safe in this case because we're not dealing with user input),
   * and add the div into the new twit element.

  var twitIconElem = document.createElement('div');
  twitIconElem.classList.add('twit-icon');
  twitIconElem.innerHTML = '<i class="fa fa-bullhorn"></i>';
  twitElem.appendChild(twitIconElem);


   * Create a new twit-content <div> element, and insert it into the new twit
   * element.

  var twitContentElem = document.createElement('div');
  twitContentElem.classList.add('twit-content');
  twitElem.appendChild(twitContentElem);


   * Create a new twit-text <p> element and add to it a text node containing
   * the twit text value specified by the user.  Add the twit-text <p> element
   * into the twit-content element.

  var twitTextNode = document.createTextNode(twitText);
  var twitTextElem = document.createElement('p');
  twitTextElem.classList.add('twit-text');
  twitTextElem.appendChild(twitTextNode);
  twitContentElem.appendChild(twitTextElem);


   * Create a new twit-attribution <p> element and add to it an <a> element
   * that itself contains a text node with the twit attribution value
   * specified by the user.  Add the twit-attribution <p> element into the
   * twit-content element.
   
  var twitAttributionTextNode = document.createTextNode(twitAuthor);
  var twitAttributionLinkElem = document.createElement('a');
  twitAttributionLinkElem.href = '#';
  twitAttributionLinkElem.appendChild(twitAttributionTextNode);
  var twitAttributionElem = document.createElement('p');
  twitAttributionElem.classList.add('twit-attribution');
  twitAttributionElem.appendChild(twitAttributionLinkElem);
  twitContentElem.appendChild(twitAttributionElem);

  var twitContainer = document.querySelector('main.twit-container');
  twitContainer.appendChild(twitElem);  */

}


/***************************************************************************
 **
 ** You should not modify any of the code below.
 **
 ***************************************************************************/

/*
 * This is a global array containing an object representing each twit.  Each
 * twit object has the following form:
 *
 * {
 *   text: "...",
 *   author: "..."
 * }
 */
var allHikes = [];

/*
 * This function checks whether all of the required inputs were supplied by
 * the user and, if so, inserts a new hike into the page using these inputs.
 * If the user did not supply a required input, they instead recieve an alert,
 * and no new hike is inserted.
 */
function handleModalAcceptClick() {

  
  var hikeText = document.getElementById('hike-text-input').value;
  var hikeAuthor = document.getElementById('hike-attribution-input').value;
  var hikeName = document.getElementById('hike-name-input').value;
  var hikeImg = document.getElementById('hike-imagelink-input').value;
  
  
  /*
   * Only generate the new hike if the user supplied values for both the hike
   * text and the hike attribution.  Give them an alert if they didn't.
   */
  if (hikeText && hikeAuthor && hikeName && hikeImg) {

    allHikes.push({
      name: hikeName,
	  image: hikeImg,
	  text: hikeText,
      author: hikeAuthor
	  
    });

    clearSearchAndReinserthikes();

    hideCreatehikeModal();

  } else {

    alert('You fill out all boxes to add the hike!');

  }
}


/*
 * This function clears the current search term, causing all hikes to be
 * re-inserted into the DOM.
 */
function clearSearchAndReinserthikes() {

  document.getElementById('navbar-search-input').value = "";
  doSearchUpdate();

}


/*
 * This function shows the modal to create a hike when the "create hike"
 * button is clicked.
 */
function showCreatehikeModal() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createhikeModal = document.getElementById('create-hike-modal');

  // Show the modal and its backdrop.
  modalBackdrop.classList.remove('hidden');
  createhikeModal.classList.remove('hidden');

}


/*
 * This function clears any value present in any of the hike input elements.
 */
function clearhikeInputValues() {

  var hikeInputElems = document.getElementsByClassName('hike-input-element');
  for (var i = 0; i < hikeInputElems.length; i++) {
    var input = hikeInputElems[i].querySelector('input, textarea');
    input.value = '';
  }

}


/*
 * This function hides the modal to create a hike and clears any existing
 * values from the input fields whenever any of the modal close actions are
 * taken.
 */
function hideCreatehikeModal() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var createhikeModal = document.getElementById('create-hike-modal');

  // Hide the modal and its backdrop.
  modalBackdrop.classList.add('hidden');
  createhikeModal.classList.add('hidden');

  clearhikeInputValues();

}


/*
 * A function that determines whether a given hike matches a search query.
 * Returns true if the hike matches the query and false otherwise.
 */
function hikeMatchesSearchQuery(hike, searchQuery) {
  /*
   * An empty query matches all hikes.
   */
  if (!searchQuery) {
    return true;
  }

  /*
   * The search query matches the hike if either the hike's text or the hike's
   * author contains the search query.
   */
  searchQuery = searchQuery.trim().toLowerCase();
  return (hike.author + " " + hike.text + " " + hike.name).toLowerCase().indexOf(searchQuery) >= 0;
}


/*
 * Perform a search over over all the hikes based on the search query the user
 * entered in the navbar.  Only display hikes that match the search query.
 * Display all hikes if the search query is empty.
 */
function doSearchUpdate() {

  /*
   * Grab the search query from the navbar search box.
   */
  var searchQuery = document.getElementById('navbar-search-input').value;

  /*
   * Remove all hikes from the DOM temporarily.
   */
  var hikeContainer = document.querySelector('.hike-container');
  if (hikeContainer) {
    while (hikeContainer.lastChild) {
      hikeContainer.removeChild(hikeContainer.lastChild);
    }
  }

  /*
   * Loop through the collection of all hikes and add hikes back into the DOM
   * if they match the current search query.
   */
  allHikes.forEach(function (hike) {
    if (hikeMatchesSearchQuery(hike, searchQuery)) {
      insertNewHike(hike.name, hike.image, hike.text, hike.author);
    }
  });

}

/*
 * This function parses an existing DOM element representing a single hike
 * into an object representing that hike and returns that object.  The object
 * is structured like this:
 *
 * {
 *   "name": "...",
 *	 "image": "...",
 *	 "text": "...",
 *	 "author": "..."
 * }
 */
function parsehikeElem(hikeElem) {

  var hike = {};

  var hikeNameElem = hikeElem.querySelector('.hike-name');
  hike.name = hikeNameElem.textContent.trim();

  var hikeImageElem = hikeElem.querySelector('.hike-image');
  hike.image = hikeImageElem.textContent.trim();
  
  var hikeTextElem = hikeElem.querySelector('.hike-text');
  hike.text = hikeTextElem.textContent.trim();
  
  var hikeAttributionLinkElem = hikeElem.querySelector('.hike-attribution a');
  hike.author = hikeAttributionLinkElem.textContent.trim();

  return hike;

}


/*
 * Wait until the DOM content is loaded, and then hook up UI interactions, etc.
 */
window.addEventListener('DOMContentLoaded', function () {

  // Remember all of the existing hikes in an array that we can use for search.
  var hikeElemsCollection = document.getElementsByClassName('hike');
  for (var i = 0; i < hikeElemsCollection.length; i++) {
    allHikes.push(parsehikeElem(hikeElemsCollection[i]));
  }

  var createhikeButton = document.getElementById('create-hike-button');
  if (createhikeButton) {
    createhikeButton.addEventListener('click', showCreatehikeModal);
  }

  var modalCloseButton = document.querySelector('#create-hike-modal .modal-close-button');
  if (modalCloseButton) {
    modalCloseButton.addEventListener('click', hideCreatehikeModal);
  }

  var modalCancalButton = document.querySelector('#create-hike-modal .modal-cancel-button');
  if (modalCancalButton) {
    modalCancalButton.addEventListener('click', hideCreatehikeModal);
  }

  var modalAcceptButton = document.querySelector('#create-hike-modal .modal-accept-button');
  if (modalAcceptButton) {
    modalAcceptButton.addEventListener('click', handleModalAcceptClick);
  }

  var searchButton = document.getElementById('navbar-search-button');
  if (searchButton) {
    searchButton.addEventListener('click', doSearchUpdate);
  }

  var searchInput = document.getElementById('navbar-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', doSearchUpdate);
  }

});
