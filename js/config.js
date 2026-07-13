// ============================================
// CONFIGURATION
// ============================================

// Google Apps Script Web App URL
// REPLACE THIS WITH YOUR ACTUAL DEPLOYED URL
const API_BASE_URL = 'https://script.google.com/macros/s/AKfycbyt-TzvyjML3KJiu9EUNo-Ams1168dKnzlzJJcUNeMZ4IXDZmRLC4OOV5vN4nQEoN1VXA/exec';

// API Endpoints
const API_ENDPOINTS = {
    volunteers: API_BASE_URL + '?sheet=volunteers',
    camps: API_BASE_URL + '?sheet=camps',
    referrals: API_BASE_URL + '?sheet=referrals',
    partners: API_BASE_URL + '?sheet=partners',
    interns: API_BASE_URL + '?sheet=interns',
    beneficiarySummary: API_BASE_URL + '?sheet=beneficiarysummary',
    dashboard: API_BASE_URL + '?sheet=dashboard',
    participation: API_BASE_URL + '?sheet=participation',  // NEW
    all: API_BASE_URL + '?sheet=all'
};
