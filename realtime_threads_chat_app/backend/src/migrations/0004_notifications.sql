CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    user_id INTEGER NOT NULL,

    actor_user_id INTEGER NOT NULL,

    thread_id INTEGER NOT NULL,

    type TEXT NOT NULL CHECK (type IN ('REPLY_ON_THREAD', 'LIKE_ON_THREAD')),

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    read_at DATETIME NULL,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (actor_user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (thread_id) REFERENCES threads(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_read
   ON notifications (user_id, read_at);