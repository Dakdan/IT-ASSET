// 🔗 เปลี่ยนเป็น Web App URL ของคุณ

// 🔗 เปลี่ยนเป็น Web App URL ของคุณ
const API_URL = "https://script.google.com/macros/s/AKfycbzhlc0yAeCjPvX6uwtXyFPxQWFk2llo-Yc7KWIsFkXGbl3EtAUjMZPY38TN4Hi2SoI/exec";

// ===============================
// ⏱️ timeout กัน request ค้าง
// ===============================
function fetchWithTimeout(url, options = {}, timeout = 15000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), timeout)
    )
  ]);
}


// ===============================
// 📥 GET (อ่านข้อมูล)
// ===============================
async function apiGet(action, params = {}) {
  try {
    const query = new URLSearchParams({
      action,
      ...params
    });

    const url = `${API_URL}?${query}`;

    console.log("GET:", url);

    const res = await fetchWithTimeout(url);

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    if (data?.error) {
      throw new Error(data.error);
    }

    return data;

  } catch (err) {
    console.error("apiGet error:", err.message);
    showError("โหลดข้อมูลไม่สำเร็จ");
    return null;
  }
}


// ===============================
// 📤 POST (เขียนข้อมูล)
// ===============================
async function apiPost(body) {
  try {
    console.log("POST:", body);

    const res = await fetchWithTimeout(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    if (data?.error) {
      throw new Error(data.error);
    }

    return data;

  } catch (err) {
    console.error("apiPost error:", err.message);
    showError("บันทึกข้อมูลไม่สำเร็จ");
    return null;
  }
}


// ===============================
// 🔁 retry (กันเน็ตแกว่ง)
// ===============================
async function retry(fn, times = 2) {
  for (let i = 0; i <= times; i++) {
    const res = await fn();
    if (res) return res;
  }
  return null;
}


// ===============================
// ⚠️ แสดง error (ปรับ UI ได้)
// ===============================
function showError(msg) {
  alert(msg);
}


// ===============================
// 🔄 Loading helper (optional)
// ===============================
function showLoading() {
  document.body.classList.add("loading");
}

function hideLoading() {
  document.body.classList.remove("loading");
}

function hideLoading() {
  document.body.classList.remove("loading");
}
