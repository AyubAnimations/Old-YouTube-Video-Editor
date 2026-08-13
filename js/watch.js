// State variables for like/dislike mechanisms
let likes = 14230;
let dislikes = 412;
let hasLiked = false;
let hasDisliked = false;

// Mock list of initial comments
const commentsData = [
  {
    author: "NostalgiaGamer",
    avatar: "https://picsum.photos/40/40?random=1",
    timeAgo: "1 year ago",
    text: "This classic UI brings back so many memories. Everything was so simple and functional!"
  },
  {
    author: "OpenSourceFan",
    avatar: "https://picsum.photos/40/40?random=2",
    timeAgo: "6 months ago",
    text: "Blender Institute always puts out incredible short films. Love this!"
  }
];

// Mock sidebar video feed data
const sidebarVideos = [
  { title: "Sintel - Open Movie Trailer", channel: "Blender", views: "3.2M views", thumb: "https://picsum.photos/120/68?random=1" },
  { title: "Tears of Steel - Sci-Fi Short", channel: "Blender", views: "1.8M views", thumb: "https://picsum.photos/120/68?random=2" },
  { title: "Top 10 Animations of 2015", channel: "FilmCentral", views: "450K views", thumb: "https://picsum.photos/120/68?random=3" }
];

// Initialize dynamic page elements
document.addEventListener('DOMContentLoaded', () => {
  renderComments();
  renderSidebar();
  setupLikeMechanism();
  setupCommentSubmission();
});

// Calculate and render the proportion bar
function updateSentimentBar() {
  const total = likes + dislikes;
  const percentage = (likes / total) * 100;
  
  document.getElementById('like-count').innerText = likes.toLocaleString();
  document.getElementById('dislike-count').innerText = dislikes.toLocaleString();
  document.getElementById('sentiment-fill').style.width = `${percentage}%`;
}

function setupLikeMechanism() {
  const likeBtn = document.getElementById('like-btn');
  const dislikeBtn = document.getElementById('dislike-btn');

  likeBtn.addEventListener('click', () => {
    if (!hasLiked) {
      likes++;
      if (hasDisliked) { dislikes--; hasDisliked = false; }
      hasLiked = true;
    } else {
      likes--;
      hasLiked = false;
    }
    updateSentimentBar();
  });

  dislikeBtn.addEventListener('click', () => {
    if (!hasDisliked) {
      dislikes++;
      if (hasLiked) { likes--; hasLiked = false; }
      hasDisliked = true;
    } else {
      dislikes--;
      hasDisliked = false;
    }
    updateSentimentBar();
  });
}

function renderComments() {
  const list = document.getElementById('comment-list');
  list.innerHTML = commentsData.map(c => `
    <div class="comment-item">
      <img src="${c.avatar}" class="user-avatar" alt="Avatar">
      <div>
        <div>
          <a href="#" class="comment-author">${c.author}</a>
          <span class="comment-time">${c.timeAgo}</span>
        </div>
        <div class="comment-text">${c.text}</div>
      </div>
    </div>
  `).join('');
}

function setupCommentSubmission() {
  const postBtn = document.getElementById('post-comment');
  const input = document.getElementById('comment-input');

  postBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (text) {
      commentsData.unshift({
        author: "You",
        avatar: "https://picsum.photos/40/40",
        timeAgo: "Just now",
        text: text
      });
      input.value = '';
      renderComments();
    }
  });
}

function renderSidebar() {
  const feed = document.getElementById('sidebar-feed');
  feed.innerHTML = sidebarVideos.map(v => `
    <div class="sidebar-card">
      <img src="${v.thumb}" class="sidebar-thumb" alt="Thumbnail">
      <div class="sidebar-info">
        <a href="#" class="sidebar-title">${v.title}</a>
        <span class="sidebar-meta">${v.channel}</span>
        <span class="sidebar-meta">${v.views}</span>
      </div>
    </div>
  `).join('');
}
