// ============================================
// GLOBAL STATE
// ============================================

let volunteersData = [];
let campsData = [];
let referralsData = [];
let partnersData = [];
let internsData = [];
let beneficiarySummaryData = [];
let participationData = [];

let currentPage = 1;
const rowsPerPage = 5;
let filteredVolunteers = [];

// Chart instances
let campChartInstance = null;
let laneChartInstance = null;

// ============================================
// LOADING FUNCTIONS
// ============================================

/**
 * Show loading indicator
 */
function showLoading(elementId) {
    const el = document.getElementById(elementId);
    if (el) {
        el.innerHTML = '<div class="loading">⏳ Loading data...</div>';
    }
}

/**
 * Show error message
 */
function showError(elementId, message) {
    const el = document.getElementById(elementId);
    if (el) {
        el.innerHTML = `<div class="error">❌ ${message}</div>`;
    }
}

/**
 * Load all data from Google Sheets
 */
async function loadAllData() {
    try {
        // Show loading states
        showLoading('kpiGrid');
        showLoading('activityList');
        
        // Fetch all data
        const result = await fetchAllData();
        
        if (!result) {
            throw new Error('No data received from API');
        }
        
        // Store data
        volunteersData = result.volunteers || [];
        campsData = result.camps || [];
        referralsData = result.referrals || [];
        partnersData = result.partners || [];
        internsData = result.interns || [];
        beneficiarySummaryData = result.beneficiarySummary || [];
        participationData = result.participation || []; // NEW: Load from API
        
        // Render dashboard
        renderDashboard();
        
    } catch (error) {
        console.error('Error loading data:', error);
        showError('kpiGrid', 'Failed to load data. Please refresh and try again.');
    }
}

/**
 * Load volunteers data for volunteers page
 */
async function loadVolunteersData() {
    try {
        volunteersData = await fetchVolunteers();
        filteredVolunteers = [...volunteersData];
        renderVolunteers();
    } catch (error) {
        console.error('Error loading volunteers:', error);
        showError('volunteerTableBody', 'Failed to load volunteer data.');
    }
}

/**
 * Load camps data for camps page
 */
async function loadCampsData() {
    try {
        campsData = await fetchCamps();
        renderCamps();
    } catch (error) {
        console.error('Error loading camps:', error);
        showError('campTableBody', 'Failed to load camp data.');
    }
}

/**
 * Load referrals data for referrals page
 */
async function loadReferralsData() {
    try {
        referralsData = await fetchReferrals();
        renderReferrals();
    } catch (error) {
        console.error('Error loading referrals:', error);
        showError('referralTableBody', 'Failed to load referral data.');
    }
}

/**
 * Load partners data for partners page
 */
async function loadPartnersData() {
    try {
        partnersData = await fetchPartners();
        renderPartners();
    } catch (error) {
        console.error('Error loading partners:', error);
        showError('partnerTableBody', 'Failed to load partner data.');
    }
}

/**
 * Load interns data for interns page
 */
async function loadInternsData() {
    try {
        internsData = await fetchInterns();
        renderInterns();
    } catch (error) {
        console.error('Error loading interns:', error);
        showError('internTableBody', 'Failed to load intern data.');
    }
}

// ============================================
// DASHBOARD
// ============================================

function renderDashboard() {
    // Calculate KPIs from live data
    const totalVolunteers = volunteersData.length;
    const activeVolunteers = volunteersData.filter(v => v.status === 'Active').length;
    const totalCamps = campsData.length;
    const completedCamps = campsData.filter(c => c.status === 'Completed').length;
    
    // Total Beneficiaries
    let totalBeneficiaries = 0;
    for (let i = 0; i < beneficiarySummaryData.length; i++) {
        totalBeneficiaries += parseInt(beneficiarySummaryData[i].total) || 0;
    }
    
    const totalReferrals = referralsData.length;
    const treatedReferrals = referralsData.filter(r => r.status === 'Treated').length;
    const activePartners = partnersData.filter(p => p.status === 'Active').length;

    const kpis = [
        { label: 'Total Volunteers', value: totalVolunteers, sub: 'All volunteers' },
        { label: 'Active Volunteers', value: activeVolunteers, sub: 'Currently active' },
        { label: 'Total Camps', value: totalCamps, sub: 'All camps' },
        { label: 'Completed Camps', value: completedCamps, sub: 'Successfully completed' },
        { label: 'Total Beneficiaries', value: totalBeneficiaries, sub: 'People served' },
        { label: 'Total Referrals', value: totalReferrals, sub: 'Patients referred' },
        { label: 'Treated Referrals', value: treatedReferrals, sub: 'Treatment completed' },
        { label: 'Active Partners', value: activePartners, sub: 'Active partners' },
    ];

    const kpiGrid = document.getElementById('kpiGrid');
    if (kpiGrid) {
        kpiGrid.innerHTML = kpis.map(k => `
            <div class="kpi-card">
                <div class="kpi-label">${k.label}</div>
                <div class="kpi-value">${k.value}</div>
                <div class="kpi-sub">${k.sub}</div>
            </div>
        `).join('');
    }

    // Charts
    renderCharts();

    // Recent Activity
    const activityList = document.getElementById('activityList');
    if (activityList) {
        const activities = [
            `✅ ${volunteersData.length} volunteers registered`,
            `✅ ${campsData.length} camps conducted`,
            `✅ ${referralsData.length} referrals tracked`,
            `✅ ${partnersData.length} active partners`,
            `✅ ${internsData.length} interns onboarded`,
        ];
        activityList.innerHTML = activities.map(a => `<li>${a}</li>`).join('');
    }

    // Render Volunteer Participation (from live data)
    renderParticipation();
}

// ============================================
// VOLUNTEER PARTICIPATION (LIVE DATA)
// ============================================

function renderParticipation() {
    // Stats
    const statsContainer = document.getElementById('participationStats');
    if (statsContainer) {
        const totalParticipations = participationData.length;
        const totalHours = participationData.reduce((sum, p) => sum + parseFloat(p.hours || 0), 0);
        const presentCount = participationData.filter(p => p.status === 'Present').length;
        
        statsContainer.innerHTML = `
            <div class="stat">
                <span class="stat-value">${totalParticipations}</span>
                <span class="stat-label">Total Participations</span>
            </div>
            <div class="stat">
                <span class="stat-value">${totalHours.toFixed(1)}</span>
                <span class="stat-label">Total Hours</span>
            </div>
            <div class="stat">
                <span class="stat-value">${presentCount}</span>
                <span class="stat-label">Present</span>
            </div>
        `;
    }

    // Table
    const tbody = document.getElementById('participationTableBody');
    if (tbody) {
        // Show latest 5 participations
        const latest = participationData.slice(0, 5);
        if (latest.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:1rem;">No participation records found</td></tr>';
        } else {
            tbody.innerHTML = latest.map(p => `
                <tr>
                    <td>${p.volunteerId || 'N/A'}</td>
                    <td>${p.campId || 'N/A'}</td>
                    <td>${p.role || 'N/A'}</td>
                    <td>${p.hours || 0}</td>
                    <td><span class="badge ${p.status === 'Present' ? 'badge-success' : 'badge-warning'}">${p.status || 'N/A'}</span></td>
                </tr>
            `).join('');
        }
    }
}

// ============================================
// CHARTS (Using Chart.js with live data)
// ============================================

function renderCharts() {
    renderCampChart();
    renderLaneChart();
}

function renderCampChart() {
    const campCtx = document.getElementById('campChart')?.getContext('2d');
    if (!campCtx) return;

    // Group camps by month
    const monthMap = {};
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    campsData.forEach(camp => {
        if (camp.date) {
            const date = new Date(camp.date);
            const month = months[date.getMonth()];
            if (month) {
                monthMap[month] = (monthMap[month] || 0) + 1;
            }
        }
    });

    const labels = months.filter(m => monthMap[m]);
    const values = labels.map(m => monthMap[m] || 0);

    if (campChartInstance) {
        campChartInstance.destroy();
    }

    campChartInstance = new Chart(campCtx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of Camps',
                data: values,
                backgroundColor: values.map(v => v > 0 ? '#1a73e8' : '#dadce0'),
                borderRadius: 6,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.parsed.y + ' camp' + (context.parsed.y !== 1 ? 's' : '');
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1, font: { size: 10 } },
                    grid: { color: 'rgba(0,0,0,0.05)' }
                },
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 10 } }
                }
            }
        }
    });
}

function renderLaneChart() {
    const laneCtx = document.getElementById('laneChart')?.getContext('2d');
    if (!laneCtx) return;

    // Group volunteers by lane
    const laneCounts = {};
    volunteersData.forEach(v => {
        if (v.lane) {
            laneCounts[v.lane] = (laneCounts[v.lane] || 0) + 1;
        }
    });

    const laneLabels = Object.keys(laneCounts);
    const laneValues = Object.values(laneCounts);
    const colors = ['#1a73e8', '#34a853', '#fbbc04', '#ea4335', '#8ab4f8', '#f9ab00', '#d93025'];

    if (laneChartInstance) {
        laneChartInstance.destroy();
    }

    laneChartInstance = new Chart(laneCtx, {
        type: 'pie',
        data: {
            labels: laneLabels,
            datasets: [{
                data: laneValues,
                backgroundColor: colors.slice(0, laneLabels.length),
                borderWidth: 2,
                borderColor: '#ffffff',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 12,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: { size: 11 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            return context.label + ': ' + context.parsed + ' (' + percentage + '%)';
                        }
                    }
                }
            }
        }
    });
}

// ============================================
// VOLUNTEERS
// ============================================

function renderVolunteers() {
    const search = document.getElementById('volunteerSearch')?.value.toLowerCase() || '';
    const typeFilter = document.getElementById('volunteerTypeFilter')?.value || 'all';
    const statusFilter = document.getElementById('volunteerStatusFilter')?.value || 'all';
    const laneFilter = document.getElementById('volunteerLaneFilter')?.value || 'all';

    filteredVolunteers = volunteersData.filter(v => {
        const matchSearch = (v.name || '').toLowerCase().includes(search) || 
                           (v.email || '').toLowerCase().includes(search) || 
                           (v.city || '').toLowerCase().includes(search);
        const matchType = typeFilter === 'all' || (v.type || '') === typeFilter;
        const matchStatus = statusFilter === 'all' || (v.status || '') === statusFilter;
        const matchLane = laneFilter === 'all' || (v.lane || '') === laneFilter;
        return matchSearch && matchType && matchStatus && matchLane;
    });

    const total = filteredVolunteers.length;
    const totalPages = Math.ceil(total / rowsPerPage);
    if (currentPage > totalPages) currentPage = Math.max(1, totalPages);
    const start = (currentPage - 1) * rowsPerPage;
    const end = Math.min(start + rowsPerPage, total);
    const pageData = filteredVolunteers.slice(start, end);

    const tbody = document.getElementById('volunteerTableBody');
    if (tbody) {
        if (pageData.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;">No volunteers found</td></tr>';
        } else {
            tbody.innerHTML = pageData.map(v => `
                <tr class="clickable" data-id="${v.id || ''}">
                    <td>${v.id || 'N/A'}</td>
                    <td>${v.name || 'N/A'}</td>
                    <td>${v.type || 'N/A'}</td>
                    <td>${v.lane || 'N/A'}</td>
                    <td><span class="badge ${v.status === 'Active' ? 'badge-success' : v.status === 'Inactive' ? 'badge-danger' : 'badge-neutral'}">${v.status || 'N/A'}</span></td>
                    <td>${v.city || 'N/A'}</td>
                </tr>
            `).join('');
        }

        tbody.querySelectorAll('.clickable').forEach(row => {
            row.addEventListener('click', function() {
                const id = this.dataset.id;
                const vol = volunteersData.find(v => v.id === id);
                if (vol) openVolunteerModal(vol);
            });
        });
    }

    const countSpan = document.getElementById('volunteerCount');
    if (countSpan) {
        countSpan.textContent = `Showing ${total > 0 ? start + 1 : 0}-${end} of ${total}`;
    }

    const prevBtn = document.getElementById('prevPageBtn');
    const nextBtn = document.getElementById('nextPageBtn');
    if (prevBtn) prevBtn.disabled = currentPage <= 1;
    if (nextBtn) nextBtn.disabled = currentPage >= totalPages;
}

function openVolunteerModal(vol) {
    const modal = document.getElementById('volunteerModal');
    if (!modal) return;
    document.getElementById('modalName').textContent = vol.name || 'Volunteer';
    document.getElementById('modalDetails').innerHTML = `
        <div class="detail-row"><span class="detail-label">Volunteer ID</span><span class="detail-value">${vol.id || 'N/A'}</span></div>
        <div class="detail-row"><span class="detail-label">Email</span><span class="detail-value">${vol.email || 'N/A'}</span></div>
        <div class="detail-row"><span class="detail-label">Phone</span><span class="detail-value">${vol.phone || 'N/A'}</span></div>
        <div class="detail-row"><span class="detail-label">City</span><span class="detail-value">${vol.city || 'N/A'}</span></div>
        <div class="detail-row"><span class="detail-label">Type</span><span class="detail-value">${vol.type || 'N/A'}</span></div>
        <div class="detail-row"><span class="detail-label">Lane</span><span class="detail-value">${vol.lane || 'N/A'}</span></div>
        <div class="detail-row"><span class="detail-label">Status</span><span class="detail-value"><span class="badge ${vol.status === 'Active' ? 'badge-success' : vol.status === 'Inactive' ? 'badge-danger' : 'badge-neutral'}">${vol.status || 'N/A'}</span></span></div>
        <div class="detail-row"><span class="detail-label">Skills</span><span class="detail-value">${vol.skills || 'N/A'}</span></div>
        <div class="detail-row"><span class="detail-label">Hours Contributed</span><span class="detail-value">${vol.hours || 0}</span></div>
        <div class="detail-row"><span class="detail-label">Events Participated</span><span class="detail-value">${vol.events || 0}</span></div>
    `;
    modal.classList.add('active');
}

// ============================================
// CAMPS
// ============================================

function renderCamps() {
    const search = document.getElementById('campSearch')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('campCategoryFilter')?.value || 'all';
    const statusFilter = document.getElementById('campStatusFilter')?.value || 'all';

    const filtered = campsData.filter(c => {
        const matchSearch = (c.name || '').toLowerCase().includes(search) || (c.venue || '').toLowerCase().includes(search);
        const matchCategory = categoryFilter === 'all' || (c.category || '') === categoryFilter;
        const matchStatus = statusFilter === 'all' || (c.status || '') === statusFilter;
        return matchSearch && matchCategory && matchStatus;
    });

    const tbody = document.getElementById('campTableBody');
    if (tbody) {
        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:2rem;">No camps found</td></tr>';
        } else {
            tbody.innerHTML = filtered.map(c => `
                <tr class="clickable" data-id="${c.id || ''}">
                    <td>${c.id || 'N/A'}</td>
                    <td>${c.name || 'N/A'}</td>
                    <td>${c.category || 'N/A'}</td>
                    <td>${c.date || 'N/A'}</td>
                    <td><span class="badge ${c.status === 'Completed' ? 'badge-success' : c.status === 'Planned' ? 'badge-warning' : 'badge-danger'}">${c.status || 'N/A'}</span></td>
                    <td>${c.beneficiaries || 0}</td>
                    <td>${c.referrals || 0}</td>
                </tr>
            `).join('');
        }

        tbody.querySelectorAll('.clickable').forEach(row => {
            row.addEventListener('click', function() {
                const id = this.dataset.id;
                const camp = campsData.find(c => c.id === id);
                if (camp) openCampModal(camp);
            });
        });
    }
}

function openCampModal(camp) {
    const modal = document.getElementById('campModal');
    if (!modal) return;
    document.getElementById('campModalName').textContent = camp.name || 'Camp';
    document.getElementById('campModalDetails').innerHTML = `
        <div class="detail-row"><span class="detail-label">Camp ID</span><span class="detail-value">${camp.id || 'N/A'}</span></div>
        <div class="detail-row"><span class="detail-label">Category</span><span class="detail-value">${camp.category || 'N/A'}</span></div>
        <div class="detail-row"><span class="detail-label">Date</span><span class="detail-value">${camp.date || 'N/A'}</span></div>
        <div class="detail-row"><span class="detail-label">Venue</span><span class="detail-value">${camp.venue || 'N/A'}</span></div>
        <div class="detail-row"><span class="detail-label">Address</span><span class="detail-value">${camp.address || 'N/A'}</span></div>
        <div class="detail-row"><span class="detail-label">Partner</span><span class="detail-value">${camp.partner || 'N/A'}</span></div>
        <div class="detail-row"><span class="detail-label">Coordinator</span><span class="detail-value">${camp.coordinator || 'N/A'}</span></div>
        <div class="detail-row"><span class="detail-label">Status</span><span class="detail-value"><span class="badge ${camp.status === 'Completed' ? 'badge-success' : camp.status === 'Planned' ? 'badge-warning' : 'badge-danger'}">${camp.status || 'N/A'}</span></span></div>
        <div class="detail-row"><span class="detail-label">Budget</span><span class="detail-value">₹${camp.budget || 0}</span></div>
        <div class="detail-row"><span class="detail-label">Actual Cost</span><span class="detail-value">₹${camp.actual || 0}</span></div>
        <div class="detail-row"><span class="detail-label">Volunteers</span><span class="detail-value">${camp.volunteers || 0}</span></div>
        <div class="detail-row"><span class="detail-label">Beneficiaries</span><span class="detail-value">${camp.beneficiaries || 0}</span></div>
        <div class="detail-row"><span class="detail-label">Referrals</span><span class="detail-value">${camp.referrals || 0}</span></div>
    `;
    modal.classList.add('active');
}

// ============================================
// REFERRALS
// ============================================

function renderReferrals() {
    const search = document.getElementById('referralSearch')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('referralStatusFilter')?.value || 'all';

    const filtered = referralsData.filter(r => {
        const matchSearch = (r.beneficiaryCode || '').toLowerCase().includes(search);
        const matchStatus = statusFilter === 'all' || (r.status || '') === statusFilter;
        return matchSearch && matchStatus;
    });

    const tbody = document.getElementById('referralTableBody');
    if (tbody) {
        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;">No referrals found</td></tr>';
        } else {
            tbody.innerHTML = filtered.map(r => `
                <tr>
                    <td>${r.id || 'N/A'}</td>
                    <td>${r.campId || 'N/A'}</td>
                    <td>${r.beneficiaryCode || 'N/A'}</td>
                    <td>${r.referredTo || 'N/A'}</td>
                    <td>${r.date || 'N/A'}</td>
                    <td><span class="badge ${r.status === 'Treated' ? 'badge-success' : r.status === 'Pending' ? 'badge-warning' : r.status === 'Visited' ? 'badge-info' : 'badge-neutral'}">${r.status || 'N/A'}</span></td>
                </tr>
            `).join('');
        }
    }

    const summary = document.getElementById('referralStatusSummary');
    if (summary) {
        const treated = referralsData.filter(r => r.status === 'Treated').length;
        const pending = referralsData.filter(r => r.status === 'Pending').length;
        const visited = referralsData.filter(r => r.status === 'Visited').length;
        summary.innerHTML = `
            <span class="summary-item">🟢 Treated: <span class="count">${treated}</span></span>
            <span class="summary-item">🟡 Pending: <span class="count">${pending}</span></span>
            <span class="summary-item">🔵 Visited: <span class="count">${visited}</span></span>
            <span class="summary-item">📊 Total: <span class="count">${referralsData.length}</span></span>
        `;
    }
}

// ============================================
// PARTNERS
// ============================================

function renderPartners() {
    const search = document.getElementById('partnerSearch')?.value.toLowerCase() || '';
    const typeFilter = document.getElementById('partnerTypeFilter')?.value || 'all';
    const statusFilter = document.getElementById('partnerStatusFilter')?.value || 'all';

    const filtered = partnersData.filter(p => {
        const matchSearch = (p.name || '').toLowerCase().includes(search);
        const matchType = typeFilter === 'all' || (p.type || '') === typeFilter;
        const matchStatus = statusFilter === 'all' || (p.status || '') === statusFilter;
        return matchSearch && matchType && matchStatus;
    });

    const tbody = document.getElementById('partnerTableBody');
    if (tbody) {
        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;">No partners found</td></tr>';
        } else {
            tbody.innerHTML = filtered.map(p => `
                <tr>
                    <td>${p.id || 'N/A'}</td>
                    <td>${p.name || 'N/A'}</td>
                    <td>${p.type || 'N/A'}</td>
                    <td>${p.contact || 'N/A'}</td>
                    <td>${p.phone || 'N/A'}</td>
                    <td><span class="badge ${p.status === 'Active' ? 'badge-success' : p.status === 'Dormant' ? 'badge-warning' : 'badge-danger'}">${p.status || 'N/A'}</span></td>
                </tr>
            `).join('');
        }
    }
}

// ============================================
// INTERNS
// ============================================

function renderInterns() {
    const search = document.getElementById('internSearch')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('internStatusFilter')?.value || 'all';
    const collegeFilter = document.getElementById('internCollegeFilter')?.value || 'all';

    const filtered = internsData.filter(i => {
        const matchSearch = (i.name || '').toLowerCase().includes(search) || (i.college || '').toLowerCase().includes(search);
        const matchStatus = statusFilter === 'all' || (i.status || '') === statusFilter;
        const matchCollege = collegeFilter === 'all' || (i.college || '') === collegeFilter;
        return matchSearch && matchStatus && matchCollege;
    });

    const tbody = document.getElementById('internTableBody');
    if (tbody) {
        if (filtered.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;">No interns found</td></tr>';
        } else {
            tbody.innerHTML = filtered.map(i => `
                <tr>
                    <td>${i.id || 'N/A'}</td>
                    <td>${i.name || 'N/A'}</td>
                    <td>${i.college || 'N/A'}</td>
                    <td>${i.project || 'N/A'}</td>
                    <td><span class="badge ${i.status === 'Completed' ? 'badge-success' : 'badge-warning'}">${i.status || 'N/A'}</span></td>
                    <td><span class="badge ${i.certificateIssued === 'Yes' ? 'badge-success' : 'badge-warning'}">${i.certificateIssued === 'Yes' ? '✅ Issued' : '⏳ Pending'}</span></td>
                </tr>
            `).join('');
        }
    }

    const summary = document.getElementById('internStatusSummary');
    if (summary) {
        const issued = internsData.filter(i => i.certificateIssued === 'Yes').length;
        const pending = internsData.filter(i => i.certificateIssued === 'No' || i.certificateIssued === '').length;
        summary.innerHTML = `
            <span class="summary-item">✅ Issued: <span class="count">${issued}</span></span>
            <span class="summary-item">⏳ Pending: <span class="count">${pending}</span></span>
            <span class="summary-item">📊 Total: <span class="count">${internsData.length}</span></span>
        `;
    }
}

// ============================================
// NAVIGATION TOGGLE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    if (toggle && menu) {
        toggle.addEventListener('click', function() {
            menu.classList.toggle('open');
        });
    }

    // Modal Close Buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });

    // Page detection and loading
    const path = window.location.pathname;

    if (path.includes('volunteers.html')) {
        document.getElementById('prevPageBtn')?.addEventListener('click', () => { currentPage--; renderVolunteers(); });
        document.getElementById('nextPageBtn')?.addEventListener('click', () => { currentPage++; renderVolunteers(); });
        document.getElementById('volunteerSearch')?.addEventListener('input', () => { currentPage = 1; renderVolunteers(); });
        document.getElementById('volunteerTypeFilter')?.addEventListener('change', () => { currentPage = 1; renderVolunteers(); });
        document.getElementById('volunteerStatusFilter')?.addEventListener('change', () => { currentPage = 1; renderVolunteers(); });
        document.getElementById('volunteerLaneFilter')?.addEventListener('change', () => { currentPage = 1; renderVolunteers(); });
        loadVolunteersData();
    } else if (path.includes('camps.html')) {
        document.getElementById('campSearch')?.addEventListener('input', renderCamps);
        document.getElementById('campCategoryFilter')?.addEventListener('change', renderCamps);
        document.getElementById('campStatusFilter')?.addEventListener('change', renderCamps);
        loadCampsData();
    } else if (path.includes('referrals.html')) {
        document.getElementById('referralSearch')?.addEventListener('input', renderReferrals);
        document.getElementById('referralStatusFilter')?.addEventListener('change', renderReferrals);
        loadReferralsData();
    } else if (path.includes('partners.html')) {
        document.getElementById('partnerSearch')?.addEventListener('input', renderPartners);
        document.getElementById('partnerTypeFilter')?.addEventListener('change', renderPartners);
        document.getElementById('partnerStatusFilter')?.addEventListener('change', renderPartners);
        loadPartnersData();
    } else if (path.includes('interns.html')) {
        document.getElementById('internSearch')?.addEventListener('input', renderInterns);
        document.getElementById('internStatusFilter')?.addEventListener('change', renderInterns);
        document.getElementById('internCollegeFilter')?.addEventListener('change', renderInterns);
        loadInternsData();
    } else {
        // Dashboard (index.html)
        loadAllData();
    }
});
