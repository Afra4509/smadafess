/**
 * SMADAFESS - Page Templates
 * Premium HTML templates with SVG icons
 * NO EMOJIS - Clean professional design
 */

import { formatRelativeTime, escapeHtml } from './utils.js';

// ============================================
// SVG ICONS
// ============================================

const icons = {
    // Navigation & UI
    home: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>`,
    
    send: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>`,
    
    inbox: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-17.399 0V5.625c0-.621.504-1.125 1.125-1.125h15.75c.621 0 1.125.504 1.125 1.125v7.875m-17.999 0V18.75c0 .621.504 1.125 1.125 1.125h15.75c.621 0 1.125-.504 1.125-1.125v-5.25" /></svg>`,
    
    search: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>`,
    
    edit: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>`,
    
    // Status & Actions
    lock: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>`,
    
    shield: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>`,
    
    bolt: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>`,
    
    music: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" /></svg>`,
    
    // Content
    user: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>`,
    
    heart: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>`,
    
    envelope: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>`,
    
    chat: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" /></svg>`,
    
    // Results
    check: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>`,
    
    checkCircle: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>`,
    
    sparkles: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" /></svg>`,
    
    lightbulb: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>`,
    
    inboxEmpty: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>`,
    
    arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>`,
};

// ============================================
// HOME PAGE
// ============================================

export function homePage(stats = {}) {
    return `
        <div class="home-page">
            <div class="container">
                <section class="hero">
                    <div class="hero-badge">
                        ${icons.sparkles}
                        <span>Platform Menfess Anonim</span>
                    </div>
                    
                    <h1 class="hero-title">
                        Sampaikan Perasaanmu
                        <span class="text-gradient">Secara Anonim</span>
                    </h1>
                    
                    <p class="hero-description">
                        Kirim pesan rahasia ke siapapun di sekolah. 
                        Aman, nyaman, dan dijaga kerahasiaannya.
                    </p>
                    
                    <div class="hero-actions">
                        <button class="btn btn-primary" data-page="submit">
                            ${icons.send}
                            <span>Kirim Menfess</span>
                        </button>
                        <button class="btn btn-ghost" data-page="feed">
                            ${icons.inbox}
                            <span>Lihat Feed</span>
                        </button>
                    </div>
                    
                    <div class="hero-stats">
                        <div class="stat-item">
                            <div class="stat-value" id="stat-total">${stats.total || 0}</div>
                            <div class="stat-label">Total</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value" id="stat-today">${stats.today || 0}</div>
                            <div class="stat-label">Hari Ini</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-value" id="stat-approved">${stats.approved || 0}</div>
                            <div class="stat-label">Terkirim</div>
                        </div>
                    </div>
                </section>
                
                <section class="features">
                    <div class="features-grid">
                        <div class="feature-card">
                            <div class="feature-icon">${icons.lock}</div>
                            <h3 class="feature-title">100% Anonim</h3>
                            <p class="feature-text">Identitasmu terjaga dengan aman. Tidak ada yang tahu siapa kamu.</p>
                        </div>
                        
                        <div class="feature-card">
                            <div class="feature-icon">${icons.music}</div>
                            <h3 class="feature-title">Tambah Lagu</h3>
                            <p class="feature-text">Ekspresikan perasaanmu dengan menambahkan lagu favorit.</p>
                            <span class="feature-badge">Coming Soon</span>
                        </div>
                        
                        <div class="feature-card">
                            <div class="feature-icon">${icons.shield}</div>
                            <h3 class="feature-title">Dimoderasi</h3>
                            <p class="feature-text">Setiap pesan difilter untuk menjaga lingkungan yang positif.</p>
                        </div>
                        
                        <div class="feature-card">
                            <div class="feature-icon">${icons.bolt}</div>
                            <h3 class="feature-title">Cepat & Mudah</h3>
                            <p class="feature-text">Kirim menfess dalam hitungan detik. Tanpa ribet.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    `;
}

// ============================================
// FEED PAGE
// ============================================

export function feedPage() {
    return `
        <div class="feed-page">
            <div class="container">
                <div class="feed-header">
                    <h1>Menfess Feed</h1>
                    <p>Pesan-pesan anonim terbaru dari teman-temanmu</p>
                </div>
                
                <div class="search-wrapper">
                    ${icons.search}
                    <input 
                        type="text" 
                        id="search-input" 
                        class="form-input" 
                        placeholder="Cari nama penerima..." 
                        autocomplete="off"
                    >
                </div>
                
                <div class="feed-grid" id="feed-grid">
                    <!-- Messages loaded dynamically -->
                </div>
                
                <div class="load-more" id="load-more-container" style="display: none;">
                    <button class="btn btn-secondary" id="load-more-btn">
                        Muat Lebih Banyak
                    </button>
                </div>
                
                <div id="feed-empty" class="empty-state" style="display: none;">
                    ${icons.inboxEmpty}
                    <h3>Belum Ada Menfess</h3>
                    <p>Jadilah yang pertama mengirim menfess!</p>
                    <button class="btn btn-primary" data-page="submit">
                        ${icons.send}
                        <span>Kirim Menfess</span>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// MENFESS CARD
// ============================================

export function menfessCard(message, index = 0) {
    return `
        <article class="menfess-card" style="animation-delay: ${index * 0.05}s">
            <div class="menfess-header">
                <div class="menfess-avatar">
                    ${icons.envelope}
                </div>
                <div class="menfess-info">
                    <div class="menfess-to">To: <span>${escapeHtml(message.recipient)}</span></div>
                    <div class="menfess-from">From: ${escapeHtml(message.senderName)}</div>
                </div>
                <span class="menfess-time">${formatRelativeTime(message.createdAt)}</span>
            </div>
            
            <div class="menfess-content">
                ${escapeHtml(message.content)}
            </div>
            
            <div class="menfess-footer">
                <button class="reaction-btn" data-reaction="heart" data-id="${message.id}">
                    ${icons.heart}
                    <span class="reaction-count">${message.reactions?.heart || 0}</span>
                </button>
            </div>
        </article>
    `;
}

// ============================================
// FEED SKELETON
// ============================================

export function feedSkeleton(count = 6) {
    return Array(count).fill(0).map(() => `
        <div class="skeleton-card">
            <div class="skeleton-header">
                <div class="skeleton skeleton-avatar"></div>
                <div class="skeleton-lines">
                    <div class="skeleton skeleton-line" style="width: 60%"></div>
                    <div class="skeleton skeleton-line" style="width: 40%"></div>
                </div>
            </div>
            <div class="skeleton skeleton-content"></div>
            <div class="skeleton skeleton-footer"></div>
        </div>
    `).join('');
}

// ============================================
// SUBMIT PAGE
// ============================================

export function submitPage() {
    return `
        <div class="submit-page">
            <div class="container-sm">
                <div class="submit-header">
                    <h1>Kirim Menfess</h1>
                    <p>Sampaikan perasaanmu secara anonim</p>
                </div>
                
                <div class="submit-card">
                    <form id="submit-form" class="submit-form">
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="sender-name" class="form-label">Nama Pengirim</label>
                                <input 
                                    type="text" 
                                    id="sender-name" 
                                    name="senderName" 
                                    class="form-input" 
                                    placeholder="Kosongkan untuk anonim" 
                                    maxlength="50"
                                >
                            </div>
                            
                            <div class="form-group">
                                <label for="recipient" class="form-label">
                                    Untuk Siapa? <span class="required">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id="recipient" 
                                    name="recipient" 
                                    class="form-input" 
                                    placeholder="Nama penerima" 
                                    required 
                                    maxlength="100"
                                >
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="message" class="form-label">
                                Pesan <span class="required">*</span>
                            </label>
                            <textarea 
                                id="message" 
                                name="message" 
                                class="form-textarea" 
                                placeholder="Tulis perasaanmu di sini..." 
                                required 
                                maxlength="1000" 
                                rows="6"
                            ></textarea>
                            <div class="textarea-footer">
                                <span class="char-count"><span id="char-current">0</span>/1000</span>
                            </div>
                        </div>
                        
                        <button type="submit" class="btn btn-primary btn-submit" id="submit-btn">
                            ${icons.send}
                            <span>Kirim Menfess</span>
                        </button>
                    </form>
                </div>
                
                <div class="submit-info">
                    <div class="info-icon">${icons.lightbulb}</div>
                    <div class="info-content">
                        <strong>Tips:</strong> Pesanmu akan direview sebelum ditampilkan. Hindari kata-kata kasar dan sampaikan dengan sopan.
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// SUCCESS PAGE
// ============================================

export function successPage() {
    return `
        <div class="success-page">
            <div class="success-card">
                <div class="success-icon">
                    ${icons.checkCircle}
                </div>
                <h1>Menfess Terkirim!</h1>
                <p>Pesanmu akan ditampilkan setelah direview oleh admin.</p>
                <div class="success-actions">
                    <button class="btn btn-primary" data-page="submit">
                        Kirim Lagi
                    </button>
                    <button class="btn btn-ghost" data-page="feed">
                        Lihat Feed
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// NOT FOUND PAGE
// ============================================

export function notFoundPage() {
    return `
        <div class="notfound-page">
            <div class="notfound-code">404</div>
            <h1>Halaman Tidak Ditemukan</h1>
            <p>Sepertinya kamu tersesat. Halaman yang kamu cari tidak ada.</p>
            <button class="btn btn-primary" data-page="home">
                ${icons.home}
                <span>Kembali ke Home</span>
            </button>
        </div>
    `;
}
