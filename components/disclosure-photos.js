import {photoCardsField,bindPhotoCards} from './photo-cards.js?v=20261021';
export const disclosurePhotosField=()=>`<div class="flow-row review-change disclosure-photos-row"><label>上传照片:</label><div>${photoCardsField('disclosurePhotoFiles',{label:'上传安全交底照片',max:3})}</div></div>`;
export function bindDisclosurePhotos(form,record,toast){const container=form.querySelector('[data-photo-cards=disclosurePhotoFiles]');if(!container)return null;const gallery=bindPhotoCards(container,record.disclosurePhotos||[],toast);return {payload:async()=>({disclosurePhotos:await gallery.get()})};}
