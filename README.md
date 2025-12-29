<div align="center">

# 📦 StoreIt

### Modern Cloud Storage & File Management Platform

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-4.1-38bdf8?style=for-the-badge&logo=tailwind-css" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Appwrite-20.3-f02e65?style=for-the-badge&logo=appwrite" alt="Appwrite" />
</p>

**A sleek, powerful cloud storage solution built with cutting-edge web technologies**

[🚀 Demo](#demo) • [✨ Features](#features) • [🛠️ Tech Stack](#tech-stack) • [📦 Installation](#installation)

</div>

---

## 🎯 Overview

**StoreIt** is a modern, full-featured cloud storage platform that enables users to upload, manage, and share files seamlessly. Built with Next.js 16 and powered by Appwrite, it offers a beautiful, responsive interface with real-time updates and secure file management.

## ✨ Features

### 🔐 Authentication & Security

- **Email OTP Authentication** - Passwordless login with secure one-time passwords
- **Session Management** - Persistent user sessions with HTTP-only cookies
- **Protected Routes** - Server-side authentication checks

### 📁 File Management

- **Drag & Drop Upload** - Intuitive file upload with react-dropzone
- **Multi-format Support** - Documents, images, videos, audio files
- **File Preview** - Smart thumbnails for all file types
- **Rename Files** - Edit file names while preserving extensions
- **File Details** - View comprehensive file metadata
- **Download Files** - Direct download with constructed URLs
- **Delete Files** - Secure file deletion with confirmation

### 🎨 User Interface

- **Modern Design** - Clean, minimal interface with smooth animations
- **Responsive Layout** - Optimized for desktop, tablet, and mobile
- **Dark Mode Ready** - Theme support with next-themes
- **Interactive Cards** - Hover effects and smooth transitions
- **Toast Notifications** - User feedback with Sonner
- **Loading States** - Visual feedback during operations

### 👥 User Experience

- **Personal Dashboard** - Overview of your storage and files
- **File Categorization** - Organize by type (Documents, Images, Media, Others)
- **Search Functionality** - Quick file search across your storage
- **Owner Attribution** - See who uploaded each file
- **File Sharing** - Share files with other users (coming soon)
- **Storage Analytics** - Track your storage usage

### 🎭 Advanced Features

- **Real-time Updates** - Instant UI updates with revalidation
- **Optimistic UI** - Fast interactions with background sync
- **Error Handling** - Graceful error messages and recovery
- **File Type Detection** - Automatic file type and extension recognition
- **Size Formatting** - Human-readable file size display
- **Date Formatting** - Friendly timestamp display

---

## 🛠️ Tech Stack

### Frontend

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first styling
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### Backend & Database

- **[Appwrite](https://appwrite.io/)** - Backend-as-a-Service platform
  - Authentication with email OTP
  - Database for file metadata
  - Storage for file uploads
  - Server-side SDK

### Form & Validation

- **[React Hook Form](https://react-hook-form.com/)** - Performant form management
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[Hookform Resolvers](https://github.com/react-hook-form/resolvers)** - Zod integration

### UI Components

- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[React Dropzone](https://react-dropzone.js.org/)** - Drag & drop file uploads
- **[Input OTP](https://input-otp.rodz.dev/)** - OTP input component
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[CVA](https://cva.style/)** - Class variance authority for component variants

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[Tailwind Animate](https://github.com/jamiebuilds/tailwindcss-animate)** - Animation utilities

---

## 📦 Installation

### Prerequisites

- Node.js 20+ installed
- npm or yarn package manager
- Appwrite instance (cloud or self-hosted)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/storeit.git
cd storeit
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=your_project_id
NEXT_APPWRITE_KEY=your_api_key

# Database IDs
NEXT_PUBLIC_APPWRITE_DATABASE=your_database_id
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=your_users_collection_id
NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=your_files_collection_id

# Storage
NEXT_PUBLIC_APPWRITE_BUCKET=your_bucket_id
```

### 4. Setup Appwrite

#### Create Collections

**Users Collection:**

```json
{
  "fullName": "string",
  "email": "string",
  "avatar": "string",
  "accountId": "string"
}
```

**Files Collection:**

```json
{
  "type": "string",
  "fileType": "string",
  "fileName": "string",
  "url": "string",
  "fileSize": "integer",
  "owner": "string",
  "accountId": "string",
  "bucketFileId": "string",
  "uploadDate": "string",
  "uploadedByUserId": "integer",
  "filePath": "string",
  "extension": "string"
}
```

#### Create Storage Bucket

- Create a bucket for file storage
- Set appropriate permissions (read/write for authenticated users)
- Configure file size limits as needed

### 5. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎨 Project Structure

```
storeit/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (roots)/                  # Protected routes
│   │   ├── page.tsx              # Dashboard
│   │   └── [type]/               # File type pages
│   ├── globals.css               # Global styles
│   └── layout.tsx                # Root layout
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── ActionDropDown.tsx        # File actions menu
│   ├── AuthForm.tsx              # Authentication form
│   ├── Card.tsx                  # File card component
│   ├── FileUploader.tsx          # File upload component
│   ├── Header.tsx                # Page header
│   ├── MobileNavigation.tsx      # Mobile nav
│   ├── OtpModal.tsx              # OTP verification
│   ├── Search.tsx                # Search component
│   ├── Sidebar.tsx               # Desktop sidebar
│   └── Thumbnail.tsx             # File thumbnail
├── lib/                          # Utilities & actions
│   ├── actions/                  # Server actions
│   │   ├── files.action.ts       # File operations
│   │   └── user.action.ts        # User operations
│   ├── appwrite/                 # Appwrite config
│   │   ├── config.ts
│   │   └── index.ts
│   └── utils.ts                  # Helper functions
├── constants/                    # App constants
│   └── index.ts
├── types/                        # TypeScript types
│   └── index.d.ts
└── public/                       # Static assets
    └── assets/
        ├── icons/
        └── images/
```

---

## 🚀 Usage

### Sign Up / Sign In

1. Navigate to the sign-up page
2. Enter your full name and email
3. Receive OTP via email
4. Enter the 6-digit OTP code
5. Access your dashboard

### Upload Files

1. Click the upload button or drag files
2. Select files from your device
3. Files are automatically uploaded and processed
4. View uploaded files in your dashboard

### Manage Files

- **View**: Click on any file card to view details
- **Rename**: Use the dropdown menu to rename files
- **Download**: Click download to save files locally
- **Delete**: Remove files with confirmation
- **Share**: Share files with other users (coming soon)

### Organize Files

- Navigate to **Documents** for PDFs, DOCs, etc.
- Go to **Images** for photos and graphics
- Visit **Media** for videos and audio
- Check **Others** for miscellaneous files

---

## 🎯 Key Features Breakdown

### File Upload System

```typescript
// Drag & drop with validation
- Max file size: 50MB
- Multiple file support
- Progress indication
- Error handling
- Automatic categorization
```

### Authentication Flow

```typescript
// OTP-based authentication
1. Email collection
2. OTP generation & email
3. OTP verification
4. Session creation
5. Protected route access
```

### File Management

```typescript
// CRUD operations
- Create: Upload new files
- Read: View file details
- Update: Rename files
- Delete: Remove files
```

---

## 🔒 Security Features

- ✅ Server-side authentication validation
- ✅ HTTP-only session cookies
- ✅ Protected API routes
- ✅ File access control per user
- ✅ Secure file URLs with tokens
- ✅ Input validation with Zod
- ✅ SQL injection prevention
- ✅ XSS protection

---

## 🎨 Design Philosophy

- **Minimalist**: Clean, distraction-free interface
- **Modern**: Latest design trends and patterns
- **Accessible**: ARIA-compliant components
- **Responsive**: Mobile-first approach
- **Fast**: Optimized performance
- **Intuitive**: Self-explanatory UX

---

## 🚧 Roadmap

- [ ] File sharing with multiple users
- [ ] Folder organization
- [ ] File versioning
- [ ] Advanced search filters
- [ ] Storage quota management
- [ ] Collaborative features
- [ ] Public file links
- [ ] File preview for more formats
- [ ] Batch operations
- [ ] Activity logs

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org/) for the amazing framework
- [Appwrite](https://appwrite.io/) for the backend infrastructure
- [shadcn](https://twitter.com/shadcn) for the beautiful UI components
- [Vercel](https://vercel.com/) for hosting solutions
- The open-source community for inspiration

---

<div align="center">

### ⭐ Star this repo if you find it useful!

Made with ❤️ and ☕

</div>
