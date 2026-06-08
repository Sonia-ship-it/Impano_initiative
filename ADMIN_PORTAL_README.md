# Admin Portal Documentation

## Access

**URL:** `http://localhost:3000/admin` (or your-domain.com/admin in production)

**Default Password:** `impano2024admin`

⚠️ **IMPORTANT:** Change this password in `src/app/admin/page.tsx` before deploying to production!

## Features

### 1. Secure Login
- Password-protected access portal
- Session-based authentication
- Clean, professional login interface

### 2. Gallery Management
- Upload images (JPG, PNG, GIF, etc.)
- Add YouTube videos by URL
- View all gallery items in a grid layout
- Delete items with confirmation
- Real-time updates

### 3. Admin Dashboard
- Modern, sidebar navigation
- Gallery manager interface
- Logout functionality
- Responsive design for all devices

## Usage

### Logging In
1. Navigate to `/admin`
2. Enter the password: `impano2024admin`
3. Click "Access Portal"

### Adding Images
1. Click "Add Media" button
2. Select "Image" type
3. Enter a title
4. Choose an image file from your computer
5. Click "Upload"

### Adding YouTube Videos
1. Click "Add Media" button
2. Select "YouTube Video" type
3. Enter a title
4. Paste the full YouTube URL (e.g., `https://www.youtube.com/watch?v=VIDEO_ID`)
5. Click "Upload"

### Deleting Items
1. Find the item in the gallery grid
2. Click the red delete (trash) icon
3. Confirm the deletion

## Technical Details

### File Storage
- Images are stored in `public/uploads/` directory
- YouTube videos are embedded using video IDs
- Gallery data is currently in-memory (resets on server restart)

### API Endpoints
- `GET /api/gallery` - Fetch all gallery items
- `POST /api/gallery` - Upload new item
- `DELETE /api/gallery/[id]` - Delete item

### For Production

#### 1. Change Password
Edit `src/app/admin/page.tsx`:
```typescript
if (password === "YOUR_SECURE_PASSWORD_HERE") {
    // ...
}
```

#### 2. Add Database
Currently uses in-memory storage. For production:
- Replace with PostgreSQL, MongoDB, or your preferred database
- Update API routes in `src/app/api/gallery/`
- Add proper authentication (JWT, NextAuth, etc.)

#### 3. Add Image Optimization
- Consider using cloud storage (AWS S3, Cloudinary, etc.)
- Add image compression/optimization
- Implement proper error handling

#### 4. Security Enhancements
- Implement proper user authentication
- Add CSRF protection
- Add rate limiting
- Validate file types and sizes
- Add admin user management

## File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx          # Admin portal UI
│   │   └── admin.module.css  # Admin styles
│   └── api/
│       └── gallery/
│           ├── route.ts       # Gallery CRUD operations
│           └── [id]/
│               └── route.ts   # Delete operation
└── components/
    └── Gallery.tsx            # Public gallery display
```

## Styling

The admin portal matches the Contact/Footer design vibes with:
- Geometric clip-paths and cut corners
- Glassmorphism effects
- Smooth animations
- Professional color scheme
- Outfit font family throughout

## Support

For issues or questions:
- Check browser console for errors
- Ensure uploads directory has write permissions
- Verify API routes are accessible
- Check network tab for failed requests

## Future Enhancements

Potential features to add:
- [ ] User role management (super admin, editor, viewer)
- [ ] Bulk upload
- [ ] Image editing/cropping
- [ ] Gallery categories/tags
- [ ] Analytics dashboard
- [ ] Donation tracking integration
- [ ] Email notifications
- [ ] Activity logs
