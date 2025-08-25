# TinyMCE API Key Setup

## Security Implementation

This application uses a secure method to handle the TinyMCE API key:

### 🔒 Security Features
- API key is stored in environment files, not hardcoded
- Placeholder `#$API_KEY_$#` is used in source code
- Automatic replacement script provided
- Environment files with real keys are git-ignored

### 🚀 Setup Instructions

1. **Get Your API Key**
   - Visit [TinyMCE Cloud](https://www.tiny.cloud/get-tiny/)
   - Sign up for a free account
   - Get your API key from the dashboard

2. **Set Up API Key (Option 1 - Automated)**
   ```bash
   node setup-api-key.js YOUR_ACTUAL_API_KEY_HERE
   ```

3. **Set Up API Key (Option 2 - Manual)**
   - Open `angular-app/src/environments/environment.ts`
   - Open `angular-app/src/environments/environment.prod.ts`
   - Replace `#$API_KEY_$#` with your actual API key

4. **Restart Development Server**
   ```bash
   npm run start
   ```

### 📁 File Structure
```
angular-app/src/environments/
├── environment.ts      # Development environment
└── environment.prod.ts # Production environment
```

### ⚠️ Security Notes
- **Never commit real API keys to version control**
- The placeholder `#$API_KEY_$#` is safe to commit
- Environment files are git-ignored when they contain real keys
- Each developer/deployment should set up their own API key

### 🔍 Verification
After setup, you should see:
- TinyMCE editor loads without "API key required" warnings
- Full editor functionality available
- No console errors related to TinyMCE licensing

### 🆓 Free Tier Limits
TinyMCE Cloud free tier includes:
- 1,000 editor loads per month
- All essential editing features
- Perfect for development and small projects