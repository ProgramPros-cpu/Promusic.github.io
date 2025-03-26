// DOM elements
const songsList = document.getElementById('songs-list');
const audioPlayer = document.getElementById('audio-player');
const playButton = document.getElementById('play-button');
const npPlayButton = document.getElementById('np-play-button');
const prevButton = document.getElementById('prev-button');
const npPrevButton = document.getElementById('np-prev-button');
const nextButton = document.getElementById('next-button');
const npNextButton = document.getElementById('np-next-button');
const progressBar = document.getElementById('progress-bar');
const progress = document.getElementById('progress');
const npProgressBar = document.getElementById('np-progress-bar');
const npProgress = document.getElementById('np-progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const npCurrentTimeEl = document.getElementById('np-current-time');
const npDurationEl = document.getElementById('np-duration');
const nowPlayingView = document.getElementById('now-playing-view');
const backButton = document.getElementById('back-button');
const miniPlayerInfo = document.getElementById('mini-player-info');
const miniCover = document.getElementById('mini-cover');
const miniTitle = document.getElementById('mini-title');
const miniArtist = document.getElementById('mini-artist');
const nowPlayingCover = document.getElementById('now-playing-cover');
const nowPlayingTitle = document.getElementById('now-playing-title');
const nowPlayingArtist = document.getElementById('now-playing-artist');
const menuButton = document.getElementById('menu-button');
const menu = document.querySelector('.menu');
const closeMenu = document.getElementById('close-menu');
const overlay = document.getElementById('overlay');

// Player state
let currentSongIndex = 0;
let isPlaying = false;

// Initialize the player
function initPlayer() {
    renderSongsList();
    loadSong(currentSongIndex);
    
    // Event listeners
    playButton.addEventListener('click', togglePlay);
    npPlayButton.addEventListener('click', togglePlay);
    prevButton.addEventListener('click', prevSong);
    npPrevButton.addEventListener('click', prevSong);
    nextButton.addEventListener('click', nextSong);
    npNextButton.addEventListener('click', nextSong);
    progressBar.addEventListener('click', setProgress);
    npProgressBar.addEventListener('click', setProgress);
    miniPlayerInfo.addEventListener('click', showNowPlaying);
    backButton.addEventListener('click', hideNowPlaying);
    menuButton.addEventListener('click', openMenu);
    closeMenu.addEventListener('click', closeMenuFn);
    overlay.addEventListener('click', closeMenuFn);
    
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', nextSong);
    audioPlayer.addEventListener('loadedmetadata', updateDuration);
}

// Render songs list
function renderSongsList() {
    songsList.innerHTML = '';
    songs.forEach((song, index) => {
        const songItem = document.createElement('div');
        songItem.className = `song-item ${index === currentSongIndex ? 'active' : ''}`;
        songItem.innerHTML = `
            <img src="${song.cover}" alt="Cover" class="song-cover">
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
            </div>
            <div class="song-duration">${song.duration}</div>
        `;
        songItem.addEventListener('click', () => playSong(index));
        songsList.appendChild(songItem);
    });
}

// Load song
function loadSong(index) {
    const song = songs[index];
    audioPlayer.src = song.file;
    miniCover.src = song.cover;
    miniTitle.textContent = song.title;
    miniArtist.textContent = song.artist;
    nowPlayingCover.src = song.cover;
    nowPlayingTitle.textContent = song.title;
    nowPlayingArtist.textContent = song.artist;
    
    // Update active song in list
    document.querySelectorAll('.song-item').forEach((item, i) => {
        if (i === index) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Play song
function playSong(index) {
    if (index !== currentSongIndex) {
        currentSongIndex = index;
        loadSong(currentSongIndex);
    }
    audioPlayer.play();
    isPlaying = true;
    updatePlayButton();
}

// Toggle play/pause
function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
    } else {
        audioPlayer.play();
    }
    isPlaying = !isPlaying;
    updatePlayButton();
}

// Update play button
function updatePlayButton() {
    if (isPlaying) {
        playButton.classList.remove('fa-play');
        playButton.classList.add('fa-pause');
        npPlayButton.classList.remove('fa-play');
        npPlayButton.classList.add('fa-pause');
    } else {
        playButton.classList.remove('fa-pause');
        playButton.classList.add('fa-play');
        npPlayButton.classList.remove('fa-pause');
        npPlayButton.classList.add('fa-play');
    }
}

// Previous song
function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(currentSongIndex);
    if (isPlaying) {
        audioPlayer.play();
    }
}

// Next song
function nextSong() {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
    if (isPlaying) {
        audioPlayer.play();
    }
}

// Update progress bar
function updateProgress() {
    const { currentTime, duration } = audioPlayer;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    npProgress.style.width = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(currentTime);
    npCurrentTimeEl.textContent = formatTime(currentTime);
}

// Update duration
function updateDuration() {
    const { duration } = audioPlayer;
    durationEl.textContent = formatTime(duration);
    npDurationEl.textContent = formatTime(duration);
}

// Set progress
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (clickX / width) * duration;
}

// Format time
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Show now playing view
function showNowPlaying() {
    nowPlayingView.style.display = 'flex';
}

// Hide now playing view
function hideNowPlaying() {
    nowPlayingView.style.display = 'none';
}

// Open menu
function openMenu() {
    menu.style.right = '0';
    overlay.style.display = 'block';
}

// Close menu
function closeMenuFn() {
    menu.style.right = '-300px';
    overlay.style.display = 'none';
}

// Initialize the player when DOM is loaded
document.addEventListener('DOMContentLoaded', initPlayer);
  // Equalizer functionality
const equalizerButton = document.getElementById('equalizer-button');
const equalizerModal = document.getElementById('equalizer-modal');
const closeEqualizer = document.getElementById('close-equalizer');
const bandSliders = document.querySelectorAll('.band-slider');
const bandValues = document.querySelectorAll('.band-value');
const presets = document.querySelectorAll('.preset');

// Create audio context and nodes
let audioContext;
let sourceNode;
let gainNode;
let biquadFilters = [];

function initAudioContext() {
if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    sourceNode = audioContext.createMediaElementSource(audioPlayer);
    gainNode = audioContext.createGain();
    
    // Create 7 band EQ filters
    const frequencies = [60, 150, 400, 1000, 2400, 6000, 15000];
    let lastNode = sourceNode;
    
    frequencies.forEach((freq, i) => {
        const filter = audioContext.createBiquadFilter();
        filter.type = "peaking";
        filter.frequency.value = freq;
        filter.Q.value = 1;
        filter.gain.value = 0;
        
        lastNode.connect(filter);
        lastNode = filter;
        biquadFilters.push(filter);
    });
    
    lastNode.connect(gainNode);
    gainNode.connect(audioContext.destination);
}
}

// Equalizer event listeners
equalizerButton.addEventListener('click', () => {
initAudioContext();
equalizerModal.style.display = 'flex';
overlay.style.display = 'block';
});

closeEqualizer.addEventListener('click', () => {
equalizerModal.style.display = 'none';
overlay.style.display = 'none';
});

bandSliders.forEach((slider, index) => {
slider.addEventListener('input', () => {
    const value = parseInt(slider.value);
    bandValues[index].textContent = value + 'dB';
    
    if (biquadFilters[index]) {
        biquadFilters[index].gain.value = value;
    }
});
});

// Preset configurations
const presetConfigs = {
flat: [0, 0, 0, 0, 0, 0, 0],
pop: [2, 1, 0, 1, 3, 4, 2],
rock: [5, 3, -2, 2, 3, 2, 1],
jazz: [3, 1, 2, 0, -1, 1, 2],
classical: [0, 0, 0, -1, -1, 0, 2],
bass: [8, 5, 2, 0, -1, -2, -3]
};

presets.forEach(preset => {
preset.addEventListener('click', () => {
    const presetName = preset.dataset.preset;
    const config = presetConfigs[presetName];
    
    bandSliders.forEach((slider, index) => {
        slider.value = config[index];
        const event = new Event('input');
        slider.dispatchEvent(event);
    });
});
});

// ---------------------------------------------------------------

// search bar funtion
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('song-search');
    const songsList = document.getElementById('songs-list'); // Your tracks container
    const songItems = songsList.querySelectorAll('.song-item'); // Assuming each track has this class

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        let hasMatches = false;
        
        songItems.forEach(item => {
            // Get track info - adjust these selectors based on your actual HTML structure
            const title = item.querySelector('.song-title').textContent.toLowerCase();
            const artist = item.querySelector('.song-artist').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || artist.includes(searchTerm) || searchTerm === '') {
                item.style.display = 'flex'; // Or whatever display value you normally use
                hasMatches = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show "no results" message if needed
        const noResultsMsg = document.getElementById('no-results-message');
        if (noResultsMsg) {
            noResultsMsg.style.display = hasMatches || searchTerm === '' ? 'none' : 'block';
        }
    });
});
// ---------------------------------------------------------------

//  sleep timer funtion
// Add this to your existing JavaScript code
function initSleepTimer() {
    // Get all required elements
    const sleepTimerBtn = document.getElementById('sleep-timer-button');
    const sleepTimerModal = document.getElementById('sleep-timer-modal');
    const closeSleepTimer = document.getElementById('close-sleep-timer');
    const timerOptions = document.querySelectorAll('.timer-option[data-minutes]');
    const customTimerBtn = document.getElementById('custom-timer');
    const customTimerContainer = document.getElementById('custom-timer-container');
    const customMinutesInput = document.getElementById('custom-minutes');
    const setCustomTimerBtn = document.getElementById('set-custom-timer');
    const cancelTimerBtn = document.getElementById('cancel-timer');
    const timerStatus = document.getElementById('timer-status');
    const overlay = document.getElementById('overlay');

    // Check if elements exist before adding event listeners
    if (!sleepTimerBtn || !sleepTimerModal) {
        console.error('Sleep timer elements not found');
        return;
    }

    // Open sleep timer modal
    sleepTimerBtn.addEventListener('click', function() {
        sleepTimerModal.style.display = 'flex';
        overlay.style.display = 'block';
        updateTimerStatus();
    });

    // Close sleep timer modal
    closeSleepTimer.addEventListener('click', function() {
        sleepTimerModal.style.display = 'none';
        overlay.style.display = 'none';
    });

    // Set timer from preset options
    timerOptions.forEach(option => {
        option.addEventListener('click', function() {
            const minutes = parseInt(this.getAttribute('data-minutes'));
            setSleepTimer(minutes);
        });
    });

    // Show custom timer input
    customTimerBtn.addEventListener('click', function() {
        customTimerContainer.style.display = 'flex';
    });

    // Set custom timer
    setCustomTimerBtn.addEventListener('click', function() {
        const minutes = parseInt(customMinutesInput.value);
        if (!isNaN(minutes) && minutes > 0 && minutes <= 240) {
            setSleepTimer(minutes);
            customTimerContainer.style.display = 'none';
            customMinutesInput.value = '';
        }
    });

    // Cancel active timer
    cancelTimerBtn.addEventListener('click', cancelSleepTimer);

    // Timer functions
    let sleepTimer = null;
    let timerEndTime = null;

    function setSleepTimer(minutes) {
        // Clear any existing timer
        cancelSleepTimer();
        
        // Set new timer
        timerEndTime = new Date(Date.now() + minutes * 60000);
        sleepTimer = setTimeout(function() {
            if (audioPlayer) {
                audioPlayer.pause();
                isPlaying = false;
                updatePlayButton();
            }
            timerStatus.textContent = '';
            sleepTimer = null;
            timerEndTime = null;
        }, minutes * 60000);
        
        updateTimerStatus();
        sleepTimerModal.style.display = 'none';
        overlay.style.display = 'none';
    }

    function cancelSleepTimer() {
        if (sleepTimer) {
            clearTimeout(sleepTimer);
            sleepTimer = null;
            timerEndTime = null;
            timerStatus.textContent = 'No active timer';
            timerStatus.style.color = 'var(--text-secondary)';
        }
    }

    function updateTimerStatus() {
        if (timerEndTime) {
            const remaining = Math.ceil((timerEndTime - Date.now()) / 60000);
            if (remaining > 0) {
                timerStatus.textContent = `Timer set: ${remaining} minute${remaining !== 1 ? 's' : ''} remaining`;
                timerStatus.style.color = 'var(--primary-color)';
            } else {
                timerStatus.textContent = '';
            }
        } else {
            timerStatus.textContent = 'No active timer';
            timerStatus.style.color = 'var(--text-secondary)';
        }
    }
}

// Initialize after DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Make sure to call this along with your other initializers
    initSleepTimer();
});

// ---------------------------------------------------------------

 // Playlist functionality
// Playlist functionality
let playlists = JSON.parse(localStorage.getItem('playlists')) || [];
    
function initPlaylistCreator() {
    const playlistBtn = document.getElementById('playlist-button');
    const playlistModal = document.getElementById('playlist-modal');
    const closePlaylist = document.getElementById('close-playlist');
    const playlistNameInput = document.getElementById('playlist-name');
    const playlistSongsContainer = document.getElementById('playlist-songs');
    const savePlaylistBtn = document.getElementById('save-playlist');
    const overlay = document.getElementById('overlay');
    
    // Check if elements exist
    if (!playlistBtn || !playlistModal) {
        console.error('Playlist elements not found');
        return;
    }
    
    // Open playlist creator
    playlistBtn.addEventListener('click', function() {
        playlistModal.style.display = 'flex';
        overlay.style.display = 'block';
        renderPlaylistSongSelection();
    });
    
    // Close playlist creator
    closePlaylist.addEventListener('click', function() {
        playlistModal.style.display = 'none';
        overlay.style.display = 'none';
        playlistNameInput.value = '';
    });
    
    // Render songs for playlist selection
    function renderPlaylistSongSelection() {
        playlistSongsContainer.innerHTML = '';
        
        if (!songs || songs.length === 0) {
            playlistSongsContainer.innerHTML = '<div style="padding: 20px; text-align: center;">No songs available</div>';
            return;
        }
        
        songs.forEach((song, index) => {
            const songItem = document.createElement('div');
            songItem.className = 'playlist-song-item';
            songItem.innerHTML = `
                <img src="${song.cover}" alt="Cover" class="playlist-song-cover">
                <div class="playlist-song-info">
                    <div class="playlist-song-title">${song.title}</div>
                    <div class="playlist-song-artist">${song.artist}</div>
                </div>
                <input type="checkbox" class="playlist-song-checkbox" data-song-index="${index}">
            `;
            playlistSongsContainer.appendChild(songItem);
        });
    }
    
    // Save playlist
    savePlaylistBtn.addEventListener('click', function() {
        const name = playlistNameInput.value.trim();
        if (!name) {
            alert('Please enter a playlist name');
            return;
        }
        
        const checkboxes = document.querySelectorAll('.playlist-song-checkbox:checked');
        if (checkboxes.length === 0) {
            alert('Please select at least one song');
            return;
        }
        
        const selectedSongs = Array.from(checkboxes).map(checkbox => {
            const index = parseInt(checkbox.getAttribute('data-song-index'));
            return songs[index];
        });
        
        const newPlaylist = {
            id: Date.now().toString(),
            name: name,
            songs: selectedSongs,
            createdAt: new Date().toISOString()
        };
        
        playlists.push(newPlaylist);
        savePlaylists();
        
        playlistNameInput.value = '';
        playlistModal.style.display = 'none';
        overlay.style.display = 'none';
        
        alert(`Playlist "${name}" created successfully!`);
        renderPlaylists(); // Update playlists tab if open
    });
}

function savePlaylists() {
    localStorage.setItem('playlists', JSON.stringify(playlists));
}

// Initialize playlist creator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initPlaylistCreator();
});

// ---------------------------------------------------------------

     // Tab navigation functionality
    function initTabs() {
        setTimeout(() => { // Delay execution slightly for WebView
            const tabs = document.querySelectorAll('.tab');
            const tabContents = document.querySelectorAll('.tab-content');

            if (!tabs.length || !tabContents.length) {
                console.error("Tabs or tab contents not found.");
                return;
            }

            tabs.forEach(tab => {
tab.addEventListener('click', function () {
    activateTab(tab);
});

tab.addEventListener('touchstart', function () {
    activateTab(tab);
});

function activateTab(tab) {
    // Remove active class from all tabs and contents
    tabs.forEach(t => t.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    // Add active class to clicked tab and corresponding content
    tab.classList.add('active');
    const tabId = tab.getAttribute('data-tab');
    document.getElementById(`${tabId}-content`).classList.add('active');

    // Load content for the tab if needed
    switch(tabId) {
        case 'playlists':
            renderPlaylists();
            break;
        case 'albums':
            renderAlbums();
            break;
        case 'artists':
            renderArtists();
            break;
    }
}

            });

            console.log("Tabs initialized successfully.");
        }, 100); // Small delay to allow WebView to fully load
    }

    document.addEventListener('DOMContentLoaded', initTabs);

    
    // Render playlists tab
    function renderPlaylists() {
        const playlistsList = document.getElementById('playlists-list');
        playlistsList.innerHTML = '';
        
        if (playlists.length === 0) {
            playlistsList.innerHTML = '<div class="empty-message">No playlists yet</div>';
            return;
        }
        
        playlists.forEach(playlist => {
            const playlistCard = document.createElement('div');
            playlistCard.className = 'playlist-card';
            playlistCard.innerHTML = `
                <img src="${playlist.songs[0]?.cover || 'https://via.placeholder.com/150'}" class="playlist-cover">
                <div class="playlist-info">
                    <div class="playlist-name">${playlist.name}</div>
                    <div class="playlist-count">${playlist.songs.length} songs</div>
                </div>
            `;
            playlistCard.addEventListener('click', () => viewPlaylist(playlist.id));
            playlistsList.appendChild(playlistCard);
        });
    }
    
    // Render albums tab
    function renderAlbums() {
        const albumsList = document.getElementById('albums-list');
        albumsList.innerHTML = '';
        
        // Group songs by album
        const albums = {};
        songs.forEach(song => {
            const albumName = song.album || 'Unknown Album';
            if (!albums[albumName]) {
                albums[albumName] = {
                    cover: song.cover,
                    artist: song.artist,
                    songs: []
                };
            }
            albums[albumName].songs.push(song);
        });
        
        // Display albums
        for (const [name, album] of Object.entries(albums)) {
            const albumCard = document.createElement('div');
            albumCard.className = 'album-card';
            albumCard.innerHTML = `
                <img src="${album.cover}" class="album-cover">
                <div class="album-info">
                    <div class="album-name">${name}</div>
                    <div class="album-artist">${album.artist}</div>
                </div>
            `;
            albumCard.addEventListener('click', () => viewAlbum(name));
            albumsList.appendChild(albumCard);
        }
    }
    
    // Render artists tab
    function renderArtists() {
        const artistsList = document.getElementById('artists-list');
        artistsList.innerHTML = '';
        
        // Group songs by artist
        const artists = {};
        songs.forEach(song => {
            if (!artists[song.artist]) {
                artists[song.artist] = {
                    cover: song.cover,
                    songs: []
                };
            }
            artists[song.artist].songs.push(song);
        });
        
        // Display artists
        for (const [name, artist] of Object.entries(artists)) {
            const artistCard = document.createElement('div');
            artistCard.className = 'artist-card';
            artistCard.innerHTML = `
                <img src="${artist.cover}" class="artist-avatar">
                <div class="artist-info">
                    <div class="artist-name">${name}</div>
                    <div class="artist-song-count">${artist.songs.length} songs</div>
                </div>
            `;
            artistCard.addEventListener('click', () => viewArtist(name));
            artistsList.appendChild(artistCard);
        }
    }
    
    // Example view functions (you'll need to implement these)
    function viewPlaylist(playlistId) {
        console.log('View playlist:', playlistId);
        // Implement playlist viewing logic
    }
    
    function viewAlbum(albumName) {
        console.log('View album:', albumName);
        // Implement album viewing logic
    }
    
    function viewArtist(artistName) {
        console.log('View artist:', artistName);
        // Implement artist viewing logic
    }
    
    // Initialize tabs when DOM loads
    document.addEventListener('DOMContentLoaded', initTabs);

    // delete playlist
    // Add these functions to your existing JavaScript
function renderPlaylists() {
    const playlistsList = document.getElementById('playlists-list');
    playlistsList.innerHTML = '';
    
    if (playlists.length === 0) {
        playlistsList.innerHTML = '<div class="empty-message">No playlists yet</div>';
        return;
    }
    
    playlists.forEach((playlist) => {
        const playlistCard = document.createElement('div');
        playlistCard.className = 'playlist-card';
        playlistCard.innerHTML = `
            <img src="${playlist.songs[0]?.cover || 'https://via.placeholder.com/150'}" class="playlist-cover">
            <div class="playlist-info">
                <div class="playlist-name">${playlist.name}</div>
                <div class="playlist-count">${playlist.songs.length} songs</div>
            </div>
            <div class="playlist-delete-icon" data-playlist-id="${playlist.id}">
                <i class="fas fa-trash"></i>
            </div>
        `;
        playlistCard.addEventListener('click', (e) => {
            if (!e.target.closest('.playlist-delete-icon')) {
                viewPlaylist(playlist.id);
            }
        });
        playlistsList.appendChild(playlistCard);
    });
    
    // Add delete event listeners
    document.querySelectorAll('.playlist-delete-icon').forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.stopPropagation();
            showDeleteConfirmation(icon.getAttribute('data-playlist-id'));
        });
    });
}

function showDeleteConfirmation(playlistId) {
    const dialog = document.getElementById('confirm-delete-dialog');
    const overlay = document.getElementById('overlay');
    
    document.getElementById('confirm-delete').onclick = function() {
        deletePlaylist(playlistId);
        dialog.style.display = 'none';
        overlay.style.display = 'none';
    };
    
    document.getElementById('cancel-delete').onclick = function() {
        dialog.style.display = 'none';
        overlay.style.display = 'none';
    };
    
    dialog.style.display = 'block';
    overlay.style.display = 'block';
}

function deletePlaylist(playlistId) {
    playlists = playlists.filter(playlist => playlist.id !== playlistId);
    savePlaylists();
    renderPlaylists();
    
    // Show notification
    const notification = document.createElement('div');
    notification.textContent = 'Playlist deleted';
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.backgroundColor = '#333';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '4px';
    notification.style.zIndex = '500';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 2000);
}


// -----------------------------------------------------------

// Volume Control Functionality
document.addEventListener('DOMContentLoaded', function() {
    const volumeIcon = document.querySelector('.volume-icon');
    const volumeSlider = document.querySelector('.volume-slider');
    const volumeDisplay = document.querySelector('.volume-level-display');
    const audioPlayer = document.getElementById('audio-player'); // Your audio element

    // Set initial volume
    if (audioPlayer) {
      volumeSlider.value = audioPlayer.volume;
      updateVolumeDisplay();
    }

    // Volume slider interaction
    volumeSlider.addEventListener('input', function() {
      if (audioPlayer) {
        audioPlayer.volume = this.value;
        updateVolumeDisplay();
      }
    });

    // Click volume icon to mute/unmute
    volumeIcon.addEventListener('click', function() {
      if (audioPlayer) {
        if (audioPlayer.volume > 0) {
          audioPlayer.dataset.previousVolume = audioPlayer.volume;
          audioPlayer.volume = 0;
          volumeSlider.value = 0;
          this.classList.remove('fa-volume-up');
          this.classList.add('fa-volume-mute');
        } else {
          const prevVolume = parseFloat(audioPlayer.dataset.previousVolume) || 0.7;
          audioPlayer.volume = prevVolume;
          volumeSlider.value = prevVolume;
          this.classList.remove('fa-volume-mute');
          this.classList.add('fa-volume-up');
        }
        updateVolumeDisplay();
      }
    });

    // Update volume display text
    function updateVolumeDisplay() {
      if (audioPlayer) {
        const volumePercent = Math.round(audioPlayer.volume * 100);
        volumeDisplay.textContent = volumePercent + '%';
        
        // Update icon based on volume level
        if (audioPlayer.volume === 0) {
          volumeIcon.classList.remove('fa-volume-up');
          volumeIcon.classList.add('fa-volume-mute');
        } else if (audioPlayer.volume < 0.5) {
          volumeIcon.classList.remove('fa-volume-mute');
          volumeIcon.classList.add('fa-volume-down');
        } else {
          volumeIcon.classList.remove('fa-volume-mute', 'fa-volume-down');
          volumeIcon.classList.add('fa-volume-up');
        }
      }
    }

    // Sync volume display when slider is being adjusted
    volumeSlider.addEventListener('mousedown', function() {
      volumeDisplay.style.opacity = '1';
      volumeDisplay.style.transform = 'translateX(0)';
    });

    volumeSlider.addEventListener('mouseup', function() {
      setTimeout(() => {
        volumeDisplay.style.opacity = '0';
        volumeDisplay.style.transform = 'translateX(20px)';
      }, 1000);
    });
  });



//   shake to change music
// Shake Detection System
let isShakeEnabled = false;
let lastShakeTime = 0;
const SHAKE_THRESHOLD = 15; // Sensitivity (increase for less sensitivity)

// Initialize settings when the menu loads
function initShakeSetting() {
    const toggle = document.getElementById('shake-toggle');
    if (!toggle) return;

    // Load saved setting
    const savedSetting = localStorage.getItem('shakeToChange');
    isShakeEnabled = savedSetting === 'true';
    toggle.checked = isShakeEnabled;

    // Toggle event listener
    toggle.addEventListener('change', function () {
        isShakeEnabled = this.checked;
        localStorage.setItem('shakeToChange', this.checked);

        if (isShakeEnabled) {
            enableShakeDetection();
        } else {
            disableShakeDetection();
        }
    });

    // Activate shake detection if enabled
    if (isShakeEnabled) {
        enableShakeDetection();
    }
}

// Enable shake detection
function enableShakeDetection() {
    if (window.DeviceMotionEvent) {
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            // iOS requires user permission
            DeviceMotionEvent.requestPermission()
                .then(response => {
                    if (response === 'granted') {
                        window.addEventListener('devicemotion', handleShake, false);
                    }
                })
                .catch(console.error);
        } else {
            window.addEventListener('devicemotion', handleShake, false);
        }
    }
}

// Disable shake detection
function disableShakeDetection() {
    window.removeEventListener('devicemotion', handleShake);
}

// Handle shake motion
function handleShake(event) {
    if (!isShakeEnabled || !window.isPlaying) return;

    const currentTime = Date.now();
    if (currentTime - lastShakeTime < 1000) return; // Cooldown to prevent multiple triggers

    const acceleration = event.accelerationIncludingGravity;
    if (!acceleration) return;

    const shakeStrength = Math.sqrt(
        acceleration.x * acceleration.x +
        acceleration.y * acceleration.y +
        acceleration.z * acceleration.z
    );

    if (shakeStrength > SHAKE_THRESHOLD) {
        lastShakeTime = currentTime;
        triggerSongChange();
    }
}

// Change the song with animation
function triggerSongChange() {
    // Add shake animation feedback
    const player = document.querySelector('.player-bar');
    if (player) {
        player.classList.add('shake-animation');
        setTimeout(() => player.classList.remove('shake-animation'), 500);
    }

    // Play next or previous song randomly
    if (Math.random() > 0.5 && typeof window.nextSong === 'function') {
        window.nextSong();
    } else if (typeof window.prevSong === 'function') {
        window.prevSong();
    }
}

// Add shake animation CSS
const style = document.createElement('style');
style.textContent = `
    .shake-animation {
        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }
    @keyframes shake {
        10%, 90% { transform: translateX(-2px); }
        20%, 80% { transform: translateX(4px); }
        30%, 50%, 70% { transform: translateX(-6px); }
        40%, 60% { transform: translateX(6px); }
    }
`;
document.head.appendChild(style);

// Initialize when settings menu is opened
document.addEventListener('DOMContentLoaded', function () {
    const settingsButton = document.querySelector('.settings-button');
    if (settingsButton) {
        settingsButton.addEventListener('click', function () {
            setTimeout(initShakeSetting, 100); // Delay for menu to open
        });
    } else {
        initShakeSetting(); // Directly initialize if settings is always visible
    }
});


