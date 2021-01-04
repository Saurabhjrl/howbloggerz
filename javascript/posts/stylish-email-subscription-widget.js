window.addEventListener('DOMContentLoaded', function() {
    (function($) {
  function SwitchFunction() {
    if ($('#SocialSwitch').prop("checked") == true) {
      $('#SocialList').removeClass("disabled");
    } else if ($('#SocialSwitch').prop("checked") == false) {
      $('#SocialList').addClass("disabled");
    }
  };

  function ListFunction(x) {
    if ($(x).prop("checked") == true) {
      $(x).parent().siblings().removeClass("disabled");
    } else if ($(x).prop("checked") == false) {
      $(x).parent().siblings().addClass("disabled");
    }
  };

  function CountFunction() {
    $(".socialCount span").text($(".socialCount input").val())
  };

  SwitchFunction();
  CountFunction();
  $("#SocialList .input-group-text input").each(function() {
    ListFunction(this);
  });

  $('#SocialSwitch').click(function() {
    SwitchFunction();
  });

  $('#SocialList .input-group-text input').click(function() {
    ListFunction(this);
  });

  $(".socialCount input").on('input', function() {
    CountFunction();
  });
  $("#searchbox").submit(function(e){
    e.preventDefault();
  });
  $('button.generated').click(function() {
  codeGenerator();
  });
})(jQuery);
});

function codeGenerator() {
  var stylemain = $('.style input:checked').siblings('.styleMain').html();
  var socialcssresult = socialhtmlresultup = socialhtmlresultdown = "";
  var heading = $('.heading input').val();
  var email = $('.email input').val();
  var submit = $('.submit input').val();
  var uri = $('.uri input').val();

  if ($('#SocialSwitch').prop("checked") == true) {
    var stylesocial = $('.style input:checked').siblings('.styleSocial').html();
    var socialnormsskin = facebookmain = facebookcss = instagrammain = instagramcss = youtubemain = youtubecss = pinterestmain = pinterestcss = rssmain = rsscss = twittermain = twittercss = '';

if ($('.facebook .form-check-input').prop("checked") == true) {
  var facebookurl = $(".facebook > input").val();
  facebookmain = `
    <li><a class="facebook" href="${facebookurl}" target="_blank"><i class="fab fa-facebook-f"></i></a></li>`;
  facebookcss = `

#hbzsub .social-hbz a.facebook {
  background-color: #32528c;
}`;}
if ($('.instagram .form-check-input').prop("checked") == true) {
  var instagramurl = $(".instagram > input").val();
  instagrammain = `
    <li><a class="instagram" href="${instagramurl}" target="_blank"><i class="fab fa-instagram"></i></a></li>`;
  instagramcss = `

#hbzsub .social-hbz a.instagram {
  background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
}`;}
if ($('.youtube .form-check-input').prop("checked") == true) {
  var youtubeurl = $(".youtube > input").val();
  youtubemain = `
    <li><a class="youtube" href="${youtubeurl}" target="_blank"><i class="fab fa-youtube"></i></a></li>`;
  youtubecss = `

#hbzsub .social-hbz a.youtube {
  color: #f70000;
  background-color: #fff;
}`;}
if ($('.pinterest .form-check-input').prop("checked") == true) {
  var pinteresturl = $(".pinterest > input").val();
  pinterestmain = `
    <li><a class="pinterest" href="${pinteresturl}" target="_blank"><i class="fab fa-pinterest-p"></i></a></li>`;
  pinterestcss = `

#hbzsub .social-hbz a.pinterest {
  background-color: #df0022;
}`;}
if ($('.rss .form-check-input').prop("checked") == true) {
  var rssurl = $(".rss > input").val();
  rssmain = `
    <li><a class="rss" href="${rssurl}" target="_blank"><i class="fas fa-rss"></i></a></li>`;
  rsscss = `

#hbzsub .social-hbz a.rss {
  background-color: #ef8021;
}`;}
if ($('.twitter .form-check-input').prop("checked") == true) {
  var twitterurl = $(".twitter > input").val();
  twittermain = `
    <li><a class="twitter" href="${twitterurl}" target="_blank"><i class="fab fa-twitter"></i></a></li>`;
  twittercss = `

#hbzsub .social-hbz a.twitter {
  background-color: #50abf1;
}`;}

if ($('#NormSwitch').prop("checked") == true) {
  socialnormsskin = " norms";
  facebookcss = youtubecss = twittercss = instagramcss = pinterestcss = rsscss = "";
};

var nocount = 100/$(".socialCount input").val();
var stylewidth = `

#hbzsub .social-hbz ul li {
  width: ${nocount}%
}`

socialcssresult = `
${stylesocial}${stylewidth}${facebookcss}${youtubecss}${twittercss}${instagramcss}${pinterestcss}${rsscss}`;

var socialhtmlresult = `
 <div class="social-hbz${socialnormsskin}">
  <ul>${facebookmain}${youtubemain}${twittermain}${instagrammain}${pinterestmain}${rssmain}
  </ul>
 </div>`;
 var socialhtmlresultup = socialhtmlresultdown = "";
 if ($(".style input.socialUp").prop("checked") == true){
   socialhtmlresultup = socialhtmlresult;
 } else {
   socialhtmlresultdown = socialhtmlresult;
 };
};

  var result = `<style>
${stylemain}${socialcssresult}
</style>

<div id='hbzsub'>${socialhtmlresultup}
 <div class='hbzsignup-form'>
  <div class='hbzform-inner'>
   <h4>${heading}</h4>
  </div>
  <div class='hbzemailform'>
   <form action='http://feedburner.google.com/fb/a/mailverify' id='subscribe' method='post' onsubmit='window.open(&apos;http://feedburner.google.com/fb/a/mailverify?uri=${uri}&apos;, &apos;popupwindow&apos;, &apos;scrollbars=yes,width=550,height=520&apos;);return true' target='popupwindow'>
    <input name='uri' type='hidden' value='${uri}'/>
    <input name='loc' type='hidden' value='en_US'/>
    <input class='hbzemailbox' name='email' required='' type='text' placeholder='${email}'/>
    <input class='hbzemailbutton' type='submit' value='${submit}'/>
   </form>
  </div>
 </div>${socialhtmlresultdown}
</div>`;
  if ($(".style input:checked").length == 1) {
    if ($("#SocialList .input-group input:checked").length >= 1 || $('#SocialSwitch').prop("checked") == false) {
    $('pre code.results').text(result).html();
    Prism.highlightElement($('pre code.results')[0]);
    } else {
    $('pre code.results').text("Please select atleast one Social link or disable social icons")
    }
  } else {
    $('pre code.results').text("Please select one subscription form")
  }
};
