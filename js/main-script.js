const form = document.getElementsByTagName('form')[0];
let searchId = $('#search');
let containerClass = $('.container');
let divHtml = "";

for (let image of images) {
  divHtml =  '<div class="photo">';
  divHtml += '<a href="photos/'+
              image.fileName +
              '" data-lightbox="gallary" data-title="' +
              image.imgCaption +
              '">';
  divHtml += '<img src="photos/thumbnails/' +
              image.fileName +
              '" alt="' +
              image.altText +
              '">';
  divHtml += '</a> </div>';
  containerClass.append(divHtml);
}

/******************************************************************************
                            Add Event Listener functions
 ******************************************************************************/
 /* function defined when the form is submitted
    to prevent page reload
*/
form.addEventListener('submit',(event)=>{
  event.preventDefault();
})

/******************************************************************************
  function defined when the the search input field has changed value
  to loop through all images, searching for the specified string
  in the alt text or caption text

  search value, alt text, and image caption are converted to lower case to make search feature case insensitive

  if found image class (hidden) is removed for parent div, and the data lightbox value is set as search string ,
  else class (hidden) is added, and the data lightbox value is set as gallary.

  so we have two gallary:
    the original one (gallary) with all hidden images
    and one for images found in search which will be displayed when these images are clicked.

  in case the search string is empty all images are shown, and all their data lightbox value is set as gallary once again
*******************************************************************************/
searchId.on('keyup',function(){
  let searchValue = searchId.val().toLowerCase();

    for (let image of images) {
      let altText= image.altText;
      let imgCaption = image.imgCaption;
      let imgDiv = $('[alt="'+altText+'"]').parent().parent();
      let imgA = $('[alt="'+altText+'"]').parent();

      altText =altText.toLowerCase();
      imgCaption= imgCaption.toLowerCase();

      if (searchValue.length != 0) {

        let altValueFound = altText.search(searchValue);
        let capValueFound = imgCaption.search(searchValue);

        if ((altValueFound != -1) ||
            (capValueFound != -1)) {
          imgDiv.removeClass('hidden');
          imgA.attr('data-lightbox',searchValue);
        } else {
          imgDiv.addClass('hidden');
          imgA.attr('data-lightbox','gallary');
        }

      } else {
        imgDiv.removeClass('hidden');
        imgA.attr('data-lightbox','gallary');
      }

    }

})
