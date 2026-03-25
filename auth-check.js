// 1. ตรวจสอบสิทธิ์ทันที
(function() {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
        window.location.href = "https://dakdan.github.io/it_login/"; 
    } else {
        window.user = JSON.parse(userData);
    }
})();

// 2. ฟังก์ชันแสดง Modal (ต้องมี Modal HTML ในหน้านั้นๆ ด้วย)
function showAlert(title, msg, type) {
    const modalElement = document.getElementById('alertModal');
    if (!modalElement) return; // กัน Error ถ้าหน้านั้นไม่มี Modal
    const modal = new bootstrap.Modal(modalElement);
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalMsg').innerText = msg;
    document.getElementById('modalIcon').innerHTML = (type === 'success') ? '🌸' : '❌';
    modal.show();
}

// 3. ฟังก์ชันออกจากระบบ
function logout() {
    if(confirm("คุณต้องการออกจากระบบใช่หรือไม่?")) {
        localStorage.removeItem('currentUser');
        window.location.href = "asset_survey_demo.html";
    }
}
