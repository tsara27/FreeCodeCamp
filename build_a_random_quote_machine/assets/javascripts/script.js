function trimContent(content, author) {
  var whole_text = content + ' - ' + author;
  if (whole_text.length > 140) {
    var trim_length = 140 - 7 - author.length;
    return content.slice(0, trim_length) + '...  - ' + author;
  }
  return whole_text;
}

$('.quote-box').html('<div class="col-xs-12 loading"><i class="fa fa-cog fa-spin fa-3x fa-fw"></i><span class="sr-only">Loading...</span></div>');
$(function() {
  $.getJSON("http://www.quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(a) {
    var content = a[0].content;
    var author = a[0].title;
    var content_html = $.parseHTML(content);
    var content_text = $(content_html).text();
    var tweet = trimContent(content_text, author);
    var tweet_button = '<a class="twitter-share-button" target="_blank" href="https://twitter.com/intent/tweet?text='+ encodeURIComponent(tweet)+'" data-size="large"><i class="fa fa-twitter fa-lg"></i> Tweet</a>';

    $(".quote-box").html('<div class="col-xs-1 quote"></div><div class="col-xs-10"><div class="box"></div></div>');
    $(".box").html(content + '<p class="author"> ' + author + '</p>' + tweet_button);
  });
});
