/**
 * SMADAFESS - Data Store
 * Supabase-based data management untuk sinkronisasi lintas device
 */

import { supabase } from './supabaseClient.js';

const STORAGE_KEYS = {
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
        // No initialization needed for Supabase
    }

    // ==========================================
    // MESSAGES (Supabase)
    // ==========================================

    async getMessages(filters = {}) {
        try {
            let query = supabase
                .from('messages')
                .select('*', { count: 'exact' });
            
            // Filter by status
            if (filters.status) {
                query = query.eq('status', filters.status);
            }
            
            // Search
            if (filters.search) {
                const search = filters.search.toLowerCase();
                query = query.or(`recipient.ilike.%${search}%,content.ilike.%${search}%,sender_name.ilike.%${search}%`);
            }
            
            // Sort by date (newest first)
            query = query.order('created_at', { ascending: false });
            
            // Pagination
            const page = filters.page || 1;
            const perPage = filters.perPage || 10;
            const start = (page - 1) * perPage;
            const end = start + perPage - 1;
            
            query = query.range(start, end);
            
            const { data, error, count } = await query;
            
            if (error) {
                console.error('Error fetching messages:', error);
                return { items: [], total: 0, page, perPage, totalPages: 0 };
            }
            
            // Transform snake_case to camelCase
            const items = data.map(this.transformMessage);
            
            return {
                items,
                total: count || 0,
                page,
                perPage,
                totalPages: Math.ceil((count || 0) / perPage)
            };
        } catch (error) {
            console.error('Error in getMessages:', error);
            return { items: [], total: 0, page: 1, perPage: 10, totalPages: 0 };
        }
    }

    async getApprovedMessages(filters = {}) {
        return this.getMessages({ ...filters, status: 'approved' });
    }

    async addMessage(data) {
        try {
            const newMessage = {
                sender_name: data.senderName || 'Anonymous',
                recipient: data.recipient,
                content: data.content,
                status: 'pending',
                created_at: new Date().toISOString(),
                moderated_at: null,
                moderation_note: null
            };
            
            const { data: inserted, error } = await supabase
                .from('messages')
                .insert([newMessage])
                .select()
                .single();
            
            if (error) {
                console.error('Error adding message:', error);
                return null;
            }
            
            return this.transformMessage(inserted);
        } catch (error) {
            console.error('Error in addMessage:', error);
            return null;
        }
    }

    async updateMessageStatus(id, status, note = null) {
        try {
            const { data, error } = await supabase
                .from('messages')
                .update({
                    status: status,
                    moderated_at: new Date().toISOString(),
                    moderation_note: note
                })
                .eq('id', id)
                .select()
                .single();
            
            if (error) {
                console.error('Error updating message:', error);
                return null;
            }
            
            return this.transformMessage(data);
        } catch (error) {
            console.error('Error in updateMessageStatus:', error);
            return null;
        }
    }

    async deleteMessage(id) {
        try {
            const { error } = await supabase
                .from('messages')
                .delete()
                .eq('id', id);
            
            if (error) {
                console.error('Error deleting message:', error);
                return false;
            }
            
            return true;
        } catch (error) {
            console.error('Error in deleteMessage:', error);
            return false;
        }
    }

    async getMessage(id) {
        try {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .eq('id', id)
                .single();
            
            if (error) {
                console.error('Error getting message:', error);
                return null;
            }
            
            return this.transformMessage(data);
        } catch (error) {
            console.error('Error in getMessage:', error);
            return null;
        }
    }

    async resetData() {
        try {
            const { error } = await supabase
                .from('messages')
                .delete()
                .neq('id', 0); // Delete all rows
            
            if (error) {
                console.error('Error resetting data:', error);
                return false;
            }
            return true;
        } catch (error) {
            console.error('Error in resetData:', error);
            return false;
        }
    }

    async getStats() {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            // Get all counts in parallel
            const [totalResult, pendingResult, approvedResult, rejectedResult, todayResult] = await Promise.all([
                supabase.from('messages').select('*', { count: 'exact', head: true }),
                supabase.from('messages').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
                supabase.from('messages').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
                supabase.from('messages').select('*', { count: 'exact', head: true }).eq('status', 'rejected'),
                supabase.from('messages').select('*', { count: 'exact', head: true }).gte('created_at', today.toISOString())
            ]);
            
            return {
                total: totalResult.count || 0,
                pending: pendingResult.count || 0,
                approved: approvedResult.count || 0,
                rejected: rejectedResult.count || 0,
                today: todayResult.count || 0
            };
        } catch (error) {
            console.error('Error in getStats:', error);
            return { total: 0, pending: 0, approved: 0, rejected: 0, today: 0 };
        }
    }

    // Transform database row (snake_case) to JS object (camelCase)
    transformMessage(row) {
        if (!row) return null;
        return {
            id: row.id,
            senderName: row.sender_name,
            recipient: row.recipient,
            content: row.content,
            status: row.status,
            createdAt: row.created_at,
            moderatedAt: row.moderated_at,
            moderationNote: row.moderation_note
        };
    }

    // ==========================================
    // ADMIN AUTH (tetap localStorage - tidak perlu sync)
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

    // Export data (for backup) - async now
    async exportData() {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .order('created_at', { ascending: false });
        
        return {
            messages: data ? data.map(this.transformMessage) : [],
            exportedAt: new Date().toISOString()
        };
    }

    // Import data (restore from backup) - async now
    async importData(importedData) {
        if (importedData.messages && importedData.messages.length > 0) {
            // Transform camelCase back to snake_case for database
            const rows = importedData.messages.map(m => ({
                sender_name: m.senderName,
                recipient: m.recipient,
                content: m.content,
                status: m.status,
                created_at: m.createdAt,
                moderated_at: m.moderatedAt,
                moderation_note: m.moderationNote
            }));
            
            const { error } = await supabase
                .from('messages')
                .insert(rows);
            
            if (error) {
                console.error('Error importing data:', error);
                return false;
            }
            return true;
        }
        return false;
    }

    // Clear all data
    async clearAllData() {
        localStorage.removeItem(STORAGE_KEYS.ADMIN);
        await this.resetData();
    }

    // ==========================================
    // REALTIME SUBSCRIPTION (bonus feature)
    // ==========================================

    subscribeToMessages(callback) {
        const subscription = supabase
            .channel('messages-changes')
            .on('postgres_changes', 
                { event: '*', schema: 'public', table: 'messages' }, 
                (payload) => {
                    callback(payload);
                }
            )
            .subscribe();
        
        return subscription;
    }

    unsubscribeFromMessages(subscription) {
        if (subscription) {
            supabase.removeChannel(subscription);
        }
    }
}

// Export singleton instance
export const dataStore = new DataStore();
export default dataStore;
