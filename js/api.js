// ============================================
// API HELPER FUNCTIONS
// ============================================

/**
 * Fetch data from the Google Sheets API
 * @param {string} endpoint - The API endpoint to call
 * @returns {Promise} - Resolves with the data
 */
async function fetchSheetData(endpoint) {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

/**
 * Fetch volunteers data
 */
async function fetchVolunteers() {
    const result = await fetchSheetData(API_ENDPOINTS.volunteers);
    return result.success ? result.data : [];
}

/**
 * Fetch camps data
 */
async function fetchCamps() {
    const result = await fetchSheetData(API_ENDPOINTS.camps);
    return result.success ? result.data : [];
}

/**
 * Fetch referrals data
 */
async function fetchReferrals() {
    const result = await fetchSheetData(API_ENDPOINTS.referrals);
    return result.success ? result.data : [];
}

/**
 * Fetch partners data
 */
async function fetchPartners() {
    const result = await fetchSheetData(API_ENDPOINTS.partners);
    return result.success ? result.data : [];
}

/**
 * Fetch interns data
 */
async function fetchInterns() {
    const result = await fetchSheetData(API_ENDPOINTS.interns);
    return result.success ? result.data : [];
}

/**
 * Fetch dashboard metrics
 */
async function fetchDashboardMetrics() {
    const result = await fetchSheetData(API_ENDPOINTS.dashboard);
    return result.success ? result.data : null;
}

/**
 * Fetch all data at once
 */
async function fetchAllData() {
    const result = await fetchSheetData(API_ENDPOINTS.all);
    return result.success ? result : null;
}