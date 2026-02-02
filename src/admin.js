/**
 * SMADAFESS - Admin Panel Application
 * Premium admin panel with SVG icons
 */

import './styles/main.scss';
import './styles/admin.scss';

import { dataStore } from './js/dataStore.js';
import { toast, formatDateTime, escapeHtml } from './js/utils.js';

// SVG Icons
const icons = {
    inbox: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-17.399 0V5.625c0-.621.504-1.125 1.125-1.125h15.75c.621 0 1.125.504 1.125 1.125v7.875m-17.999 0V18.75c0 .621.504 1.125 1.125 1.125h15.75c.621 0 1.125-.504 1.125-1.125v-5.25" /></svg>`,
    clock: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>`,
    check: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>`,
    x: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>`,
    trash: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>`,
    document: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>`,
    empty: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>`,
    eye: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>`,
    user: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>`,
};

class AdminApp {
    constructor() {
        this.isAuthenticated = false;
        this.admin = null;
        this.currentSection = 'dashboard';
        this.messagesData = {
            items: [],
            page: 1,
            total: 0,
            status: null
        };
        
        this.init();
    }

    async init() {
        toast.init();
        
        // Check authentication
        const session = dataStore.getAdminSession();
        if (session) {
            this.admin = session;
            this.isAuthenticated = true;
            this.showDashboard();
        } else {
            this.showLogin();
        }
        
        this.setupEventListeners();
        
        // Hide loading
        setTimeout(() => {
            document.getElementById('preloader')?.classList.add('hidden');
        }, 300);
    }

    setupEventListeners() {
        // Login form
        document.getElementById('login-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Logout
        document.getElementById('logout-btn')?.addEventListener('click', () => {
            this.handleLogout();
        });

        // Sidebar navigation
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.loadSection(section);
            });
        });

        // Sidebar toggle (mobile)
        document.getElementById('sidebar-toggle')?.addEventListener('click', () => {
            document.getElementById('admin-sidebar')?.classList.toggle('active');
            document.getElementById('sidebar-overlay')?.classList.toggle('active');
        });

        // Sidebar overlay
        document.getElementById('sidebar-overlay')?.addEventListener('click', () => {
            document.getElementById('admin-sidebar')?.classList.remove('active');
            document.getElementById('sidebar-overlay')?.classList.remove('active');
        });

        // Sidebar close
        document.getElementById('sidebar-close')?.addEventListener('click', () => {
            document.getElementById('admin-sidebar')?.classList.remove('active');
            document.getElementById('sidebar-overlay')?.classList.remove('active');
        });

        // Refresh button
        document.getElementById('refresh-btn')?.addEventListener('click', () => {
            this.loadSection(this.currentSection);
        });
    }

    // ==========================================
    // AUTHENTICATION
    // ==========================================

    showLogin() {
        document.getElementById('login-page').style.display = 'flex';
        document.getElementById('admin-dashboard').style.display = 'none';
    }

    showDashboard() {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('admin-dashboard').style.display = 'flex';
        
        // Update admin name
        const adminNameEl = document.getElementById('admin-name');
        if (adminNameEl) {
            adminNameEl.textContent = this.admin?.displayName || 'Admin';
        }
        
        // Load dashboard
        this.loadSection('dashboard');
    }

    async handleLogin() {
        const btn = document.getElementById('login-btn');
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorEl = document.getElementById('login-error');

        btn.classList.add('loading');
        if (errorEl) errorEl.style.display = 'none';

        try {
            // Small delay for UX
            await new Promise(resolve => setTimeout(resolve, 500));
            
            const result = dataStore.adminLogin(username, password);
            
            if (result.success) {
                this.admin = result.data;
                this.isAuthenticated = true;
                toast.success('Login Berhasil', `Selamat datang, ${this.admin.displayName}!`);
                this.showDashboard();
            } else {
                if (errorEl) {
                    errorEl.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                        <span>${result.message}</span>
                    `;
                    errorEl.style.display = 'flex';
                }
            }
        } catch (error) {
            toast.error('Login Gagal', 'Terjadi kesalahan');
        } finally {
            btn.classList.remove('loading');
        }
    }

    handleLogout() {
        dataStore.adminLogout();
        this.isAuthenticated = false;
        this.admin = null;
        toast.info('Logged Out', 'Anda telah keluar dari sistem.');
        this.showLogin();
    }

    // ==========================================
    // SECTION LOADING
    // ==========================================

    async loadSection(section) {
        this.currentSection = section;
        
        // Update sidebar active state
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.classList.toggle('active', link.dataset.section === section);
        });
        
        // Update page title
        const titles = {
            dashboard: 'Dashboard',
            messages: 'Moderasi Pesan',
            settings: 'Pengaturan'
        };
        const titleEl = document.getElementById('page-title');
        if (titleEl) titleEl.textContent = titles[section] || 'Dashboard';
        
        // Close mobile sidebar
        document.getElementById('admin-sidebar')?.classList.remove('active');
        document.getElementById('sidebar-overlay')?.classList.remove('active');
        
        // Load section content
        const content = document.getElementById('admin-content');
        
        switch (section) {
            case 'dashboard':
                await this.loadDashboard(content);
                break;
            case 'messages':
                await this.loadMessages(content);
                break;
            case 'settings':
                this.loadSettings(content);
                break;
        }
        
        // Update pending badge
        this.updatePendingBadge();
    }

    updatePendingBadge() {
        const stats = dataStore.getStats();
        const badge = document.getElementById('pending-badge');
        if (badge) {
            badge.textContent = stats.pending;
            badge.style.display = stats.pending > 0 ? 'inline' : 'none';
        }
    }

    // ==========================================
    // DASHBOARD
    // ==========================================

    async loadDashboard(container) {
        const stats = dataStore.getStats();
        
        container.innerHTML = `
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-card-header">
                        <div class="stat-card-icon">${icons.inbox}</div>
                    </div>
                    <div class="stat-card-value">${stats.total}</div>
                    <div class="stat-card-label">Total Pesan</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-header">
                        <div class="stat-card-icon warning">${icons.clock}</div>
                    </div>
                    <div class="stat-card-value">${stats.pending}</div>
                    <div class="stat-card-label">Menunggu Review</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-header">
                        <div class="stat-card-icon success">${icons.check}</div>
                    </div>
                    <div class="stat-card-value">${stats.approved}</div>
                    <div class="stat-card-label">Disetujui</div>
                </div>
                <div class="stat-card">
                    <div class="stat-card-header">
                        <div class="stat-card-icon danger">${icons.x}</div>
                    </div>
                    <div class="stat-card-value">${stats.rejected}</div>
                    <div class="stat-card-label">Ditolak</div>
                </div>
            </div>
            
            <div class="messages-section">
                <div class="messages-header">
                    <h2>Pesan Terbaru</h2>
                    <button class="btn btn-secondary btn-sm" onclick="document.querySelector('[data-section=messages]').click()">
                        Lihat Semua
                    </button>
                </div>
                <div class="messages-list" id="recent-messages">
                    <!-- Recent messages -->
                </div>
            </div>
        `;
        
        // Load recent messages
        const recent = dataStore.getMessages({ perPage: 5 });
        const messagesList = document.getElementById('recent-messages');
        
        if (recent.items.length === 0) {
            messagesList.innerHTML = `
                <div class="messages-empty">
                    ${icons.empty}
                    <h3>Belum ada pesan</h3>
                    <p>Pesan baru akan muncul di sini</p>
                </div>
            `;
        } else {
            messagesList.innerHTML = recent.items.map(msg => this.messageItemTemplate(msg)).join('');
            this.setupMessageActions();
        }
    }

    // ==========================================
    // MESSAGES
    // ==========================================

    async loadMessages(container) {
        container.innerHTML = `
            <div class="messages-section">
                <div class="messages-header">
                    <h2>Semua Pesan</h2>
                    <div class="messages-filters">
                        <button class="filter-btn active" data-filter="">Semua</button>
                        <button class="filter-btn" data-filter="pending">Pending</button>
                        <button class="filter-btn" data-filter="approved">Approved</button>
                        <button class="filter-btn" data-filter="rejected">Rejected</button>
                    </div>
                </div>
                <div class="messages-list" id="messages-list">
                    <!-- Messages -->
                </div>
                <div class="pagination" id="pagination">
                    <!-- Pagination -->
                </div>
            </div>
        `;
        
        // Setup filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.messagesData.status = btn.dataset.filter || null;
                this.messagesData.page = 1;
                this.loadMessagesList();
            });
        });
        
        this.loadMessagesList();
    }

    loadMessagesList() {
        const result = dataStore.getMessages({
            page: this.messagesData.page,
            perPage: 10,
            status: this.messagesData.status
        });
        
        this.messagesData = { ...this.messagesData, ...result };
        
        const list = document.getElementById('messages-list');
        const pagination = document.getElementById('pagination');
        
        if (result.items.length === 0) {
            list.innerHTML = `
                <div class="messages-empty">
                    ${icons.empty}
                    <h3>Tidak ada pesan</h3>
                    <p>Belum ada pesan dengan filter ini</p>
                </div>
            `;
            pagination.innerHTML = '';
        } else {
            list.innerHTML = result.items.map(msg => this.messageItemTemplate(msg)).join('');
            this.renderPagination(pagination, result);
            this.setupMessageActions();
        }
    }

    messageItemTemplate(message) {
        const statusConfig = {
            pending: { label: 'Pending', icon: icons.clock },
            approved: { label: 'Approved', icon: icons.check },
            rejected: { label: 'Rejected', icon: icons.x }
        };
        
        const status = statusConfig[message.status] || statusConfig.pending;
        
        return `
            <div class="message-item ${message.status}" data-id="${message.id}">
                <div class="message-avatar">${icons.user}</div>
                <div class="message-body">
                    <div class="message-meta">
                        <span class="message-to">To: <span>${escapeHtml(message.recipient)}</span></span>
                        <span class="message-status ${message.status}">${status.label}</span>
                    </div>
                    <div class="message-from">From: ${escapeHtml(message.senderName)}</div>
                    <div class="message-preview">${escapeHtml(message.content)}</div>
                    <div class="message-footer">
                        <span class="message-time">${formatDateTime(message.createdAt)}</span>
                        <div class="message-actions">
                            ${message.status === 'pending' ? `
                                <button class="action-btn approve" data-action="approve" data-id="${message.id}" title="Approve">
                                    ${icons.check}
                                </button>
                                <button class="action-btn reject" data-action="reject" data-id="${message.id}" title="Reject">
                                    ${icons.x}
                                </button>
                            ` : ''}
                            <button class="action-btn view" data-action="view" data-id="${message.id}" title="View">
                                ${icons.eye}
                            </button>
                            <button class="action-btn" data-action="delete" data-id="${message.id}" title="Delete">
                                ${icons.trash}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupMessageActions() {
        document.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', async () => {
                const action = btn.dataset.action;
                const id = btn.dataset.id;
                
                switch (action) {
                    case 'approve':
                        this.approveMessage(id);
                        break;
                    case 'reject':
                        this.rejectMessage(id);
                        break;
                    case 'delete':
                        this.deleteMessage(id);
                        break;
                    case 'view':
                        this.viewMessage(id);
                        break;
                }
            });
        });
    }

    approveMessage(id) {
        const result = dataStore.updateMessageStatus(id, 'approved');
        if (result) {
            toast.success('Berhasil', 'Pesan telah disetujui');
            this.loadSection(this.currentSection);
        }
    }

    rejectMessage(id) {
        const result = dataStore.updateMessageStatus(id, 'rejected');
        if (result) {
            toast.success('Berhasil', 'Pesan telah ditolak');
            this.loadSection(this.currentSection);
        }
    }

    deleteMessage(id) {
        if (confirm('Yakin ingin menghapus pesan ini?')) {
            dataStore.deleteMessage(id);
            toast.success('Berhasil', 'Pesan telah dihapus');
            this.loadSection(this.currentSection);
        }
    }

    viewMessage(id) {
        const message = dataStore.getMessage(id);
        if (!message) return;
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'modal-overlay active';
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>Detail Pesan</h3>
                    <button class="modal-close" id="modal-close">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="message-detail">
                        <div class="detail-row">
                            <span class="detail-label">Untuk</span>
                            <span class="detail-value">${escapeHtml(message.recipient)}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Dari</span>
                            <span class="detail-value">${escapeHtml(message.senderName)}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Status</span>
                            <span class="detail-value">
                                <span class="message-status ${message.status}">${message.status}</span>
                            </span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Waktu</span>
                            <span class="detail-value">${formatDateTime(message.createdAt)}</span>
                        </div>
                        <div class="detail-row" style="flex-direction: column; gap: 8px;">
                            <span class="detail-label">Pesan</span>
                            <div class="detail-message">${escapeHtml(message.content)}</div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    ${message.status === 'pending' ? `
                        <button class="btn btn-secondary" data-modal-action="reject">Tolak</button>
                        <button class="btn btn-primary" data-modal-action="approve">Setujui</button>
                    ` : ''}
                    <button class="btn btn-secondary" id="modal-close-btn">Tutup</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close handlers
        const closeModal = () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        };
        
        modal.querySelector('#modal-close')?.addEventListener('click', closeModal);
        modal.querySelector('#modal-close-btn')?.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        // Action handlers
        modal.querySelector('[data-modal-action="approve"]')?.addEventListener('click', () => {
            this.approveMessage(id);
            closeModal();
        });
        
        modal.querySelector('[data-modal-action="reject"]')?.addEventListener('click', () => {
            this.rejectMessage(id);
            closeModal();
        });
    }

    renderPagination(container, data) {
        const totalPages = Math.ceil(data.total / 10);
        if (totalPages <= 1) {
            container.innerHTML = '';
            return;
        }
        
        let html = '<div class="pagination-inner">';
        
        // Previous button
        html += `<button class="btn btn-secondary btn-sm" ${data.page <= 1 ? 'disabled' : ''} data-page="${data.page - 1}">Prev</button>`;
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === data.page) {
                html += `<button class="btn btn-primary btn-sm" disabled>${i}</button>`;
            } else if (Math.abs(i - data.page) <= 2 || i === 1 || i === totalPages) {
                html += `<button class="btn btn-secondary btn-sm" data-page="${i}">${i}</button>`;
            } else if (Math.abs(i - data.page) === 3) {
                html += `<span>...</span>`;
            }
        }
        
        // Next button
        html += `<button class="btn btn-secondary btn-sm" ${data.page >= totalPages ? 'disabled' : ''} data-page="${data.page + 1}">Next</button>`;
        
        html += '</div>';
        container.innerHTML = html;
        
        // Setup pagination clicks
        container.querySelectorAll('[data-page]').forEach(btn => {
            btn.addEventListener('click', () => {
                this.messagesData.page = parseInt(btn.dataset.page);
                this.loadMessagesList();
            });
        });
    }

    // ==========================================
    // SETTINGS
    // ==========================================

    loadSettings(container) {
        container.innerHTML = `
            <div class="settings-section">
                <div class="settings-header">
                    <h2>Pengaturan Akun</h2>
                    <p>Kelola informasi akun admin Anda</p>
                </div>
                <div class="settings-body">
                    <div class="settings-row">
                        <div class="settings-info">
                            <h4>Username</h4>
                            <p>${this.admin?.username || 'admin'}</p>
                        </div>
                    </div>
                    <div class="settings-row">
                        <div class="settings-info">
                            <h4>Display Name</h4>
                            <p>${this.admin?.displayName || 'Admin'}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="settings-section">
                <div class="settings-header">
                    <h2>Data & Penyimpanan</h2>
                    <p>Kelola data aplikasi</p>
                </div>
                <div class="settings-body">
                    <div class="settings-row">
                        <div class="settings-info">
                            <h4>Reset Semua Data</h4>
                            <p>Hapus semua pesan dan reset ke kondisi awal</p>
                        </div>
                        <div class="settings-control">
                            <button class="btn btn-secondary" id="reset-data-btn" style="color: var(--error);">
                                Reset Data
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('reset-data-btn')?.addEventListener('click', () => {
            if (confirm('Yakin ingin menghapus semua data? Tindakan ini tidak dapat dibatalkan.')) {
                dataStore.resetData();
                toast.success('Berhasil', 'Semua data telah direset');
                this.loadSection('dashboard');
            }
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.adminApp = new AdminApp();
});
