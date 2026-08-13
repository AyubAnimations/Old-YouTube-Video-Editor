// Sample Mock Data replicating 2015 metadata
const mockVideos = [
  {
    title: "Me at the zoo",
    channel: "jawed",
    views: "142M views",
    timeAgo: "10 years ago",
    duration: "0:19",
    thumbnail: "https://picsum.photos/300/170?random=1"
  },
  {
    title: "How to Build a Web Application in 2015",
    channel: "Tech Channel",
    views: "520K views",
    timeAgo: "2 months ago",
    duration: "14:22",
    thumbnail: "https://picsum.photos/300/170?random=2"
  },
  {
    title: "Top 10 Gaming Moments of the Year",
    channel: "GamerCentral",
    views: "1.2M views",
    timeAgo: "5 months ago",
    duration: "10:05",
    thumbnail: "https://picsum.photos/300/170?random=3"
  },
  {
    title: "Chill Instrumental Beats - 24/7 Stream",
    channel: "Music Box",
    views: "89K views",
    timeAgo: "1 year ago",
    duration: "3:45:12",
    thumbnail: "https://picsum.photos/300/170?random=4"
  }
];

function renderVideos() {
  const grid = document.getElementById('video-grid');
  grid.innerHTML = mockVideos.map(video => `
    <div class="video-card">
      <div class="thumbnail-container">
        <img src="${video.thumbnail}" alt="${video.title}">
        <span class="duration">${video.duration}</span>
      </div>
      <div class="video-info">
        <a href="#" class="video-title">${video.title}</a>
        <div class="video-meta">${video.channel}</div>
        <div class="video-meta">${video.views} • ${video.timeAgo}</div>
      </div>
    </div>
  `).join('');
}

// Toggle Sidebar collapsed state
document.getElementById('toggle-sidebar').addEventListener('click', () => {
  const sidebar = document.getElementById('sidebar');
  sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
});

// Initial render
renderVideos();
