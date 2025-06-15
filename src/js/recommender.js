document.addEventListener("DOMContentLoaded", function () {
    const submitBtn = document.getElementById("submitBtn");
    const abstractInput = document.getElementById("abstractInput");
    const resultsContainer = document.getElementById("results");
    const loadingIndicator = document.querySelector(".loading-indicator");
    const rawResultsElement = document.getElementById("rawResults");
    const rawResults = document.querySelector('.raw-results');
    const collapseToggle = document.querySelector('.collapse-toggle');
    let journalData = [];

    // Load our journal database
    async function loadJournalData() {
        try {
            const response = await fetch('../../src/data/factorsphere_data.json');
            journalData = await response.json();
            console.log('Journal database loaded:', journalData.length, 'entries');
        } catch (error) {
            console.error('Failed to load journal database:', error);
            showError('Failed to load journal database. Please refresh the page.');
        }
    }

    // Enhanced journal matching function using SCIMAGO_Title_clean
    function findJournalInDatabase(aiMatch) {
        if (!aiMatch || !aiMatch.SCIMAGO_Title_clean) return null;
        
        const cleanJournalName = aiMatch.SCIMAGO_Title_clean.toLowerCase().trim();
        
        return journalData.find(journal => {
            // First try exact match with SCIMAGO clean title
            if (journal.SCIMAGO_Title_clean && 
                journal.SCIMAGO_Title_clean.toLowerCase() === cleanJournalName) {
                return true;
            }
            
            // Fallback to partial match if exact match fails
            if (journal['OA_Journal Name'] && 
                journal['OA_Journal Name'].toLowerCase().includes(cleanJournalName)) {
                return true;
            }
            
            return false;
        });
    }

    // Safe recommendation card creation
    function createRecommendationCard(aiMatch, journalData) {
        if (!journalData) return '';
        
        // Safely get all required fields with fallbacks
        const journalName = journalData['OA_Journal Name'] || journalData.SCIMAGO_Title || aiMatch.SCIMAGO_Title_clean || 'Unknown Journal';
        const identifier = journalData['OA_ISSN-L'] || journalData.SCIMAGO_Issn?.split(',')[0]?.trim() || '';
        const scorePercentage = (aiMatch.score * 100).toFixed(1);
        const impactFactor = aiMatch.OOIR_IF ? aiMatch.OOIR_IF.toFixed(2) : 
                           (journalData.OOIR_IF ? journalData.OOIR_IF.toFixed(2) : 'N/A');
        const categories = journalData.SCIMAGO_Categories ? 
            journalData.SCIMAGO_Categories.split(';').slice(0, 3).join(', ') : 'N/A';
        
        // Only create link if we have an identifier
        const onClick = identifier ? 
            `onclick="window.location.href='Details.html?id=${encodeURIComponent(identifier)}'"` : '';
        
        return `
            <div class="recommendation-card" ${onClick} style="cursor: ${identifier ? 'pointer' : 'default'}">
                <h3>${journalName}</h3>
                <div class="metrics">
                    <p><strong>Impact Factor:</strong> ${impactFactor}</p>
                    <p><strong>Match Score:</strong> ${scorePercentage}%</p>
                </div>
                <div class="categories">
                    <p><strong>Fields:</strong> ${categories}...</p>
                </div>
            </div>
        `;
    }

    // Process AI response and match with our database
    function processAIResponse(aiResponse) {
        if (!Array.isArray(aiResponse)) {
            return '<p>No recommendations found in the AI response.</p>';
        }

        const recommendations = aiResponse.map(match => {
            const journalMatch = findJournalInDatabase(match);
            return createRecommendationCard(match, journalMatch);
        }).filter(card => card !== '');

        return recommendations.length > 0 ? 
            recommendations.join('') : 
            '<p>Found recommendations but no matching journals in our database.</p>';
    }

    // Display error message
    function showError(message) {
        resultsContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                ${message}
            </div>
        `;
    }

    submitBtn.addEventListener("click", async function () {
        const abstract = abstractInput.value.trim();
        if (!abstract) {
            alert("Please enter an abstract first.");
            return;
        }

        loadingIndicator.style.display = "flex";
        submitBtn.disabled = true;
        resultsContainer.innerHTML = "";
        rawResultsElement.textContent = "";

        try {
            const response = await fetch("https://factorsphere.sameermann2004.workers.dev", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ abstract })
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const result = await response.json();
            console.log('AI Response:', result); // Debug log
            rawResultsElement.textContent = JSON.stringify(result, null, 2);

            // Handle both array and object with matches property
            const matches = Array.isArray(result) ? result : (result.matches || []);
            resultsContainer.innerHTML = processAIResponse(matches);

        } catch (error) {
            console.error('Recommendation error:', error);
            showError(`Something went wrong: ${error.message}`);
            rawResultsElement.textContent = `Error: ${error.message}`;
        } finally {
            loadingIndicator.style.display = "none";
            submitBtn.disabled = false;
        }
    });

    // Toggle raw results visibility
    collapseToggle.addEventListener('click', () => {
        rawResults.classList.toggle('collapsed');
        const isCollapsed = rawResults.classList.contains('collapsed');
        collapseToggle.innerHTML = `
            <i class="fas fa-chevron-${isCollapsed ? 'down' : 'up'}"></i>
            ${isCollapsed ? 'Show' : 'Hide'} AI Response
        `;
    });

    // Load journal database when page loads
    loadJournalData();
});