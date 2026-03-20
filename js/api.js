/**
 * ============================================================
 * API CONFIGURATION & CORE ENGINE
 * ============================================================
 */
const API_URL = "https://script.google.com/macros/s/AKfycbwml8efHi7YGiLFgBPFJcdVqOFxqEFYvGd6lz-neZIXevaemNaYwXwsPlF91VqfeUlm/exec";

/**
 * ฟังก์ชันจัดการแสดง/ซ่อน Loading Overlay 
 * อ้างอิงตาม class .loading-overlay ใน CSS กลาง
 */
function showLoading(isVisible) {
  const loader = document.querySelector('.loading-overlay');
  if (loader) {
    if (isVisible) {
      loader.classList.add('show');
    } else {
      loader.classList.remove('show');
    }
  }
}

/**
 * GET API Method
 */
async function api(action, params = {}) {
  try {
    showLoading(true);

    const url = new URL(API_URL);
    url.searchParams.append("action", action);

    Object.keys(params).forEach(k => {
      if (params[k] !== undefined && params[k] !== null) {
        url.searchParams.append(k, params[k]);
      }
    });

    const res = await fetch(url);
    if (!res.ok) throw new Error("HTTP ERROR: " + res.status);

    const json = await res.json();

    // ตรวจสอบโครงสร้าง safeResponse {status: "success", data: ...}
    if (json.status === "success") {
      return json.data;
    }
    return json;

  } catch (err) {
    console.error("API GET ERROR:", err);
    // ใช้ Style การแจ้งเตือนที่เหมาะสม (เช่น Swal หรือ alert)
    return { status: "error", message: err.toString() };
  } finally {
    showLoading(false);
  }
}

/**
 * POST API Method
 */
async function apiPost(action, data = {}) {
  try {
    showLoading(true);

    const res = await fetch(API_URL, {
      method: "POST",
      // หมายเหตุ: Apps Script ไม่รองรับ preflight OPTIONS ในบางกรณี 
      // การใช้ fetch แบบธรรมดา (no-cors) อาจมีข้อจำกัดเรื่องการอ่าน Response 
      // แต่โครงสร้างนี้ใช้สำหรับ Web App ที่ Deploy เป็น Public (Anyone)
      body: JSON.stringify({
        action,
        ...data
      })
    });

    if (!res.ok) throw new Error("HTTP ERROR: " + res.status);

    const json = await res.json();

    if (json.status === "success") {
      return json.data;
    }
    return json;

  } catch (err) {
    console.error("API POST ERROR:", err);
    return { status: "error", message: err.toString() };
  } finally {
    showLoading(false);
  }
}

/**
 * ============================================================
 * FUNCTIONS FOR ASSET SURVEY SYSTEM
 * ============================================================
 */

/**
 * 1. ดึงข้อมูลหน่วยงานตาม ID (Get Dept Info)
 * @param {string} deptId 
 */
async function getDeptInfo(deptId) {
  return await api("getDeptInfo", { deptId: deptId });
}

/**
 * 2. ค้นหาครุภัณฑ์ในระบบ (Search Asset)
 * @param {string} query เลขครุภัณฑ์
 */
async function searchAssets(query) {
  return await api("searchAssets", { query: query });
}

/**
 * 3. บันทึกข้อมูลการสำรวจ (Save Survey)
 * @param {object} surveyData { deptId, deptName, assets:[], newAssets:[] }
 */
async function saveAssetSurvey(surveyData) {
  return await apiPost("saveSurvey", surveyData);
}

/**
 * 4. อัปโหลดลายเซ็น (Upload Signature)
 * @param {string} activityId 
 * @param {string} base64Image จาก canvas.toDataURL()
 */
async function uploadSignatureImage(activityId, base64Image) {
  return await apiPost("uploadSignature", {
    activityId: activityId,
    image: base64Image
  });
}

/**
 * 5. ยืนยันการสำรวจและบันทึกข้อมูลลง Sheet (Confirm Survey)
 * @param {string} activityId 
 * @param {string} signerName ชื่อผู้ลงนาม
 * @param {string} signatureUrl ลิงก์รูปภาพจาก Google Drive
 */
async function confirmSurveyResult(activityId, signerName, signatureUrl) {
  return await apiPost("confirmSurvey", {
    activityId: activityId,
    signer: signerName,
    signature: signatureUrl
  });
}

/**
 * 6. ดึงข้อมูลรายละเอียดการสำรวจ (Get Survey Detail)
 * @param {string} activityId 
 */
async function getSurveyDetail(activityId) {
  return await api("getSurveyDetail", { activityId: activityId });
}
// js/api.js

async function searchAssets(query) {
  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler(reject)
      .searchAssets(query); // เรียกชื่อฟังก์ชันใน Code.gs ของคุณเป๊ะๆ
  });
}
