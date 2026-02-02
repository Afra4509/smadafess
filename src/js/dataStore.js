/**
 * SMADAFESS - Data Store
 * Simple localStorage-based data management (no SQL needed)
 */

const STORAGE_KEYS = {
    MESSAGES: 'smadafess_messages',
    ADMIN: 'smadafess_admin_auth'
};

// Default admin credentials (in production, use env variables or config file)
const DEFAULT_ADMIN = {
    username: 'admin',
    password: 'afra29', // Change this!
    displayName: 'Administrator'
};

class DataStore {
    constructor() {
        this.initializeData();
    }

    initializeData() {
        // Initialize messages if not exists
        if (!localStorage.getItem(STORAGE_KEYS.MESSAGES)) {
            localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify([]));
        }
    }

    // ==========================================
    // MESSAGES
    // ==========================================

    getMessages(filters = {}) {
        let messages = JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '[]');
        
        // Filter by status
        if (filters.status) {
            messages = messages.filter(m => m.status === filters.status);
        }
        
        // Search
        if (filters.search) {
            const search = filters.search.toLowerCase();
            messages = messages.filter(m => 
                m.recipient.toLowerCase().includes(search) ||
                m.content.toLowerCase().includes(search) ||
                m.senderName.toLowerCase().includes(search)
            );
        }
        
        // Sort by date (newest first)
        messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        // Pagination
        const page = filters.page || 1;
        const perPage = filters.perPage || 10;
        const total = messages.length;
        const start = (page - 1) * perPage;
        const items = messages.slice(start, start + perPage);
        
        return {
            items,
            total,
            page,
            perPage,
            totalPages: Math.ceil(total / perPage)
        };
    }

    getApprovedMessages(filters = {}) {
        return this.getMessages({ ...filters, status: 'approved' });
    }

    addMessage(data) {
        const messages = JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '[]');
        
        const newMessage = {
            id: this.generateId(),
            senderName: data.senderName || 'Anonymous',
            recipient: data.recipient,
            content: data.content,
            status: 'pending', // pending, approved, rejected
            createdAt: new Date().toISOString(),
            moderatedAt: null,
            moderationNote: null
        };
        
        messages.unshift(newMessage);
        localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
        
        return newMessage;
    }

    updateMessageStatus(id, status, note = null) {
        const messages = JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '[]');
        const index = messages.findIndex(m => m.id === id);
        
        if (index !== -1) {
            messages[index].status = status;
            messages[index].moderatedAt = new Date().toISOString();
            messages[index].moderationNote = note;
            localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
            return messages[index];
        }
        
        return null;
    }

    deleteMessage(id) {
        const messages = JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '[]');
        const filtered = messages.filter(m => m.id !== id);
        localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(filtered));
        return true;
    }

    getMessage(id) {
        const messages = JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '[]');
        return messages.find(m => m.id === id) || null;
    }

    resetData() {
        localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify([]));
    }

    getStats() {
        const messages = JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '[]');
        const today = new Date().toDateString();
        
        return {
            total: messages.length,
            pending: messages.filter(m => m.status === 'pending').length,
            approved: messages.filter(m => m.status === 'approved').length,
            rejected: messages.filter(m => m.status === 'rejected').length,
            today: messages.filter(m => new Date(m.createdAt).toDateString() === today).length
        };
    }

    // ==========================================
    // ADMIN AUTH
    // ==========================================

    adminLogin(username, password) {
        // Check credentials
        if (username === DEFAULT_ADMIN.username && password === DEFAULT_ADMIN.password) {
            const token = this.generateToken();
            const adminData = {
                token,
                username: DEFAULT_ADMIN.username,
                displayName: DEFAULT_ADMIN.displayName,
                loginAt: new Date().toISOString()
            };
            
            localStorage.setItem(STORAGE_KEYS.ADMIN, JSON.stringify(adminData));
            return { success: true, data: adminData };
        }
        
        return { success: false, message: 'Username atau password salah' };
    }

    adminLogout() {
        localStorage.removeItem(STORAGE_KEYS.ADMIN);
        return { success: true };
    }

    getAdminSession() {
        const data = localStorage.getItem(STORAGE_KEYS.ADMIN);
        return data ? JSON.parse(data) : null;
    }

    isAdminLoggedIn() {
        return !!this.getAdminSession();
    }

    // ==========================================
    // HELPERS
    // ==========================================

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    generateToken() {
        return 'token_' + this.generateId() + '_' + this.generateId();
    }

    // Export data (for backup)
    exportData() {
        return {
            messages: JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '[]'),
            exportedAt: new Date().toISOString()
        };
    }

    // Import data (restore from backup)
    importData(data) {
        if (data.messages) {
            localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(data.messages));
            return true;
        }
        return false;
    }

    // Clear all data
    clearAllData() {
        localStorage.removeItem(STORAGE_KEYS.MESSAGES);
        localStorage.removeItem(STORAGE_KEYS.ADMIN);
        this.initializeData();
    }
}

// Export singleton instance
export const dataStore = new DataStore();
export default dataStore;
