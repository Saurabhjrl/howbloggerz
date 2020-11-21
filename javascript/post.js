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

// Page Navigation
if (typeof firstText == "undefined") firstText = "First";
if (typeof lastText == "undefined") lastText = "Last";
var noPage;
var currentPage;
var currentPageNo;
var postLabel;
pagecurrentg();

function looppagecurrentg(a) {
    var b = '';
    pageNumber = parseInt(numPages / 2);
    if (pageNumber == numPages - pageNumber) {
        numPages = pageNumber * 2 + 1
    }
    pageStart = currentPageNo - pageNumber;
    if (pageStart < 1) pageStart = 1;
    lastPageNo = parseInt(a / perPage) + 1;
    if (lastPageNo - 1 == a / perPage) lastPageNo = lastPageNo - 1;
    pageEnd = pageStart + numPages - 1;
    if (pageEnd > lastPageNo) pageEnd = lastPageNo;
    b += "<span class='showpageOf'>Page " + currentPageNo + ' of ' + lastPageNo + "</span>";
    var c = parseInt(currentPageNo) - 1;
    if (currentPageNo > 1) {
        if (currentPage == "page") {
            b += '<span class="showpage firstpage"><a href="' + home_page + '">' + firstText + '</a></span>'
        } else {
            b += '<span class="displaypageNum firstpage"><a href="/search/label/' + postLabel + '?&max-results=' + perPage + '">' + firstText + '</a></span>'
        }
    }
    if (currentPageNo > 2) {
        if (currentPageNo == 3) {
            if (currentPage == "page") {
                b += '<span class="showpage"><a href="' + home_page + '">' + prevText + '</a></span>'
            } else {
                b += '<span class="displaypageNum"><a href="/search/label/' + postLabel + '?&max-results=' + perPage + '">' + prevText + '</a></span>'
            }
        } else {
            if (currentPage == "page") {
                b += '<span class="displaypageNum"><a href="#" onclick="redirectpage(' + c + ');return false">' + prevText + '</a></span>'
            } else {
                b += '<span class="displaypageNum"><a href="#" onclick="redirectlabel(' + c + ');return false">' + prevText + '</a></span>'
            }
        }
    }
    if (pageStart > 1) {
        if (currentPage == "page") {
            b += '<span class="displaypageNum"><a href="' + home_page + '">1</a></span>'
        } else {
            b += '<span class="displaypageNum"><a href="/search/label/' + postLabel + '?&max-results=' + perPage + '">1</a></span>'
        }
    }
    if (pageStart > 2) {
        b += ' ... '
    }
    for (var d = pageStart; d <= pageEnd; d++) {
        if (currentPageNo == d) {
            b += '<span class="pagecurrent">' + d + '</span>'
        } else if (d == 1) {
            if (currentPage == "page") {
                b += '<span class="displaypageNum"><a href="' + home_page + '">1</a></span>'
            } else {
                b += '<span class="displaypageNum"><a href="/search/label/' + postLabel + '?&max-results=' + perPage + '">1</a></span>'
            }
        } else {
            if (currentPage == "page") {
                b += '<span class="displaypageNum"><a href="#" onclick="redirectpage(' + d + ');return false">' + d + '</a></span>'
            } else {
                b += '<span class="displaypageNum"><a href="#" onclick="redirectlabel(' + d + ');return false">' + d + '</a></span>'
            }
        }
    }
    if (pageEnd < lastPageNo - 1) {
        b += '...'
    }
    if (pageEnd < lastPageNo) {
        if (currentPage == "page") {
            b += '<span class="displaypageNum"><a href="#" onclick="redirectpage(' + lastPageNo + ');return false">' + lastPageNo + '</a></span>'
        } else {
            b += '<span class="displaypageNum"><a href="#" onclick="redirectlabel(' + lastPageNo + ');return false">' + lastPageNo + '</a></span>'
        }
    }
    var e = parseInt(currentPageNo) + 1;
    if (currentPageNo < (lastPageNo - 1)) {
        if (currentPage == "page") {
            b += '<span class="displaypageNum"><a href="#" onclick="redirectpage(' + e + ');return false">' + nextText + '</a></span>'
        } else {
            b += '<span class="displaypageNum"><a href="#" onclick="redirectlabel(' + e + ');return false">' + nextText + '</a></span>'
        }
    }
    if (currentPageNo < lastPageNo) {
        if (currentPage == "page") {
            b += '<span class="displaypageNum lastpage"><a href="#" onclick="redirectpage(' + lastPageNo + ');return false">' + lastText + '</a></span>'
        } else {
            b += '<span class="displaypageNum lastpage"><a href="#" onclick="redirectlabel(' + lastPageNo + ');return false">' + lastText + '</a></span>'
        }
    }
    var f = document.getElementsByName("pageArea");
    var g = document.getElementById("blog-pager");
    for (var p = 0; p < f.length; p++) {
        f[p].innerHTML = b
    }
    if (f && f.length > 0) {
        b = ''
    }
    if (g) {
        g.innerHTML = b
    }
}

function totalcountdata(a) {
    var b = a.feed;
    var c = parseInt(b.openSearch$totalResults.$t, 10);
    console.log(c);
    looppagecurrentg(c)
}

function pagecurrentg() {
    var a = urlactivepage;
    if (a.indexOf("/search/label/") != -1) {
        if (a.indexOf("?updated-max") != -1) {
            postLabel = a.substring(a.indexOf("/search/label/") + 14, a.indexOf("?updated-max"))
        } else {
            postLabel = a.substring(a.indexOf("/search/label/") + 14, a.indexOf("?&max"))
        }
    }
    if (a.indexOf(".html") == -1) {
        if (a.indexOf("/search/label/") == -1) {
            currentPage = "page";
            if (urlactivepage.indexOf("#PageNo=") != -1) {
                currentPageNo = urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length)
            } else {
                currentPageNo = 1
            }
            if (a.indexOf("q=") == -1) {
                document.write("<script src=\"" + home_page + "feeds/posts/summary?max-results=1&alt=json-in-script&callback=totalcountdata\"><\/script>")
            } else {
                document.write("<script src=\"" + home_page + "feeds/posts/summary?q=" + a.split("?")[1].split("q=")[1].split("&")[0] + "&alt=json-in-script&callback=totalcountdata\"><\/script>")
            }
        } else {
            currentPage = "label";
            if (a.indexOf("&max-results=") == -1) {
                perPage = 20
            }
            if (urlactivepage.indexOf("#PageNo=") != -1) {
                currentPageNo = urlactivepage.substring(urlactivepage.indexOf("#PageNo=") + 8, urlactivepage.length)
            } else {
                currentPageNo = 1
            }
            document.write('<script src="' + home_page + 'feeds/posts/summary/-/' + postLabel + '?alt=json-in-script&callback=totalcountdata&max-results=1" ><\/script>')
        }
    }
}

function redirectpage(a) {
    jsonstart = (a - 1) * perPage;
    noPage = a;
    var b = document.getElementsByTagName('head')[0];
    var c = document.createElement('script');
    c.type = 'text/javascript';
    if (urlactivepage.indexOf("?q=") == -1) {
        c.setAttribute("src", home_page + "feeds/posts/summary?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost")
    } else {
        c.setAttribute("src", home_page + "feeds/posts/summary?start-index=" + jsonstart + "&alt=json-in-script&q=" + urlactivepage.split("?")[1].split("q=")[1].split("&")[0] + "&callback=finddatepost")
    }
    b.appendChild(c)
}

function redirectlabel(a) {
    jsonstart = (a - 1) * perPage;
    noPage = a;
    var b = document.getElementsByTagName('head')[0];
    var c = document.createElement('script');
    c.type = 'text/javascript';
    c.setAttribute("src", home_page + "feeds/posts/summary/-/" + postLabel + "?start-index=" + jsonstart + "&max-results=1&alt=json-in-script&callback=finddatepost");
    b.appendChild(c)
}

function finddatepost(a) {
    post = a.feed.entry[0];
    var b = post.published.$t.substring(0, 19) + post.published.$t.substring(23, 29);
    var c = encodeURIComponent(b);
    if (currentPage == "page") {
        if (urlactivepage.indexOf("?q=") == -1) {
            var d = "/search?updated-max=" + c + "&max-results=" + perPage + "#PageNo=" + noPage
        } else {
            var d = "/search?updated-max=" + c + "&q=" + urlactivepage.split("?")[1].split("q=")[1].split("&")[0] + "&max-results=" + perPage + "#PageNo=" + noPage
        }
    } else {
        var d = "/search/label/" + postLabel + "?updated-max=" + c + "&max-results=" + perPage + "#PageNo=" + noPage
    }
    location.href = d
}
