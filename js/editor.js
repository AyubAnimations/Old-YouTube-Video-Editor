// Sample user library videos
const userVideos = [
  { id: 'v1', title: "Vlog #12 - Beach Day", thumb: "https://picsum.photos/120/68?random=1", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
  { id: 'v2', title: "Skate Park Tricks", thumb: "https://picsum.photos/120/68?random=2", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
  { id: 'v3', title: "Cat Playing with String", thumb: "https://picsum.photos/120/68?random=3", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" }
];

// Sample AudioSwap track library
const audioTracks = [
  { id: 'a1', title: "Acoustic Breeze - Royalty Free", duration: "2:30" },
  { id: 'a2', title: "Rock Energy 2010 - AudioSwap", duration: "3:15" },
  { id: 'a3', title: "Ambient Techno Chill", duration: "1:45" }
];

let draggedItemData = null;

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  renderMediaPool();
  setupDragAndDrop();
});

// Tab Navigation logic
function initTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      tab.classList.add('active');
      document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
    });
  });
}

// Render available assets in the upper right panel
function renderMediaPool() {
  const videoPool = document.getElementById('video-pool');
  videoPool.innerHTML = userVideos.map(v => `
    <div class="clip-card" draggable="true" data-id="${v.id}" data-type="video">
      <img src="${v.thumb}" alt="${v.title}">
      <div class="clip-title">${v.title}</div>
    </div>
  `).join('');

  const audioPool = document.getElementById('audio-pool');
  audioPool.innerHTML = audioTracks.map(a => `
    <li class="audio-item" draggable="true" data-id="${a.id}" data-type="audio">
      <span>🎵 ${a.title}</span>
      <span style="color: #777;">${a.duration}</span>
    </li>
  `).join('');
}

// Drag & Drop timeline handling
function setupDragAndDrop() {
  // Capture item drag start
  document.addEventListener('dragstart', (e) => {
    const card = e.target.closest('[draggable="true"]');
    if (card) {
      draggedItemData = {
        id: card.dataset.id,
        type: card.dataset.type,
        title: card.querySelector('.clip-title, span')?.innerText || card.dataset.type
      };
    }
  });

  const videoTrack = document.getElementById('video-track');
  const audioTrack = document.getElementById('audio-track');

  [videoTrack, audioTrack].forEach(track => {
    track.addEventListener('dragover', (e) => {
      e.preventDefault();
      track.classList.add('drag-over');
    });

    track.addEventListener('dragleave', () => {
      track.classList.remove('drag-over');
    });

    track.addEventListener('drop', (e) => {
      e.preventDefault();
      track.classList.remove('drag-over');

      if (!draggedItemData) return;

      // Ensure dropped clip type matches target track
      if (track.id === 'video-track' && draggedItemData.type === 'video') {
        appendClipToTrack(videoTrack, draggedItemData);
      } else if (track.id === 'audio-track' && draggedItemData.type === 'audio') {
        appendClipToTrack(audioTrack, draggedItemData);
      }
    });
  });
}

function appendClipToTrack(track, item) {
  // Remove placeholder text if present
  const placeholder = track.querySelector('.drop-placeholder');
  if (placeholder) placeholder.style.display = 'none';

  const clipElem = document.createElement('div');
  clipElem.className = 'timeline-clip';
  clipElem.innerHTML = `
    <span>${item.title}</span>
    <button class="remove-btn">×</button>
  `;

  // Remove clip handler
  clipElem.querySelector('.remove-btn').addEventListener('click', () => {
    clipElem.remove();
    if (track.children.length === 1) { // Only placeholder left
      placeholder.style.display = 'block';
    }
  });

  track.appendChild(clipElem);
}
