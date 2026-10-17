import {types} from '../config/pages.config.js?v=7';
export const organizations=['演示矿业有限公司','演示烧结厂','演示选矿厂','演示球团厂','演示采矿分公司'];
export const stages=['风险评估','安全措施','现场实施','作业审批','验收审批','验收完成'];
export const seed = [
...types.flatMap((t,i)=>Array.from({length:i===6?0:4},(_,j)=>({id:`job-${t.key}-${j}`,entity:'jobs',type:t.key,no:`${t.code}202610${String(15001+j).padStart(5,'0')}`,level:['一级','二级','三级','一级'][j],content:`${t.name}演示任务${j+1}`,unit:organizations[j%3],owner:'演示负责人',applicant:j===3?'演示申请人':'演示管理员',applicantUnit:organizations[0],location:'演示厂区 A 区',start:'2026-10-15T09:00',end:'2026-10-15T17:00',created:'2026-10-14 16:25',status:['申请中','申请中','作业中','已完成'][j],stage:['作业审批','风险评估','现场实施','验收完成'][j],workers:['演示作业人员'],history:[]}))),
...[['氧气含量','%VOL','19.5≤X≤21'],['可燃气体名称','%LEL','<10'],['有毒有害气体名称','ppm','<10'],['有毒有害气体名称','mg/m3','<10']].map((a,i)=>({id:'gas-'+i,entity:'gas',name:a[0],unit:a[1],standard:a[2]})),
...types.map((t,i)=>({id:'end-'+t.key,entity:'end-settings',type:t.key,content:'现场无遗留的零件、工具等；现场整理整顿，器材归位。'})),
...['物体打击','高处坠落','火灾爆炸'].map((name,i)=>({id:'risk-'+i,entity:'risk-settings',type:'fire',name,content:'演示管控措施，具体内容待确认'})),
{id:'disclosure-1',entity:'disclosure-settings',type:'fire',content:'安全交底演示内容'},
...types.map(t=>({id:'level-'+t.key,entity:'type-settings',type:t.key,level:'一级',content:'等级定义待确认',validity:'24',scheme:'否'})),
...Array.from({length:3},(_,i)=>({id:'device-'+i,entity:'devices',name:'视频采集终端（演示）',unit:organizations[i],brand:'演示品牌 / 示例型号',code:'DEMO-00'+i,enabled:true,online:i<2}))];

export const supplementalJobs=[['sample-measures','安全措施'],['sample-acceptance','验收审批']].map(([id,stage],i)=>({id,entity:'jobs',type:'fire',no:'DH-SAMPLE-'+(i+1),level:'二级',content:(i?'验收审批':'安全措施')+'示例作业',unit:organizations[0],siteUnit:organizations[1],owner:'演示负责人',applicant:'演示管理员',applicantUnit:organizations[0],location:'演示厂区 A 区',method:'焊接',start:'2026-10-15T09:00',end:'2026-10-15T17:00',created:'2026-10-14 16:25',status:'申请中',stage,workers:['演示作业人员'],history:[]}));
seed.push(...supplementalJobs);

export const guardianSamples=[{id:'guardian-example-1',entity:'guardian',jobId:'job-fire-0',start:'2026-10-15T09:00',end:'2026-10-15T10:00',content:'演示焊接作业现场监护',ready:'yes',note:'现场安全措施已确认（虚构示例）',gas:'氧气含量检测（示例）'}];
seed.push(...guardianSamples);

export const actionSamples=[['sample-gas','气体检测'],['sample-disclosure','安全交底'],['sample-receive','接收交底']].map(([id,stage],i)=>({...supplementalJobs[0],id,no:'DH-ACTION-'+(i+1),stage,content:stage+'示例作业',todoGroup:'安全措施'}));
seed.push(...actionSamples);

export const entrySamples=[{id:'entry-example-1',entity:'entry',jobId:'job-confined-0',name:'演示作业人员',count:1,workerType:'普通作业人员',documentType:'身份证',start:'2026-10-15T09:00',end:'2026-10-15T10:00',status:'已退出'}];
seed.push(...entrySamples);
