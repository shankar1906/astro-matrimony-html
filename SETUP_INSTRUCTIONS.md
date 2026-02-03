# Setup Instructions

## Changes Made

### 1. Default Timezone Set to India (5.5)
- All timezone fields now have a default value of `5.5` (IST - Indian Standard Time)
- This applies to:
  - Astro Details form
  - Male Details form (Match Making)
  - Female Details form (Match Making)

### 2. Location Field with Google Places Autocomplete
- **Removed**: Manual latitude and longitude input fields
- **Added**: Location autocomplete field using Google Places API
- When you select a location from the dropdown, it automatically:
  - Extracts the latitude and longitude
  - Populates hidden fields with these coordinates
  - Uses these coordinates for the astrology API calls

## Google API Key Setup

### Step 1: Get a Google API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Maps JavaScript API**
   - **Places API**
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Copy your API key

### Step 2: Restrict Your API Key (Recommended)
1. Click on your API key to edit it
2. Under **Application restrictions**, select **HTTP referrers**
3. Add your website domain (e.g., `yourdomain.com/*`)
4. Under **API restrictions**, select **Restrict key**
5. Choose:
   - Maps JavaScript API
   - Places API

### Step 3: Add API Key to Your Project
1. Open `index.html`
2. Find this line (around line 12):
   ```html
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_API_KEY&libraries=places&callback=initAutocomplete" async defer></script>
   ```
3. Replace `YOUR_GOOGLE_API_KEY` with your actual API key:
   ```html
   <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBxxxxxxxxxxxxxxxxxxxxxx&libraries=places&callback=initAutocomplete" async defer></script>
   ```

## How to Use

1. **Astro Details Form**:
   - Enter birth date and time
   - Start typing a city name in the "Birth Location" field
   - Select a location from the dropdown
   - The latitude and longitude will be automatically filled
   - Timezone is pre-set to 5.5 (India)
   - Click "Get Astro Details"

2. **Match Making Form**:
   - Same process for both Male and Female details
   - Each has its own location autocomplete field
   - All timezones default to 5.5 (India)

## Features

- ✅ Default timezone set to India (5.5)
- ✅ Google Places Autocomplete for easy location selection
- ✅ Automatic latitude/longitude extraction
- ✅ Hidden lat/lon fields (no manual entry needed)
- ✅ Works for all three forms (Astro, Male, Female)
- ✅ City-based search (optimized for birth locations)

## Testing

1. Open `index.html` in a web browser
2. Try typing "Mumbai" or "Chennai" in any location field
3. Select a city from the dropdown
4. Check the browser console - you should see the lat/lon values logged
5. Submit the form to verify the astrology API receives the correct coordinates

## Notes

- The location field spans the full width of the form for better UX
- Latitude and longitude are now hidden fields (automatically populated)
- The autocomplete is restricted to cities for better performance
- All three location fields (Astro, Male, Female) work independently
