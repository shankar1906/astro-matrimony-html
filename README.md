# Kongu Matrimony Horoscope API Check

A premium web application for testing astrology API endpoints with a modern, beautiful interface.

## Features

### 🌟 Two Main Forms

1. **Astro Details Form**
   - Get detailed astrological information based on birth details
   - Fields: Day, Month, Year, Hour, Minute, Latitude, Longitude, Timezone
   - API Endpoint: `POST /v1/astro_details`
   - Returns: Ascendant, Nakshatra, Rashi, Varna, Yoni, Gan, and more

2. **Match Making Form (Dashakoot Points)**
   - Calculate compatibility between two horoscopes
   - Separate input sections for Male and Female details
   - API Endpoint: `POST /v1/match_dashakoot_points`
   - Returns: Compatibility score with detailed Koot analysis

### 🌐 Language Support

- **English (en)**: Default language
- **Tamil (ta)**: Tamil language support
- Language selection affects API responses

### 🎨 Premium Design Features

- **Modern Dark Theme**: Sleek dark background with vibrant purple and pink gradients
- **Glassmorphism Effects**: Modern UI with subtle transparency and blur effects
- **Smooth Animations**: Fade-in, slide-up, and hover animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, focus states, and micro-animations
- **Premium Typography**: Using Inter font for clean, modern text

## API Configuration

The application connects to the Astrology API with the following configuration:

```javascript
API_CONFIG = {
    baseURL: 'https://json.astrologyapi.com/v1',
    auth: 'Basic NjQ5NzgzOmNjNTZiNjVjNGZlM2Y3YzgyZTcyZjk2ZDlkNmI4MGNhMzBjY2FiNjY=',
    apiKey: 'OMpqVWAH.UC80wyXTtPwhDgAUdCTx6'
}
```

## File Structure

```
kongu-matrimony-horoscope-api-check/
├── index.html          # Main HTML structure
├── styles.css          # Premium CSS styling
├── script.js           # JavaScript API integration
└── README.md           # This file
```

## Usage

### Opening the Application

1. Simply open `index.html` in a modern web browser
2. No build process or server required - it's a static web application

### Using Astro Details Form

1. Click on the "Astro Details" tab (active by default)
2. Fill in the birth details:
   - Day, Month, Year
   - Hour and Minute (24-hour format)
   - Latitude and Longitude
   - Timezone (e.g., 5.5 for IST)
3. Select language (English or Tamil)
4. Click "Get Astro Details"
5. View the detailed astrological information

### Using Match Making Form

1. Click on the "Match Making" tab
2. Fill in Male Details section
3. Fill in Female Details section
4. Select language (English or Tamil)
5. Click "Calculate Match"
6. View compatibility score and detailed Koot analysis

## API Response Examples

### Astro Details Response

```json
{
    "ascendant": "மிதுனம்",
    "ascendant_lord": "புதன், ",
    "Varna": "ஷத்த்ரிய",
    "Naksahtra": "மகம்",
    "sign": "சிம்மம்",
    ...
}
```

### Match Making Response

```json
{
    "dina": {
        "male_koot_attribute": "ஹஸ்தம்",
        "female_koot_attribute": "பூசம்",
        "total_points": 3,
        "received_points": 3
    },
    "total": {
        "total_points": 36,
        "received_points": 25.5,
        "minimum_required": 18
    },
    ...
}
```

## Technical Details

### Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties, flexbox, and grid
- **Vanilla JavaScript**: No frameworks, pure ES6+
- **Fetch API**: For making HTTP requests

### Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Opera: ✅ Full support

### Features Implemented

- ✅ Form validation
- ✅ Loading states with spinners
- ✅ Error handling and display
- ✅ Responsive design
- ✅ Accessibility features
- ✅ Smooth animations
- ✅ Language switching
- ✅ Tab navigation
- ✅ Dynamic result display

## Customization

### Changing Colors

Edit the CSS custom properties in `styles.css`:

```css
:root {
    --primary: hsl(280, 70%, 55%);
    --secondary: hsl(320, 65%, 55%);
    --accent: hsl(45, 100%, 60%);
    ...
}
```

### Adding More Languages

1. Add language option in HTML:
```html
<option value="hi">हिंदी (Hindi)</option>
```

2. The API will automatically use the selected language

## Development

### Local Testing

Simply open `index.html` in your browser. No build process required.

### CORS Considerations

If you encounter CORS issues when testing locally, you may need to:
1. Use a local server (e.g., `python -m http.server`)
2. Or use a browser extension to disable CORS for testing

## License

This project is created for Kongu Matrimony horoscope API testing purposes.

## Support

For issues or questions, please contact the development team.

---

**Built with ❤️ for Kongu Matrimony**
