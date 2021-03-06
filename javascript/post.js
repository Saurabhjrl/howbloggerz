// Related Posts
var maxresults=6;
var relatedpoststitle='Read Next';
var relatedTitles = new Array();
var relatedTitlesNum = 0;
var relatedUrls = new Array();
var thumburl = new Array();
var toremove = new Array();
var relatedlabelno = 0;
var urlt = '';
var duplicates = {};

function related_results_labels_thumbs(e) {
    for (var i = 0; i < e.feed.entry.length; i++) {
        var f = e.feed.entry[i];
        if (f.media$thumbnail == null) { continue; }
        relatedTitles[relatedTitlesNum] = f.title.$t;
        a = f.media$thumbnail.url;
        b = a.replace(/\\"/g, '"').replace('s72-c','w400-h232-p-k-no-nu');
        thumburl[relatedTitlesNum] = b;
        relatedUrls[relatedTitlesNum] = f.link[4].href;
        relatedTitlesNum++
    }
    relatedlabelno++;
    if (relatedlabelno == postlabel.length) {
      printRelatedLabels_thumbs();
    }
}

function printRelatedLabels_thumbs() {
    for (var i = 0; i < relatedUrls.length; i++) {
        if ((relatedUrls[i] == currentposturl) || (!(relatedTitles[i]))) {
            relatedUrls.splice(i, 1);
            relatedTitles.splice(i, 1);
            thumburl.splice(i, 1);
            i--
        }
    }

    for (var i = 0; i < relatedUrls.length; i++) {
        if(duplicates.hasOwnProperty(relatedUrls[i])) {
            duplicates[relatedUrls[i]].push(i);
        } else if (relatedUrls.lastIndexOf(relatedUrls[i]) !== i) {
            duplicates[relatedUrls[i]] = [i];
        }
    }
    var dup = Object.values(duplicates);

    for (var i = 0; i < dup.length; i++) {
      for (var r = 0; r < dup[i].length - 1; r++) {
        toremove.push(dup[i][r]);
    }}

    toremove.sort(function(a, b){return b-a});

    for (var i = 0; i < toremove.length; i++) {
      relatedUrls.splice(toremove[i], 1);
      relatedTitles.splice(toremove[i], 1);
      thumburl.splice(toremove[i], 1);
    }


    var r = Math.floor((relatedTitles.length - 1) * Math.random());
    var i = 0;
    var rhtml = '';
    if (relatedTitles.length > 0) var rtitle = '<h3>' + relatedpoststitle + '</h3>';
    while (i < relatedTitles.length && i < 20 && i < maxresults) {
        rhtml += '<div class="col mb-4"><div class="card h-100"><a href="' + relatedUrls[r] + '"><img class="card-img-top lazyload" alt="' + relatedTitles[r] + '" data-src="' + thumburl[r] + '"/></a><div class="card-body"><h3 class="card-title"><a href="' + relatedUrls[r] + '" rel="bookmark">' + relatedTitles[r] + '</a></h3></div></div></div>';
        if (r < relatedTitles.length - 1) {
            r++
        } else {
            r = 0
        }
        i++
    };
    $( "#related-posts" ).html(rhtml);
    $("#related-title .col").html(rtitle);
    relatedUrls.splice(0, relatedUrls.length);
    thumburl.splice(0, thumburl.length);
    thumburl.splice(0, relatedTitles.length);
}

if (postlabel.length > 0) {
for (var i = 0; i < postlabel.length; i++) {
  urlt = '/feeds/posts/default/-/' + postlabel[i]  + '?alt=json-in-script&callback=related_results_labels_thumbs&max-results=7'
$.ajax({
  method: "GET",
  url: urlt,
  dataType: "script"
});
}}

// Comment Collapse
$('#collapsecomments').on('shown.bs.collapse', function () {
  $('#comments .btn span').html("Hide");
})
$('#collapsecomments').on('hidden.bs.collapse', function () {
  $('#comments .btn span').html("Show");
})

// In article ad
var inartad = '<div id="AdSense1"><ins class="adsbygoogle" data-ad-client="ca-pub-9953474513364330" data-ad-format="fluid" data-ad-layout="in-article" data-ad-slot="6966307993" style="display:block; text-align:center;"/></div>'
if($(".post-body > p:lt(1)").length){
	$(inartad).insertAfter($('.post-body > p:lt(1)'));
}
else if($(".post-body > br:lt(1)").length){
	$(inartad).insertAfter($('.post-body > br:lt(1)'));
}
// Adsense max push
(adsbygoogle = window.adsbygoogle || []).push({});
(adsbygoogle = window.adsbygoogle || []).push({});
(adsbygoogle = window.adsbygoogle || []).push({});

// Comments
$(".rly").click(function() {
    var cid = $(this).data("id");
    var csrc = $(this).data("src");
    var cactive = $(".comments ul").attr("data-active");
    var cframe = "<iframe allowtransparency='allowtransparency' src='" + csrc + "' id='comment-editor' name='comment-editor' frameborder='0' width='100%'/>";
    if (cactive !== '') {
        $("#" + cactive + " .comment-replybox").empty();
        $("#" + cactive + " .rly").removeAttr("disabled");
    } else {
        $(".comment-form iframe").hide();
        $(".comment-form .btn").show();
    };
    $("#" + cid + " .comment-replybox").append(cframe);
    $(".comments ul").attr("data-active", cid);
    $(this).attr("disabled","disabled");
    $('html, body').animate({
        scrollTop: $("#" + cid + " .comment-replybox").offset().top - 300
    }, 1000);
});
$(".comment-form .btn").click(function() {
    var cactive = $(".comments ul").attr("data-active");
    $("#" + cactive + " .comment-replybox").empty();
    $("#" + cactive + " .rly").removeAttr("disabled");
    $(".comment-form .btn").hide();
    $(".comment-form iframe").show();
    $(".comments ul").attr("data-active", "");
});
$(".dlt").on('click', function() {
    var cdlt = $(this).data("src");
    window.open(cdlt, '_self');
});
