
CREATE TABLE IF NOT EXISTS replies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    thread_id INTEGER NOT NULL,

    author_user_id INTEGER NOT NULL,

    body TEXT NOT NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (thread_id) REFERENCES threads(id) ON DELETE CASCADE,
    FOREIGN KEY (author_user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TRIGGER IF NOT EXISTS update_replies_timestamp 
AFTER UPDATE ON replies 
FOR EACH ROW 
BEGIN
    UPDATE replies SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;


CREATE INDEX IF NOT EXISTS idx_replies_thread_created_at
  ON replies (thread_id, created_at ASC);


CREATE TABLE IF NOT EXISTS thread_reactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  thread_id INTEGER NOT NULL,

  user_id INTEGER NOT NULL,

  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  UNIQUE (thread_id, user_id),

  FOREIGN KEY (thread_id) REFERENCES threads(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_thread_reactions_thread
   ON thread_reactions (thread_id);