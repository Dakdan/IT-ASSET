
// 🔗 เปลี่ยนเป็น Web App URL ของคุณ

// 🔗 เปลี่ยนเป็น Web App URL ของคุณ
const API_URL="https://script.google.com/macros/s/AKfycbwml8efHi7YGiLFgBPFJcdVqOFxqEFYvGd6lz-neZIXevaemNaYwXwsPlF91VqfeUlm/exec"

async function api(action,params={}){
 showLoading(true)
 const url=new URL(API_URL)
 url.searchParams.append('action',action)
 Object.keys(params).forEach(k=>url.searchParams.append(k,params[k]))
 const res=await fetch(url)
 const j=await res.json()
 showLoading(false)
 return j
}

async function apiPost(action,data={}){
 showLoading(true)
 const res=await fetch(API_URL,{method:'POST',body:JSON.stringify({action,...data})})
 const j=await res.json()
 showLoading(false)
 return j
}


