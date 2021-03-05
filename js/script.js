// DOM Elements
const mainPage = document.querySelector('.main-page');
const loginPage = document.querySelector('.login-page');
const middleContent = document.querySelector('.middle-content');
const btnTop = document.querySelector('.btn-top');
const newsFeedPage = document.querySelector('.feeds-page');
const loginModal = document.querySelector('.login-modal');
const modalX = document.querySelector('.login-modal i');
const loginFormBtn = document.querySelector('.login-form-btn');
const tweetBtn = document.querySelector('.tweet-btn');
const modalWrapper = document.querySelector('.modal-wrapper');
const modal = document.querySelector('.modal');
const tweetModalX = document.querySelector('.modal-header i');
const modalTweetBtn = document.querySelector('.modal-header button');
const modalFooterPlus = document.querySelector('.modal-footer span');
const modalInput = document.querySelector('.modal-input');
const user = document.querySelector('.user');
const sidebar = document.querySelector('.sidebar');
const sidebarWrapper = document.querySelector('.sidebar-wrapper');
const xBtn = document.querySelector('.sidebar-header i');
const toggle = document.querySelector('.toggle');
const circle = document.querySelector('.circle');

const feedBtn = document.querySelector("#feed-btn");
const userNameField = document.querySelector("#username");
const contentField = document.querySelector("#content");
const newsfeed = document.querySelector(".newsfeed");
let heartsIcons = document.querySelectorAll(".fa-heart");
let retweetIcons = document.querySelectorAll(".fa-retweet");
/*********************************************************/
/*********************************************************/

// Main page

const goToLoginPage = () => {
    mainPage.style.display = 'none';
    loginPage.style.display = 'grid';
}


middleContent.addEventListener('click', e => {
    if (e.target.classList[1] === 'main-btn') {
        goToLoginPage();
    }
});

btnTop.addEventListener('click', () => {
    const inputUserInfo = document.querySelector('.user-info');
    const inputPassword = document.querySelector('.password');

    if (inputUserInfo.value !== "" && inputPassword.value !== "") {
        mainPage.style.display = 'none';
        newsFeedPage.style.display = 'block';
    } else {
        goToLoginPage();
        loginModal.style.display = 'block';
    }
});

// Login Page

modalX.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

loginFormBtn.addEventListener('click', () => {
    const loginUserInfo = document.querySelector('.login-user-info');
    const loginPassword = document.querySelector('.login-password');

    if (loginUserInfo.value !== "" && loginPassword.value !== "") {
        loginPage.style.display = 'none';
        newsFeedPage.style.display = 'block';
    } else {
        loginModal.style.display = 'block';
    }
});

// News feed page
// tweet modal

tweetBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    modalWrapper.classList.add('modal-wrapper-display');

});

const changeOpacity = (x) => {
    modalTweetBtn.style.opacity = x;
    modalFooterPlus.style.opacity = x;

}

tweetModalX.addEventListener('click', () => {
    modal.style.display = 'none';
    modalWrapper.classList.remove('modal-wrapper-display');

    if (modalInput.value !== "") {
        modalInput.value = "";
        changeOpacity(0.5);
    }
});

modalInput.addEventListener('keypress', (e) => {
    if (e.target.value !== "") {
        changeOpacity(1);
    }
});

modalInput.addEventListener('blur', (e) => {
    if (e.target.value === '') {
        changeOpacity(0.5);
    }
});

// sidebar

user.addEventListener('click', () => {
    sidebar.classList.add('sidebar-display');
    sidebarWrapper.classList.add('sidebar-wrapper-display');
});

xBtn.addEventListener('click', () => {
    sidebar.classList.remove('sidebar-display');
    sidebarWrapper.classList.remove('sidebar-wrapper-display');
});

//Dark mode

const darkElements1 = document.querySelectorAll('.dark-mode-1');
const darkElements2 = document.querySelectorAll('.dark-mode-2');
const lightTexts = document.querySelectorAll('.light-text');
const borders = document.querySelectorAll('.border-color');

toggle.addEventListener('click', () => {
    circle.classList.toggle('move');
    Array.from(darkElements1).map((darkEl1) => darkEl1.classList.toggle('dark-1'));
    Array.from(darkElements2).map((darkEl2) => darkEl2.classList.toggle('dark-2'));
    Array.from(lightTexts).map((lightText) => lightText.classList.toggle('light'));
    Array.from(borders).map((border) => border.classList.toggle('border-color'));
});



// These are the main task for project as need from github guides

// This is function from stackoverflow
function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
}

function countTweets() {
    if (getTweetsFromLocalStorage() !== null) {
        return JSON.parse(localStorage.getItem("tweets")).length;
    } else {
        return 0;
    }
}

function getTweetsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("tweets"));
}

function addTweetToLocalStorage(tweet) {
    const tweets = getTweetsFromLocalStorage() ? getTweetsFromLocalStorage() : [];
    tweets.push(tweet);
    localStorage.setItem("tweets", JSON.stringify(tweets));
}

function refreshGlobalVariables() {
    heartsIcons = document.querySelectorAll(".fa-heart");
    retweetIcons = document.querySelectorAll(".fa-retweet");
}

function createTweet(id, userName, content, before = false) {
    const feed = createElementFromHTML(`
                            <div class="feed border" data-id="${id}">
                                        <div class="user-avatar">
                                            <img src="images/user2.jpg" alt="">
                                        </div>
                                        <div class="feed-content">
                                            <div class="feed-user-info light-text">
                                                <h4>${userName}</h4>
                                                <i class="fas fa-check-circle"></i>
                                                <span>@${userName} 15m</span>
                                            </div>
                                            <p class="feed-text light-text">
                                                    ${content}
                                            </p>
                                            <div class="feed-img">
                                                <img src="images/img1.jpg" alt="">
                                            </div>
                                            <div class="feed-icons">
                                                <i class="far fa-comment"></i>
                                                <i class="fas fa-retweet"></i>
                                                <i class="far fa-heart" ></i>
                                                <i class="fas fa-share-alt"></i>
                                            </div>
                                        </div>
                            </div>`);

    if (!before) {
        newsfeed.append(feed);
    } else {
        newsfeed.firstChild.before(feed)
    }
    refreshGlobalVariables();
}

function createNewTweet(userName, content, before = false) {
    const id = countTweets() + 1;
    createTweet(id, userName, content, before);
    const tweet = { id, userName, content, like: false, retweet: 0 };
    addTweetToLocalStorage(tweet);
    window.location.reload();

}

feedBtn.addEventListener("click", () => {
    const userName = userNameField.value.trim();
    const content = contentField.value.trim();
    if (userName.length !== 0 && content.length !== 0) {
        createNewTweet(userName, content);
        tweetModalX.click();
    }
});

function findTweet(id) {
    const tweets = getTweetsFromLocalStorage();
    return tweets.filter((tweet) => {
        if (tweet.id === id) {
            console.log(id)
            return tweet;
        }
    })[0];
}

function createTweets() {
    const tweets = getTweetsFromLocalStorage();
    if (tweets !== null) {
        newsfeed.innerHTML = "";
        tweets.forEach((tweet) => {
            createTweet(tweet.id, tweet.userName, tweet.content);
        });
    }
}
createTweets();

heartsIcons.forEach((heartIcon) => {
    heartIcon.addEventListener("click", () => {
        heartIcon.classList.toggle("heart-fill")
    });
});
retweetIcons.forEach((retweetIcon) => {
    retweetIcon.addEventListener("click", () => {
        retweetIcon.classList.toggle("retweet-fill");
        let parentIcon = retweetIcon.parentElement;
        while (!parentIcon.classList.contains("feed")) {
            parentIcon = parentIcon.parentElement
        }
        if (parentIcon !== null) {
            const id = +parentIcon.dataset.id;
            const tweet = findTweet(id);
            createNewTweet(tweet.userName, tweet.content, true);
        }
    })
});