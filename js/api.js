const API_URL = "https://script.google.com/macros/s/AKfycbwml8efHi7YGiLFgBPFJcdVqOFxqEFYvGd6lz-neZIXevaemNaYwXwsPlF91VqfeUlm/exec";

/**
 * =========================
 * GET API
 * =========================
 * ใช้เรียกข้อมูลทั่วไป
 * เช่น:
 * api('getDepartmentsFast')
 * api('searchAssetsSafe', { query: '123' })
 */
async function api(action, params = {}) {
  try {
    showLoading(true);

    const url = new URL(API_URL);
    url.searchParams.append("action", action);

    // เพิ่ม params
    Object.keys(params).forEach(k => {
      if (params[k] !== undefined && params[k] !== null) {
        url.searchParams.append(k, params[k]);
      }
    });

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("HTTP ERROR: " + res.status);
    }

    const json = await res.json();

    return json;

  } catch (err) {
    console.error("API ERROR:", err);
    alert("เกิดข้อผิดพลาดในการเชื่อมต่อ API");
    return { error: err.toString() };
  } finally {
    showLoading(false);
  }
}

/**
 * =========================
 * POST API
 * =========================
 * ใช้ส่งข้อมูล
 * เช่น:
 * apiPost('saveSurvey', { deptId: '001', assets: [] })
 */
async function apiPost(action, data = {}) {
  try {
    showLoading(true);

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

    if (!res.ok) {
      throw new Error("HTTP ERROR: " + res.status);
    }

    const json = await res.json();

    return json;

  } catch (err) {
    console.error("API POST ERROR:", err);
    alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
    return { error: err.toString() };
  } finally {
    showLoading(false);
  }
}

/**
 * =========================
 * HELPER (OPTIONAL)
 * =========================
 */

// ดึงข้อมูลให้รองรับทั้ง {data:[]} และ []
function getData(res) {
  return res?.data || res || [];
}

// เช็ค success
function isSuccess(res) {
  return res && (res.status === "success" || !res.error);
}
