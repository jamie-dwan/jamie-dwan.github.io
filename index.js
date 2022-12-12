/*console.log('price:',price.value)
//var price1 = document.getElementById('price').value
if(document.getElementById('price').value == '') {console.log('price lost');}
else console.log('ok');
var datetime1 = document.getElementById('date1').value
var datetime2 = document.getElementById('date2').value
var price2 = document.getElementById('strikeprice').value
*/
const addedBtn = document.getElementById('addedBtn')
const deletedBtn = document.getElementById('deletedBtn')
const list = document.getElementById('list')
const listContent = []
/*var moment = Require('moment');
var dUTC = new Date();
var t0 = moment(dUTC).format('YYYY-MM-DD hh:mm:ss');
*/
//num1 = parseInt(price.value)
//num2 = parseInt(strikeprice.value)
//num = num1+num2
//let t10 = parseInt(t1-t0)
// class RenderFeature{
//   append() {
//   }
//   render() {
//     // 渲染頁面的list
//     let htmlStr = ''
  
//     listContent.forEach(function (item) {
//       htmlStr = htmlStr + `
//       <div class="item">
//         <div>
//           <p>內容：${item.content}</p>
//           <p>時間：${item.date} ${item.time}</p>
//         </div>
//       </div>
//       `
//     })
  
//     list.innerHTML = htmlStr
//   }
// }
function nd(cal){
 let y = 1/(1+0.2316419*Math.abs(cal))
 let z = 0.3989423*Math.exp(-cal*cal/2)
 let x = 1-z*(1.330274*Math.pow(y,5)-1.821256*Math.pow(y,4)+1.781478*Math.pow(y,3)-0.356538*Math.pow(y,2)+0.3193815*y)
 if(cal<0)return 1-x
  else return x
}

// function 
function render() {
  // 渲染頁面的list
  let htmlStr = ''

  listContent.forEach(function (item) {
    htmlStr = htmlStr + `
    <div class="item">
      <div>
        <p>看涨期权价格：${item.call} delta：${item.cdelta}</p>
        <p>标的物当前价格：${item.current} 标的物行权价：${item.strike} 行权时间：${item.date} 初始时间：${item.initdate} IV:${item.iv}</p>
        <p>看跌期权价格：${item.put} delta：${item.pdelta}</p>
      </div>
    </div>
    `
  })

  list.innerHTML = htmlStr
}

// const r1 = new RenderFeature()

addedBtn.addEventListener('click', function () {
  let price1 = parseFloat(document.getElementById("price").value)
  let price2 = parseFloat(document.getElementById("strikeprice").value)
  //console.log("hello:",price1+price2)
  let time1 = document.getElementById("date1")
  let time2 = document.getElementById("date2")
  let para1 = new Date(time1.value.replace(/[a-zA-Z]/g," "))
  let para2 = new Date(time2.value.replace(/[a-zA-Z]/g," "))
  let pt1 = para1.getTime()
  let pt2 = para2.getTime()
  let t = (pt2-pt1)/1000/60/60/24/365
 // console.log("time1:",t)
  let v = parseFloat(document.getElementById("volatility").value)
  //console.log("v:",v)
  let d1 = (Math.log(price1/price2)+(0.025+0.5*v*v)*t)/v/Math.sqrt(t)
  let d2 = d1-v*Math.sqrt(t)
 // console.log("ready?",price1,price2,d1,d2)
  let optionvalue = price1*nd(d1)-price2*Math.exp(-0.025*t)*nd(d2)
  listContent.unshift({
    call: optionvalue,
    cdelta: nd(d1),
    current: price1,
    strike: price2,
    date: time2.value,
    initdate: time1.value,
    iv: v,
    put: optionvalue+price2-price1,
    pdelta: nd(d1)-1,
  })

  render()
  
})

deletedBtn.addEventListener('click', function () {
  listContent.shift()

  render()
})