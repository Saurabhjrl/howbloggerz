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
        rhtml += '<div class="col mb-4"><div class="card h-100"><a href="' + relatedUrls[r] + '"><img class="card-img-top" alt="' + relatedTitles[r] + '" src="' + thumburl[r] + '"/></a><div class="card-body"><h3 class="card-title"><a href="' + relatedUrls[r] + '" rel="bookmark">' + relatedTitles[r] + '</a></h3></div></div></div>';
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
