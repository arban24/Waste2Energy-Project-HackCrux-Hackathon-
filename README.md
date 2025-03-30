# Waste to Energy Website

A professional website for showcasing waste-to-energy technologies, case studies, and solutions with a clean, eco-friendly UI.

## Features

- Responsive design that works on mobile, tablet, and desktop
- Dark mode toggle for user preference
- Interactive technology cards
- Animated infographic showing the waste-to-energy process
- Interactive case studies map with global examples
- Energy calculator that estimates output based on waste input
- Blog section highlighting latest news and trends
- Contact form for inquiries (frontend only)
- Floating action buttons for easy navigation
- Wave and curved section dividers for modern aesthetics

## Enhancing with High-Quality Images

The current website uses SVG illustrations as placeholders for key images. For a more professional look, replace these with high-quality photos:

1. **Replace SVG Images**: All SVG files in the `images` folder should be replaced with professional photographs related to waste-to-energy facilities.

2. **Recommended Image Types**:
   - `images/dummy-1.svg` → Replace with a high-resolution photo of a modern waste-to-energy facility
   - `images/dummy-2.svg` → Replace with a professional circular economy diagram or infographic
   - `images/dummy-3.svg` → Replace with real data visualization or dashboard screenshot

3. **Image Recommendations**:
   - Use high-resolution images (at least 1200px width)
   - Optimize images for web (compress to reasonable file sizes)
   - Use WEBP format for best quality-to-size ratio, with JPG fallbacks
   - Maintain 16:9 or 4:3 aspect ratios for consistency
   - Use professional stock photos or real facility photos (with permission)

4. **Image Sources**:
   - Professional stock photography websites
   - Industry-specific image libraries
   - Real photos from your own facilities (if applicable)
   - Commissioned professional photography

## Technologies Used

- HTML5
- CSS3 (with custom properties/variables)
- JavaScript (vanilla, no frameworks)
- Leaflet.js for interactive maps
- Font Awesome for icons

## How to Run

1. Download or clone this repository
2. Open index.html in your browser
3. For best results, use a live server (like VS Code's Live Server extension)

## Structure

- `index.html` - Main HTML file with all content
- `css/styles.css` - All styling for the website
- `js/script.js` - JavaScript for interactions and animations
- `images/` - Contains SVG illustrations and other image assets
- `README.md` - This documentation file

## Editing and Customization

### HTML
Modify `index.html` to change content, add sections, or update information.

### CSS
Edit `css/styles.css` to change colors, spacing, fonts, and other styling elements.

The root section contains CSS variables that define the color palette:
```css
:root {
    --primary-color: #2ecc71; /* Green */
    --secondary-color: #3498db; /* Blue */
    /* ...other variables... */
}
```

### JavaScript
Modify `js/script.js` to change interactions, animations, or calculator functionality.

## Credits

- Icons from [Font Awesome](https://fontawesome.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)
- Maps powered by [Leaflet.js](https://leafletjs.com/)

## Note

This is a frontend-only implementation. In a real-world scenario, the contact form and calculator would be connected to backend services for processing data. 