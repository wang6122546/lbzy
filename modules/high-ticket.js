import {esc} from '../components/layout.js?v=7';
import {highHazards,highApprovalNodes,highCompletion,highMeasures} from '../config/high-ticket.js?v=9';
import {applicationPeople} from '../data/application-options.js?v=8';
export function renderHighTicket(x){
 const date=v=>esc(v?String(v).replace('T',' '):'　年　月　日　时　分');
 const sign=v=>v?.startsWith('data:image/png;base64,')?`<img class="signature" alt="电子签名" src="${v}">`:'　　　　　　　';
 const actor=(name,phone)=>{phone=phone||applicationPeople.find(p=>p.name===name)?.phone||'—';return esc((name||'—')+(name?.includes(phone)?'':' '+phone));};
 const slot=v=>`<span class="permit-signature-slot">${sign(v)}</span>`;
 const time=v=>v?`<span class="permit-time filled">${date(v)}</span>`:`<span class="permit-time blank">${['年','月','日','时','分'].map(n=>`<span><i></i>${n}</span>`).join('')}</span>`;
 const history=x.history||[],measureEvent=[...history].reverse().find(h=>h.stage==='安全措施确认'),riskEvent=[...history].reverse().find(h=>h.stage==='风险评估'),completionEvent=[...history].reverse().find(h=>h.stage==='提交验收');
 const measures=x.measures?.length?x.measures:highMeasures.map(content=>({content}));const risks=x.risks||[];
 const approvals=history.filter(h=>h.stage==='作业审批');
 const cell=(v,n=3,highlight=false)=>`<td colspan="${n}"${highlight?' class="review-change"':''}>${esc(v||'-')}</td>`;
 const pair=(a,b,c,d)=>`<tr>${cell(a)}${cell(b)}${cell(c)}${cell(d)}</tr>`;
 const certs=[...(x.workers||[]).map(n=>n+' -'),...(x.specialWorkers||[]).map(w=>[w.name,w.certificate,w.no].filter(Boolean).join(' '))].join('　|　');
 const aliases=['作业指挥意见','所在单位意见','审核部门意见','审批部门意见'];
 const approvalFor=(node,i)=>[...history].reverse().find(h=>h.approvalNode===node||h.approvalNode===aliases[i]||h.stage===aliases[i])||(i===0?[...approvals].reverse().find(h=>!h.approvalNode):null);
 const acceptance=[...history].reverse().find(h=>h.stage==='完工验收意见'||h.stage==='验收审批');
 const historyBlock=(label,h,highlight=false,cls='')=>{const decision=h?.decision||(h?.note==='同意'||h?.note==='同意作业'?'同意':h?.note==='不同意'||h?.note==='不同意作业'?'不同意':'');const isAcceptance=label==='完工验收意见';const positive=isAcceptance?'验收通过':'同意作业',negative=isAcceptance?'验收不通过':'不同意作业';const opinion=decision==='同意'?positive:decision==='不同意'?negative:h?.note||'';return `<tr class="approval-line ${highlight?'review-change':''} ${cls}"><td colspan="8" class="left">${esc(label)}</td><td colspan="4" class="left approval-opinion">${h?esc(opinion):`<span class="opinion-placeholder">□ ${positive}　□ ${negative}</span>`}${h?.note&&decision&&!['同意','不同意','同意作业','不同意作业'].includes(h.note)?`<span class="approval-note">　${esc(h.note)}</span>`:''}</td></tr><tr class="approval-sign ${highlight?'review-change':''}"><td colspan="8"><div class="approval-sign-area"><span>签字</span>${slot(h?.signature)}</div></td><td colspan="4">${time(h?.time)}</td></tr>`;};

 return `<article class="high-permit baseline-ticket"><h1>高处作业票</h1><p class="ticket-number">编号：<span class="review-change">${esc(x.no)}</span></p><table aria-label="高处作业票明细"><colgroup>${'<col>'.repeat(12)}</colgroup><tbody>
 ${pair('作业申请单位',x.applicantUnit,'作业申请时间',x.created)}
 ${pair('作业地点',[x.unit,x.siteUnit,x.location].filter(Boolean).join('-'),'作业内容',x.content)}
 ${pair('作业高度',x.height,'高处作业级别',x.level)}
 <tr>${cell('作业类别',3,true)}<td colspan="9" class="review-change">${['一般高处作业','特殊高处作业'].map(n=>`<span class="permit-option">${x.category===n?'☑':'□'} ${n}</span>`).join('')}</td></tr>
 <tr>${cell('作业单位')}${cell(x.unit)}${cell('作业负责人及手机号',3,true)}<td colspan="3" class="review-change">${actor(x.owner,x.ownerPhone)}</td></tr>
 <tr>${cell('监护人及手机号',3,true)}<td colspan="9" class="review-change">${[actor(x.person3,x.person3Phone),actor(x.person4,x.person4Phone)].join('、')}</td></tr>
 <tr>${cell('作业人及证书编号')}<td colspan="9">${esc(certs||'-')}</td></tr>
 ${pairWide('关联的其他特殊作业及安全作业票编号',x.linkedTicket||x.linkedJobNames||'无')}
 <tr><td colspan="3" class="review-change">主要危险、危害因素（涉及打✅）：</td><td colspan="9" class="review-change"><div class="permit-hazards">${highHazards.map(n=>`<span>${risks.includes(n)?'☑':'□'} ${esc(n)}${n==='其他'?'：'+esc(x.riskNote||'________________'):''}</span>`).join('')}${risks.filter(n=>!highHazards.includes(n)).map(n=>`<span>☑ ${esc(n)}</span>`).join('')}</div><div class="permit-risk-sign"><span>项目负责人评估签字：</span>${slot(x.riskSignature||riskEvent?.signature)}</div></td></tr>
 ${pairWide('作业实施时间','自 '+stamp(x.actualStart||x.start)+' 至 '+stamp(x.actualEnd||x.end)+' 止')}
 ${x.gasRecords?.length?x.gasRecords.map(g=>pairWide('气体检测记录',[g.time,g.location,g.name,g.result,g.person].filter(Boolean).join('　'))).join(''):''}
 <tr>${cell('序号',1)}${cell('安全措施',7)}${cell('是否涉及',2)}${cell('确认人',2)}</tr>
 ${measures.map((m,i)=>`<tr class="baseline-measure">${cell(i+1,1)}${cell(m.content,7)}${cell(m.involved||(m.status==='不涉及'?'否':m.status==='已落实'?'是':''),2)}<td colspan="2">${sign(m.signature)}${m.person?esc(m.person):''}</td></tr>${m.remark?pairWide('措施'+(i+1)+'备注',m.remark):''}`).join('')}
 ${x.extraMeasure?pairWide('其他补充安全措施',x.extraMeasure):''}
 <tr class="review-change"><td colspan="3">安全措施确认人签字及时间</td><td colspan="9"><div class="permit-confirm">${slot(x.measuresSignature||measureEvent?.signature)}${time(x.measuresConfirmedAt||measureEvent?.time)}</div></td></tr>
 <tr>${cell('安全交底人')}<td colspan="3">${sign(x.disclosureSignature)}</td>${cell('接收交底人')}<td colspan="3">${sign(x.receiveSignature)}</td></tr>
 ${highApprovalNodes.map((node,i)=>historyBlock(node,approvalFor(node,i),true,'permit-approval')).join('')}
 ${historyBlock('完工验收意见',acceptance)}
 <tr><td rowspan="2" colspan="3" class="review-change completion-label">完工验收内容</td><td colspan="9" class="left review-change completion-times">实际开始时间：${time(x.actualStart)}<span>作业结束时间：</span>${time(x.actualEnd)}</td></tr>
 <tr><td colspan="9" class="left review-change"><p class="completion-declaration">${esc(x.completionDeclaration||highCompletion)}</p><div class="completion-sign-area"><span>作业项目负责人（签字）：</span>${slot(x.completionSignature||completionEvent?.signature)}${time(x.completionSignedAt||completionEvent?.time)}</div></td></tr>
 </tbody></table></article>`;
 function pairWide(label,value){return `<tr>${cell(label)}${cell(value,9)}</tr>`;}
 function stamp(v){return v?String(v).replace('T',' ').replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/,'$1年$2月$3日 $4时$5分'):'-';}
}
