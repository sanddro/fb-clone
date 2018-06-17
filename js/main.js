let createFriend = friend => {
    return `
        <div class="friend">
            <div class="round-icon" style="background-image: url(${friend.avatar_url});"></div>
            <div class="friend-name">${friend.name} ${friend.lastname}</div>
            <div class="friend-status ${!friend.last_online ? 'online' : ''}">
                ${friend.last_online ? (friend.last_online + 'm') : ''} 
            </div>
            <div class="friend-info">
                <div class="friend-photo" style="background-image: url(${friend.avatar_url});"></div>
                <div>
                    <a class="friend-name-link" href="">${friend.name} ${friend.lastname}</a>
                    <span class="friend-followers">${friend.followers ? (friend.followers + ' followers') : ''}</span>
                    <div class="living-block">
                        <i class="fa fa-home"></i>Lives in
                        <span class="living">${friend.country}, ${friend.city}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

let createGame = game => {
    return `
        <div class="game" style="background-image: url(${game.game_photo});"></div>
    `;
}

let createInstantGame = game => {
    return `
    <div class="game friend-photo" style="background-image: url(${game.avatar_url});">
        <div class="game-logo" style="background-image: url(${game.game_photo});"></div>
    </div>
    `;
}

let createStory = story => {
    return `
        <div class="story">
            <div class="round-icon" style="background-image: url(${story.author.avatar_url});"></div>
            <div class="story-info">
                <div class="story-author">${story.author.name}</div>
                <div class="story-time">${story.uploaded} minutes ago</div>
            </div>
        </div>
    `;
}

let createComment = (comment, isNew) => {
    return `
        <div class="comment ${isNew ? 'new' : ''}">
            <div class="round-icon" style="background-image: url(${comment.author.avatar_url})"></div>
            <div class="comment-body">
                <a href="" class="comment-author">${comment.author.name}</a>
                <span class="comment-text">
                    ${comment.text}
                </span>
            </div>
        </div>
    `;
}

let createComments = comments => { 
    let res = '';
    comments.forEach(comment => res += createComment(comment));
    return res;
}

let createPost = post => {
    return `
        <div class="feed-section post">
            <div class="post-top">
                <div class="post-author-icon" style="background-image: url(${post.author.avatar_url})"></div>
                <div class="post-info">
                    <div class="post-author">${post.author.name}</div>
                    <div class="post-time">${post.time_posted} mins
                        <span class="public"></span>
                    </div>
                </div>
                <div class="round-icon dots"></div>
            </div>
            <div class="post-body">
                ${post.text}
            </div>
            <div class="post-bottom">
                <button class="post-bottom-btn post-like-btn">
                    <span class="icon like"></span> Like</button>
                <button class="post-bottom-btn comment-btn">
                    <span class="icon comment-icon"></span> Comment</button>
            </div>
            <div class="comments-block">
                <div class="likes-block ${!post.likes ? 'no-likes' : ''}">
                    <div class="likes-icon"></div>
                    <div class="likes-count">${post.likes}</div>
                </div>
                <div class="comments">
                    ${createComments(post.comments)}
                </div>
                <div class="write-comment-block">
                    <div class="user-avatar round-icon" style="background-image: url(${post.author.avatar_url})"></div>
                    <input type="text" class="comment-input" placeholder="Write a comment...">
                </div>
            </div>
        </div>
    `
}

let addConv = () => {
    let friends = document.querySelector('.friends');
    data.friends.forEach(friend => friends.innerHTML += createFriend(friend));
};

let addGames = () => {
    let mainGames = document.querySelector('.main-games');
    data.main_games.forEach(game => mainGames.innerHTML += createGame(game));
}

let addInstantGames = () => {
    let instantGames = document.querySelector('.instant-games');
    data.instant_games.forEach(game => instantGames.innerHTML += createInstantGame(game));
}

let addStories = () => {
    let stories = document.querySelector('.stories');
    data.stories.forEach(story => stories.innerHTML += createStory(story));
}

let addPosts = () => {
    let posts = document.querySelector('.posts');
    data.posts.forEach(post => posts.innerHTML += createPost(post));
}

addConv();
addConv();
addConv();
addConv();

addGames();
addInstantGames();
addStories();
addPosts();


document.querySelector('.search-input').onblur = function () {
    if (document.querySelector('.recent-searches:hover')) {
        this.focus();
    }
}

document.querySelectorAll('.user-name').forEach(elem => elem.innerHTML += data.user.name);

document.querySelectorAll('.user-lastname').forEach(elem => elem.innerHTML += ' ' + data.user.lastname);

document.querySelectorAll('.user-avatar').forEach(elem => elem.style.backgroundImage = `url(${data.user.avatar_url})`);

document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.onmousedown = function () {
        if (document.activeElement === this && !this.querySelector('.popup:hover')) {
            this.blur();
            return false;
        }
    }
});

document.querySelector('.conversations').onmousemove = function () {
    if (document.querySelector('.friend:hover')) {
        this.style.paddingLeft = '400px';
        document.querySelector('.games').style.left = '401px';
    } else {
        this.style.paddingLeft = '0';
        document.querySelector('.games').style.left = '1px';
    }
}

document.querySelector('.conv-search-inp').onkeyup = function (e) {
    let val = this.value.toLowerCase();
    document.querySelectorAll('.friend').forEach(function (fr) {
        let name = fr.querySelector('.friend-name').innerHTML.toLowerCase();
        if (name.indexOf(val) != -1) {
            fr.style.display = '';
        } else {
            fr.style.display = 'none';
        }
    });
}

function controlScroll(elem, down) {
    let rect = elem.getBoundingClientRect();
    let elemTop = rect.top;
    let elemBottom = rect.bottom;

    let isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    if (isVisible) return;
    if (down && elemBottom <= window.innerHeight) {
        elem.style.position = 'fixed';
        elem.style.bottom = '0';
        elem.style.top = 'auto';
    } else if (!down && elemTop >= 0) {
        elem.style.position = 'fixed';
        elem.style.top = '0';
        elem.style.bottom = '';
    } else {
        elem.style.position = 'absolute';
        elem.style.top = scrollTop + elemTop + 'px';
        elem.style.bottom = '';
    }
}

let scrollTop = 0;

document.addEventListener('scroll', function (e) {

    let leftSb = document.querySelector('.left-sidebar');
    let mainRight = document.querySelector('.main-right');

    let st = window.pageYOffset || document.documentElement.scrollTop;
    let down = st > scrollTop;
    scrollTop = st;

    controlScroll(leftSb, down);
    controlScroll(mainRight, down);
});

document.querySelector('.post-input').onfocus = function () {
    document.querySelector('.black-bg').classList.remove('initial');
    document.querySelector('.black-bg').classList.add('active');
    document.querySelector('.make-post-block').style.zIndex = '300';
    document.querySelector('.make-post-submit-block').style.display = 'flex';
}

document.querySelector('.post-input').onblur = function() {
    if (!posting && document.querySelector('.make-post-block:hover')) {
        this.focus();
        return;
    }
    document.querySelector('.make-post-submit-block').style.display = '';
    document.querySelector('.black-bg').classList.remove('active');
    setTimeout(() => {
        document.querySelector('.black-bg').classList.add('initial');
        document.querySelector('.make-post-block').style.zIndex = '';
    }, 300);
}

let addPostLikesListeners = () => {
    let btns = document.querySelectorAll('.post-like-btn');
    btns.forEach(btn => {
        btn.onclick = () => {
            let change = btn.classList.contains('liked') ? -1 : 1;
            let post = btn.closest('.post');
            let likesCountElem = post.querySelector('.likes-count');
            likesCountElem.innerHTML = +likesCountElem.innerHTML + change;
            if(+likesCountElem.innerHTML == 0)
                post.querySelector('.likes-block').classList.add('no-likes');
            else
                post.querySelector('.likes-block').classList.remove('no-likes');
                
                
            btn.classList.toggle('liked');

        }
    });
}

let addCommentBtnListeners = () => {
    document.querySelectorAll('.comment-btn').forEach(btn => {
        btn.onclick = () => {
            let post = btn.closest('.post');
            let inp = post.querySelector('.comment-input');
            inp.focus();
        }
    });
}

let addCommentInputListeners = () => {
    document.querySelectorAll('.comment-input').forEach( inp => {
        inp.onkeyup = (e) => {
            if(e.keyCode == 13){
                let text = inp.value;
                let comment = {
                    author: {
                        name: data.user.name + ' ' + data.user.lastname,
                        avatar_url: data.user.avatar_url
                    },
                    time: 0,
                    text
                }
    
                let comments = inp.closest('.post').querySelector('.comments');
                comments.innerHTML += createComment(comment, true);
                inp.value = '';
            }
        }
    });
}

let addPostListeners = function() {
    addPostLikesListeners();
    addCommentBtnListeners();
    addCommentInputListeners();
}

addPostListeners();


let posting = false;

document.querySelector('.post-submit-btn').onclick = function(){
    let posts = document.querySelector('.posts');
    let postInp = document.querySelector('.post-input');
    if(!postInp.value) return;
    let post = {
        author: {
            name: data.user.name + ' ' + data.user.lastname,
            avatar_url: data.user.avatar_url,

        },            
        time_posted: 0,
        text: postInp.value,
        comments: [],
        likes: 0
    }
    posts.innerHTML = createPost(post) + posts.innerHTML;
    posting = true;
    postInp.blur()
    posting = false;
    postInp.value = '';
    addPostListeners();
}