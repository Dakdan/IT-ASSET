const API_URL = "https://script.google.com/macros/s/AKfycbwml8efHi7YGiLFgBPFJcdVqOFxqEFYvGd6lz-neZIXevaemNaYwXwsPlF91VqfeUlm/exec";

/**
 * =========================
 * GET API
 * =========================
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

    if (!res.ok) {
      throw new Error("HTTP ERROR: " + res.status);
    }

    const json = await res.json();

    // 🔥 แก้ตรงนี้
    if (json.status === "success") {
      return json.data;
    }

    return json;

  } catch (err) {
    console.error("API ERROR:", err);
    alert("เกิดข้อผิดพลาดในการเชื่อมต่อ API");
    return null;
  } finally {
    showLoading(false);
  }
}

/**
 * =========================
 * POST API
 * =========================
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

    // 🔥 รองรับ safeResponse ด้วย (เผื่อใช้ในอนาคต)
    if (json.status === "success") {
      return json.data;
    }

    return json;

  } catch (err) {
    console.error("API POST ERROR:", err);
    alert("เกิดข้อผิดพลาดในการส่งข้อมูล");
    return null;
  } finally {
    showLoading(false);
  }
}
/**
 * ============================================================
 * ฟังก์ชันเพิ่มเติมสำหรับระบบ Survey
 * ============================================================
 */

/**
 * 1. ฟังก์ชันบันทึกข้อมูลการสำรวจ (Save Survey)
 * ส่งข้อมูล Assets และ DEPT_ID ไปที่ Backend
 */
async function saveAssetSurvey(surveyData) {
  // surveyData ประกอบด้วย deptId, deptName, assets[], newAssets[]
  return await apiPost("saveSurvey", surveyData);
}

/**
 * 2. ฟังก์ชันอัปโหลดลายเซ็น (Upload Signature)
 * แปลง Canvas เป็น Base64 และส่งไปเก็บที่ Google Drive (Folder 1LIi...)
 */
async function uploadSignatureImage(activityId, base64Image) {
  return await apiPost("uploadSignature", {
    activityId: activityId,
    image: base64Image // ข้อมูลจาก canvas.toDataURL()
  });
}

/**
 * 3. ฟังก์ชันยืนยันการสำรวจ (Confirm Survey)
 * บันทึกชื่อผู้ตรวจและ Link รูปภาพลงใน Sheet Asset_On_Log
 */
async function confirmSurveyResult(activityId, signerName, signatureUrl) {
  return await apiPost("confirmSurvey", {
    activityId: activityId,
    signer: signerName,
    signature: signatureUrl
  });
}

/**
 * 4. ฟังก์ชันดึงข้อมูลหน่วยงานตาม ID (Get Dept Info)
 */
async function getDeptInfo(deptId) {
  return await api("getDeptInfo", { deptId: deptId });
}
