


CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    slug TEXT NOT NULL UNIQUE,

    name TEXT NOT NULL,

    description TEXT
);


CREATE TABLE IF NOT EXISTS threads (
   id INTEGER PRIMARY KEY AUTOINCREMENT,

   category_id INTEGER NOT NULL,

   author_user_id INTEGER NOT NULL,

   title TEXT NOT NULL,
   body TEXT NOT NULL,

   created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

   FOREIGN KEY (category_id) REFERENCES categories(id),
   FOREIGN KEY (author_user_id) REFERENCES users(id)
);

CREATE TRIGGER IF NOT EXISTS update_threads_timestamp 
AFTER UPDATE ON threads 
FOR EACH ROW 
BEGIN
    UPDATE threads SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;


CREATE INDEX IF NOT EXISTS idx_threads_category_created_at
   ON threads (category_id, created_at DESC);


INSERT OR IGNORE INTO categories (slug, name, description)
VALUES 
  ('general',  'General',  'Anything dev-related, off-topic but friendly.'),
  ('q-and-a',  'Q&A',      'Ask and answer coding and career questions.'),
  ('showcase', 'Showcase', 'Share what you are building or learning.'),
  ('help',     'Help',     'Stuck on something? Ask for help here.');