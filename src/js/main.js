// Store journals globally
let journalsData = [];

// Add dictionary loading at the top of the file
async function loadDictionary() {
    try {
        const response = await fetch('./src/data/dictionary.csv');
        const text = await response.text();
        const rows = text.split('\n').slice(1); // Skip header
        return rows.reduce((dict, row) => {
            const [field, full, short] = row.split(',').map(s => s.replace(/"/g, ''));
            dict[field] = { full, short };
            return dict;
        }, {});
    } catch (error) {
        console.error('Error loading dictionary:', error);
        return {};
    }
}

// Main initialization
document.addEventListener('DOMContentLoaded', async () => {
    const dictionary = await loadDictionary();
    initializeTheme();
    initializeSearch();
    loadJournalRankings(dictionary);
});

function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Update initial icon
    const currentTheme = document.documentElement.getAttribute('data-theme');
    updateThemeIcon(currentTheme);

    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    // Listen for system theme changes
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
        }
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

function initializeSearch() {
    const searchButton = document.getElementById('searchButton');
    const searchModal = document.getElementById('searchModal');
    const modalSearch = document.getElementById('modalJournalSearch');
    const closeModal = document.getElementById('closeModal');

    // Set initial state
    searchModal.style.display = 'none';

    if (!searchModal || !searchButton) return;

    // Add search handler
    const handleSearch = () => {
        const query = modalSearch?.value?.toLowerCase() || '';
        const field = fieldFilter?.value;
        const sort = sortBy?.value;

        const results = journalsData
            .filter(journal => {
                const matchQuery = journal['OA_Journal Name']?.toLowerCase().includes(query) ||
                                 journal['OA_ISSN-L']?.includes(query) ||
                                 journal.SCIMAGO_Categories?.toLowerCase().includes(query);
                const matchField = !field || journal.SCIMAGO_Categories?.includes(field);
                return matchQuery && matchField;
            })
            .sort((a, b) => {
                switch(sort) {
                    case 'impact': return (b.SCIMAGO_SJR || 0) - (a.SCIMAGO_SJR || 0);
                    case 'name': return (a['OA_Journal Name'] || '').localeCompare(b['OA_Journal Name'] || '');
                    case 'recent': return (b['SCIMAGO_Total Docs. (2024)'] || 0) - (a['SCIMAGO_Total Docs. (2024)'] || 0);
                    default: return 0;
                }
            })
            .slice(0, 20);

        // Update just the search results HTML template in the handleSearch function
        searchResults.innerHTML = results.length ? results
            .map(j => `
                <div class="search-result" onclick="window.location.href='./src/ever/Details.html?id=${encodeURIComponent(j['OA_ISSN-L'])}'" style="cursor: pointer">
                    <h3>${j['OA_Journal Name']}</h3>
                    <div class="result-meta">
                        <span>SJR: ${j.SCIMAGO_SJR || 'N/A'}</span>
                        <span>${j.SCIMAGO_Categories || j.OA_Discipline || 'N/A'}</span>
                    </div>
                </div>
            `).join('') : '<div class="no-results">No matching journals found</div>';
    };

    // Add event listeners to search inputs
    modalSearch?.addEventListener('input', handleSearch);
    fieldFilter?.addEventListener('change', handleSearch);
    sortBy?.addEventListener('change', handleSearch);

    // Open modal - Change this part
    searchButton.addEventListener('click', () => {
        searchModal.style.display = 'flex';  // Use 'flex' instead of classList
        modalSearch.focus();
        document.body.style.overflow = 'hidden';
    });

    // Close modal - Change these parts
    closeModal?.addEventListener('click', () => {
        searchModal.style.display = 'none';  // Use 'none' instead of classList
        document.body.style.overflow = '';
    });

    // Close on outside click
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.style.display = 'none';  // Use 'none' instead of classList
            document.body.style.overflow = '';
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchModal.style.display === 'flex') {
            searchModal.style.display = 'none';  // Use 'none' instead of classList
            document.body.style.overflow = '';
        }
    });
}

// Populate field filter with unique fields from journals
function populateFieldFilter(journals) {
    const fieldFilter = document.getElementById('fieldFilter');
    const fields = new Set();
    
    journals.forEach(journal => {
        if (journal.SCIMAGO_Categories) {
            const categories = journal.SCIMAGO_Categories.split(';');
            categories.forEach(category => fields.add(category.trim()));
        }
    });

    const sortedFields = Array.from(fields).sort();
    
    fieldFilter.innerHTML = `
        <option value="">All Fields</option>
        ${sortedFields.map(field => `<option value="${field}">${field}</option>`).join('')}
    `;
}

// Update search results filtering
function filterJournals(searchTerm, field, sortBy) {
    const results = journals.filter(journal => {
        const matchesSearch = journal['OA_Journal Name']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            journal['OA_ISSN-L']?.includes(searchTerm) ||
                            journal.SCIMAGO_Categories?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesField = !field || journal.SCIMAGO_Categories?.includes(field);
        
        return matchesSearch && matchesField;
    });

    // Sort results
    switch(sortBy) {
        case 'impact':
            results.sort((a, b) => (b.OOIR_IF || 0) - (a.OOIR_IF || 0));
            break;
        case 'name':
            results.sort((a, b) => a['OA_Journal Name']?.localeCompare(b['OA_Journal Name']));
            break;
        case 'recent':
            results.sort((a, b) => new Date(b['OA_Last Status Check']) - new Date(a['OA_Last Status Check']));
            break;
    }

    return results;
}

// Update loadJournalRankings to store data globally
function loadJournalRankings(dictionary) {
    // Get current page path to determine correct data path
    const currentPath = window.location.pathname;
    const dataPath = currentPath.includes('/src/ever/') 
        ? '../../src/data/factorsphere_data.json'  // Path from us.html
        : './src/data/factorsphere_data.json';     // Path from index.html
    
    console.log('Attempting to load data from:', dataPath);
    
    fetch(dataPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log('Response received:', response.status);
            return response.json();
        })
        .then(data => {
            journalsData = data.filter(j => Object.keys(j).length > 1); // Store valid journals globally
            console.log('Data loaded, entries:', journalsData.length);
            displayJournalRankings(journalsData, dictionary);
            populateFieldFilter(journalsData); // Populate fields after data load
        })
        .catch(error => {
            console.error('Error loading journal rankings:', error);
            // Show error in UI
            const containers = document.querySelectorAll('.rankings-grid, .lists-grid');
            containers.forEach(container => {
                container.innerHTML = `
                    <div class="error-message">
                        <i class="fas fa-exclamation-triangle"></i>
                        Error loading journal data. Please try again later.
                    </div>
                `;
            });
        });
}

function displayJournalRankings(journals, dictionary) {
    const rankingsContainer = document.querySelector('.rankings-grid');
    const listsContainer = document.querySelector('.lists-grid');

    // Sort by Impact Factor
    const topRanked = [...journals]
        .filter(j => j.OOIR_IF)
        .sort((a, b) => b.OOIR_IF - a.OOIR_IF)
        .slice(0, 20);

    // Keep citations sorting for popular lists
    const mostCited = [...journals]
        .filter(j => j['OA_Cited By Count'])
        .sort((a, b) => b['OA_Cited By Count'] - a['OA_Cited By Count'])
        .slice(0, 20);

    // Display top ranked journals
    topRanked.forEach(journal => {
        const journalElement = createJournalCard(journal, true, dictionary);
        rankingsContainer.appendChild(journalElement);
    });

    // Display most cited journals
    mostCited.forEach(journal => {
        const journalElement = createJournalCard(journal, false, dictionary);
        listsContainer.appendChild(journalElement);
    });
}

function createJournalCard(journal, isRanking, dictionary) {
    const journalElement = document.createElement('div');
    journalElement.classList.add('journal-card');
    
    journalElement.innerHTML = `
        <h3 class="journal-title">
            ${journal['OA_Journal Name']}
        </h3>
        <div class="journal-meta">
            <span class="issn" title="${dictionary['OA_ISSN-L'].full}">
                ${dictionary['OA_ISSN-L'].short}: ${journal['OA_ISSN-L']}
            </span>
            <span class="field" title="${dictionary['SCIMAGO_Categories'].full}">
                ${dictionary['SCIMAGO_Categories'].short}: ${journal.SCIMAGO_Categories || 'N/A'}
            </span>
        </div>
        <div class="journal-metrics">
            ${isRanking ? `
                <div class="impact-score" title="${dictionary['OOIR_IF'].full}">
                    <i class="fas fa-chart-line"></i>
                    Impact Factor (IF): ${journal.OOIR_IF?.toFixed(2) || 'N/A'}
                </div>
            ` : `
                <div class="citations" title="${dictionary['OA_Cited By Count'].full}">
                    <i class="fas fa-quote-right"></i>
                    ${dictionary['OA_Cited By Count'].short}: ${journal['OA_Cited By Count']?.toLocaleString() || 'N/A'}
                </div>
            `}
            <div class="h-index" title="${dictionary['SCIMAGO_H index'].full}">
                <i class="fas fa-chart-bar"></i>
                ${dictionary['SCIMAGO_H index'].short}: ${journal['SCIMAGO_H index'] || 'N/A'}
            </div>
        </div>
        <div class="last-updated" title="${dictionary['SCIMAGO_Coverage'].full}">
            <i class="fas fa-clock"></i>
            ${dictionary['SCIMAGO_Coverage'].short}: ${journal.SCIMAGO_Coverage || 'N/A'}
        </div>
    `;

    journalElement.addEventListener('click', () => {
        window.location.href = `src/ever/Details.html?id=${encodeURIComponent(journal['OA_ISSN-L'])}`;
    });

    return journalElement;
}