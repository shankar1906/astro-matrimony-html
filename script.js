// API Configuration
const API_CONFIG = {
    baseURL: 'https://json.astrologyapi.com/v1',
    auth: 'Basic NjQ5NzgzOmNjNTZiNjVjNGZlM2Y3YzgyZTcyZjk2ZDlkNmI4MGNhMzBjY2FiNjY=',
    apiKey: 'OMpqVWAH.UC80wyXTtPwhDgAUdCTx6',
    endpoints: {
        astroDetails: '/astro_details',
        matchDashakoot: '/match_dashakoot_points'
    }
};

// State
let currentLanguage = 'en';

// DOM Elements
const languageSelect = document.getElementById('language');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const astroForm = document.getElementById('astro-form');
const matchingForm = document.getElementById('matching-form');
const astroLoading = document.getElementById('astro-loading');
const astroResult = document.getElementById('astro-result');
const matchingLoading = document.getElementById('matching-loading');
const matchingResult = document.getElementById('matching-result');

// Event Listeners
languageSelect.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    console.log('Language changed to:', currentLanguage);
});

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.dataset.tab;
        switchTab(tabName);
    });
});

astroForm.addEventListener('submit', handleAstroSubmit);
matchingForm.addEventListener('submit', handleMatchingSubmit);

// Tab Switching
function switchTab(tabName) {
    // Update buttons
    tabButtons.forEach(btn => {
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update content
    tabContents.forEach(content => {
        if (content.id === `${tabName}-tab`) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}

// Astro Details Form Handler
async function handleAstroSubmit(e) {
    e.preventDefault();

    const formData = new FormData(astroForm);
    const data = {
        day: parseInt(formData.get('day')),
        month: parseInt(formData.get('month')),
        year: parseInt(formData.get('year')),
        hour: parseInt(formData.get('hour')),
        min: parseInt(formData.get('min')),
        lat: parseFloat(formData.get('lat')),
        lon: parseFloat(formData.get('lon')),
        tzone: parseFloat(formData.get('tzone'))
    };

    // Show loading
    astroResult.classList.add('hidden');
    astroLoading.classList.remove('hidden');

    try {
        const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.astroDetails}`, {
            method: 'POST',
            headers: {
                'Accept-Language': currentLanguage,
                'Content-Type': 'application/json',
                'Authorization': API_CONFIG.auth
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        displayAstroResults(result);
    } catch (error) {
        displayError(astroResult, error.message);
    } finally {
        astroLoading.classList.add('hidden');
    }
}

// Matching Form Handler
async function handleMatchingSubmit(e) {
    e.preventDefault();

    const formData = new FormData(matchingForm);
    const data = {
        m_day: parseInt(formData.get('m_day')),
        m_month: parseInt(formData.get('m_month')),
        m_year: parseInt(formData.get('m_year')),
        m_hour: parseInt(formData.get('m_hour')),
        m_min: parseInt(formData.get('m_min')),
        m_lat: parseFloat(formData.get('m_lat')),
        m_lon: parseFloat(formData.get('m_lon')),
        m_tzone: parseFloat(formData.get('m_tzone')),
        f_day: parseInt(formData.get('f_day')),
        f_month: parseInt(formData.get('f_month')),
        f_year: parseInt(formData.get('f_year')),
        f_hour: parseInt(formData.get('f_hour')),
        f_min: parseInt(formData.get('f_min')),
        f_lat: parseFloat(formData.get('f_lat')),
        f_lon: parseFloat(formData.get('f_lon')),
        f_tzone: parseFloat(formData.get('f_tzone'))
    };

    // Show loading
    matchingResult.classList.add('hidden');
    matchingLoading.classList.remove('hidden');

    try {
        const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.matchDashakoot}`, {
            method: 'POST',
            headers: {
                'Accept-Language': currentLanguage,
                'Content-Type': 'application/json',
                'Authorization': API_CONFIG.auth
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        displayMatchingResults(result);
    } catch (error) {
        displayError(matchingResult, error.message);
    } finally {
        matchingLoading.classList.add('hidden');
    }
}

// Display Astro Results
function displayAstroResults(data) {
    const html = `
        <h3 class="result-title">Astrological Details</h3>
        <div class="result-grid">
            ${createResultItem('Ascendant', data.ascendant)}
            ${createResultItem('Ascendant Lord', data.ascendant_lord)}
            ${createResultItem('Varna', data.Varna)}
            ${createResultItem('Vashya', data.Vashya)}
            ${createResultItem('Yoni', data.Yoni)}
            ${createResultItem('Gan', data.Gan)}
            ${createResultItem('Nadi', data.Nadi)}
            ${createResultItem('Sign Lord', data.SignLord)}
            ${createResultItem('Sign', data.sign)}
            ${createResultItem('Nakshatra', data.Naksahtra)}
            ${createResultItem('Nakshatra Lord', data.NaksahtraLord)}
            ${createResultItem('Charan', data.Charan)}
            ${createResultItem('Yog', data.Yog)}
            ${createResultItem('Karan', data.Karan)}
            ${createResultItem('Tithi', data.Tithi)}
            ${createResultItem('Yunja', data.yunja)}
            ${createResultItem('Tatva', data.tatva)}
            ${createResultItem('Name Alphabet', data.name_alphabet)}
            ${createResultItem('Paya', data.paya)}
        </div>
    `;

    astroResult.innerHTML = html;
    astroResult.classList.remove('hidden');
}

// Display Matching Results
function displayMatchingResults(data) {
    const total = data.total;
    const percentage = (total.received_points / total.total_points) * 100;

    let kootHTML = '';
    const koots = ['dina', 'gana', 'yoni', 'rashi', 'rasyadhipati', 'rajju', 'vedha', 'vashya', 'mahendra', 'streeDeergha'];

    koots.forEach(koot => {
        if (data[koot]) {
            kootHTML += createKootItem(koot, data[koot]);
        }
    });

    const html = `
        <div class="match-score">
            <div class="score-value">${total.received_points}/${total.total_points}</div>
            <div class="score-label">Compatibility Points</div>
            <div class="score-bar">
                <div class="score-fill" style="width: ${percentage}%"></div>
            </div>
            <div style="margin-top: 1rem; font-size: 0.95rem; color: rgba(255,255,255,0.8);">
                Minimum Required: ${total.minimum_required} points
            </div>
        </div>
        
        <h3 class="result-title">Dashakoot Analysis</h3>
        ${kootHTML}
    `;

    matchingResult.innerHTML = html;
    matchingResult.classList.remove('hidden');
}

// Helper Functions
function createResultItem(label, value) {
    return `
        <div class="result-item">
            <div class="result-label">${label}</div>
            <div class="result-value">${value || 'N/A'}</div>
        </div>
    `;
}

function createKootItem(name, data) {
    return `
        <div class="koot-item">
            <div class="koot-header">
                <div class="koot-name">${formatKootName(name)}</div>
                <div class="koot-points">${data.received_points}/${data.total_points}</div>
            </div>
            <div class="koot-details">
                <div class="koot-attribute">
                    <div class="attribute-label">Male</div>
                    <div class="attribute-value">${data.male_koot_attribute || 'N/A'}</div>
                </div>
                <div class="koot-attribute">
                    <div class="attribute-label">Female</div>
                    <div class="attribute-value">${data.female_koot_attribute || 'N/A'}</div>
                </div>
            </div>
            ${data.description ? `<div style="margin-top: 0.75rem; color: var(--text-secondary); font-size: 0.9rem;">${data.description}</div>` : ''}
        </div>
    `;
}

function formatKootName(name) {
    const nameMap = {
        'dina': 'Dina (Day)',
        'gana': 'Gana (Nature)',
        'yoni': 'Yoni (Animal)',
        'rashi': 'Rashi (Moon Sign)',
        'rasyadhipati': 'Rasyadhipati (Lord)',
        'rajju': 'Rajju (Type)',
        'vedha': 'Vedha (Affliction)',
        'vashya': 'Vashya (Attraction)',
        'mahendra': 'Mahendra (Prosperity)',
        'streeDeergha': 'Stree Deergha (Longevity)'
    };
    return nameMap[name] || name;
}

function displayError(container, message) {
    container.innerHTML = `
        <div class="error-message">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <div>
                <strong>Error:</strong> ${message}
            </div>
        </div>
    `;
    container.classList.remove('hidden');
}

// Initialize
console.log('Kongu Matrimony Horoscope API Check - Ready');
console.log('Current Language:', currentLanguage);
