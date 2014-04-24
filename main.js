
//feed added quotes into this object
var QuoteFeed = function($target){
	this.quoteFeed = [];
	this.$target = $target;
}

var QuoteInput = function(quote, author, rating){
	this.quote = quote;
	this.author = author;
	this.rating = rating;
	this._renderedObject = null;

}

QuoteFeed.prototype.save = function(){
	var quoteObjectStr = JSON.stringify(this.quoteFeed);
	localStorage.setItem('quoteFeed', quoteObjectStr);
}

QuoteFeed.prototype.load = function(){
	return JSON.parse(localStorage.getItem('quoteFeed'));
}

QuoteFeed.prototype.render = function(listToRender){
  $('.display-quote-container').empty();
  listToRender.forEach(function(object){
    var domToEnter = $('.quote-display-template').clone();
    domToEnter.removeClass('quote-display-template');
    domToEnter.find('.display-quote').text(object['quote']);
    domToEnter.find('.display-author-name').text(object['author']);
    domToEnter.find('.display-rating').raty({ score: object['rating']})
    // domToEnter.find('.display-rating').text(object['rating']);
    domToEnter.css('display', 'block');
    $('.display-quote-container').append(domToEnter);
  })

}

var clearForm = function($targetForm){
  $('.clear').each(function(){
    $(this).val('');
    $('.raty').raty({ score: 0});
  })
}

var feed = new QuoteFeed();

$(document).on('ready', function() {
  var test = feed.load();
  feed.render(test);

  $('.raty').raty();

  $('form').on('submit', function(e){

  	e.preventDefault();

  	var quote = $('[name="quote"]').val();
  	var author = $('[name="author-name"]').val();
  	var rating = $('[name="score"]').val();
  	
  	
  	var quoteObject = new QuoteInput(quote, author, rating);
  	feed.quoteFeed.push(quoteObject);
    feed.save();
  	feed.render(feed.quoteFeed);
    clearForm();

  });


});

