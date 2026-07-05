// ============================================
// CONFIGURATION
// ============================================

// Google Apps Script Web App URL
// REPLACE THIS WITH YOUR ACTUAL DEPLOYED URL
const API_BASE_URL = 'https://script.google.com/macros/s/AKfycbyirFUDbO2rd1Mfx2qc5wf2V9htqE0BNByL00Y2ZkbTFol_k4n-C6kyEOuq0c4l5YG-/exec';

// API Endpoints
const API_ENDPOINTS = {
    volunteers: API_BASE_URL + '?sheet=volunteers',
    camps: API_BASE_URL + '?sheet=camps',
    referrals: API_BASE_URL + '?sheet=referrals',
    partners: API_BASE_URL + '?sheet=partners',
    interns: API_BASE_URL + '?sheet=interns',
    beneficiarySummary: API_BASE_URL + '?sheet=beneficiarysummary',
    dashboard: API_BASE_URL + '?sheet=dashboard',
    all: API_BASE_URL + '?sheet=all'
};