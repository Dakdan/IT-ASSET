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
