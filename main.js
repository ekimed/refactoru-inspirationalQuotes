
//feed added quotes into this object
var QuoteFeed = function($target){
	this.quoteFeed = [];
	this.$target = $target;
}

var QuoteInput = function(quote, author, rating){
	this.quote = quote;
	this.author = author;
	this.rating = rating;
	// this._idCount = null;

}

QuoteFeed.prototype.save = function(quoteFeed){
	var quoteObjectStr = JSON.stringify(quoteFeed);
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
    // domToEnter.attr('id', object._idCount);
    domToEnter.find('.display-quote').text(object['quote']);
    domToEnter.find('.display-author-name').text(object['author']);
    domToEnter.find('.display-rating').raty({ score: object['rating']})
    domToEnter.css('display', 'block');
    $('.display-quote-container').append(domToEnter);
    domToEnter.data('quoteObject', object);
  })

}

function sortedByHighestRating (a,b){
  return b.rating - a.rating;
}

// QuoteFeed.prototype.remove = function(){

// }

var clearForm = function($target){
  $($target).each(function(){
    $(this).val('');
    $('.raty').raty({ score: 0});
  })
}

var feed = new QuoteFeed();
// var idCount = 0;




$(document).on('ready', function() {
  $('.raty').raty();

  if(feed.load() != null){

    var test = feed.load();

    for (var i = 0; i<test.length; i++){
      feed.quoteFeed.push(test[i]);
    }
    feed.render(test);
  }
  $('form').on('submit', function(e){

    e.preventDefault();

    var quote = $('[name="quote"]').val();
    var author = $('[name="author-name"]').val();
    var rating = $('[name="score"]').val();
    
    
    var quoteObject = new QuoteInput(quote, author, rating);
    // quoteObject._idCount = idCount;
    feed.quoteFeed.push(quoteObject);
    feed.quoteFeed.sort(sortedByHighestRating);
    feed.save(feed.quoteFeed);
    feed.render(feed.quoteFeed);
    // idCount += 1;
    clearForm('.clear');

  });

  $('.display-quote-container').on('click', '.rm-btn', function(){
    var test = $(this).parent().data('quoteObject');
    for (var i=0; i<feed.quoteFeed.length; i++){
      if (feed.quoteFeed[i] === test){
        feed.quoteFeed.splice(i, 1);
        feed.quoteFeed.sort(sortedByHighestRating);
        feed.save(feed.quoteFeed);
        feed.render(feed.quoteFeed);

      }
    }
  });

  $('.show-form').on('click', 'i', function(){

    $('.form-container').slideToggle();
  });

  $('i').hover(function(){
    $(this).css("color","green")
  }, function(){
    $(this).css("color", "black")
  });


});

