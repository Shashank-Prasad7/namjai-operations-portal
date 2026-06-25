// ========================================
// SAMPLE DATA (Hardcoded for Static Prototype)
// ========================================

const volunteersData = [
    { id: 'VOL001', name: 'Priya Sharma', email: 'priya.s@example.com', phone: '9876543210', age: 28, gender: 'F', city: 'Mumbai', occupation: 'Software Eng', organization: 'TechCorp', type: 'Volunteer', source: 'Public Registration', engagement: 'Long-Term', lane: 'Technology', skills: 'Python, Web Dev', availability: 'Weekends', status: 'Active', hours: 32, events: 4 },
    { id: 'VOL002', name: 'Amit Verma', email: 'amit.v@example.com', phone: '9876543211', age: 34, gender: 'M', city: 'Delhi', occupation: 'Doctor', organization: 'City Hospital', type: 'Medical Volunteer', source: 'Hospital Partner', engagement: 'Event-Based', lane: 'Medical', skills: 'Emergency Care', availability: 'Both', status: 'Active', hours: 24, events: 3 },
    { id: 'VOL003', name: 'Neha Gupta', email: 'neha.g@example.com', phone: '9876543212', age: 22, gender: 'F', city: 'Bangalore', occupation: 'Student', organization: 'ABC College', type: 'Intern', source: 'University', engagement: 'Internship', lane: 'Outreach & Partnerships', skills: 'Social Media', availability: 'Weekdays', status: 'Active', hours: 16, events: 2 },
    { id: 'VOL004', name: 'Ravi Kiran', email: 'ravi.k@example.com', phone: '9876543213', age: 45, gender: 'M', city: 'Chennai', occupation: 'Retired', organization: 'None', type: 'Volunteer', source: 'Corporate', engagement: 'Long-Term', lane: 'Ground Operations', skills: 'Logistics', availability: 'Both', status: 'Inactive', hours: 40, events: 5 },
    { id: 'VOL005', name: 'Sneha Menon', email: 'sneha.m@example.com', phone: '9876543214', age: 29, gender: 'F', city: 'Pune', occupation: 'Dentist', organization: 'Smile Clinic', type: 'Medical Volunteer', source: 'Internal Referral', engagement: 'Event-Based', lane: 'Medical', skills: 'Dental Surgery', availability: 'Weekends', status: 'Active', hours: 18, events: 2 },
];

const campsData = [
    { id: 'CAMP001', name: 'Dental Camp - Pune', category: 'Healthcare Camp', specialty: 'Dental', date: '2025-03-10', venue: 'City School', address: 'Pune', partner: 'Smile Clinic', coordinator: 'Sneha', status: 'Completed', budget: 15000, actual: 14000, beneficiaries: 120, referrals: 12, volunteers: 8 },
    { id: 'CAMP002', name: 'Awareness Session - Delhi', category: 'Awareness Session', specialty: 'N/A', date: '2025-04-05', venue: 'Community Hall', address: 'Delhi', partner: 'TechCorp', coordinator: 'Vipul', status: 'Completed', budget: 5000, actual: 4500, beneficiaries: 80, referrals: 2, volunteers: 5 },
    { id: 'CAMP003', name: 'Meal Distribution - Mumbai', category: 'Meal Distribution', specialty: 'N/A', date: '2025-05-20', venue: 'Central Park', address: 'Mumbai', partner: 'Roti Bank', coordinator: 'Ramesh', status: 'Planned', budget: 20000, actual: 0, beneficiaries: 250, referrals: 0, volunteers: 12 },
    { id: 'CAMP004', name: 'Eye Checkup Camp', category: 'Healthcare Camp', specialty: 'Eye Care', date: '2025-02-18', venue: 'Old Age Home', address: 'Bangalore', partner: 'Vision Care', coordinator: 'Sneha', status: 'Completed', budget: 18000, actual: 17500, beneficiaries: 95, referrals: 18, volunteers: 6 },
    { id: 'CAMP005', name: 'Nutrition Program', category: 'Nutrition Program', specialty: 'Nutrition', date: '2025-06-01', venue: 'Anganwadi Center', address: 'Chennai', partner: 'Health India', coordinator: 'Anjali', status: 'Planned', budget: 25000, actual: 0, beneficiaries: 150, referrals: 5, volunteers: 10 },
];

const referralsData = [
    { id: 'REF001', campId: 'CAMP001', beneficiaryCode: 'BEN001', type: 'Dental', referredTo: 'City Hospital', date: '2025-03-10', followUp: '2025-03-25', status: 'Treated', outcome: 'Completed', notes: 'Filling done' },
    { id: 'REF002', campId: 'CAMP001', beneficiaryCode: 'BEN002', type: 'Dental', referredTo: 'Smile Clinic', date: '2025-03-10', followUp: '2025-03-20', status: 'Visited', outcome: 'Awaiting', notes: 'Needs extraction' },
    { id: 'REF003', campId: 'CAMP004', beneficiaryCode: 'BEN078', type: 'Eye Care', referredTo: 'Vision Care', date: '2025-02-18', followUp: '2025-02-28', status: 'Treated', outcome: 'Completed', notes: 'Glasses given' },
    { id: 'REF004', campId: 'CAMP004', beneficiaryCode: 'BEN079', type: 'Emergency', referredTo: 'City Hospital', date: '2025-02-18', followUp: '2025-02-19', status: 'Visited', outcome: 'Follow-up due', notes: 'BP issue' },
    { id: 'REF005', campId: 'CAMP005', beneficiaryCode: 'BEN142', type: 'Nutrition', referredTo: 'Health India', date: '2025-06-01', followUp: '2025-06-15', status: 'Pending', outcome: 'None', notes: 'Counseled' },
];

const partnersData = [
    { id: 'PART001', name: 'City Hospital', type: 'Hospital', contact: 'Dr. Mehta', phone: '9988776655', email: 'dr.mehta@cityhosp.com', location: 'Mumbai', firstEngagement: '2024-06-10', lastEngagement: '2025-03-10', events: 4, status: 'Active', notes: 'Reliable' },
    { id: 'PART002', name: 'TechCorp', type: 'Corporate', contact: 'Anjali Iyer', phone: '8877665544', email: 'anjali@techcorp.com', location: 'Bangalore', firstEngagement: '2025-01-15', lastEngagement: '2025-04-05', events: 2, status: 'Active', notes: 'CSR partner' },
    { id: 'PART003', name: 'Smile Clinic', type: 'Hospital', contact: 'Dr. Nair', phone: '7766554433', email: 'dr.nair@smileclinic.com', location: 'Pune', firstEngagement: '2024-08-20', lastEngagement: '2025-03-10', events: 3, status: 'Active', notes: 'Dental focus' },
    { id: 'PART004', name: 'Roti Bank', type: 'NGO', contact: 'Suresh', phone: '6655443322', email: 'suresh@rotibank.org', location: 'Mumbai', firstEngagement: '2025-02-01', lastEngagement: '2025-05-20', events: 1, status: 'Active', notes: 'Meal support' },
    { id: 'PART005', name: 'Health India', type: 'NGO', contact: 'Meena', phone: '5544332211', email: 'meena@healthindia.org', location: 'Chennai', firstEngagement: '2025-03-10', lastEngagement: '2025-06-01', events: 1, status: 'Active', notes: 'Nutrition programs' },
];

const internsData = [
    { id: 'INT001', name: 'Neha Gupta', college: 'ABC College', course: 'B.Tech', facultyMentor: 'Dr. Rao', institutionCoordinator: 'Prof. Sharma', namjaiMentor: 'Vipul', project: 'Dashboard Dev', startDate: '2025-03-01', endDate: '2025-04-15', status: 'Completed', deliverables: 'Dashboard v1', certificateIssued: 'Yes', certificateDate: '2025-04-20', notes: 'Good performance' },
    { id: 'INT002', name: 'Karthik', college: 'DEF Univ', course: 'MBA', facultyMentor: 'Dr. Menon', institutionCoordinator: 'Dr. Nair', namjaiMentor: 'Sneha', project: 'Outreach Plan', startDate: '2025-04-10', endDate: '2025-05-10', status: 'Completed', deliverables: '10 leads', certificateIssued: 'Yes', certificateDate: '2025-05-15', notes: 'Exceeded targets' },
    { id: 'INT003', name: 'Pooja', college: 'GHI College', course: 'Social Work', facultyMentor: 'Ms. Singh', institutionCoordinator: 'Mr. Verma', namjaiMentor: 'Anjali', project: 'Camp Reporting', startDate: '2025-05-01', endDate: '2025-06-15', status: 'Ongoing', deliverables: 'Reports template', certificateIssued: 'No', certificateDate: '', notes: 'Needs guidance' },
    { id: 'INT004', name: 'Rahul', college: 'JKL Univ', course: 'Public Health', facultyMentor: 'Dr. Iyer', institutionCoordinator: 'Dr. Rao', namjaiMentor: 'Ramesh', project: 'Beneficiary Study', startDate: '2025-05-20', endDate: '2025-07-10', status: 'Ongoing', deliverables: 'Survey analysis', certificateIssued: 'No', certificateDate: '', notes: 'Good researcher' },
    { id: 'INT005', name: 'Ankita', college: 'MNO College', course: 'B.Com', facultyMentor: 'Ms. Pillai', institutionCoordinator: 'Prof. Mehta', namjaiMentor: 'Vipul', project: 'Fundraising', startDate: '2025-06-01', endDate: '2025-07-15', status: 'Ongoing', deliverables: 'Donor list', certificateIssued: 'No', certificateDate: '', notes: 'Creative ideas' },
];

// ========================================
// PAGINATION STATE
// ========================================
let currentPage = 1;
const rowsPerPage = 5;
let filteredVolunteers = [...volunteersData];

// ========================================
// DASHBOARD
// ========================================
function renderDashboard() {
    // KPIs
    const totalVolunteers = volunteersData.length;
    const activeVolunteers = volunteersData.filter(v => v.status === 'Active').length;
    const totalCamps = campsData.length;
    const completedCamps = campsData.filter(c => c.status === 'Completed').length;
    const totalBeneficiaries = campsData.reduce((sum, c) => sum + c.beneficiaries, 0);
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

    // Bar Chart (Camps by Month)
    const barChart = document.getElementById('barChart');
    if (barChart) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
        const counts = [2, 1, 1, 0, 1];
        const max = Math.max(...counts, 1);
        barChart.innerHTML = months.map((m, i) => `
            <div class="bar">
                <div class="bar-fill" style="height: ${(counts[i] / max) * 120}px;"></div>
                <span class="bar-label">${m}</span>
            </div>
        `).join('');
    }

    // Pie Chart (Volunteers by Lane)
    const pieChart = document.getElementById('pieChart');
    if (pieChart) {
        const lanes = {};
        volunteersData.forEach(v => {
            lanes[v.lane] = (lanes[v.lane] || 0) + 1;
        });
        const colors = ['#1a73e8', '#34a853', '#fbbc04', '#ea4335', '#8ab4f8', '#f9ab00', '#d93025'];
        let colorIndex = 0;
        pieChart.innerHTML = Object.entries(lanes).map(([lane, count]) => {
            const color = colors[colorIndex % colors.length];
            colorIndex++;
            return `<div class="pie-slice"><span class="color-dot" style="background:${color}"></span> ${lane}: ${count}</div>`;
        }).join('');
    }

    // Recent Activity
    const activityList = document.getElementById('activityList');
    if (activityList) {
        const activities = [
            '✅ Priya Sharma joined as Volunteer (2026-06-10)',
            '✅ Dental Camp - Pune completed (2026-06-09)',
            '✅ 5 new referrals added (2026-06-08)',
            '✅ City Hospital became Active Partner (2026-06-07)',
            '✅ Neha Gupta completed internship (2026-06-06)',
        ];
        activityList.innerHTML = activities.map(a => `<li>${a}</li>`).join('');
    }
}

// ========================================
// VOLUNTEERS
// ========================================
function renderVolunteers() {
    const search = document.getElementById('volunteerSearch')?.value.toLowerCase() || '';
    const typeFilter = document.getElementById('volunteerTypeFilter')?.value || 'all';
    const statusFilter = document.getElementById('volunteerStatusFilter')?.value || 'all';
    const laneFilter = document.getElementById('volunteerLaneFilter')?.value || 'all';

    filteredVolunteers = volunteersData.filter(v => {
        const matchSearch = v.name.toLowerCase().includes(search) || v.email.toLowerCase().includes(search) || v.city.toLowerCase().includes(search);
        const matchType = typeFilter === 'all' || v.type === typeFilter;
        const matchStatus = statusFilter === 'all' || v.status === statusFilter;
        const matchLane = laneFilter === 'all' || v.lane === laneFilter;
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
        tbody.innerHTML = pageData.map(v => `
            <tr class="clickable" data-id="${v.id}">
                <td>${v.id}</td>
                <td>${v.name}</td>
                <td>${v.type}</td>
                <td>${v.lane}</td>
                <td><span class="badge ${v.status === 'Active' ? 'badge-success' : v.status === 'Inactive' ? 'badge-danger' : 'badge-neutral'}">${v.status}</span></td>
                <td>${v.city}</td>
            </tr>
        `).join('');

        // Click to open modal
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
    document.getElementById('modalName').textContent = vol.name;
    document.getElementById('modalDetails').innerHTML = `
        <div class="detail-row"><span class="detail-label">Volunteer ID</span><span class="detail-value">${vol.id}</span></div>
        <div class="detail-row"><span class="detail-label">Email</span><span class="detail-value">${vol.email}</span></div>
        <div class="detail-row"><span class="detail-label">Phone</span><span class="detail-value">${vol.phone}</span></div>
        <div class="detail-row"><span class="detail-label">City</span><span class="detail-value">${vol.city}</span></div>
        <div class="detail-row"><span class="detail-label">Type</span><span class="detail-value">${vol.type}</span></div>
        <div class="detail-row"><span class="detail-label">Lane</span><span class="detail-value">${vol.lane}</span></div>
        <div class="detail-row"><span class="detail-label">Status</span><span class="detail-value"><span class="badge ${vol.status === 'Active' ? 'badge-success' : vol.status === 'Inactive' ? 'badge-danger' : 'badge-neutral'}">${vol.status}</span></span></div>
        <div class="detail-row"><span class="detail-label">Skills</span><span class="detail-value">${vol.skills || 'N/A'}</span></div>
        <div class="detail-row"><span class="detail-label">Hours Contributed</span><span class="detail-value">${vol.hours}</span></div>
        <div class="detail-row"><span class="detail-label">Events Participated</span><span class="detail-value">${vol.events}</span></div>
    `;
    modal.classList.add('active');
}

// ========================================
// CAMPS
// ========================================
function renderCamps() {
    const search = document.getElementById('campSearch')?.value.toLowerCase() || '';
    const categoryFilter = document.getElementById('campCategoryFilter')?.value || 'all';
    const statusFilter = document.getElementById('campStatusFilter')?.value || 'all';

    const filtered = campsData.filter(c => {
        const matchSearch = c.name.toLowerCase().includes(search) || c.venue.toLowerCase().includes(search);
        const matchCategory = categoryFilter === 'all' || c.category === categoryFilter;
        const matchStatus = statusFilter === 'all' || c.status === statusFilter;
        return matchSearch && matchCategory && matchStatus;
    });

    const tbody = document.getElementById('campTableBody');
    if (tbody) {
        tbody.innerHTML = filtered.map(c => `
            <tr class="clickable" data-id="${c.id}">
                <td>${c.id}</td>
                <td>${c.name}</td>
                <td>${c.category}</td>
                <td>${c.date}</td>
                <td><span class="badge ${c.status === 'Completed' ? 'badge-success' : c.status === 'Planned' ? 'badge-warning' : 'badge-danger'}">${c.status}</span></td>
                <td>${c.beneficiaries}</td>
                <td>${c.referrals}</td>
            </tr>
        `).join('');

        tbody.querySelectorAll('.clickable').forEach(row => {
            row.addEventListener('click', function() {
                const id = this.dataset.id;
                const camp = campsData.find(c => c.id === id);
                if (camp) openCampModal(camp);
            });
        });
    }

    const countSpan = document.getElementById('campCount');
    if (countSpan) {
        countSpan.textContent = `Showing ${filtered.length} of ${campsData.length}`;
    }
}

function openCampModal(camp) {
    const modal = document.getElementById('campModal');
    if (!modal) return;
    document.getElementById('campModalName').textContent = camp.name;
    document.getElementById('campModalDetails').innerHTML = `
        <div class="detail-row"><span class="detail-label">Camp ID</span><span class="detail-value">${camp.id}</span></div>
        <div class="detail-row"><span class="detail-label">Category</span><span class="detail-value">${camp.category}</span></div>
        <div class="detail-row"><span class="detail-label">Date</span><span class="detail-value">${camp.date}</span></div>
        <div class="detail-row"><span class="detail-label">Venue</span><span class="detail-value">${camp.venue}</span></div>
        <div class="detail-row"><span class="detail-label">Address</span><span class="detail-value">${camp.address}</span></div>
        <div class="detail-row"><span class="detail-label">Partner</span><span class="detail-value">${camp.partner}</span></div>
        <div class="detail-row"><span class="detail-label">Coordinator</span><span class="detail-value">${camp.coordinator}</span></div>
        <div class="detail-row"><span class="detail-label">Status</span><span class="detail-value"><span class="badge ${camp.status === 'Completed' ? 'badge-success' : camp.status === 'Planned' ? 'badge-warning' : 'badge-danger'}">${camp.status}</span></span></div>
        <div class="detail-row"><span class="detail-label">Budget</span><span class="detail-value">₹${camp.budget}</span></div>
        <div class="detail-row"><span class="detail-label">Actual Cost</span><span class="detail-value">₹${camp.actual}</span></div>
        <div class="detail-row"><span class="detail-label">Volunteers</span><span class="detail-value">${camp.volunteers}</span></div>
        <div class="detail-row"><span class="detail-label">Beneficiaries</span><span class="detail-value">${camp.beneficiaries}</span></div>
        <div class="detail-row"><span class="detail-label">Referrals</span><span class="detail-value">${camp.referrals}</span></div>
    `;
    modal.classList.add('active');
}

// ========================================
// REFERRALS
// ========================================
function renderReferrals() {
    const search = document.getElementById('referralSearch')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('referralStatusFilter')?.value || 'all';

    const filtered = referralsData.filter(r => {
        const matchSearch = r.beneficiaryCode.toLowerCase().includes(search);
        const matchStatus = statusFilter === 'all' || r.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const tbody = document.getElementById('referralTableBody');
    if (tbody) {
        tbody.innerHTML = filtered.map(r => `
            <tr>
                <td>${r.id}</td>
                <td>${r.campId}</td>
                <td>${r.beneficiaryCode}</td>
                <td>${r.referredTo}</td>
                <td>${r.date}</td>
                <td><span class="badge ${r.status === 'Treated' ? 'badge-success' : r.status === 'Pending' ? 'badge-warning' : r.status === 'Visited' ? 'badge-info' : 'badge-neutral'}">${r.status}</span></td>
            </tr>
        `).join('');
    }

    // Status Summary
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

// ========================================
// PARTNERS
// ========================================
function renderPartners() {
    const search = document.getElementById('partnerSearch')?.value.toLowerCase() || '';
    const typeFilter = document.getElementById('partnerTypeFilter')?.value || 'all';
    const statusFilter = document.getElementById('partnerStatusFilter')?.value || 'all';

    const filtered = partnersData.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search);
        const matchType = typeFilter === 'all' || p.type === typeFilter;
        const matchStatus = statusFilter === 'all' || p.status === statusFilter;
        return matchSearch && matchType && matchStatus;
    });

    const tbody = document.getElementById('partnerTableBody');
    if (tbody) {
        tbody.innerHTML = filtered.map(p => `
            <tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.type}</td>
                <td>${p.contact}</td>
                <td>${p.phone}</td>
                <td><span class="badge ${p.status === 'Active' ? 'badge-success' : p.status === 'Dormant' ? 'badge-warning' : 'badge-danger'}">${p.status}</span></td>
            </tr>
        `).join('');
    }
}

// ========================================
// INTERNS
// ========================================
function renderInterns() {
    const search = document.getElementById('internSearch')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('internStatusFilter')?.value || 'all';
    const collegeFilter = document.getElementById('internCollegeFilter')?.value || 'all';

    const filtered = internsData.filter(i => {
        const matchSearch = i.name.toLowerCase().includes(search) || i.college.toLowerCase().includes(search);
        const matchStatus = statusFilter === 'all' || i.status === statusFilter;
        const matchCollege = collegeFilter === 'all' || i.college === collegeFilter;
        return matchSearch && matchStatus && matchCollege;
    });

    const tbody = document.getElementById('internTableBody');
    if (tbody) {
        tbody.innerHTML = filtered.map(i => `
            <tr>
                <td>${i.id}</td>
                <td>${i.name}</td>
                <td>${i.college}</td>
                <td>${i.project}</td>
                <td><span class="badge ${i.status === 'Completed' ? 'badge-success' : 'badge-warning'}">${i.status}</span></td>
                <td><span class="badge ${i.certificateIssued === 'Yes' ? 'badge-success' : 'badge-warning'}">${i.certificateIssued === 'Yes' ? '✅ Issued' : '⏳ Pending'}</span></td>
            </tr>
        `).join('');
    }

    // Certificate Summary
    const summary = document.getElementById('internStatusSummary');
    if (summary) {
        const issued = internsData.filter(i => i.certificateIssued === 'Yes').length;
        const pending = internsData.filter(i => i.certificateIssued === 'No').length;
        summary.innerHTML = `
            <span class="summary-item">✅ Issued: <span class="count">${issued}</span></span>
            <span class="summary-item">⏳ Pending: <span class="count">${pending}</span></span>
            <span class="summary-item">📊 Total: <span class="count">${internsData.length}</span></span>
        `;
    }
}

// ========================================
// NAVIGATION TOGGLE (Mobile)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
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

    // Close modal on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });

    // Determine which page we're on and render accordingly
    const path = window.location.pathname;

    if (path.includes('volunteers.html')) {
        document.getElementById('prevPageBtn')?.addEventListener('click', () => { currentPage--; renderVolunteers(); });
        document.getElementById('nextPageBtn')?.addEventListener('click', () => { currentPage++; renderVolunteers(); });
        document.getElementById('volunteerSearch')?.addEventListener('input', () => { currentPage = 1; renderVolunteers(); });
        document.getElementById('volunteerTypeFilter')?.addEventListener('change', () => { currentPage = 1; renderVolunteers(); });
        document.getElementById('volunteerStatusFilter')?.addEventListener('change', () => { currentPage = 1; renderVolunteers(); });
        document.getElementById('volunteerLaneFilter')?.addEventListener('change', () => { currentPage = 1; renderVolunteers(); });
        renderVolunteers();
    } else if (path.includes('camps.html')) {
        document.getElementById('campSearch')?.addEventListener('input', renderCamps);
        document.getElementById('campCategoryFilter')?.addEventListener('change', renderCamps);
        document.getElementById('campStatusFilter')?.addEventListener('change', renderCamps);
        renderCamps();
    } else if (path.includes('referrals.html')) {
        document.getElementById('referralSearch')?.addEventListener('input', renderReferrals);
        document.getElementById('referralStatusFilter')?.addEventListener('change', renderReferrals);
        renderReferrals();
    } else if (path.includes('partners.html')) {
        document.getElementById('partnerSearch')?.addEventListener('input', renderPartners);
        document.getElementById('partnerTypeFilter')?.addEventListener('change', renderPartners);
        document.getElementById('partnerStatusFilter')?.addEventListener('change', renderPartners);
        renderPartners();
    } else if (path.includes('interns.html')) {
        document.getElementById('internSearch')?.addEventListener('input', renderInterns);
        document.getElementById('internStatusFilter')?.addEventListener('change', renderInterns);
        document.getElementById('internCollegeFilter')?.addEventListener('change', renderInterns);
        renderInterns();
    } else {
        // Dashboard (index.html)
        renderDashboard();
    }
});