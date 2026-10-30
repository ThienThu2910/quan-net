const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const machineSeed = Array.from({length:20},(_,i)=>({id:`${["A","B","C"][Math.floor(i/7)]}${String(i%7+1).padStart(2,"0")}`,status:i<12?"busy":i<18?"free":"repair"}));
let machines = JSON.parse(localStorage.getItem("qn_machines") || "null") || machineSeed;
const customers = [
 ["Nguyễn Văn An","0901 234 567","1.250","Đang hoạt động"],["Trần Minh Khang","0912 345 678","860","Thành viên"],["Lê Hoàng Nam","0987 654 321","540","Thành viên"],["Phạm Gia Bảo","0933 222 111","320","Mới"]
];
const invoices = [
 ["HD1024","Nguyễn Văn An","A03","14:32","45.000đ","Đã thanh toán"],["HD1023","Trần Minh Khang","B06","14:05","62.000đ","Đã thanh toán"],["HD1022","Khách vãng lai","A01","13:48","28.000đ","Đã thanh toán"],["HD1021","Lê Hoàng Nam","C04","13:12","35.000đ","Chờ thanh toán"]
];
const services = [["🥤","Nước suối","Giải khát","10.000đ"],["⚡","Sting dâu","Nước tăng lực","15.000đ"],["🍜","Mì ly","Đồ ăn nhanh","18.000đ"],["☕","Cà phê","Đồ uống","20.000đ"],["🍟","Khoai tây chiên","Đồ ăn nhẹ","25.000đ"],["🧃","Trà đào","Đồ uống","22.000đ"],["🍪","Bánh snack","Đồ ăn nhẹ","12.000đ"],["🎧","Thuê tai nghe","Dịch vụ","5.000đ"]];
const pageNames={dashboard:["Tổng quan","Theo dõi tình hình hoạt động của quán net."],computers:["Quản lý máy","Theo dõi trạng thái và khu vực máy trạm."],customers:["Khách hàng","Thông tin thành viên và điểm tích lũy."],services:["Dịch vụ","Danh mục sản phẩm và dịch vụ của quán."],invoices:["Hóa đơn","Theo dõi các giao dịch gần đây."],reports:["Báo cáo","Tổng hợp số liệu hoạt động minh họa."],settings:["Cài đặt","Thông tin cơ bản của quán net."]};
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2300)}
function renderMachines(){
 const grid=$("#machineGrid"); if(grid) grid.innerHTML=machines.map(m=>`<article class="machine-card"><h3>Máy ${m.id}</h3><p>Khu ${m.id[0]} · Core i5 · RAM 16GB</p><span class="status ${m.status}">${({busy:"Đang sử dụng",free:"Máy trống",repair:"Bảo trì"})[m.status]}</span><button data-machine="${m.id}">Đổi trạng thái</button></article>`).join("");
 const mini=$("#miniMachines");if(mini)mini.innerHTML=machines.slice(0,15).map(m=>`<div class="mini-machine ${m.status}"><b>${m.id}</b><small>${({busy:"Đang dùng",free:"Trống",repair:"Bảo trì"})[m.status]}</small></div>`).join("");
 $("#totalMachines").textContent=machines.length;$("#activeMachines").textContent=machines.filter(m=>m.status==="busy").length;$("#freeMachines").textContent=machines.filter(m=>m.status==="free").length;
}
function renderCustomers(){$("#customerRows").innerHTML=customers.map(c=>`<tr><td><div class="person"><span class="person-avatar">${c[0].split(" ").slice(-2).map(x=>x[0]).join("")}</span><b>${c[0]}</b></div></td><td>${c[1]}</td><td>${c[2]} điểm</td><td><span class="status free">${c[3]}</span></td></tr>`).join("")}
function renderInvoices(){$("#invoiceRows").innerHTML=invoices.map(x=>`<tr>${x.map((v,i)=>`<td>${i===5?`<span class="status free">${v}</span>`:v}</td>`).join("")}</tr>`).join("")}
function renderServices(){$("#serviceGrid").innerHTML=services.map(s=>`<article class="service-card"><div class="service-emoji">${s[0]}</div><h3>${s[1]}</h3><p>${s[2]}</p><strong>${s[3]}</strong></article>`).join("")}
function showPage(name){$$(".page").forEach(p=>p.classList.toggle("active",p.id===`page-${name}`));$$(".nav-link[data-page]").forEach(b=>b.classList.toggle("active",b.dataset.page===name));$("#pageTitle").textContent=pageNames[name][0];$("#pageSubtitle").textContent=pageNames[name][1];$("#pageCrumb").textContent=pageNames[name][0];$("#sidebar").classList.remove("open");}
$$(".nav-link[data-page]").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.page)));
$$("[data-goto]").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.goto)));
$("#menuToggle").addEventListener("click",()=>$("#sidebar").classList.toggle("open"));
$("#machineFilters").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;$$(".filter").forEach(x=>x.classList.toggle("active",x===b));const f=b.dataset.filter;$$(".machine-card").forEach(card=>{const id=card.querySelector("h3").textContent.replace("Máy ","");const m=machines.find(x=>x.id===id);card.style.display=f==="all"||m.status===f?"":"none"})});
$("#machineGrid").addEventListener("click",e=>{const b=e.target.closest("[data-machine]");if(!b)return;const m=machines.find(x=>x.id===b.dataset.machine);m.status=({busy:"free",free:"busy",repair:"free"})[m.status];localStorage.setItem("qn_machines",JSON.stringify(machines));renderMachines();toast(`Đã cập nhật trạng thái máy ${m.id}`)});
$("#addMachine").addEventListener("click",()=>{const id=prompt("Nhập mã máy mới, ví dụ D01:");if(!id)return;if(machines.some(m=>m.id===id.toUpperCase()))return toast("Mã máy đã tồn tại");machines.push({id:id.toUpperCase(),status:"free"});localStorage.setItem("qn_machines",JSON.stringify(machines));renderMachines();toast("Đã thêm máy mới")});
$("#addCustomer").addEventListener("click",()=>toast("Chức năng thêm khách hàng chỉ là mô phỏng trong bản demo."));
$("#addService").addEventListener("click",()=>toast("Chức năng thêm dịch vụ chỉ là mô phỏng trong bản demo."));
$("#saveSettings").addEventListener("click",()=>{localStorage.setItem("qn_shop",JSON.stringify({name:$("#shopName").value,address:$("#shopAddress").value,hours:$("#shopHours").value}));$("#settingsMessage").textContent="Đã lưu trên trình duyệt hiện tại.";toast("Đã lưu cài đặt")});
const saved=JSON.parse(localStorage.getItem("qn_shop")||"null");if(saved){$("#shopName").value=saved.name;$("#shopAddress").value=saved.address;$("#shopHours").value=saved.hours}
$("#today").textContent=new Intl.DateTimeFormat("vi-VN",{weekday:"long",day:"2-digit",month:"2-digit",year:"numeric"}).format(new Date());
renderMachines();renderCustomers();renderInvoices();renderServices();
