# Facebook Clone Project

**Created by:** Mohamedsalem00  
**Last Updated:** 2025-03-06 15:15:45 UTC

## Overview

This project is a static frontend clone of Facebook's web interface, built using HTML, CSS, and vanilla JavaScript. It aims to recreate the core visual elements and interactions of Facebook's main interface without requiring any backend services.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Technical Details](#technical-details)
- [Browser Compatibility](#browser-compatibility)
- [Future Enhancements](#future-enhancements)
- [License](#license)
- [Contact](#contact)

## Features

### Core Features
- **Responsive Design:** Adapts seamlessly between desktop and mobile views
- **Dark Mode:** Supports system preference for dark/light themes
- **Post Feed:** Scrollable news feed with interactive posts

### Interactive Elements
- **Posts:** 
  - Like/Unlike with counter updates
  - Comment section with real-time additions
  - Share dialog with multiple sharing options
  - Emoji reactions
  
- **Stories:**
  - View stories with animated progress bar
  - Create new stories with text or photos
  - Background color selection for text stories
  
- **Messenger:**
  - Chat popup interface
  - Conversation history display
  - Message notifications
  - Active status indicators

- **User Interface:**
  - Top navigation bar with working search
  - Left sidebar with profile and menu items
  - Right sidebar with contacts and sponsored content
  - Tooltips for enhanced usability

## Project Structure

```
facebook-clone/
├── index.html            # Main HTML document
├── css
|   └── css_styles.css    # Core styling
├── js
|   └── js_scripts.js     # JavaScript functionality          
├── README.md             # Project documentation
├── assets/               # Media directory
│   ├── profile.jpg       # User profile image
│   ├── facebook-logo.png # Facebook logo
│   ├── favicon.ico       # Site favicon
│   ├── user1.jpg         # Friend profile images
│   ├── user2.jpg
│   ├── ...
│   ├── story1.jpg        # Story images
│   ├── story2.jpg
│   ├── ...
│   ├── post1.jpg         # Post content images
│   ├── post2.jpg
│   ├── ...
│   ├── group1.jpg        # Group images
│   ├── group2.jpg
│   └── ...
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Mohamedsalem00/facebook-clone.git
   ```

2. Navigate to the project directory:
   ```bash
   cd facebook-clone
   ```

3. No dependencies or build processes required! The project uses pure HTML, CSS, and JavaScript.

## Usage

Simply open `index.html` in any modern web browser to view and interact with the Facebook clone.

Key interactions available:
- Click on posts to expand comments
- Use the like, comment, and share buttons
- Create a new post with text or media
- View and create stories
- Use the messenger chat interface
- Test responsive design by resizing browser window

## Technical Details

### HTML
- **Structure:** Semantic HTML5 elements for improved accessibility
- **Organization:** Clean hierarchy with descriptive class names
- **Commenting:** Thorough documentation of major sections

### CSS
- **Methodology:** Custom CSS with BEM-inspired naming
- **Layout:** Flexbox for responsive positioning
- **Variables:** CSS custom properties for theming
- **Media Queries:** Breakpoints for mobile, tablet and desktop
- **Dark Mode:** Uses `prefers-color-scheme` media query

### JavaScript
- **Architecture:** Vanilla JS with modular functions
- **Events:** Custom event listeners for user interactions
- **DOM:** Dynamic content creation and manipulation
- **Simulation:** Mock data for social interactions
- **Responsive:** JS-enhanced responsive behaviors

## Browser Compatibility

Tested and optimized for:
- Chrome (version 100+)
- Firefox (version 95+)
- Safari (version 15+)
- Edge (version 95+)
- Mobile browsers (iOS Safari 15+, Android Chrome 100+)

## Future Enhancements

Planned features for future development:

- **Functionality:**
  - Implement localStorage for persistence between sessions
  - Add drag-and-drop functionality for photo uploads
  - Expand emoji reaction options
  - Enable video story playback

- **UI/UX:**
  - Add smooth animations and transitions
  - Implement skeleton loading states
  - Create more interactive hover states
  - Enable theme customization

- **Additional Features:**
  - Marketplace section
  - Events calendar
  - Gaming platform
  - Virtual reality spaces

## License

This project is created for educational and demonstration purposes only. Facebook is a trademark of Meta Platforms, Inc. This clone is not affiliated with, endorsed by, or sponsored by Meta Platforms, Inc.

## Contact

For questions, suggestions, or collaboration opportunities:

- **GitHub:** [Mohamedsalem00](https://github.com/Mohamedsalem00)
- **Portfolio:** https://mohamedsalem00.github.io

---

© 2025 Mohamedsalem00. All rights reserved.
