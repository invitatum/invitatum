# ==============================================================================
# INVITATUM - SETUP AKUN BARU (aidhilfirm@gmail.com)
# GitHub, Vercel, Firebase Firestore
# ==============================================================================

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " INVITATUM - INISIALISASI AKUN BARU: aidhilfirm@gmail.com " -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

# 1. GITHUB
Write-Host "[1/3] Konfigurasi GitHub untuk aidhilfirm@gmail.com..." -ForegroundColor Green
Write-Host "Jika akun GitHub aidhilfirm@gmail.com adalah akun baru:" -ForegroundColor Gray
Write-Host "Jalankan: gh auth login" -ForegroundColor White
Write-Host ""

# 2. VERCEL
Write-Host "[2/3] Konfigurasi Vercel untuk aidhilfirm@gmail.com..." -ForegroundColor Green
Write-Host "Jalankan perintah berikut untuk login ke Vercel via email baru:" -ForegroundColor Gray
Write-Host "vercel login aidhilfirm@gmail.com" -ForegroundColor White
Write-Host ""

# 3. FIREBASE
Write-Host "[3/3] Konfigurasi Firebase untuk aidhilfirm@gmail.com..." -ForegroundColor Green
Write-Host "Jalankan perintah berikut untuk menambahkan akun Google baru:" -ForegroundColor Gray
Write-Host "firebase login:add aidhilfirm@gmail.com" -ForegroundColor White
Write-Host ""

Write-Host "Setelah login selesai, jalankan perintah deploy otomatis:" -ForegroundColor Cyan
Write-Host "1. Push GitHub: gh repo create invitatum --public --source=. --remote=origin --push" -ForegroundColor Yellow
Write-Host "2. Deploy Vercel: vercel --prod" -ForegroundColor Yellow
Write-Host "3. Deploy Firebase: firebase deploy --only firestore,storage" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan
