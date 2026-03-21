# Quick Start Guide - Borezy Lead Management System

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Environment Variables (Already Configured)
The `.env` file is already set up with your Firebase credentials. You're good to go!

### Step 3: Start Development Server
```bash
npm start
```

Your app will open at http://localhost:3000

## 📋 Default Login Credentials

Use your registered Firebase credentials to log in.

**First time user?**
- Contact your administrator for credentials
- Super Admin has full access
- Branch Managers can manage their branch
- Subusers have limited access

## 🎯 Key Features to Try

### 1. Dashboard Analytics
- Navigate to `/dashboard`
- View lead statistics and conversion rates
- Real-time data from Firebase

### 2. Lead Management
- Click "Add Lead" to create new leads
- Filter by status (Fresh, Demo Scheduled, Won, Lost)
- Search by business name, email, phone, etc.
- Export leads to CSV

### 3. Branch Management (Super Admin Only)
- Create new branches
- Set subscription dates
- Monitor branch expiration
- Manage user limits

### 4. User Management
- Add users to branches
- Edit user permissions
- Track user activity

## 🔧 Common Tasks

### Adding a New Lead
1. Go to Leads section
2. Click "Add Lead" or "Create Lead"
3. Fill in the form:
   - Business Name
   - Contact Details
   - Status
   - Follow-up date
4. Submit

### Creating a Branch (Super Admin)
1. Navigate to Branches
2. Click "Add Branch"
3. Enter branch details:
   - Branch Name & Code
   - Owner Information
   - Subscription Dates
   - User Limit
4. Submit

### Managing Users
1. Access User Dashboard
2. Add/Edit users
3. Set permissions
4. Monitor activity

## 🎨 New Features Overview

### Toast Notifications
You'll see notifications for:
- ✅ Successful actions
- ❌ Errors
- ⚠️ Warnings
- ℹ️ Information

### Protected Routes
All pages are now protected. If you're not logged in, you'll be redirected automatically.

### Role-Based Access
Some features are restricted based on your role:
- **Super Admin**: Full access
- **Branch Manager**: Branch management
- **Subuser**: Limited access

### Error Handling
If something goes wrong, you'll see a friendly error message instead of a broken page.

## 🐛 Troubleshooting

### App won't start?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Firebase connection issues?
- Check your internet connection
- Verify Firebase project is active
- Check console for specific errors

### Login not working?
- Verify email and password
- Check if account is active
- Contact administrator if branch is expired

## 📱 Keyboard Shortcuts

- `Ctrl + K` - Quick search (coming soon)
- `Esc` - Close modals/sidebars

## 💡 Tips

1. **Use filters** - Quickly find leads by status or date
2. **Export regularly** - Backup your data using CSV export
3. **Set follow-ups** - Never miss a follow-up date
4. **Monitor dashboard** - Keep track of conversion rates
5. **Use search** - Find anything quickly with advanced search

## 🆘 Getting Help

### In the App
- Click "Forgot Password?" on login page
- Check toast notifications for feedback
- Look for helper text under form fields

### Documentation
- See `README.md` for detailed information
- Check `UPDATES.md` for recent changes
- Review code comments

### Contact
- Administrator: [Your admin contact]
- Support: [Support email]

## 🎯 Next Steps

Once you're comfortable with the basics:

1. **Explore Analytics**
   - Check dashboard for insights
   - Monitor conversion rates
   - Track team performance

2. **Customize Workflow**
   - Set up email templates
   - Configure notifications
   - Create custom filters

3. **Advanced Features**
   - Import/export data
   - Generate reports
   - Manage multiple branches

## ⚡ Performance Tips

- Use filters to reduce data load
- Clear browser cache if app feels slow
- Close unused tabs
- Use modern browsers (Chrome, Firefox, Edge)

## 🔐 Security Reminders

- Never share your password
- Logout when done (especially on shared computers)
- Report suspicious activity
- Keep your email secure

---

**Happy Managing! 🎉**

For detailed documentation, see README.md
