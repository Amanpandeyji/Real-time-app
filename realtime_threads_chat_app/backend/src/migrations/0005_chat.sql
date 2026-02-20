CREATE TABLE IF NOT EXISTS direct_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    sender_user_id INTEGER NOT NULL,
    recipient_user_id INTEGER NOT NULL,

    body TEXT,

    image_url TEXT,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (sender_user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipient_user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE INDEX IF NOT EXISTS idx_dm_sender_recipient_created_at 
  ON direct_messages (sender_user_id, recipient_user_id, created_at DESC);