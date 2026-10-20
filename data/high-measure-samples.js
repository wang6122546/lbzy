import {highMeasures} from '../config/high-ticket.js?v=20261021';
// Fictional review examples; only supplement the untouched built-in sample job.
export const highMeasureSamples=highMeasures.map((content,i)=>({content,status:['符合','符合','符合','不涉及','符合','不涉及','不符合','符合','符合','不涉及','不涉及','符合','符合'][i],person:['演示安全员（示例）','演示确认人（示例）','演示监护人（示例）'][i%3],example:true}));
export function measureCompliance(measure){return ({'符合':'符合','不符合':'不符合','不涉及':'不涉及','已落实':'符合','未落实':'不符合'})[measure.status]||(measure.involved==='否'?'不涉及':'');}
