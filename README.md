# Borezy - Lead Management System

A comprehensive Lead Management System built with React and Firebase, designed to help businesses manage their leads, branches, and customer relationships effectively.

## 🚀 Features

### **Lead Management**
- Create, edit, and delete leads
- Track lead status (Fresh, Demo Scheduled, Details Shared, Demo Done, Won, Lost)
- Advanced search and filtering
- Import/Export leads via CSV
- Real-time lead tracking
- Follow-up reminders

### **Branch Management**
- Multi-branch support
- Branch subscription management
- Active/Inactive branch tracking
- Expiration alerts
- Branch performance analytics

### **User Management**
- Role-based access control (Super Admin, Branch Manager, Subuser)
- User authentication with Firebase
- Session management
- Password protection
- User activity tracking

### **Dashboard & Analytics**
- Real-time statistics
- Conversion rate tracking
- Lead distribution charts
- Performance metrics
- Interactive data visualization

### **Additional Features**
- Email notifications
- Responsive design
- Material-UI components
- Toast notifications
- Error boundaries
- Protected routes
- Session timeout management

## 🛠️ Tech Stack

- **Frontend:** React 18
- **UI Framework:** Material-UI (MUI)
- **Backend:** Firebase
  - Authentication
  - Firestore Database
  - Cloud Storage
- **Routing:** React Router v6
- **State Management:** React Context API
- **Charts:** Recharts
- **Email:** EmailJS
- **CSV Processing:** PapaParse
- **Notifications:** React Toastify

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- A Firebase account and project

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Borezy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your Firebase configuration:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key_here
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id_here
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
   REACT_APP_FIREBASE_APP_ID=your_app_id_here
   REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
   
   # Optional: Email services
   REACT_APP_EMAILJS_SERVICE_ID=your_emailjs_service_id_here
   REACT_APP_EMAILJS_TEMPLATE_ID=your_emailjs_template_id_here
   REACT_APP_EMAILJS_PUBLIC_KEY=your_emailjs_public_key_here
   ```

4. **Set up Firebase**
   
   a. Go to [Firebase Console](https://console.firebase.google.com/)
   
   b. Create a new project or select an existing one
   
   c. Enable Authentication (Email/Password)
   
   d. Create a Firestore database
   
   e. Copy your Firebase config to the `.env` file

5. **Start the development server**
   ```bash
   npm start
   ```

The application will open at [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### **Login**
- Use your registered email and password
- Super Admins have full access to all features
- Branch Managers can manage their branch
- Subusers have limited access based on permissions

### **Managing Leads**
1. Navigate to the Leads section
2. Click "Add Lead" to create a new lead
3. Fill in the required information
4. Track lead status and follow-ups
5. Update lead status as they progress through the sales funnel

### **Managing Branches** (Super Admin only)
1. Navigate to Branches
2. Click "Add Branch" to create a new branch
3. Set subscription dates and user limits
4. Monitor branch performance

### **User Management**
1. Access user management from the sidebar
2. Add new users to branches
3. Edit user permissions
4. Monitor user activity

## 🏗️ Project Structure

```
Borezy/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── assets/           # Images and static assets
│   ├── components/       # React components
│   │   ├── Admin/        # Admin dashboard components
│   │   ├── Auth/         # Authentication components
│   │   ├── Branch/       # Branch management
│   │   ├── Customize/    # Customization options
│   │   ├── Dashboard/    # Dashboard & analytics
│   │   ├── Leads/        # Lead management
│   │   ├── Log/          # Activity logs
│   │   ├── Product/      # Product management
│   │   ├── Profile/      # User profile
│   │   └── UserDashboard/# User dashboard
│   ├── utils/            # Utility functions
│   ├── App.js            # Main app component
│   ├── firebaseConfig.js # Firebase configuration
│   └── index.js          # Entry point
├── .env                  # Environment variables (DO NOT COMMIT)
├── .env.example          # Example environment file
└── package.json
```

## 🔐 Security Features

- **Environment Variables:** Sensitive data stored in `.env` (never commit this file)
- **Protected Routes:** Role-based access control
- **Session Management:** Automatic session timeout
- **Password Encryption:** Firebase handles password security
- **Input Validation:** Client-side validation before submission

## 🚢 Deployment

### **Build for Production**
```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### **Deploy to Firebase Hosting**

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Initialize Firebase:
   ```bash
   firebase init hosting
   ```

3. Deploy:
   ```bash
   firebase deploy
   ```

### **Deploy to Other Platforms**

The `build` folder can be deployed to any static hosting service:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Azure Static Web Apps

## 🧪 Testing

```bash
# Run tests
npm test

# Build production bundle
npm run build

# Eject from Create React App (ONE-WAY operation)
npm run eject
```

## 📊 Database Structure

### **Collections:**

- `superadmins` - Super administrator accounts
- `branches` - Branch information and subscriptions
- `subusers` - Subuser accounts
- `leads` - Lead records
- `products` - Product catalog
- `bookings` - Appointment bookings

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is proprietary software. All rights reserved.

## 👥 Support

For support, email your-admin@example.com or contact your system administrator.

## 🙏 Acknowledgments

- React team for the amazing framework
- Firebase for backend services
- Material-UI for beautiful components
- All contributors to this project

## 📞 Contact

For questions or support, please contact your system administrator.

---

**Built with ❤️ using React and Firebase**
