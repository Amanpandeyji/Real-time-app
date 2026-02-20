# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-02-20

### Added
- Full-stack realtime threads and chat application
- Custom JWT authentication system
- Real-time messaging with Socket.IO
- Thread creation and discussion functionality
- User profiles with avatars
- Notification system
- Like and reply features
- File upload support
- SQLite database integration
- TypeScript across entire stack
- Next.js frontend with shadcn/ui components
- Express backend with modular architecture

### Removed
- Clerk third-party authentication
- Cloudinary cloud storage
- PostgreSQL/MySQL dependencies

### Changed
- Migrated from PostgreSQL to SQLite
- Implemented custom authentication replacing Clerk
- Local file storage replacing Cloudinary

### Security
- Bcrypt password hashing with 10 salt rounds
- JWT tokens with 7-day expiration
- Protected API routes
- Input validation and sanitization
- SQL injection prevention via parameterized queries

## [0.1.0] - Initial Development

### In Progress
- Core application structure
- Basic CRUD operations
- Initial UI design
