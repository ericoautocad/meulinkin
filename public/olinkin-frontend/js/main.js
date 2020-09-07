let button = document.getElementById('clickMe');

button.addEventListener('click', function (e) {
  e.preventDefault();
  document.execCommand('copy', false, document.getElementById('myLinkUrl').select());
});

function maskTel() {
  var key = window.event.key;
  var element = window.event.target;
  var isAllowed = /\d|Backspace|Tab/;
  if(!isAllowed.test(key)) window.event.preventDefault();
  
  var inputValue = element.value;
  inputValue = inputValue.replace(/\D/g,'');
  inputValue = inputValue.replace(/(^\d{2})(\d)/,'($1) $2');
  inputValue = inputValue.replace(/(\d{4,5})(\d{4}$)/,'$1-$2');
  
  element.value = inputValue;
}

$(document).ready(function () {
  $('.slider1').owlCarousel({
    loop: false,
    thumbs: true,
    items: 1,
    responsiveClass: true, autoplayHoverPause: true,
    autoplay: false,
    slideSpeed: 1000,
    paginationSpeed: 900,
    thumbsPrerendered: true,
    autoplayTimeout: 3000,
    //navText : ["<img src='img/left.png'>","<img src='img/right.png'>"],
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      360: {
        items: 1,
        nav: false
      },
      768: {
        items: 1,
        nav: false,
      },
      1000: {
        items: 1,
        nav: false,
        loop: true
      }
    }
  });
});

//avatar
function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
          $('#imagePreview').css('background-image', 'url('+e.target.result +')');
          $('#imagePreview').hide();
          $('#imagePreview').fadeIn(650)
      }
      reader.readAsDataURL(input.files[0]);
  }
}
$("#imageUpload").change(function() {
  readURL(this);
});
