const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader'); 

function showLoadingSpinner() {
    // attribute hidden
    loader.hidden = false;
    // false we want to show it
    quoteContainer.hidden = true;
    // the opposite   
}
function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }      
}
// Get Quote From API Andr
// We are creating an asynchronous function
// An asynchronous function will await the execution of a promise
// The name is getQuote
// We want to declare or function first
// We add to the link:  ?method=getQuote&lang=en&format=json'
// Then set up a tri catch stament --- catch is designed for errors
// General explanation, becausw we have an asynchrous function. This cosnt is not going to be set until this finishes fetching.  This data will not be set until it finishes returning this response in Jason Format
// Note; when we use free apis --usually not work -- the API might not be properly configured - But there is a solution 
// First, we call a proxy API  and then quote API
async function getQuote() {
    // add
    showLoadingSpinner();
    // We need to use Proxy URL to make our API call in order to avoid andr
    const proxyUrl = 'http://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
      // magic of this function
      //In fectch - combine these two url's together - Essential going to make our API call using our headers from our proxy call
      //Now passing the data into the elements
      //get rid of the console log
      // Instead of console use a new quote
      const response = await fetch(proxyUrl + apiUrl);
      const data = await response.json();
    //   Check if Author field is black and replace it with 'Unknown' andr
      if (data.quoteAuthor === '') {
          authorText.innerText = 'Unknown'  //string
      } else {
          authorText.innerText = data.quoteAuthor;   
      }
    //   Dynamically reduce font size for long quotes andr
      if (data.quoteText.length > 120) {
          quoteText.classList.add('long-qoute');
      } else {
          quoteText.classList.remove('long-quote');
      }
    } catch (error){
        getQuote();
        // We encounter with an error, we run getQuote again -  this is what we call recursive function
        // A recursive function is a function that calls itself (kind of mind melting)
        // Again, if there is an error, run getQuote again
        // In order to fix the error we create a counter to run up to 10 and stop (may be a solution)
        // get rif of the console log
    // add strind and pass in our error message
    }
}

// Tweet Quote - Andr
function tweetQuoute() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    //We are adding a query with a question mark
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    // lastly we're going to open a new tab and pass in the Twitter we made
    window.open(twitterUrl, '_blank');
}

//Event Listeners - we are going to have two btn elements - will make it run
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuoute);


// We want it to run
// On Load
// we want this to be at the bottom because you always want this function to be declared before we call it
//loading(); use only to see it
getQuote();