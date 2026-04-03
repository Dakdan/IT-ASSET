// app.js
const DISCOVERY_API = "https://script.google.com/macros/s/AKfycbxWen2TesZqgTrmFVOHmeiqRv9qZPZCgjHC93oSeWGIxoSubocHP7kDdgaz4xVSGie8/exec";
const TRANSACTION_API = "https://script.google.com/macros/s/AKfycbyoXfR15wrbTV0aTkuyl-JnzgaJLFeDPfT3xUebTdm2reo_k-Y3GSaAhHoqujhIihS8Jw/exec";

// ฟังก์ชันสแกน QR
const html5QrCode = new Html5Qrcode("reader");
// ... โค้ดสแกน QR ทั้งหมด ...

// ฟังก์ชันค้นหา
async function handleSearch(query) {
    const res = await fetch(`${DISCOVERY_API}?action=search&query=${query}`);
    const data = await res.json();
    showDetail(data[0]);
}

// ฟังก์ชันบันทึก
async function submitSurvey() {
    const payload = { /* ข้อมูลที่จะบันทึก */ };
    await fetch(TRANSACTION_API, {
        method: 'POST',
        body: JSON.stringify({ action: 'saveSurvey', data: payload })
    });
    alert("บันทึกเรียบร้อย!");
}
// app.js (ส่วน Login)
async function handleLogin() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    const msg = document.getElementById('loginMsg');

    // เรียกไปที่ Discovery API (ที่มี Auth.gs อยู่)
    const response = await fetch(DISCOVERY_API, {
        method: 'POST',
        body: JSON.stringify({
            action: 'login',
            email: email,
            password: pass
        })
    });

    const result = await response.json();

    if (result.status === 'success') {
        // บันทึกสถานะลง SessionStorage เพื่อให้รู้ว่า Login แล้ว
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userMail', result.userData.mail);
        sessionStorage.setItem('userName', result.userData.name);
        
        // ย้ายไปหน้าหลัก
        window.location.href = 'index.html'; 
    } else {
        msg.innerText = "❌ " + result.message;
    }
}
function showDetail(asset) {
    const content = document.getElementById('detailContent');
    content.innerHTML = `
        <div class="mb-4">
            <img src="${asset.imageUrl}" class="w-full h-48 object-cover rounded-lg shadow" 
                 onerror="this.src='https://via.placeholder.com/150?text=No+Image'">
        </div>
        <p><b>รหัสครุภัณฑ์:</b> ${asset.AssetID}</p>
        ...
    `;
}
async function getLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject("Browser ของคุณไม่รองรับ GPS");
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    resolve(`${lat},${lng}`);
                },
                (err) => reject("กรุณาเปิดตำแหน่ง GPS บนมือถือ")
            );
        }
    });
}

// ปรับปรุงฟังก์ชันบันทึก
async function submitSurvey() {
    try {
        const gpsCoords = await getLocation(); // ดึง GPS ก่อนบันทึก
        
        const payload = {
            action: 'saveSurvey',
            data: {
                Asset_ID: document.getElementById('currentAssetID').value,
                Asset_Gps: gpsCoords, // ส่งพิกัดไปเก็บใน ASSET_LOGS
                // ... ข้อมูลอื่นๆ ...
            }
        };
        // ... ส่ง fetch ไป Transaction API ...
    } catch (error) {
        alert(error);
    }
}
