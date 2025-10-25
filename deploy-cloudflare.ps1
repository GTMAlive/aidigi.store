# Cloudflare Deployment Script for PromptMarket
# Run this script to deploy your site to Cloudflare Pages

Write-Host "🚀 PromptMarket - Cloudflare Deployment Script" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "📦 Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if npm is available
try {
    $npmVersion = npm --version
    Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not found. Please reinstall Node.js." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📋 Deployment Steps:" -ForegroundColor Cyan
Write-Host "1. Authenticate with Cloudflare"
Write-Host "2. Create D1 Database"
Write-Host "3. Create R2 Bucket"
Write-Host "4. Build Project"
Write-Host "5. Deploy to Cloudflare Pages"
Write-Host ""

# Step 1: Authenticate
Write-Host "🔐 Step 1: Authenticating with Cloudflare..." -ForegroundColor Yellow
Write-Host "This will open a browser window for authentication." -ForegroundColor Gray
$auth = Read-Host "Press Enter to continue or 's' to skip if already authenticated"
if ($auth -ne 's') {
    npx wrangler login
}

Write-Host ""

# Step 2: Create D1 Database
Write-Host "🗄️ Step 2: Creating D1 Database..." -ForegroundColor Yellow
$createDb = Read-Host "Do you want to create a new D1 database? (y/n/s to skip)"
if ($createDb -eq 'y') {
    Write-Host "Creating database 'promptmarket-db'..." -ForegroundColor Gray
    npx wrangler d1 create promptmarket-db
    Write-Host ""
    Write-Host "⚠️ IMPORTANT: Copy the database_id from above and update wrangler.toml!" -ForegroundColor Red
    Write-Host "Press Enter after updating wrangler.toml..." -ForegroundColor Yellow
    Read-Host
    
    # Run migrations
    Write-Host "Running database migrations..." -ForegroundColor Gray
    npx wrangler d1 execute promptmarket-db --file=./database/schema.sql --remote
    Write-Host "✅ Database created and migrated!" -ForegroundColor Green
}

Write-Host ""

# Step 3: Create R2 Bucket
Write-Host "📁 Step 3: Creating R2 Bucket..." -ForegroundColor Yellow
$createBucket = Read-Host "Do you want to create R2 bucket? (y/n/s to skip)"
if ($createBucket -eq 'y') {
    Write-Host "Creating bucket 'promptmarket-files'..." -ForegroundColor Gray
    npx wrangler r2 bucket create promptmarket-files
    Write-Host "✅ R2 bucket created!" -ForegroundColor Green
}

Write-Host ""

# Step 4: Install Dependencies
Write-Host "📦 Step 4: Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""

# Step 5: Build Project
Write-Host "🔨 Step 5: Building project..." -ForegroundColor Yellow
npm run build

Write-Host ""

# Step 6: Deploy
Write-Host "🚀 Step 6: Deploying to Cloudflare Pages..." -ForegroundColor Yellow
Write-Host "Choose deployment method:" -ForegroundColor Gray
Write-Host "1. Deploy via GitHub (Recommended - Auto deployments)"
Write-Host "2. Deploy directly via CLI (Manual deployments)"
$deployMethod = Read-Host "Enter choice (1/2)"

if ($deployMethod -eq '1') {
    Write-Host ""
    Write-Host "GitHub Deployment Instructions:" -ForegroundColor Cyan
    Write-Host "1. Push your code to GitHub" -ForegroundColor White
    Write-Host "2. Go to https://dash.cloudflare.com/" -ForegroundColor White
    Write-Host "3. Click 'Pages' → 'Create a project' → 'Connect to Git'" -ForegroundColor White
    Write-Host "4. Select your repository" -ForegroundColor White
    Write-Host "5. Configure build settings:" -ForegroundColor White
    Write-Host "   - Framework: Next.js" -ForegroundColor Gray
    Write-Host "   - Build command: npm run build" -ForegroundColor Gray
    Write-Host "   - Build output: .next" -ForegroundColor Gray
    Write-Host "6. Add environment variables (see .env.example)" -ForegroundColor White
    Write-Host "7. Bind D1 database and R2 bucket in Settings → Functions" -ForegroundColor White
    Write-Host "8. Click 'Save and Deploy'" -ForegroundColor White
} else {
    Write-Host "Deploying via CLI..." -ForegroundColor Gray
    $projectName = Read-Host "Enter project name (default: promptmarket)"
    if ([string]::IsNullOrWhiteSpace($projectName)) {
        $projectName = "promptmarket"
    }
    npx wrangler pages deploy .next --project-name=$projectName
}

Write-Host ""
Write-Host "✅ Deployment process completed!" -ForegroundColor Green
Write-Host ""
Write-Host "⚠️ Next Steps:" -ForegroundColor Yellow
Write-Host "1. Set environment variables in Cloudflare Dashboard" -ForegroundColor White
Write-Host "2. Bind D1 database (DB) and R2 bucket (STORAGE)" -ForegroundColor White
Write-Host "3. Configure Razorpay webhook URL" -ForegroundColor White
Write-Host "4. Test your deployment" -ForegroundColor White
Write-Host "5. Set up custom domain (optional)" -ForegroundColor White
Write-Host ""
Write-Host "📚 See CLOUDFLARE-DEPLOYMENT-GUIDE.md for detailed instructions" -ForegroundColor Cyan
Write-Host ""
Write-Host "🎉 Happy deploying!" -ForegroundColor Green
