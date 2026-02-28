const fs=require('fs');
const content=fs.readFileSync('lib/privateCarparks.ts','utf8');
const regex = /id:\s*"([\w_-]+)"[\s\S]*?latitude:\s*([0-9\.]+),[\s\S]*?longitude:\s*([0-9\.]+),/g;
let m; const arr=[];
while((m=regex.exec(content))){arr.push({id:m[1],lat:parseFloat(m[2]),lon:parseFloat(m[3])});}
const dest={lat:1.3917231,lon:103.8760293};
function hav(lat1,lon1,lat2,lon2){const R=6371e3;const toRad=(n)=>n*Math.PI/180;const phi1=toRad(lat1),phi2=toRad(lat2),dphi=toRad(lat2-lat1),dl=toRad(lon2-lon1);const a=Math.sin(dphi/2)**2+Math.cos(phi1)*Math.cos(phi2)*Math.sin(dl/2)**2;return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));}
arr.forEach(c=>c.dist=Math.round(hav(dest.lat,dest.lon,c.lat,c.lon)));
arr.sort((a,b)=>a.dist-b.dist);
console.log(arr.slice(0,10));
