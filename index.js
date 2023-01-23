import { tweetsData } from './data.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


document.addEventListener('click', function (e) {
  if (e.target.dataset.like) handleLikeClick(e.target.dataset.like);
  else if (e.target.dataset.retweet)
    handleRetweetClick(e.target.dataset.retweet);
  else if (e.target.dataset.reply) handleReplyClick(e.target.dataset.reply);
  else if (e.target.id === 'tweet-btn') handleTweetSubmit();
});

function handleLikeClick(tweetId) {
  // it will return as array, to make it return object use index
  const targetedTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId;
  })[0];
  if (targetedTweetObj.isLiked) {
    targetedTweetObj.likes--;
    //targetedTweetObj.isLiked = false
  } else {
    targetedTweetObj.likes++;
    //targetedTweetObj.isLiked = true;
  }

  //other way to flip the boolean
  targetedTweetObj.isLiked = !targetedTweetObj.isLiked;
  renderTweets();
}

function handleRetweetClick(tweetId) {
  const targetedTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId;
  })[0];

  if (targetedTweetObj.isRetweeted) targetedTweetObj.retweets--;
  else targetedTweetObj.retweets++;

  targetedTweetObj.isRetweeted = !targetedTweetObj.isRetweeted;
  renderTweets();
}

function handleReplyClick(replyId) {
  const targetedTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === replyId;
  })[0];
  const tweetId = targetedTweetObj.uuid;

  document.getElementById(`replies-${tweetId}`).classList.toggle('hidden');
}

function handleTweetSubmit() {
    let tweetInput = document.getElementById('tweet-input');

  if (tweetInput.value) {
    tweetsData.unshift({
      handle: `@Scrimba`,
      profilePic: `images/scrimbalogo.png`,
      likes: 0,
      retweets: 0,
      tweetText: tweetInput.value,
      replies: [],
      isLiked: false,
      isRetweeted: false,
      uuid: uuidv4(),
    });
    tweetInput.value = '';
    renderTweets();
  }
}

function getFeedHtml() {
  let stringHtml = '';

  tweetsData.forEach((tweet) => {
    let likeClass = '';
    let retweetClass = '';
    let repliesHTML = '';

    if (tweet.isLiked) likeClass = 'liked';

    if (tweet.isRetweeted) retweetClass = 'retweeted';

    if (tweet.replies.length > 0) {
      tweet.replies.forEach(function (reply) {
        repliesHTML += `
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
                </div>
            `;
      });
    }

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
                                <i class="fa-solid fa-heart ${likeClass}" data-like="${tweet.uuid}"></i>${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet ${retweetClass}" data-retweet="${tweet.uuid}"></i>${tweet.retweets}
                            </span>
                        </div>   
                    </div>            
                </div>
                <div id="replies-${tweet.uuid}" class='hidden'>
                    ${repliesHTML}
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
