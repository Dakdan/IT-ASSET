// 🔗 เปลี่ยนเป็น Web App URL ของคุณ

// 🔗 เปลี่ยนเป็น Web App URL ของคุณ
const API_URL = "https://script.google.com/macros/s/AKfycbzhlc0yAeCjPvX6uwtXyFPxQWFk2llo-Yc7KWIsFkXGbl3EtAUjMZPY38TN4Hi2SoI/exec";

/* =========================
   GET
========================= */
async function apiGet(action, params = {}) {
  try {
    const query = new URLSearchParams({
      action,
      ...params
    }).toString();

    const res = await fetch(`${API_URL}?${query}`);
    return await res.json();

  } catch (err) {
    console.error("GET ERROR:", err);
    return { error: true };
  }
}

/* =========================
   POST
========================= */
async function apiPost(action, data = {}) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        action,
        ...data
      })
    });

    return await res.json();

  } catch (err) {
    console.error("POST ERROR:", err);
    return { error: true };
  }
}
