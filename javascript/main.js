// Menu
$(document).ready(function(){
	// menu click event
	$('.menuBtn').click(function() {
		$(this).toggleClass('act');
			if($(this).hasClass('act')) {
				$('.mainMenu, #mob-menu').addClass('act');
			}
			else {
				$('.mainMenu, #mob-menu').removeClass('act');
			}
	});
});

// Menu Scroll
$(window).scroll(function() {
    if ($(this).scrollTop() > 1 ) {
        $('.header-wrapper').css('box-shadow',' 0 1px 2px #0000001c');
    } else {
        $('.header-wrapper').css('box-shadow', 'none');
    }
});

// Search Toggler
$(document).ready(function(){
  $(".header-wrapper .search .btn").click(function(){
    $(".header-wrapper .searchtoggle").fadeOut(100);
  });
  $(".header-wrapper .main .btn ").click(function(){
    $(".header-wrapper .searchtoggle").fadeIn(100);
  });
});

// Mailchimp validation
document.addEventListener('submit', function (event) {
    if (!event.target.classList.contains('validate')) return;
    event.preventDefault();
    submitMailChimpForm(event.target);
}, false);

var serialize = function (form) {
    var serialized = '';
    for (i = 0; i < form.elements.length; i++) {
      var field = form.elements[i];
      if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;
      if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
        serialized += '&' + encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
      }
    }
    return serialized;
};

var submitMailChimpForm = function (form) {
  var url = form.getAttribute('action');
  url = url.replace('/post?u=', '/post-json?u=');
  url += serialize(form) + '&c=displayMailChimpStatus';

  var script = window.document.createElement( 'script' );
  script.src = url;

  var ref = window.document.getElementsByTagName( 'script' )[ 0 ];
  ref.parentNode.insertBefore( script, ref );

  script.onload = function () {
    this.remove();
  };
};

var displayMailChimpStatus = function (data) {
  if (!data.result || !data.msg ) return;
  var mcStatus = document.querySelector('.mc-status');
  if (!mcStatus) return;
  mcStatus.innerHTML = data.msg;

  mcStatus.setAttribute('tabindex', '-1');
  mcStatus.focus();

  if (data.result === 'error') {
    mcStatus.classList.remove('success-message');
    mcStatus.classList.add('error-message');
    return;
  }
  mcStatus.classList.remove('error-message');
  mcStatus.classList.add('success-message');
};
