// ฟังก์ชันเช็คสิทธิ์ (วางไว้บนสุดของทุกหน้า)
(function() {
    const userData = localStorage.getItem('currentUser');
    
    if (!userData) {
        // ถ้าไม่มีข้อมูลการ Login ให้เด้งกลับหน้า Login ทันที
        alert("กรุณาเข้าสู่ระบบก่อนใช้งาน");
        window.location.href = "index.html"; 
    } else {
        // ถ้ามีข้อมูล ให้ดึงออกมาใช้งาน
        window.user = JSON.parse(userData);
        console.log("Welcome:", window.user.UserName);
    }
})();

// ฟังก์ชันออกจากระบบ
function logout() {
    if(confirm("คุณต้องการออกจากระบบใช่หรือไม่?")) {
        localStorage.removeItem('currentUser');
        window.location.href = "index.html";
    }
}
