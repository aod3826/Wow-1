<!DOCTYPE html>
<html lang="th">
<head>
  <base target="_top">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>ระบบจัดการพนักงาน</title>
  
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;600;700&display=swap" rel="stylesheet">
  
  <style>
    body { 
      font-family: 'Sarabun', sans-serif; 
      background-color: #f1f5f9; 
      overscroll-behavior-y: none; /* ป้องกันการเด้งของหน้าจอในมือถือ */
    }
    
    /* สไตล์ปุ่ม Tab หลัก */
    .tab-btn.active { 
      background-color: #0f172a; 
      color: white; 
      border-color: #0f172a; 
    }
    
    /* สไตล์ปุ่มเมนูย่อย (Active State) */
    .sub-btn.active { 
      background-color: #eff6ff; 
      color: #1d4ed8; 
      border-color: #3b82f6; 
      box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
    }

    /* Animation สำหรับการเปลี่ยนหน้า */
    .tab-content { display: none; }
    .tab-content.active { 
      display: block; 
      animation: fadeIn 0.4s ease-in-out; 
    }
    @keyframes fadeIn { 
      from { opacity: 0; transform: translateY(10px); } 
      to { opacity: 1; transform: translateY(0); } 
    }

    /* ซ่อน Scrollbar แต่ยังเลื่อนได้ */
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  </style>
</head>
<body>

  <div class="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50 flex justify-between items-center">
    <div class="flex items-center gap-3">
      <? var homeUrl = getAppUrl(); ?>
      <a href="<?= homeUrl ?>" class="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition shadow border border-slate-600 text-decoration-none">
        <i class="material-icons text-sm">home</i> <span class="text-sm font-bold">เมนูหลัก</span>
      </a>
      <div>
        <h1 class="text-lg font-bold text-blue-400 leading-tight">ระบบ HR</h1>
        <div class="text-[10px] text-slate-400">นิพนธ์ฟาร์ม</div>
      </div>
    </div>
  </div>

  <div class="flex bg-white shadow-sm sticky top-[68px] z-40 overflow-x-auto border-b border-slate-200 no-scrollbar">
    <button onclick="switchTab('tab1')" id="btn-tab1" class="tab-btn active flex-1 py-3 px-4 font-bold text-slate-600 border-b-4 border-transparent hover:bg-slate-50 transition whitespace-nowrap text-sm flex justify-center items-center gap-2">
      <i class="material-icons text-sm">people</i> ทะเบียนคน
    </button>
    <button onclick="switchTab('tab2')" id="btn-tab2" class="tab-btn flex-1 py-3 px-4 font-bold text-slate-600 border-b-4 border-transparent hover:bg-slate-50 transition whitespace-nowrap text-sm flex justify-center items-center gap-2">
      <i class="material-icons text-sm">badge</i> ส่วนตัว
    </button>
    <button onclick="switchTab('tab3')" id="btn-tab3" class="tab-btn flex-1 py-3 px-4 font-bold text-slate-600 border-b-4 border-transparent hover:bg-slate-50 transition whitespace-nowrap text-sm flex justify-center items-center gap-2">
      <i class="material-icons text-sm">admin_panel_settings</i> อนุมัติ/จ่าย
    </button>
  </div>

  <div class="max-w-4xl mx-auto p-4 pb-32">

    <div id="tab1" class="tab-content active">
      <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <h2 class="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
          <i class="material-icons text-blue-600">contacts</i> พนักงานปัจจุบัน
        </h2>
        <div id="active-employees-list" class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="text-center text-slate-400 py-8 w-full col-span-2">
            <i class="material-icons animate-spin">sync</i> กำลังโหลดข้อมูล...
          </div>
        </div>
      </div>
    </div>

    <div id="tab2" class="tab-content">
      
      <div id="login-box" class="bg-white rounded-xl shadow-md border border-slate-200 p-8 mb-6 text-center max-w-sm mx-auto mt-4">
        <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="material-icons text-4xl text-blue-600">lock</i>
        </div>
        <h3 class="font-bold text-slate-800 text-xl mb-6">เข้าสู่ระบบพนักงาน</h3>
        
        <div class="space-y-3 text-left">
          <div>
            <label class="text-xs font-bold text-slate-500 ml-1">รหัสพนักงาน</label>
            <input type="text" id="login-id" class="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="เช่น EMP001">
          </div>
          <div>
            <label class="text-xs font-bold text-slate-500 ml-1">PIN (รหัสลับ)</label>
            <input type="password" id="login-pass" class="w-full p-3 border border-slate-300 rounded-lg bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="กรอก PIN 4 หลัก">
          </div>
        </div>

        <button onclick="doLogin()" class="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-blue-700 mt-6 transition active:scale-95">
          เข้าสู่ระบบ
        </button>
        
        <div class="mt-6 pt-6 border-t border-slate-100">
          <p class="text-xs text-slate-400 mb-3">พนักงานใหม่? ยังไม่มีรหัส?</p>
          <button onclick="openRegisterModal()" class="w-full bg-green-50 text-green-700 border border-green-200 font-bold py-3 rounded-xl hover:bg-green-100 transition flex items-center justify-center gap-2">
            <i class="material-icons text-sm">how_to_reg</i> สมัครสมาชิกใหม่
          </button>
        </div>
      </div>

      <div id="employee-workspace" class="hidden animate-fadeIn">
        
        <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-4 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <img id="user-profile-img" src="https://via.placeholder.com/150" class="w-12 h-12 rounded-full bg-slate-200 object-cover border-2 border-white shadow-sm">
            <div>
              <div class="font-bold text-slate-800 text-lg leading-none" id="user-name">Loading...</div>
              <div class="text-xs text-slate-500 mt-1" id="user-pos">...</div>
            </div>
          </div>
          <button onclick="doLogout()" class="text-xs text-red-500 font-bold bg-red-50 px-3 py-1 rounded-full hover:bg-red-100">
            ออกจากระบบ
          </button>
        </div>

        <div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-center shadow-lg mb-6 border border-slate-700 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500"></div>
          
          <div onclick="clockIn()" class="group w-36 h-36 mx-auto bg-slate-800 rounded-full border-4 border-slate-600 shadow-2xl flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-all hover:border-green-400 relative z-10">
            <i class="material-icons text-5xl text-white mb-1 group-hover:text-green-400 transition">touch_app</i>
            <span class="text-xs text-slate-400 font-bold group-hover:text-white uppercase tracking-wider">กดลงเวลา</span>
          </div>
          
          <div id="clock-status" class="mt-4 text-xs text-slate-400 font-mono">
            <i class="material-icons text-[10px] align-middle">location_on</i> ต้องอยู่ในพื้นที่ฟาร์ม
          </div>
        </div>

        <div class="flex gap-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
           <button id="btn-sub-adv" onclick="toggleSubSection('sub-adv', this)" class="sub-btn flex-none bg-white text-slate-600 px-5 py-3 rounded-xl text-sm font-bold border border-slate-200 shadow-sm whitespace-nowrap transition flex items-center gap-2">
             💰 เบิกเงิน
           </button>
           <button id="btn-sub-lev" onclick="toggleSubSection('sub-lev', this)" class="sub-btn flex-none bg-white text-slate-600 px-5 py-3 rounded-xl text-sm font-bold border border-slate-200 shadow-sm whitespace-nowrap transition flex items-center gap-2">
             🏖️ ลาหยุด
           </button>
           <button id="btn-sub-doc" onclick="toggleSubSection('sub-doc', this)" class="sub-btn flex-none bg-white text-slate-600 px-5 py-3 rounded-xl text-sm font-bold border border-slate-200 shadow-sm whitespace-nowrap transition flex items-center gap-2">
             📂 ส่งเอกสาร
           </button>
        </div>

        <div id="sub-adv" class="hidden sub-section bg-white p-6 rounded-2xl border border-blue-100 shadow-lg mb-6 animate-fadeIn relative">
          <div class="absolute top-0 right-0 p-4 opacity-10"><i class="material-icons text-6xl text-blue-500">savings</i></div>
          <h4 class="font-bold text-blue-800 mb-4 text-lg">ยื่นคำขอเบิกเงิน</h4>
          <div class="space-y-3 relative z-10">
            <input type="number" id="adv-amount" class="w-full p-3 bg-slate-50 rounded-xl font-bold border border-slate-200 text-lg" placeholder="ระบุจำนวนเงิน (บาท)">
            <input type="text" id="adv-reason" class="w-full p-3 bg-slate-50 rounded-xl text-sm border border-slate-200" placeholder="เหตุผล (เช่น ค่าเทอม, ซ่อมรถ)">
            <button onclick="sendAdv()" class="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-blue-700 transition active:scale-95">ยืนยันส่งคำขอ</button>
          </div>
        </div>

        <div id="sub-lev" class="hidden sub-section bg-white p-6 rounded-2xl border border-teal-100 shadow-lg mb-6 animate-fadeIn relative">
          <div class="absolute top-0 right-0 p-4 opacity-10"><i class="material-icons text-6xl text-teal-500">beach_access</i></div>
          <h4 class="font-bold text-teal-800 mb-4 text-lg">แบบฟอร์มขอลาหยุด</h4>
          <div class="space-y-3 relative z-10">
            <select id="lev-type" class="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 font-bold text-slate-700">
              <option value="ลากิจ">ลากิจ</option>
              <option value="ลาป่วย">ลาป่วย</option>
              <option value="พักร้อน">พักร้อน</option>
            </select>
            <div class="flex gap-2">
              <div class="flex-1"><label class="text-[10px] text-slate-400 pl-1">เริ่มวันที่</label><input type="date" id="lev-start" class="w-full p-2 border border-slate-200 rounded-lg text-sm bg-slate-50"></div>
              <div class="flex-1"><label class="text-[10px] text-slate-400 pl-1">ถึงวันที่</label><input type="date" id="lev-end" class="w-full p-2 border border-slate-200 rounded-lg text-sm bg-slate-50"></div>
            </div>
            <input type="text" id="lev-reason" class="w-full p-3 bg-slate-50 rounded-xl text-sm border border-slate-200" placeholder="สาเหตุการลา">
            <button onclick="sendLev()" class="w-full bg-teal-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-teal-700 transition active:scale-95">ส่งใบลา</button>
          </div>
        </div>

        <div id="sub-doc" class="hidden sub-section bg-white p-6 rounded-2xl border border-indigo-100 shadow-lg mb-6 animate-fadeIn relative">
          <div class="absolute top-0 right-0 p-4 opacity-10"><i class="material-icons text-6xl text-indigo-500">folder_zip</i></div>
          <h4 class="font-bold text-indigo-800 mb-4 text-lg">ส่งเอกสารเพิ่มเติม</h4>
          <div class="space-y-3 relative z-10">
            <select id="doc-type" class="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm mb-2 font-bold text-slate-700">
              <option value="บัตรประชาชน">บัตรประชาชน</option>
              <option value="ทะเบียนบ้าน">ทะเบียนบ้าน</option>
              <option value="หน้าสมุดบัญชี">หน้าสมุดบัญชี</option>
              <option value="สัญญาจ้าง">สัญญาจ้าง</option>
              <option value="เอกสารอื่นๆ">เอกสารอื่นๆ</option>
            </select>
            
            <div class="border-2 border-dashed border-indigo-200 rounded-xl p-6 text-center cursor-pointer hover:bg-indigo-50 transition relative bg-slate-50">
              <input type="file" id="doc-file" class="absolute inset-0 opacity-0 cursor-pointer w-full h-full" accept="image/*" onchange="previewDoc(this, 'doc-preview-area')">
              <div id="doc-preview-area">
                <i class="material-icons text-4xl text-indigo-300">cloud_upload</i>
                <p class="text-xs text-indigo-400 mt-2 font-bold">แตะเพื่อเลือกรูปภาพ</p>
              </div>
            </div>
            
            <button onclick="submitDocument()" class="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition active:scale-95">อัปโหลดเอกสาร</button>
          </div>
        </div>

        <div class="flex items-center gap-2 mb-3 mt-8">
          <i class="material-icons text-slate-400 text-sm">history</i>
          <h4 class="font-bold text-slate-500 text-xs uppercase tracking-wider">ประวัติรายการล่าสุด</h4>
        </div>
        <div id="my-history-list" class="space-y-2 text-sm pb-10">
          <div class="text-center text-slate-300 text-xs py-4">กำลังโหลดข้อมูล...</div>
        </div>
      </div>
    </div>

    <div id="tab3" class="tab-content">
      
      <div class="bg-amber-50 rounded-xl shadow-sm border border-amber-200 p-4 mb-6">
        <h3 class="font-bold text-amber-800 mb-3 border-l-4 border-amber-500 pl-3 text-lg flex items-center gap-2">
          <i class="material-icons">person_add</i> พิจารณาพนักงานใหม่
        </h3>
        <div id="applicant-list" class="space-y-3">
          <div class="text-center text-amber-400 text-sm py-4 border border-dashed border-amber-200 rounded-xl bg-white">
            ไม่มีผู้สมัครใหม่
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
        <h3 class="font-bold text-slate-700 mb-3 border-l-4 border-blue-500 pl-3 text-lg flex items-center gap-2">
          รายการรออนุมัติ (เบิก/ลา) <span class="bg-blue-100 text-blue-800 text-[10px] px-2 py-0.5 rounded-full font-bold" id="count-pending">0</span>
        </h3>
        <div id="pending-list" class="space-y-3">
          <div class="text-center text-slate-400 text-sm py-6 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <i class="material-icons text-slate-300 mb-2">done_all</i><br>ไม่มีรายการค้าง
          </div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <h3 class="font-bold text-slate-700 mb-3 border-l-4 border-green-500 pl-3 text-lg">จัดการเงินเดือน</h3>
        
        <button onclick="previewPayroll()" class="w-full bg-slate-800 text-white py-3 rounded-xl text-sm font-bold shadow mb-4 flex justify-center items-center gap-2 hover:bg-slate-700 transition">
          <i class="material-icons text-sm">calculate</i> คำนวณงวดปัจจุบัน
        </button>
        
        <div id="payroll-view" class="hidden animate-fadeIn">
          <div class="overflow-x-auto mb-4 border rounded-lg shadow-inner max-h-64">
            <table class="w-full text-sm text-left relative">
              <thead class="bg-green-50 text-green-800 uppercase text-xs sticky top-0">
                <tr>
                  <th class="p-2">ชื่อ</th>
                  <th class="p-2 text-right">รายได้</th>
                  <th class="p-2 text-right text-red-500">หัก</th>
                  <th class="p-2 text-right font-bold">สุทธิ</th>
                </tr>
              </thead>
              <tbody id="payroll-body" class="bg-white divide-y divide-green-50"></tbody>
            </table>
          </div>
          <button onclick="confirmPayroll()" class="w-full bg-green-600 text-white py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 transition active:scale-95 flex justify-center items-center gap-2">
            <i class="material-icons">check_circle</i> ยืนยันจ่าย & สร้างสลิป
          </button>
        </div>
      </div>
    </div>

  </div>

  <div id="regModal" class="fixed inset-0 bg-slate-900 bg-opacity-80 hidden z-[60] flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
    <div class="bg-white w-full max-w-lg rounded-2xl shadow-2xl animate-fadeIn my-auto max-h-[90vh] overflow-y-auto relative">
      
      <div class="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
        <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
          <i class="material-icons text-green-600">how_to_reg</i> ใบสมัครงานออนไลน์
        </h3>
        <button onclick="closeRegModal()" class="text-slate-400 hover:text-slate-600"><i class="material-icons">close</i></button>
      </div>
      
      <div class="p-6 space-y-4">
        
        <div class="text-center mb-6">
          <div class="w-28 h-28 mx-auto bg-slate-100 rounded-full border-4 border-white shadow-md flex items-center justify-center relative overflow-hidden cursor-pointer group" onclick="document.getElementById('reg-photo').click()">
            <img id="reg-photo-preview" class="w-full h-full object-cover hidden">
            <div id="reg-photo-placeholder" class="text-slate-400 text-xs group-hover:text-green-500 transition">
              <i class="material-icons text-3xl mb-1">add_a_photo</i><br>รูปโปรไฟล์
            </div>
            <input type="file" id="reg-photo" accept="image/*" class="hidden" onchange="previewProfile(this)">
          </div>
          <p class="text-[10px] text-slate-400 mt-2 font-bold">แตะเพื่อใส่รูปโปรไฟล์ (เห็นหน้าชัดเจน)</p>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div><label class="text-xs font-bold text-slate-500">ชื่อ-นามสกุล *</label><input id="reg-name" type="text" class="w-full p-2 border rounded-lg bg-slate-50 mt-1"></div>
          <div><label class="text-xs font-bold text-slate-500">ชื่อเล่น</label><input id="reg-nick" type="text" class="w-full p-2 border rounded-lg bg-slate-50 mt-1"></div>
        </div>
        
        <div><label class="text-xs font-bold text-slate-500">ที่อยู่ปัจจุบัน</label><textarea id="reg-addr" class="w-full p-2 border rounded-lg bg-slate-50 h-20 mt-1 resize-none"></textarea></div>
        
        <div class="grid grid-cols-2 gap-3">
          <div><label class="text-xs font-bold text-slate-500">เบอร์โทร *</label><input id="reg-phone" type="tel" class="w-full p-2 border rounded-lg bg-slate-50 mt-1"></div>
          <div><label class="text-xs font-bold text-slate-500">LINE ID</label><input id="reg-line" type="text" class="w-full p-2 border rounded-lg bg-slate-50 mt-1"></div>
        </div>
        <div><label class="text-xs font-bold text-slate-500">Gmail</label><input id="reg-gmail" type="email" class="w-full p-2 border rounded-lg bg-slate-50 mt-1"></div>
        
        <div class="border-t pt-3 mt-2">
          <label class="text-xs font-bold text-slate-500">ระดับการศึกษา</label>
          <select id="reg-edu" class="w-full p-2 border rounded-lg bg-slate-50 mt-1">
            <option>ประถมศึกษา</option><option>มัธยมศึกษา</option><option>ปวช./ปวส.</option><option>ปริญญาตรี</option><option>อื่นๆ</option>
          </select>
        </div>
        
        <div class="grid grid-cols-2 gap-3">
          <div><label class="text-xs font-bold text-slate-500">ธนาคาร</label><select id="reg-bank-name" class="w-full p-2 border rounded-lg bg-slate-50 mt-1"><option>กสิกรไทย</option><option>ไทยพาณิชย์</option><option>กรุงไทย</option><option>กรุงเทพ</option><option>ออมสิน</option><option>ธ.ก.ส.</option></select></div>
          <div><label class="text-xs font-bold text-slate-500">เลขบัญชี *</label><input id="reg-bank-num" type="text" class="w-full p-2 border rounded-lg bg-slate-50 mt-1"></div>
        </div>

        <div class="bg-yellow-50 p-4 rounded-xl border border-yellow-200 mt-4">
          <label class="text-xs font-bold text-yellow-800 flex items-center gap-1"><i class="material-icons text-sm">vpn_key</i> กำหนดรหัสผ่าน (PIN) *</label>
          <input id="reg-pass" type="password" class="w-full p-3 border border-yellow-300 rounded-lg mt-2 bg-white focus:ring-2 focus:ring-yellow-400 outline-none" placeholder="ตั้งรหัสผ่านของคุณ">
        </div>

      </div>

      <div class="sticky bottom-0 bg-white border-t px-6 py-4 z-10">
        <button onclick="submitRegistration()" class="w-full bg-green-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-green-700 transition active:scale-95 text-lg">
          ส่งใบสมัครทันที
        </button>
      </div>
    </div>
  </div>

  <div id="approveModal" class="fixed inset-0 bg-slate-900 bg-opacity-70 hidden z-[70] flex items-center justify-center p-4 backdrop-blur-sm">
    <div class="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl animate-fadeIn">
      <div class="text-center mb-4">
        <div class="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2 text-amber-600">
          <i class="material-icons">verified_user</i>
        </div>
        <h3 class="text-lg font-bold text-slate-800">รับพนักงานเข้าทำงาน</h3>
      </div>
      
      <div id="approve-info" class="text-sm text-slate-600 mb-4 bg-slate-50 p-3 rounded-lg text-center font-bold border border-slate-200">...</div>
      
      <div class="space-y-3">
        <div>
          <label class="text-xs font-bold text-slate-500">ประเภทการจ้าง</label>
          <select id="app-type" class="w-full p-2 border rounded-lg mt-1 font-bold text-slate-700">
            <option value="รายวัน">รายวัน (Daily)</option>
            <option value="รายเดือน">รายเดือน (Monthly)</option>
          </select>
        </div>
        <div>
          <label class="text-xs font-bold text-slate-500">อัตราค่าจ้าง (บาท)</label>
          <input id="app-rate" type="number" class="w-full p-2 border rounded-lg mt-1 font-bold text-slate-700" placeholder="เช่น 350 หรือ 15000">
        </div>
        <div>
          <label class="text-xs font-bold text-slate-500">OT/ชม. (บาท)</label>
          <input id="app-ot" type="number" class="w-full p-2 border rounded-lg mt-1 font-bold text-slate-700" placeholder="เช่น 50">
        </div>
      </div>
      
      <div class="flex gap-2 mt-6">
        <button onclick="document.getElementById('approveModal').classList.add('hidden')" class="flex-1 py-3 bg-slate-100 rounded-xl text-slate-600 font-bold hover:bg-slate-200">ยกเลิก</button>
        <button onclick="confirmApproveEmp()" class="flex-1 py-3 bg-green-600 text-white rounded-xl font-bold shadow hover:bg-green-700">ยืนยันรับ</button>
      </div>
    </div>
  </div>

  <script>
    let user = null; // เก็บข้อมูล user ปัจจุบัน
    let selectedApplicantRow = null; // เก็บ rowIndex ของคนที่จะอนุมัติ

    // เริ่มต้นทำงาน
    window.onload = function() {
      loadEmps();     // โหลดรายชื่อ Tab 1 และ Tab 3
      loadPending();  // โหลดรายการเบิก/ลา Tab 3
    };

    // ฟังก์ชันเปลี่ยน Tab หลัก
    function switchTab(id) {
      document.querySelectorAll('.tab-content').forEach(e => e.classList.remove('active'));
      document.querySelectorAll('.tab-btn').forEach(e => e.classList.remove('active'));
      document.getElementById(id).classList.add('active');
      document.getElementById('btn-' + id).classList.add('active');
    }

    // ฟังก์ชันเปลี่ยนเมนูย่อย (Tab 2)
    function toggleSubSection(id, btn) {
      document.querySelectorAll('.sub-section').forEach(e => e.classList.add('hidden'));
      document.querySelectorAll('.sub-btn').forEach(e => e.classList.remove('active'));
      document.getElementById(id).classList.remove('hidden');
      btn.classList.add('active');
    }

    // ===============================
    // 1. DATA LOADING (แยกคนทำงาน vs สมัครใหม่)
    // ===============================
    function loadEmps() {
      google.script.run.withSuccessHandler(data => {
        let activeHtml = '';
        let applicantHtml = '';
        
        data.forEach(e => {
          // ใช้ Default Image ถ้าไม่มีรูป
          let img = (e.profile && e.profile.includes('http')) ? e.profile : 'https://via.placeholder.com/150?text=No+Img';
          // ป้องกัน Case Sensitivity ของสถานะ
          let status = (e.status || "").toLowerCase();

          if (status === 'active' || status === 'ทำงาน') {
            // TAB 1: พนักงานที่อนุมัติแล้ว
            activeHtml += `
              <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3 transition hover:shadow-md">
                <img src="${img}" class="w-12 h-12 rounded-full object-cover bg-slate-100 border">
                <div class="flex-1 min-w-0">
                  <div class="font-bold text-slate-700 truncate">${e.name}</div>
                  <div class="text-xs text-slate-400 truncate">${e.position} • ${e.phone||''}</div>
                </div>
                <div class="text-right">
                  <span class="block font-mono font-bold text-slate-600">${Number(e.rate).toLocaleString()}</span>
                  <span class="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">ปกติ</span>
                </div>
              </div>`;
          } else if (status === 'รออนุมัติ') {
            // TAB 3: ผู้สมัครใหม่
            applicantHtml += `
              <div class="bg-white p-4 rounded-xl border border-amber-200 shadow-sm flex justify-between items-center mb-2 transition hover:shadow-md">
                <div class="flex items-center gap-3">
                  <img src="${img}" class="w-12 h-12 rounded-full object-cover bg-slate-100 border">
                  <div>
                    <div class="font-bold text-slate-800">${e.name}</div>
                    <div class="text-xs text-slate-500">สมัคร: ${e.position}</div>
                  </div>
                </div>
                <button onclick="openApproveModal(${e.rowIndex}, '${e.name}')" class="bg-amber-500 text-white px-4 py-2 rounded-lg text-xs font-bold shadow hover:bg-amber-600 transition active:scale-95">
                  พิจารณา
                </button>
              </div>`;
          }
        });
        
        document.getElementById('active-employees-list').innerHTML = activeHtml || '<div class="col-span-2 text-center text-slate-400 py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">ยังไม่มีพนักงาน</div>';
        document.getElementById('applicant-list').innerHTML = applicantHtml || '<div class="text-center text-amber-400 text-sm py-4 bg-white border border-dashed border-amber-200 rounded-xl">ไม่มีผู้สมัครใหม่</div>';
        
      }).hr_getEmployeeList();
    }

    // ===============================
    // 2. LOGIN / LOGOUT
    // ===============================
    function doLogin() {
      const id = document.getElementById('login-id').value;
      const pass = document.getElementById('login-pass').value;
      
      if (!id || !pass) return Swal.fire('กรอกข้อมูลให้ครบ', '', 'warning');
      
      Swal.fire({ title: 'กำลังตรวจสอบ...', didOpen: () => Swal.showLoading() });
      
      google.script.run.withSuccessHandler(res => {
        if (res.success) {
          Swal.close();
          user = res.user;
          // สลับหน้าจอ
          document.getElementById('login-box').classList.add('hidden');
          document.getElementById('employee-workspace').classList.remove('hidden');
          
          // แสดงข้อมูล User
          document.getElementById('user-name').innerText = user.name;
          document.getElementById('user-pos').innerText = user.position;
          if (user.profile && user.profile.includes('http')) document.getElementById('user-profile-img').src = user.profile;
          
          // โหลดประวัติ
          loadMyData();
        } else {
          Swal.fire('เข้าสู่ระบบไม่สำเร็จ', res.message, 'error');
        }
      }).hr_login(id, pass);
    }

    function doLogout() {
      Swal.fire({
        title: 'ออกจากระบบ?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'ออกเลย'
      }).then((result) => {
        if (result.isConfirmed) {
          user = null;
          document.getElementById('login-box').classList.remove('hidden');
          document.getElementById('employee-workspace').classList.add('hidden');
          document.getElementById('login-id').value = '';
          document.getElementById('login-pass').value = '';
        }
      });
    }

    function loadMyData() {
      if (!user) return;
      document.getElementById('my-history-list').innerHTML = '<div class="text-center py-4"><i class="material-icons animate-spin text-slate-300">sync</i></div>';
      
      google.script.run.withSuccessHandler(list => {
        let html = '';
        list.forEach(item => {
          let badge = item.status === 'อนุมัติ' ? 'bg-green-100 text-green-700' : 
                      (item.status === 'สมบูรณ์' ? 'bg-indigo-100 text-indigo-700' : 
                      (item.status === 'ไม่อนุมัติ' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'));
          
          let icon = item.type === 'money' ? '💰' : (item.type === 'leave' ? '🏖️' : '📂');
          
          html += `
            <div class="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex justify-between items-start mb-2 transition hover:shadow-md">
              <div>
                <div class="font-bold text-slate-700 text-sm flex items-center gap-1">${icon} ${item.title}</div>
                <div class="text-[10px] text-slate-400 mt-1">${item.date} • ${item.detail}</div>
              </div>
              <div class="flex flex-col items-end gap-1">
                <span class="text-[10px] px-2 py-0.5 rounded-md font-bold ${badge}">${item.status}</span>
                ${item.link ? `<a href="${item.link}" target="_blank" class="text-[10px] text-blue-500 underline flex items-center gap-1"><i class="material-icons text-[10px]">open_in_new</i> ไฟล์</a>` : ''}
              </div>
            </div>`;
        });
        
        document.getElementById('my-history-list').innerHTML = html || '<div class="text-center text-xs text-slate-300 py-4">ไม่มีประวัติรายการ</div>';
      }).hr_getMyAllHistory(user.id);
    }

    // ===============================
    // 3. REGISTER & APPROVE
    // ===============================
    function openRegisterModal() { document.getElementById('regModal').classList.remove('hidden'); }
    function closeRegModal() { document.getElementById('regModal').classList.add('hidden'); }
    
    function previewProfile(input) {
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const img = document.getElementById('reg-photo-preview');
          img.src = e.target.result;
          img.classList.remove('hidden');
          document.getElementById('reg-photo-placeholder').classList.add('hidden');
        };
        reader.readAsDataURL(input.files[0]);
      }
    }

    function submitRegistration() {
      // Validation
      const name = document.getElementById('reg-name').value;
      const phone = document.getElementById('reg-phone').value;
      const pass = document.getElementById('reg-pass').value;
      const bank = document.getElementById('reg-bank-num').value;
      
      if (!name || !phone || !pass || !bank) {
        return Swal.fire('ข้อมูลไม่ครบ', 'กรุณากรอกข้อมูลที่มีเครื่องหมาย * ให้ครบถ้วน', 'warning');
      }

      Swal.fire({
        title: 'กำลังส่งใบสมัคร...',
        text: 'กรุณารอสักครู่ (กำลังอัปโหลดรูปภาพ)',
        didOpen: () => Swal.showLoading()
      });

      const payload = {
        name: name,
        position: "ผู้สมัครใหม่",
        phone: phone,
        password: pass,
        bankNum: bank,
        bankName: document.getElementById('reg-bank-name').value,
        address: document.getElementById('reg-addr').value,
        edu: document.getElementById('reg-edu').value,
        gmail: document.getElementById('reg-gmail').value,
        lineId: document.getElementById('reg-line').value
      };

      const fileInput = document.getElementById('reg-photo');
      if (fileInput.files.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);
        reader.onload = function(e) {
          payload.photoBase64 = e.target.result;
          payload.mimeType = fileInput.files[0].type;
          sendRegData(payload); // ส่งพร้อมรูป
        };
      } else {
        sendRegData(payload); // ส่งแบบไม่มีรูป
      }
    }

    function sendRegData(payload) {
      google.script.run.withSuccessHandler(res => {
        if (res.success) {
          Swal.fire({
            icon: 'success',
            title: 'ส่งใบสมัครสำเร็จ!',
            text: res.message,
            confirmButtonText: 'ตกลง'
          }).then(() => {
            closeRegModal();
            loadEmps(); // รีโหลดข้อมูลหน้าจอ
          });
        } else {
          Swal.fire('เกิดข้อผิดพลาด', res.message, 'error');
        }
      }).hr_submitApplication(payload);
    }

    // เปิด Modal อนุมัติพนักงาน
    function openApproveModal(row, name) {
      selectedApplicantRow = row;
      document.getElementById('approve-info').innerText = `กำลังพิจารณา: ${name}`;
      document.getElementById('approveModal').classList.remove('hidden');
    }
    
    // ยืนยันรับพนักงาน
    function confirmApproveEmp() {
      const rate = document.getElementById('app-rate').value;
      const ot = document.getElementById('app-ot').value;
      if (!rate) return Swal.fire('ข้อมูลไม่ครบ', 'กรุณาระบุอัตราค่าจ้าง', 'warning');
      
      Swal.fire({ title: 'กำลังบันทึก...', didOpen: () => Swal.showLoading() });
      google.script.run.withSuccessHandler(res => {
        Swal.fire('เรียบร้อย', res.message, 'success');
        document.getElementById('approveModal').classList.add('hidden');
        loadEmps(); // รีโหลดหน้าจอ
      }).hr_activateEmployee({ rowIndex: selectedApplicantRow, type: document.getElementById('app-type').value, rate: rate, ot: ot });
    }

    // ===============================
    // 4. EMPLOYEE ACTIONS (เบิก/ลา/ส่งงาน)
    // ===============================
    function sendAdv() { 
      if(!user) return;
      const amt = document.getElementById('adv-amount').value;
      const rsn = document.getElementById('adv-reason').value;
      if(!amt) return Swal.fire('ระบุจำนวนเงิน','','warning');
      
      Swal.fire({title:'กำลังส่งคำขอ...',didOpen:()=>Swal.showLoading()});
      google.script.run.withSuccessHandler(res => {
        Swal.fire(res.success?'สำเร็จ':'ผิดพลาด', res.message, res.success?'success':'error');
        if(res.success) {
          document.getElementById('adv-amount').value = '';
          loadMyData();
        }
      }).hr_submitAdvance({empId:user.id, empName:user.name, amount:amt, reason:rsn}); 
    }

    function sendLev() { 
      if(!user) return;
      const s = document.getElementById('lev-start').value;
      const e = document.getElementById('lev-end').value;
      const r = document.getElementById('lev-reason').value;
      
      if(!s || !e) return Swal.fire('ระบุวันที่ให้ครบ','','warning');
      
      Swal.fire({title:'กำลังส่งใบลา...',didOpen:()=>Swal.showLoading()});
      google.script.run.withSuccessHandler(res => {
        Swal.fire(res.success?'สำเร็จ':'ผิดพลาด', res.message, res.success?'success':'error');
        if(res.success) loadMyData();
      }).hr_submitLeave({
        empId: user.id, empName: user.name, 
        type: document.getElementById('lev-type').value, 
        start: s, end: e, reason: r
      }); 
    }
    
    function previewDoc(input, targetId) {
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          document.getElementById(targetId).innerHTML = `<img src="${e.target.result}" class="h-20 mx-auto rounded-lg shadow-md object-contain">`;
        };
        reader.readAsDataURL(input.files[0]);
      }
    }
    
    function submitDocument() {
      if(!user) return;
      const fileIn = document.getElementById('doc-file');
      if (!fileIn.files[0]) return Swal.fire('กรุณาเลือกไฟล์รูปภาพ','','warning');
      
      const reader = new FileReader();
      reader.readAsDataURL(fileIn.files[0]);
      reader.onload = function(e) {
        Swal.fire({title:'กำลังอัปโหลด...', text:'กรุณารอสักครู่', didOpen:()=>Swal.showLoading()});
        
        google.script.run.withSuccessHandler(res => {
          Swal.fire(res.success?'สำเร็จ':'ผิดพลาด', res.message, res.success?'success':'error');
          if(res.success) loadMyData();
        }).hr_uploadDocument({
          empId: user.id, empName: user.name, 
          docType: document.getElementById('doc-type').value, 
          fileBase64: e.target.result, 
          mimeType: fileIn.files[0].type
        });
      };
    }

    // Time Clock
    function clockIn() {
      if(!user) return Swal.fire('กรุณาเข้าสู่ระบบก่อน','','warning');
      if(!navigator.geolocation) return Swal.fire('อุปกรณ์ไม่รองรับ GPS','','error');
      
      document.getElementById('clock-status').innerHTML = '<span class="text-amber-400 animate-pulse">📡 กำลังค้นหาพิกัด GPS...</span>';
      
      navigator.geolocation.getCurrentPosition(pos => {
        google.script.run.withSuccessHandler(res => {
          if(res.success) {
            Swal.fire({icon:'success', title: res.message, timer: 2000, showConfirmButton: false});
            document.getElementById('clock-status').innerHTML = `<span class="text-green-400 font-bold">✅ บันทึกแล้ว (${res.type})</span>`;
          } else {
            Swal.fire('บันทึกไม่ได้', res.message, 'error');
            document.getElementById('clock-status').innerHTML = '<span class="text-red-400 font-bold">❌ อยู่นอกพื้นที่</span>';
          }
        }).hr_submitTimeLog({
          empId: user.id, empName: user.name, 
          lat: pos.coords.latitude, lng: pos.coords.longitude
        });
      }, err => {
        Swal.fire('GPS Error', 'ไม่สามารถระบุตำแหน่งได้ กรุณาเปิด GPS', 'error');
        document.getElementById('clock-status').innerText = '⚠️ GPS Error';
      }, {enableHighAccuracy: true});
    }

    // ===============================
    // 5. MANAGER APPROVE & PAYROLL
    // ===============================
    function loadPending() {
      google.script.run.withSuccessHandler(list => {
        let html = '';
        document.getElementById('count-pending').innerText = list.length;
        
        list.forEach(item => {
          let borderClass = item.group === 'money' ? 'border-amber-400' : 'border-teal-400';
          html += `
            <div class="bg-white border-l-4 ${borderClass} p-4 rounded-xl shadow-sm mb-2 flex justify-between items-center transition hover:shadow-md">
              <div>
                <div class="font-bold text-slate-800">${item.empId}</div>
                <div class="text-sm text-slate-600">${item.desc}</div>
                <div class="text-[10px] text-slate-400 mt-1">${item.date}</div>
              </div>
              <div class="flex gap-2">
                <button onclick="approveRequest(${item.rowIndex}, '${item.group}', '${item.reqId}', '${item.empId}', '${item.desc}')" class="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow hover:bg-green-700">อนุมัติ</button>
                <button onclick="rejectRequest(${item.rowIndex}, '${item.group}')" class="bg-slate-100 text-slate-500 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-200">ปฏิเสธ</button>
              </div>
            </div>`;
        });
        document.getElementById('pending-list').innerHTML = html || '<div class="text-center text-slate-400 text-sm py-6 bg-slate-50 rounded-xl border border-dashed border-slate-300"><i class="material-icons text-slate-300 mb-2">done_all</i><br>ไม่มีรายการค้าง</div>';
      }).hr_getPendingRequests();
    }
    
    function approveRequest(r, g, id, eid, d) {
      Swal.fire({
        title: 'ยืนยันอนุมัติ?',
        text: d,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'อนุมัติ',
        confirmButtonColor: '#16a34a'
      }).then((result) => {
        if(result.isConfirmed) {
          Swal.fire({title:'ประมวลผล...',didOpen:()=>Swal.showLoading()});
          google.script.run.withSuccessHandler(() => {
            Swal.fire('เรียบร้อย','','success');
            loadPending();
          }).hr_approveItem({rowIndex:r, group:g, reqId:id, empId:eid, desc:d});
        }
      });
    }
    
    function rejectRequest(r, g) {
      if(!confirm('ยืนยันปฏิเสธรายการนี้?')) return;
      google.script.run.withSuccessHandler(loadPending).hr_rejectItem({rowIndex:r, group:g});
    }
    
    // Payroll
    let payrollCache = [];
    function previewPayroll() {
      Swal.fire({title:'กำลังคำนวณ...',didOpen:()=>Swal.showLoading()});
      google.script.run.withSuccessHandler(list => {
        Swal.close();
        payrollCache = list;
        document.getElementById('payroll-view').classList.remove('hidden');
        let html = '';
        list.forEach(p => {
          html += `
            <tr class="border-b hover:bg-slate-50">
              <td class="p-3 font-bold text-slate-700">${p.name}</td>
              <td class="text-right p-3 text-slate-600">${Number(p.income).toLocaleString()}</td>
              <td class="text-right p-3 text-red-500 text-xs">-${(p.deductAdv + p.deductDebt).toLocaleString()}</td>
              <td class="text-right p-3 font-bold text-green-700 text-lg">${Number(p.net).toLocaleString()}</td>
            </tr>`;
        });
        document.getElementById('payroll-body').innerHTML = html;
      }).hr_calculatePayrollPreview();
    }
    
    function confirmPayroll() {
      Swal.fire({
        title: 'ยืนยันจ่ายเงินเดือน?',
        text: 'ระบบจะบันทึกและสร้างสลิปทันที',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ยืนยันจ่ายจริง',
        confirmButtonColor: '#16a34a'
      }).then((res) => {
        if(res.isConfirmed) {
          Swal.fire({title:'กำลังทำงาน...',didOpen:()=>Swal.showLoading()});
          google.script.run.withSuccessHandler(() => {
            Swal.fire('สำเร็จ','จ่ายเงินเดือนเรียบร้อย','success');
            document.getElementById('payroll-view').classList.add('hidden');
          }).hr_confirmPayroll(payrollCache);
        }
      });
    }
  </script>
</body>
</html>
