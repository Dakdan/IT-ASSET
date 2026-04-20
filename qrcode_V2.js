function renderSuccessSlip(actionId) {
    const deptId = document.getElementById('selectedDeptId').value;
    const deptName = document.getElementById('displayDeptName').innerText;
    const detailBox = document.getElementById('successDetailList');
    
    // สร้าง URL สำหรับ QR Code
    const targetUrl = `https://your-domain.github.io/dept_detail.html?ID=${deptId}`;
    const qrImageUrl = `https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=${encodeURIComponent(targetUrl)}&choe=UTF-8`;

    detailBox.innerHTML = `
        <div class="flex flex-col items-center mb-4">
            <img src="${qrImageUrl}" class="w-32 h-32 border p-2 bg-white rounded-xl shadow-sm mb-2">
            <p class="text-[9px] text-gray-400 font-bold">SCAN TO VIEW DEPARTMENT ASSETS</p>
        </div>
        <div class="space-y-1 border-t pt-3">
            <div class="flex justify-between text-xs"><span class="text-gray-400">หน่วยงาน:</span> <span class="font-bold text-gray-700">${deptName}</span></div>
            <div class="flex justify-between text-xs"><span class="text-gray-400">จำนวน:</span> <span class="font-bold text-gray-700">${auditQueue.length} รายการ</span></div>
            <div class="flex justify-between text-xs"><span class="text-gray-400">Action ID:</span> <span class="font-bold text-pink-500">${actionId}</span></div>
        </div>
    `;

    // เปลี่ยนหัวข้อตามโหมด
    document.getElementById('successStatusTitle').innerText = submitMode === 'DRAFT' ? "บันทึกฉบับร่างแล้ว" : "บันทึกสำเร็จ!";
    
    document.getElementById('successModal').classList.remove('hidden');
    
    // ล้างคิวเมื่อเสร็จสิ้น
    auditQueue = []; 
    updateQueueUI();
}
}
