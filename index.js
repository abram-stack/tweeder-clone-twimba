import { tweetsData } from './data.js';

let tweetInput = document.getElementById('tweet-input');
const tweetButton = document.getElementById('tweet-btn');



document.addEventListener('click', function (e) {
    // if there is data-attribute with like exist
    if (e.target.dataset.like)
        handleLikeClick(e.target.dataset.like);
    else if (e.target.dataset.retweet)
        handleRetweetClick(e.target.dataset.retweet)
    else if (e.target.dataset.reply)
            handleReplyClick(e.target.dataset.reply)
})


function handleLikeClick(tweetId) {
    // it will return as array, to make it return object use index
    const targetedTweetObj = tweetsData.filter(function (tweet) {
        return tweet.uuid === tweetId
    })[0]
    if (targetedTweetObj.isLiked) {
        targetedTweetObj.likes--;
        //targetedTweetObj.isLiked = false
    }
    else {
        targetedTweetObj.likes++
        //targetedTweetObj.isLiked = true;
    }

    //other way to flip the boolean
    targetedTweetObj.isLiked = !targetedTweetObj.isLiked
    renderTweets()
}

function handleRetweetClick(tweetId) {
    console.log('retweet', tweetId);    
}
function handleReplyClick(tweetId) {
    console.log('reply', tweetId)
}

tweetButton.addEventListener('click', function () {
  console.log(tweetInput.value);
  tweetInput.value = '';
  tweetInput = '';
});

function getFeedHtml() {
    let stringHtml = '';

  tweetsData.forEach((tweet) => {
    stringHtml += `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>${tweet.replies.length}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart" data-like="${tweet.uuid}"></i>${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet" data-retweet="${tweet.uuid}"></i>${tweet.retweets}
                            </span>
                        </div>   
                    </div>            
                </div>
            </div>
        `;
  });
    return stringHtml;
}

function renderTweets() {
   document.getElementById('feed').innerHTML = getFeedHtml();
}

renderTweets();

