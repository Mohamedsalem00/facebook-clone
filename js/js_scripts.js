// Global variables
const currentUser = {
    name: "Mohamedsalem00",
    avatar: "assets/profile.jpg",
    notifications: {
        messages: 3,
        alerts: 5
    },
    lastActive: "2025-03-05 02:16:23"
};

// Initialize when the document is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log(`Facebook clone initialized for ${currentUser.name} at ${currentUser.lastActive}`);
    initializeComponents();
    setupEventListeners();
    updateTimeDisplays();
});

// Initialize UI components
function initializeComponents() {
    // Update user info across the UI
    updateUserInfo();
    
    // Initialize navigation 
    initializeNavigation();
    
    // Initialize tooltips
    initializeTooltips();

    // Update the timestamps for posts to be relative to the current time
    updatePostTimestamps();
}

// Update user information across the UI
function updateUserInfo() {
    // Update profile pictures
    document.querySelectorAll('.profile img, .sidebar-item:first-child img, .create-post-top img').forEach(img => {
        img.setAttribute('alt', `${currentUser.name}'s Profile`);
    });

    // Update user name displays
    document.querySelectorAll('.profile span, .sidebar-item:first-child span').forEach(span => {
        span.textContent = currentUser.name;
    });

    // Update post creation placeholder
    const postInput = document.querySelector('.create-post-top input');
    if (postInput) {
        postInput.placeholder = `What's on your mind, ${currentUser.name}?`;
    }

    // Update notification badges
    const messageBadge = document.querySelector('.menu-icon:nth-of-type(2) .notification');
    const alertBadge = document.querySelector('.menu-icon:nth-of-type(3) .notification');
    
    if (messageBadge) messageBadge.textContent = currentUser.notifications.messages;
    if (alertBadge) alertBadge.textContent = currentUser.notifications.alerts;
}

// Initialize navigation behavior
function initializeNavigation() {
    const navIcons = document.querySelectorAll('.header-middle .nav-icon');
    
    // Handle navigation click events
    navIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Remove active class from all icons
            navIcons.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked icon
            this.classList.add('active');
            
            // Simulate page change (in a real app, this would navigate to different sections)
            console.log(`Navigating to: ${this.querySelector('i').className}`);
        });
    });
}

// Set up various event listeners
function setupEventListeners() {
    // Post creation
    setupPostCreation();
    
    // Like, comment, share buttons
    setupPostInteractions();
    
    // Story interactions
    setupStoryInteractions();
    
    // Search functionality
    setupSearch();
    
    // Responsive navigation for mobile
    setupResponsiveNav();
}

// Set up post creation functionality
function setupPostCreation() {
    const postInput = document.querySelector('.create-post-top input');
    const postOptions = document.querySelectorAll('.post-option');
    
    if (postInput) {
        postInput.addEventListener('focus', () => {
            console.log('Post creation started');
            postInput.style.backgroundColor = '#fff';
            postInput.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        });
        
        postInput.addEventListener('blur', () => {
            postInput.style.backgroundColor = '#f0f2f5';
            postInput.style.boxShadow = 'none';
        });
    }
    
    // Add click events for post creation options
    postOptions.forEach(option => {
        option.addEventListener('click', function() {
            const type = this.querySelector('span').textContent;
            console.log(`Creating post with: ${type}`);
            
            // Simulate the action (in a real app, this would open appropriate UI)
            if (type.includes('Photo')) {
                simulateFileUpload();
            } else if (type.includes('Live')) {
                alert('Live video streaming would start here');
            } else {
                showEmojiPicker();
            }
        });
    });
}

// Set up post interactions (like, comment, share)
function setupPostInteractions() {
    const actionButtons = document.querySelectorAll('.action-button');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            const post = this.closest('.post');
            const postAuthor = post.querySelector('.post-user h3').textContent;
            
            console.log(`${action} on post by ${postAuthor}`);
            
            if (action === 'Like') {
                handleLike(this, post);
            } else if (action === 'Comment') {
                showCommentBox(post);
            } else if (action === 'Share') {
                showShareOptions(post);
            }
        });
    });
}

// Handle click on the like button
function handleLike(button, post) {
    const likeIcon = button.querySelector('i');
    const likeText = button.querySelector('span');
    const likesCounter = post.querySelector('.post-stats .likes span');
    
    // Toggle like state
    if (likeIcon.classList.contains('fa-regular')) {
        // Like the post
        likeIcon.classList.remove('fa-regular');
        likeIcon.classList.add('fa-solid');
        likeIcon.style.color = '#1877f2';
        likeText.style.color = '#1877f2';
        
        // Update like count (extract current count, increment, update)
        const currentLikes = parseInt(likesCounter.textContent.match(/\d+/)[0]);
        likesCounter.innerHTML = `<i class="fa-solid fa-thumbs-up"></i> ${currentLikes + 1}`;
    } else {
        // Unlike the post
        likeIcon.classList.remove('fa-solid');
        likeIcon.classList.add('fa-regular');
        likeIcon.style.color = '#65676b';
        likeText.style.color = '#65676b';
        
        // Update like count
        const currentLikes = parseInt(likesCounter.textContent.match(/\d+/)[0]);
        likesCounter.innerHTML = `<i class="fa-solid fa-thumbs-up"></i> ${currentLikes - 1}`;
    }
}

// Show comment box when Comment is clicked
function showCommentBox(post) {
    // Check if comment box already exists
    let commentBox = post.querySelector('.comment-box');
    
    if (!commentBox) {
        // Create comment section if it doesn't exist
        const commentSection = document.createElement('div');
        commentSection.className = 'comment-section';
        commentSection.innerHTML = `
            <div class="comment-box">
                <img src="${currentUser.avatar}" alt="${currentUser.name}">
                <input type="text" placeholder="Write a comment...">
                <div class="comment-actions">
                    <i class="fa-regular fa-face-smile"></i>
                    <i class="fa-solid fa-camera"></i>
                    <i class="fa-regular fa-image"></i>
                    <i class="fa-regular fa-paper-plane"></i>
                </div>
            </div>
        `;
        
        // Insert before the post actions buttons
        const postActionsButtons = post.querySelector('.post-actions-buttons');
        post.insertBefore(commentSection, postActionsButtons.nextSibling);
        
        // Add event listener to the comment input
        const input = commentSection.querySelector('input');
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim()) {
                addComment(post, this.value.trim());
                this.value = '';
            }
        });
        
        // Focus the input
        input.focus();
    } else {
        // If it exists already, just focus it
        commentBox.querySelector('input').focus();
    }
}

// Add a comment to the post
function addComment(post, commentText) {
    // Create a new comment element
    const comment = document.createElement('div');
    comment.className = 'comment';
    comment.innerHTML = `
        <img src="${currentUser.avatar}" alt="${currentUser.name}">
        <div class="comment-content">
            <h4>${currentUser.name}</h4>
            <p>${commentText}</p>
            <div class="comment-actions">
                <span>Like</span>
                <span>Reply</span>
                <span>${formatTimeForDisplay(new Date())}</span>
            </div>
        </div>
    `;
    
    // Get or create the comments container
    let commentsContainer = post.querySelector('.comments-container');
    if (!commentsContainer) {
        commentsContainer = document.createElement('div');
        commentsContainer.className = 'comments-container';
        const commentSection = post.querySelector('.comment-section');
        commentSection.insertBefore(commentsContainer, commentSection.firstChild);
    }
    
    // Add the new comment
    commentsContainer.appendChild(comment);
    
    // Update the comments count
    const commentsCount = post.querySelector('.comments-shares span:first-child');
    const currentCount = parseInt(commentsCount.textContent.split(' ')[0]);
    commentsCount.textContent = `${currentCount + 1} comments`;
}

// Show share options when Share is clicked
function showShareOptions(post) {
    const shareOptions = [
        { icon: 'fa-solid fa-share', text: 'Share Now' },
        { icon: 'fa-solid fa-pencil', text: 'Share to Feed' },
        { icon: 'fa-brands fa-facebook-messenger', text: 'Send in Messenger' },
        { icon: 'fa-solid fa-users', text: 'Share to a Group' },
        { icon: 'fa-solid fa-link', text: 'Copy Link' }
    ];
    
    // Create a share modal
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    
    // Create modal content
    let optionsHTML = '';
    shareOptions.forEach(option => {
        optionsHTML += `
            <div class="share-option">
                <i class="${option.icon}"></i>
                <span>${option.text}</span>
            </div>
        `;
    });
    
    modal.innerHTML = `
        <div class="share-modal-content">
            <div class="share-modal-header">
                <h3>Share Post</h3>
                <i class="fa-solid fa-xmark" id="close-modal"></i>
            </div>
            <div class="share-modal-options">
                ${optionsHTML}
            </div>
        </div>
    `;
    
    // Add the modal to the document
    document.body.appendChild(modal);
    
    // Add close functionality
    document.getElementById('close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Add click events to options
    const options = modal.querySelectorAll('.share-option');
    options.forEach(option => {
        option.addEventListener('click', function() {
            const shareType = this.querySelector('span').textContent;
            console.log(`Sharing post via: ${shareType}`);
            
            // Update share count
            const sharesCount = post.querySelector('.comments-shares span:last-child');
            const currentShares = parseInt(sharesCount.textContent.split(' ')[0]);
            sharesCount.textContent = `${currentShares + 1} shares`;
            
            // Close the modal
            document.body.removeChild(modal);
            
            // Show confirmation message
            showNotification(`Post shared via ${shareType}`);
        });
    });
}

// Set up story interactions
function setupStoryInteractions() {
    const stories = document.querySelectorAll('.story');
    
    stories.forEach(story => {
        if (!story.classList.contains('create-story')) {
            story.addEventListener('click', function() {
                const username = this.querySelector('p').textContent;
                console.log(`Viewing story from: ${username}`);
                showStoryViewer(username, this);
            });
        } else {
            story.addEventListener('click', function() {
                console.log('Creating a new story');
                showStoryCreator();
            });
        }
    });
}

// Display a full-screen story viewer
function showStoryViewer(username, storyElement) {
    // Create story viewer elements
    const viewer = document.createElement('div');
    viewer.className = 'story-viewer';
    
    // Get the background image from the clicked story
    const storyBg = storyElement.querySelector('.story-bg img').src;
    const userImg = storyElement.querySelector('.story-profile img').src;
    
    viewer.innerHTML = `
        <div class="story-viewer-header">
            <div class="story-user-info">
                <img src="${userImg}" alt="${username}">
                <div>
                    <h4>${username}</h4>
                    <span>${formatTimeForDisplay(new Date())}</span>
                </div>
            </div>
            <div class="story-controls">
                <i class="fa-solid fa-pause"></i>
                <i class="fa-solid fa-volume-high"></i>
                <i class="fa-solid fa-ellipsis"></i>
                <i class="fa-solid fa-xmark" id="close-story"></i>
            </div>
        </div>
        <div class="story-progress">
            <div class="progress-bar"><div class="progress"></div></div>
        </div>
        <div class="story-content" style="background-image: url(${storyBg});">
        </div>
        <div class="story-reply">
            <input type="text" placeholder="Reply to ${username}...">
            <div class="story-reply-actions">
                <i class="fa-regular fa-face-smile"></i>
                <i class="fa-solid fa-heart"></i>
            </div>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(viewer);
    document.body.style.overflow = 'hidden';
    
    // Set up progress bar animation
    const progress = viewer.querySelector('.progress');
    progress.style.width = '0%';
    setTimeout(() => {
        progress.style.width = '100%';
        progress.style.transition = 'width 5s linear';
    }, 100);
    
    // Close after the progress completes
    setTimeout(() => {
        if (document.body.contains(viewer)) {
            document.body.removeChild(viewer);
            document.body.style.overflow = '';
        }
    }, 5100);
    
    // Close button functionality
    document.getElementById('close-story').addEventListener('click', () => {
        document.body.removeChild(viewer);
        document.body.style.overflow = '';
    });
}

// Show interface for creating a new story
function showStoryCreator() {
    const creator = document.createElement('div');
    creator.className = 'story-creator';
    
    creator.innerHTML = `
        <div class="story-creator-header">
            <h3>Create Story</h3>
            <i class="fa-solid fa-xmark" id="close-creator"></i>
        </div>
        <div class="story-creator-content">
            <div class="story-creator-tabs">
                <div class="creator-tab active" data-tab="text">
                    <i class="fa-solid fa-font"></i>
                    <span>Text</span>
                </div>
                <div class="creator-tab" data-tab="photo">
                    <i class="fa-regular fa-image"></i>
                    <span>Photo</span>
                </div>
            </div>
            <div class="tab-content text-tab active">
                <div class="background-options">
                    <div class="color-option" style="background-color: #1877f2"></div>
                    <div class="color-option" style="background-color: #42b72a"></div>
                    <div class="color-option" style="background-color: #f02849"></div>
                    <div class="color-option" style="background-color: #8A2BE2"></div>
                    <div class="color-option" style="background-color: #FF7F50"></div>
                </div>
                <div class="text-input-container">
                    <textarea placeholder="Start typing"></textarea>
                </div>
            </div>
            <div class="tab-content photo-tab">
                <div class="photo-upload-container">
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                    <p>Upload from your computer</p>
                    <input type="file" id="story-photo" accept="image/*" style="display: none;">
                    <button class="upload-btn">Choose Photo</button>
                </div>
            </div>
        </div>
        <div class="story-creator-footer">
            <div class="story-privacy">
                <i class="fa-solid fa-earth-americas"></i>
                <span>Public</span>
                <i class="fa-solid fa-caret-down"></i>
            </div>
            <button class="share-story-btn">Share to Story</button>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(creator);
    document.body.style.overflow = 'hidden';
    
    // Close button functionality
    document.getElementById('close-creator').addEventListener('click', () => {
        document.body.removeChild(creator);
        document.body.style.overflow = '';
    });
    
    // Tab switching functionality
    const tabs = creator.querySelectorAll('.creator-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabType = this.dataset.tab;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active content
            creator.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            creator.querySelector(`.${tabType}-tab`).classList.add('active');
        });
    });
    
    // Color options for text stories
    const colorOptions = creator.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            
            const textContainer = creator.querySelector('.text-input-container');
            textContainer.style.backgroundColor = this.style.backgroundColor;
        });
    });
    
    // File upload button
    const uploadBtn = creator.querySelector('.upload-btn');
    const fileInput = creator.querySelector('#story-photo');
    
    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const photoContainer = creator.querySelector('.photo-upload-container');
            
            // Show preview
            const img = document.createElement('img');
            img.className = 'story-preview';
            img.src = URL.createObjectURL(this.files[0]);
            
            photoContainer.innerHTML = '';
            photoContainer.appendChild(img);
            
            // Add caption input
            const caption = document.createElement('input');
            caption.type = 'text';
            caption.placeholder = 'Add a caption...';
            caption.className = 'story-caption';
            photoContainer.appendChild(caption);
        }
    });
    
    // Share button
    const shareBtn = creator.querySelector('.share-story-btn');
    shareBtn.addEventListener('click', () => {
        console.log('Story shared at ' + currentUser.lastActive);
        showNotification('Your story was shared successfully');
        document.body.removeChild(creator);
        document.body.style.overflow = '';
        
        // Add the story to the UI
        addNewStory();
    });
}

// Add a new story to the UI
function addNewStory() {
    const storiesContainer = document.querySelector('.stories-container');
    const createStory = storiesContainer.querySelector('.create-story');
    
    // Create new story element
    const newStory = document.createElement('div');
    newStory.className = 'story';
    newStory.innerHTML = `
        <div class="story-bg">
            <img src="${currentUser.avatar}" alt="Your Story">
        </div>
        <div class="story-profile">
            <img src="${currentUser.avatar}" alt="${currentUser.name}">
        </div>
        <p>Your Story</p>
    `;
    
    // Insert after create story
    storiesContainer.insertBefore(newStory, createStory.nextSibling);
    
    // Add event listener
    newStory.addEventListener('click', function() {
        showStoryViewer('Your Story', this);
    });
}

// Set up search functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-container input');
    
    if (searchInput) {
        searchInput.addEventListener('focus', () => {
            // Create search results dropdown
            const dropdown = document.createElement('div');
            dropdown.className = 'search-dropdown';
            dropdown.innerHTML = `
                <div class="search-dropdown-header">
                    <h4>Recent Searches</h4>
                    <span>Edit</span>
                </div>
                <div class="search-results">
                    <div class="search-result">
                        <img src="assets/user1.jpg" alt="User">
                        <span>Sarah Johnson</span>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <div class="search-result">
                        <img src="assets/user2.jpg" alt="User">
                        <span>Michael Chen</span>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                    <div class="search-result">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <span>Web Development Group</span>
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </div>
            `;
            
            // Add to document
            document.querySelector('.header-left').appendChild(dropdown);
            
            // Handle results click
            const results = dropdown.querySelectorAll('.search-result');
            results.forEach(result => {
                result.addEventListener('click', function(e) {
                    if (e.target.classList.contains('fa-xmark')) {
                        console.log('Remove from recent searches');
                        this.remove();
                    } else {
                        const name = this.querySelector('span').textContent;
                        console.log(`Searching for: ${name}`);
                        dropdown.remove();
                    }
                });
            });
        });
        
        searchInput.addEventListener('blur', () => {
            setTimeout(() => {
                const dropdown = document.querySelector('.search-dropdown');
                if (dropdown) {
                    dropdown.remove();
                }
            }, 200);
        });
        
        // Live search when typing
        searchInput.addEventListener('input', function() {
            if (this.value.trim()) {
                console.log(`Searching for: ${this.value}`);
                // In a real app, this would fetch search results
            }
        });
    }
}

// Set up responsive navigation for mobile devices
function setupResponsiveNav() {
    // Handle window resize
    window.addEventListener('resize', adjustLayout);
    
    // Initial layout adjustment
    adjustLayout();
    
    // Mobile menu button functionality
    const menuBtn = document.querySelector('.header-right .menu-icon:first-child');
    if (menuBtn) {
        menuBtn.addEventListener('click', toggleMobileMenu);
    }
}

// Adjust layout based on screen size
function adjustLayout() {
    const windowWidth = window.innerWidth;
    
    if (windowWidth < 768) {
        // Mobile layout adjustments
        document.body.classList.add('mobile-view');
        
        // Adjust sidebar visibility
        const leftSidebar = document.querySelector('.left-sidebar');
        const rightSidebar = document.querySelector('.right-sidebar');
        
        if (leftSidebar) leftSidebar.style.display = 'none';
        if (rightSidebar) rightSidebar.style.display = 'none';
        
        // Adjust navigation
        const navIcons = document.querySelectorAll('.header-middle .nav-icon');
        navIcons.forEach(icon => {
            icon.style.width = '48px';
        });
        
    } else {
        // Desktop layout
        document.body.classList.remove('mobile-view');
        
        // Restore sidebar visibility
        const leftSidebar = document.querySelector('.left-sidebar');
        const rightSidebar = document.querySelector('.right-sidebar');
        
        if (leftSidebar) leftSidebar.style.display = 'block';
        if (rightSidebar) rightSidebar.style.display = 'block';
        
        // Restore navigation
        const navIcons = document.querySelectorAll('.header-middle .nav-icon');
        navIcons.forEach(icon => {
            icon.style.width = '112px';
        });
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    let mobileMenu = document.querySelector('.mobile-menu');
    
    if (!mobileMenu) {
        // Create mobile menu
        mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        
        // Clone sidebar items for the menu
        const sidebarItems = document.querySelectorAll('.left-sidebar .sidebar-item');
        let menuHTML = '';
        
        sidebarItems.forEach(item => {
            const icon = item.querySelector('i') ? item.querySelector('i').outerHTML : '';
            const img = item.querySelector('img') ? item.querySelector('img').outerHTML : '';
            const text = item.querySelector('span') ? item.querySelector('span').textContent : '';
            
            menuHTML += `
                <div class="mobile-menu-item">
                    ${icon || img}
                    <span>${text}</span>
                </div>
            `;
        });
        
        mobileMenu.innerHTML = `
            <div class="mobile-menu-header">
                <h3>Menu</h3>
                <i class="fa-solid fa-xmark" id="close-mobile-menu"></i>
            </div>
            <div class="mobile-menu-items">
                ${menuHTML}
            </div>
        `;
        
        // Add to document
        document.body.appendChild(mobileMenu);
        document.body.style.overflow = 'hidden';
        
        // Close button functionality
        document.getElementById('close-mobile-menu').addEventListener('click', () => {
            document.body.removeChild(mobileMenu);
            document.body.style.overflow = '';
        });
        
        // Menu item functionality
        const menuItems = mobileMenu.querySelectorAll('.mobile-menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                const text = this.querySelector('span').textContent;
                console.log(`Mobile menu: ${text}`);
                document.body.removeChild(mobileMenu);
                document.body.style.overflow = '';
            });
        });
    } else {
        // Close menu if it's already open
        document.body.removeChild(mobileMenu);
        document.body.style.overflow = '';
    }
}

// Update all post timestamps to show relative time
function updatePostTimestamps() {
    // Get the current time
    const now = new Date();
    
    // Find all timestamp elements
    const timestamps = document.querySelectorAll('.post-user span');
    
    // Apply the current date based on Mohamedsalem00's last active time
    timestamps.forEach((timestamp, index) => {
        // Format timestamps based on index to make them look organic
        let displayTime;
        if (index === 0) {
            displayTime = "March 5, 2025 at 02:19 AM";
        } else if (index === 1) {
            displayTime = "March 5, 2025 at 02:05 AM";
        } else {
            displayTime = "March 5, 2025 at 01:48 AM";
        }
        
        // Extract just the time part
        const timePart = timestamp.textContent.split(' at ')[1].split(' ·')[0];
        timestamp.textContent = timestamp.textContent.replace(timePart, displayTime.split(' at ')[1]);
    });
}

// Format time for display
function formatTimeForDisplay(date) {
    return "Just now";
}

// Initialize tooltips for various UI elements
function initializeTooltips() {
    const tooltipElements = [
        ...document.querySelectorAll('.nav-icon'),
        ...document.querySelectorAll('.menu-icon'),
        ...document.querySelectorAll('.action-button')
    ];
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            let tooltipText = '';
            
            // Determine tooltip text based on element content
            if (this.classList.contains('nav-icon')) {
                const iconClass = this.querySelector('i').className;
                if (iconClass.includes('house')) tooltipText = 'Home';
                else if (iconClass.includes('tv')) tooltipText = 'Watch';
                else if (iconClass.includes('store')) tooltipText = 'Marketplace';
                else if (iconClass.includes('users')) tooltipText = 'Groups';
                else if (iconClass.includes('gamepad')) tooltipText = 'Gaming';
            } else if (this.classList.contains('menu-icon')) {
                const iconClass = this.querySelector('i').className;
                if (iconClass.includes('bars')) tooltipText = 'Menu';
                else if (iconClass.includes('messenger')) tooltipText = 'Messenger';
                else if (iconClass.includes('bell')) tooltipText = 'Notifications';
                else if (iconClass.includes('caret-down')) tooltipText = 'Account';
            } else if (this.classList.contains('action-button')) {
                tooltipText = this.querySelector('span').textContent;
            }
            
            // Create and position tooltip
            if (tooltipText) {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = tooltipText;
                
                // Position the tooltip
                const rect = this.getBoundingClientRect();
                tooltip.style.top = `${rect.bottom + 10}px`;
                tooltip.style.left = `${rect.left + rect.width / 2}px`;
                
                document.body.appendChild(tooltip);
                
                // Store the tooltip reference for removal
                this.tooltip = tooltip;
            }
        });
        
        // Remove tooltip on mouse leave
        element.addEventListener('mouseleave', function() {
            if (this.tooltip) {
                document.body.removeChild(this.tooltip);
                this.tooltip = null;
            }
        });
    });
}

// Show a notification message to the user
function showNotification(message) {
    // Check if there's an existing notification
    let notification = document.querySelector('.fb-notification');
    
    if (notification) {
        // Clear any existing timeout
        clearTimeout(notification.timeoutId);
        document.body.removeChild(notification);
    }
    
    // Create notification element
    notification = document.createElement('div');
    notification.className = 'fb-notification';
    notification.innerHTML = `
        <i class="fa-solid fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Animate out after delay
    notification.timeoutId = setTimeout(() => {
        notification.style.transform = 'translateY(-20px)';
        notification.style.opacity = '0';
        
        // Remove after animation
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Simulate file upload dialog
function simulateFileUpload() {
    // Create hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);
    
    // Simulate click
    fileInput.click();
    
    // Handle file selection
    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            console.log(`File selected: ${this.files[0].name}`);
            
            // Simulate upload and post creation
            showUploadingDialog(this.files[0]);
            
            // Remove the input element
            document.body.removeChild(fileInput);
        } else {
            document.body.removeChild(fileInput);
        }
    });
    
    // Handle cancel
    fileInput.addEventListener('cancel', function() {
        document.body.removeChild(fileInput);
    });
}

// Show uploading dialog for photos
function showUploadingDialog(file) {
    const dialog = document.createElement('div');
    dialog.className = 'upload-dialog';
    
    dialog.innerHTML = `
        <div class="upload-dialog-content">
            <div class="upload-dialog-header">
                <h3>Create Post</h3>
                <i class="fa-solid fa-xmark" id="close-upload"></i>
            </div>
            <div class="upload-user-info">
                <img src="${currentUser.avatar}" alt="${currentUser.name}">
                <div>
                    <h4>${currentUser.name}</h4>
                    <div class="privacy-selector">
                        <i class="fa-solid fa-earth-americas"></i>
                        <span>Public</span>
                        <i class="fa-solid fa-caret-down"></i>
                    </div>
                </div>
            </div>
            <div class="upload-content">
                <textarea placeholder="What's on your mind, ${currentUser.name}?"></textarea>
                <div class="upload-preview">
                    <img src="${URL.createObjectURL(file)}" alt="Preview">
                    <div class="upload-actions">
                        <i class="fa-solid fa-crop"></i>
                        <i class="fa-solid fa-tag"></i>
                        <i class="fa-solid fa-face-smile"></i>
                        <i class="fa-solid fa-pencil"></i>
                        <i class="fa-solid fa-trash"></i>
                    </div>
                </div>
            </div>
            <div class="upload-options">
                <h4>Add to your post</h4>
                <div class="upload-option-buttons">
                    <i class="fa-regular fa-image" style="color: #45BD62;"></i>
                    <i class="fa-solid fa-user-tag" style="color: #1877F2;"></i>
                    <i class="fa-regular fa-face-smile" style="color: #F7B928;"></i>
                    <i class="fa-solid fa-location-dot" style="color: #F5533D;"></i>
                    <i class="fa-solid fa-flag" style="color: #1877F2;"></i>
                    <i class="fa-solid fa-ellipsis"></i>
                </div>
            </div>
            <button class="post-button">Post</button>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(dialog);
    document.body.style.overflow = 'hidden';
    
    // Close button functionality
    document.getElementById('close-upload').addEventListener('click', () => {
        document.body.removeChild(dialog);
        document.body.style.overflow = '';
    });
    
    // Post button functionality
    const postButton = dialog.querySelector('.post-button');
    postButton.addEventListener('click', () => {
        const postText = dialog.querySelector('textarea').value.trim();
        
        // Simulate posting
        console.log(`Creating post with text: ${postText} and image: ${file.name}`);
        
        // Show loading state
        postButton.textContent = 'Posting...';
        postButton.disabled = true;
        
        // Simulate upload delay
        setTimeout(() => {
            document.body.removeChild(dialog);
            document.body.style.overflow = '';
            
            // Add the new post to the feed
            addNewPost(postText, URL.createObjectURL(file));
            
            // Show success message
            showNotification('Your post was shared successfully');
        }, 1500);
    });
}

// Add a new post to the feed
function addNewPost(text, imageUrl) {
    const currentDate = new Date('2025-03-05 02:22:22');
    const formattedDate = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getDate()}, ${currentDate.getFullYear()} at ${formatTime(currentDate)}`;
    
    // Create post HTML
    const postHTML = `
        <div class="post-header">
            <div class="post-user">
                <img src="${currentUser.avatar}" alt="${currentUser.name}">
                <div>
                    <h3>${currentUser.name}</h3>
                    <span>${formattedDate} · <i class="fa-solid fa-earth-americas"></i></span>
                </div>
            </div>
            <div class="post-actions">
                <i class="fa-solid fa-ellipsis"></i>
                <i class="fa-solid fa-xmark"></i>
            </div>
        </div>
        <div class="post-content">
            <p>${text}</p>
            <img src="${imageUrl}" alt="Post image">
        </div>
        <div class="post-stats">
            <div class="likes">
                <span><i class="fa-solid fa-thumbs-up"></i> 0</span>
            </div>
            <div class="comments-shares">
                <span>0 comments</span>
                <span>0 shares</span>
            </div>
        </div>
        <div class="post-actions-buttons">
            <div class="action-button">
                <i class="fa-regular fa-thumbs-up"></i>
                <span>Like</span>
            </div>
            <div class="action-button">
                <i class="fa-regular fa-comment"></i>
                <span>Comment</span>
            </div>
            <div class="action-button">
                <i class="fa-regular fa-share-from-square"></i>
                <span>Share</span>
            </div>
        </div>
    `;
    
    // Create post element
    const post = document.createElement('div');
    post.className = 'post';
    post.innerHTML = postHTML;
    
    // Insert at the top of the feed (after create post section)
    const mainFeed = document.querySelector('.main-feed');
    const createPost = document.querySelector('.create-post');
    mainFeed.insertBefore(post, createPost.nextSibling);
    
    // Add event listeners to the new post
    const actionButtons = post.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            
            if (action === 'Like') {
                handleLike(this, post);
            } else if (action === 'Comment') {
                showCommentBox(post);
            } else if (action === 'Share') {
                showShareOptions(post);
            }
        });
    });
}

// Format time for display (12-hour format with AM/PM)
function formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // Hour '0' should be '12'
    
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    
    return `${hours}:${formattedMinutes} ${ampm}`;
}

// Show emoji picker
function showEmojiPicker() {
    const emojis = [
        '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
        '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
        '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸',
        '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
        '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬',
        '👍', '👎', '❤️', '🔥', '🎉', '🤔', '👏', '🙌', '👌', '✌️'
    ];
    
    // Create emoji picker element
    const picker = document.createElement('div');
    picker.className = 'emoji-picker';
    
    // Create emoji grid
    let emojiGrid = '';
    emojis.forEach(emoji => {
        emojiGrid += `<div class="emoji">${emoji}</div>`;
    });
    
    picker.innerHTML = `
        <div class="emoji-picker-header">
            <h4>Choose an emoji</h4>
            <i class="fa-solid fa-xmark" id="close-emoji"></i>
        </div>
        <div class="emoji-search">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search emojis...">
        </div>
        <div class="emoji-categories">
            <div class="emoji-category active">😀</div>
            <div class="emoji-category">❤️</div>
            <div class="emoji-category">🐶</div>
            <div class="emoji-category">🍔</div>
            <div class="emoji-category">⚽</div>
            <div class="emoji-category">🚗</div>
            <div class="emoji-category">💡</div>
            <div class="emoji-category">🏁</div>
        </div>
        <div class="emoji-grid">
            ${emojiGrid}
        </div>
    `;
    
    // Add to document
    document.body.appendChild(picker);
    
    // Position the picker near the create post area
    const createPost = document.querySelector('.create-post');
    const rect = createPost.getBoundingClientRect();
    picker.style.top = `${rect.bottom + 10}px`;
    picker.style.left = `${rect.left + rect.width / 2 - 150}px`;
    
    // Close button functionality
    document.getElementById('close-emoji').addEventListener('click', () => {
        document.body.removeChild(picker);
    });
    
    // Add click events to emojis
    const emojiElements = picker.querySelectorAll('.emoji');
    emojiElements.forEach(emoji => {
        emoji.addEventListener('click', function() {
            const selectedEmoji = this.textContent;
            
            // Create a new post with the emoji
            createEmojiPost(selectedEmoji);
            
            // Remove emoji picker
            document.body.removeChild(picker);
        });
    });
    
    // Handle clicks outside the picker
    document.addEventListener('click', function handleOutsideClick(e) {
        if (!picker.contains(e.target) && e.target.closest('.post-option') === null) {
            document.body.removeChild(picker);
            document.removeEventListener('click', handleOutsideClick);
        }
    });
}

// Create a new post with an emoji
function createEmojiPost(emoji) {
    const currentDate = new Date('2025-03-05 02:26:45');
    const formattedDate = `${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getDate()}, ${currentDate.getFullYear()} at ${formatTime(currentDate)}`;
    
    // Create a post with just the emoji as large text
    const post = document.createElement('div');
    post.className = 'post';
    
    post.innerHTML = `
        <div class="post-header">
            <div class="post-user">
                <img src="${currentUser.avatar}" alt="${currentUser.name}">
                <div>
                    <h3>${currentUser.name}</h3>
                    <span>${formattedDate} · <i class="fa-solid fa-earth-americas"></i></span>
                </div>
            </div>
            <div class="post-actions">
                <i class="fa-solid fa-ellipsis"></i>
                <i class="fa-solid fa-xmark"></i>
            </div>
        </div>
        <div class="post-content emoji-post">
            <div class="large-emoji">${emoji}</div>
        </div>
        <div class="post-stats">
            <div class="likes">
                <span><i class="fa-solid fa-thumbs-up"></i> 0</span>
            </div>
            <div class="comments-shares">
                <span>0 comments</span>
                <span>0 shares</span>
            </div>
        </div>
        <div class="post-actions-buttons">
            <div class="action-button">
                <i class="fa-regular fa-thumbs-up"></i>
                <span>Like</span>
            </div>
            <div class="action-button">
                <i class="fa-regular fa-comment"></i>
                <span>Comment</span>
            </div>
            <div class="action-button">
                <i class="fa-regular fa-share-from-square"></i>
                <span>Share</span>
            </div>
        </div>
    `;
    
    // Insert at the top of the feed
    const mainFeed = document.querySelector('.main-feed');
    const createPost = document.querySelector('.create-post');
    mainFeed.insertBefore(post, createPost.nextSibling);
    
    // Set up interaction listeners
    setupPostInteractionListeners(post);
    
    // Show notification
    showNotification('Your feeling was shared');
}

// Set up interaction listeners for a post
function setupPostInteractionListeners(post) {
    const actionButtons = post.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            
            if (action === 'Like') {
                handleLike(this, post);
            } else if (action === 'Comment') {
                showCommentBox(post);
            } else if (action === 'Share') {
                showShareOptions(post);
            }
        });
    });
    
    // Add menu and close button functionality
    const menuButton = post.querySelector('.fa-ellipsis');
    const closeButton = post.querySelector('.fa-xmark');
    
    if (menuButton) {
        menuButton.addEventListener('click', () => showPostMenu(post));
    }
    
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            if (confirm('Hide this post?')) {
                post.style.opacity = '0';
                setTimeout(() => post.remove(), 300);
            }
        });
    }
}

// Update time displays to use current time
function updateTimeDisplays() {
    // Set current time to March 5, 2025 at 02:26:45
    const now = new Date('2025-03-05 02:26:45');
    document.querySelectorAll('.post-user span').forEach(span => {
        // Keep the original parts but update the time display format
        const parts = span.textContent.split(' · ');
        if (parts.length >= 2) {
            span.innerHTML = `March 5, 2025 at ${formatTime(now)} · ${parts[1]}`;
        }
    });
}

// Document ready function to initialize the Facebook clone
document.addEventListener('DOMContentLoaded', () => {
    console.log(`Facebook clone initialized for ${currentUser.name} at ${currentUser.lastActive}`);
    initializeComponents();
    setupEventListeners();
    updateTimeDisplays();
});