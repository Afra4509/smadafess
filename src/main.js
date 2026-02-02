/**
 * SMADAFESS - Main Application
 * Modern, beautiful, and animation-rich
 */

import './styles/main.scss';
import './styles/pages.scss';

import { dataStore } from './js/dataStore.js';
import { toast, debounce, animateNumber } from './js/utils.js';
import { 
    homePage, 
    feedPage, 
    menfessCard, 
    feedSkeleton, 
    submitPage, 
    successPage,
    notFoundPage 
} from './js/templates.js';

class SmadafessApp {
    constructor() {
        this.currentPage = 'home';
        this.feedData = {
            messages: [],
            page: 1,
            hasMore: true,
            loading: false
        };
        
        this.init();
    }

    async init() {
        try {
            // Initialize toast
            toast.init();
            
            // Setup event listeners
            this.setupNavigation();
            this.setupMobileMenu();
            this.setupScrollEffects();
            this.createParticles();
            
            // Load initial page
            await this.loadPage('home');
        } catch (error) {
            console.error('App init error:', error);
        } finally {
            // Always hide loading screen
            this.hideLoadingScreen();
        }
    }

    hideLoadingScreen() {
        const preloader = document.getElementById('preloader');
        const app = document.getElementById('app');
        
        setTimeout(() => {
            if (preloader) preloader.classList.add('hidden');
            if (app) app.classList.add('loaded');
        }, 300);
    }

    createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;
        
        // Create floating particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(139, 92, 246, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particle-float ${Math.random() * 10 + 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            container.appendChild(particle);
        }
        
        // Add particle animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particle-float {
                0%, 100% { transform: translate(0, 0) scale(1); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translate(${Math.random() * 200 - 100}px, -100vh) scale(0.5); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // ==========================================
    // NAVIGATION
    // ==========================================

    setupNavigation() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-page]');
            if (link) {
                e.preventDefault();
                const page = link.dataset.page;
                this.loadPage(page);
            }
        });
    }

    setupMobileMenu() {
        const toggle = document.getElementById('nav-toggle');
        const mobileMenu = document.getElementById('mobile-menu');

        toggle?.addEventListener('click', () => {
            toggle.classList.toggle('active');
            mobileMenu?.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        mobileMenu?.addEventListener('click', (e) => {
            if (e.target.closest('.mobile-menu-link')) {
                toggle?.classList.remove('active');
                mobileMenu?.classList.remove('active');
            }
        });
    }

    setupScrollEffects() {
        const header = document.getElementById('header');
        if (!header) return;
        
        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Hide/show header on scroll
            if (currentScroll > lastScroll && currentScroll > 100) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
            
            // Add scrolled class
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }

    updateActiveNav(page) {
        // Update desktop nav
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.page === page);
        });
        
        // Update mobile nav
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.page === page);
        });
    }

    // ==========================================
    // PAGE LOADING
    // ==========================================

    async loadPage(page) {
        this.currentPage = page;
        this.updateActiveNav(page);
        
        const container = document.getElementById('main');
        
        // Page transition animation
        container.classList.remove('page-enter');
        container.classList.add('page-leave');
        
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'instant' });

        switch (page) {
            case 'home':
                await this.loadHomePage(container);
                break;
            case 'feed':
                await this.loadFeedPage(container);
                break;
            case 'submit':
                this.loadSubmitPage(container);
                break;
            case 'success':
                container.innerHTML = successPage();
                break;
            default:
                container.innerHTML = notFoundPage();
        }
        
        // Enter animation
        container.classList.remove('page-leave');
        container.classList.add('page-enter');
    }

    // ==========================================
    // HOME PAGE
    // ==========================================

    async loadHomePage(container) {
        const stats = await dataStore.getStats();
        container.innerHTML = homePage(stats);
        
        // Animate stats
        setTimeout(() => {
            animateNumber(document.getElementById('stat-total'), stats.total);
            animateNumber(document.getElementById('stat-today'), stats.today);
            animateNumber(document.getElementById('stat-approved'), stats.approved);
        }, 500);
    }

    // ==========================================
    // FEED PAGE
    // ==========================================

    async loadFeedPage(container) {
        // Reset feed data
        this.feedData = {
            messages: [],
            page: 1,
            hasMore: true,
            loading: false
        };
        
        container.innerHTML = feedPage();
        
        // Show skeleton
        const grid = document.getElementById('feed-grid');
        grid.innerHTML = feedSkeleton(6);
        
        // Load messages
        await this.loadFeedMessages();
        
        // Setup search
        this.setupFeedSearch();
        
        // Setup load more
        this.setupLoadMore();
    }

    async loadFeedMessages(append = false) {
        if (this.feedData.loading) return;
        this.feedData.loading = true;
        
        const grid = document.getElementById('feed-grid');
        const emptyState = document.getElementById('feed-empty');
        const loadMoreContainer = document.getElementById('load-more-container');
        
        try {
            const result = await dataStore.getApprovedMessages({
                page: this.feedData.page,
                perPage: 9,
                search: this.feedData.search
            });
            
            if (!append) {
                this.feedData.messages = [];
            }
            
            this.feedData.messages.push(...result.items);
            this.feedData.hasMore = result.page < result.totalPages;
            
            if (this.feedData.messages.length === 0) {
                grid.innerHTML = '';
                emptyState.style.display = 'block';
                loadMoreContainer.style.display = 'none';
            } else {
                emptyState.style.display = 'none';
                
                if (append) {
                    const fragment = document.createDocumentFragment();
                    const startIndex = this.feedData.messages.length - result.items.length;
                    result.items.forEach((msg, i) => {
                        const div = document.createElement('div');
                        div.innerHTML = menfessCard(msg, startIndex + i);
                        fragment.appendChild(div.firstElementChild);
                    });
                    grid.appendChild(fragment);
                } else {
                    grid.innerHTML = this.feedData.messages.map((msg, i) => menfessCard(msg, i)).join('');
                }
                
                loadMoreContainer.style.display = this.feedData.hasMore ? 'block' : 'none';
            }
        } catch (error) {
            toast.error('Error', 'Gagal memuat pesan');
        } finally {
            this.feedData.loading = false;
        }
    }

    setupFeedSearch() {
        const input = document.getElementById('search-input');
        if (!input) return;
        
        const search = debounce((value) => {
            this.feedData.search = value;
            this.feedData.page = 1;
            this.loadFeedMessages();
        }, 300);
        
        input.addEventListener('input', (e) => search(e.target.value));
    }

    setupLoadMore() {
        const btn = document.getElementById('load-more-btn');
        btn?.addEventListener('click', async () => {
            this.feedData.page++;
            btn.textContent = 'Memuat...';
            await this.loadFeedMessages(true);
            btn.textContent = 'Muat Lebih Banyak';
        });
    }

    // ==========================================
    // SUBMIT PAGE
    // ==========================================

    loadSubmitPage(container) {
        container.innerHTML = submitPage();
        this.setupSubmitForm();
    }

    setupSubmitForm() {
        const form = document.getElementById('submit-form');
        const messageInput = document.getElementById('message');
        const charCount = document.getElementById('char-current');
        
        // Character counter
        messageInput?.addEventListener('input', () => {
            charCount.textContent = messageInput.value.length;
        });
        
        // Form submit
        form?.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleSubmit(form);
        });
    }

    async handleSubmit(form) {
        const btn = document.getElementById('submit-btn');
        const formData = new FormData(form);
        
        const senderName = formData.get('senderName')?.trim() || 'Anonymous';
        const recipient = formData.get('recipient')?.trim();
        const message = formData.get('message')?.trim();
        
        // Validation
        if (!recipient) {
            toast.error('Error', 'Nama penerima harus diisi');
            return;
        }
        
        if (!message) {
            toast.error('Error', 'Pesan tidak boleh kosong');
            return;
        }
        
        if (message.length < 10) {
            toast.error('Error', 'Pesan minimal 10 karakter');
            return;
        }
        
        // Simple bad word filter
        const badWords = ['anjing', 'bangsat', 'babi', 'kontol', 'memek', 'ngentot', 'tai', 'tolol', 'goblok', 'bodoh'];
        const lowerMessage = message.toLowerCase();
        const containsBadWord = badWords.some(word => lowerMessage.includes(word));
        
        if (containsBadWord) {
            toast.error('Error', 'Pesan mengandung kata-kata yang tidak pantas');
            return;
        }
        
        btn.classList.add('loading');
        
        try {
            // Add message to store
            const result = await dataStore.addMessage({
                senderName,
                recipient,
                content: message
            });
            
            if (!result) {
                throw new Error('Failed to add message');
            }
            
            toast.success('Berhasil!', 'Menfess kamu sedang direview');
            this.loadPage('success');
        } catch (error) {
            toast.error('Error', 'Gagal mengirim menfess');
        } finally {
            btn.classList.remove('loading');
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SmadafessApp();
});
