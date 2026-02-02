-- =============================================
-- SMADAFESS - Supabase Database Setup
-- Jalankan script ini di Supabase SQL Editor
-- =============================================

-- 1. Buat tabel messages
CREATE TABLE IF NOT EXISTS messages (
    id BIGSERIAL PRIMARY KEY,
    sender_name VARCHAR(100) DEFAULT 'Anonymous',
    recipient VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    moderated_at TIMESTAMPTZ,
    moderation_note TEXT
);

-- 2. Buat index untuk query yang sering digunakan
CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 4. Policy: Siapa saja bisa INSERT (anonymous submission)
CREATE POLICY "Allow anonymous insert" ON messages
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- 5. Policy: Siapa saja bisa SELECT pesan yang approved
CREATE POLICY "Allow public read approved messages" ON messages
    FOR SELECT
    TO anon
    USING (status = 'approved');

-- 6. Policy: Authenticated users (admin) bisa akses semua
CREATE POLICY "Allow authenticated full access" ON messages
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 7. Untuk sementara (development), izinkan semua akses via anon key
-- HAPUS POLICY INI DI PRODUCTION!
CREATE POLICY "Allow all for development" ON messages
    FOR ALL
    TO anon
    USING (true)
    WITH CHECK (true);

-- =============================================
-- CARA SETUP:
-- =============================================
-- 1. Buka Supabase Dashboard: https://supabase.com/dashboard
-- 2. Pilih project Anda
-- 3. Klik "SQL Editor" di sidebar kiri
-- 4. Copy-paste seluruh script ini
-- 5. Klik "Run" atau tekan Ctrl+Enter
-- =============================================

-- Untuk cek apakah tabel berhasil dibuat:
-- SELECT * FROM messages;
