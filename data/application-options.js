import {organizations} from './seed.js?v=7';
// Fictional people and projects. IDs remain stable across application forms.
export const applicationPeople=['演示管理员','演示负责人','演示作业人员','演示安全员','演示监护人','演示审批人','演示焊工','演示电工','演示指挥人','演示验收人','演示审核人','演示项目成员'].map((name,i)=>({id:'person-option-'+i,name,phone:'138****'+String(i+1).padStart(4,'0'),unit:organizations[i%organizations.length],department:'演示部门',post:i===6?'焊工':i===7?'电工':'—',certificate:i===6?'焊接与热切割作业':i===7?'电工作业':'',no:i===6?'DEMO-CERT-006':i===7?'DEMO-CERT-007':''}));
export const applicationProjects=organizations.flatMap((unit,i)=>[1,2,3].map(j=>({id:`project-option-${i}-${j}`,unit,name:`${unit}检修施工项目${j}`})));
