# PROJECT_MAP

## 当前工程

原生多入口HTML，36个独立页面。延续既有工程，未修改其他原型项目。全量1:1验收尚未完成；覆盖和限制见 reference/OBSERVATIONS-2026-10-16.md。

| 层 | 文件 | 职责 |
|---|---|---|
| 注册 | config/pages.config.js、config/job-fields.js | 页面、菜单、类型和专属字段 |
| 共享组件 | components/layout.js | 定制抬头、侧栏、表格、组织树和输入对话框 |
| 页面控制 | modules/app.js、modules/jobs.js | 列表、筛选、待办分组、参数配置及操作分派 |
| 申请/详情 | modules/apply.js、modules/detail.js | 申请布局与13类差异、统一记录展示 |
| 流程 | modules/workflow.js | 独立风险、措施、审批、交底、气体与验收表单，签字与本地保存 |
| 票据 | modules/ticket.js、styles/ticket.css | 独立无侧栏作业票与打印样式 |
| 抽屉 | modules/guardian.js、modules/entry-register.js | 监护记录、出入登记 |
| 数据 | services/repository.js、data/seed.js | IndexedDB CRUD、迁移、通知、虚构样例 |
| 样式 | styles/app.css、styles/apply.css、styles/workflow.css | 共用令牌、申请和流程布局 |
| 预览 | serve.py | 本地HTTP服务，模块并发和缓存处理 |

## 页面注册

| 页面 | 独立入口 |
|---|---|
| 验收审批 | pages/accept-approval.html |
| 辅助分析 | pages/analysis.html |
| 申请作业票 | pages/apply.html |
| 爆破作业 | pages/blasting.html |
| 盲板抽堵作业 | pages/blind.html |
| 搬运作业 | pages/carry.html |
| 受限空间作业 | pages/confined.html |
| 吊装作业 | pages/crane.html |
| 作业详情 | pages/detail.html |
| 监控设备配置 | pages/devices.html |
| 拆卸作业 | pages/disassembly.html |
| 安全交底配置 | pages/disclosure-settings.html |
| 安全交底 | pages/disclosure.html |
| 动土作业 | pages/earth.html |
| 临时用电作业 | pages/electric.html |
| 结束确认标准 | pages/end-settings.html |
| 动火作业 | pages/fire.html |
| 气体检测 | pages/gas-detection.html |
| 隐患排查 | pages/hazards.html |
| 高处作业 | pages/high.html |
| 安装作业 | pages/install.html |
| 智能监测 | pages/intelligent.html |
| 安全措施确认 | pages/measures.html |
| 实时监控 | pages/monitor.html |
| 接收交底 | pages/receive-disclosure.html |
| 历史监控回放 | pages/replay.html |
| 风险评估 | pages/risk-assessment.html |
| 风险内容配置 | pages/risk-settings.html |
| 断路作业 | pages/road.html |
| 常规作业 | pages/routine.html |
| 综合配置 | pages/settings.html |
| 提交验收 | pages/submit-accept.html |
| 安全作业票 | pages/ticket.html |
| 我的待办 | pages/todo.html |
| 作业类型配置 | pages/type-settings.html |
| 作业审批 | pages/work-approval.html |

## 数据关系与交互

- jobs为统一作业对象。列表、待办、详情、票据与统计通过稳定id重新读取记录。
- apply.html?type=fire；编辑用id，复制用copy；detail.html?id=…，从待办进入增加from=todo；ticket.html?id=…在新窗口打开。
- todoGroup将安全措施确认、气体检测、安全交底、接收交底归入安全措施页签；现场实施按钮显示“提交验收”。
- jobs.deviceId→devices.id；guardian.jobId、entry.jobId→jobs.id。删除作业同步删除本地监护与出入记录，避免孤立数据。
- 风险、措施、签字、交底、气体及验收信息保存在同一作业记录中，详情和票据读取相同内容。
- 本地流程仅为原型交互，真实权限、退回分支、培训、验票和审批节点规则尚未完整确认。
- 原型统计由jobs计算，数据为虚构。当前演示图表口径与原站口径存在已标注差异。

## 影响范围

共享组件和app.css影响所有应用页；申请字段影响13类申请及校验；workflow.js和jobs模型影响待办、详情、票据、统计；repository变更影响全部数据页面；guardian和entry影响列表抽屉及关联删除。

最新验证见 tests/ACCEPTANCE-2026-10-16.md；剩余事项见 reference/REVIEW_PENDING.md。

## 高处作业申请增量

- `modules/high-apply.js`：高处作业专属表单增强与审批节点、选择结果保存。
- `components/application-picker.js`：项目、单位、成员、关联票、人员表格和地图空状态弹窗。
- `components/date-picker.js`、`components/device-select.js`：日期时间浮层、监控设备多选。
- `data/application-options.js`：本地人员/项目虚构字典及稳定主键。
- `tests/high-application.cjs`：高处申请弹窗、取消/回填、提交和回读专项验证。

## 高处作业票优化评审版

`modules/high-ticket.js`负责专属纸质票面；`config/high-ticket.js`统一危险因素、措施、四个审批节点和验收声明；`services/ticket-number.js`负责部门/月度流水号事务分配。评审标黄范围与数据读取见 `reference/HIGH-TICKET-REVIEW.md`，专项验收见 `tests/high-ticket-review.cjs`。

## 接收交底照片增量（2026-10-17）

`components/receive-photo.js`提供可选照片字段、图片预览/移除及照片读取；`modules/workflow.js`仅在接收交底页接入，随现有签字提交保存到同一作业记录的receivePhoto、receivePhotoData。详情的安全交底记录显示保存的照片；刷新可回读，其他交底页面不增加字段。

## 安全交底照片增量

`components/disclosure-photos.js`提供安全交底最多三张图片的累计选择、预览、移除和数量限制；新增字段disclosurePhotos随签字提交写入同一作业记录，详情可查看、刷新可回读。仅安全交底页接入，接收交底单张照片字段保持原行为。

## 安全措施确认基线复核

- `modules/measures.js`：按基线独立处理逐条措施、条件展开、批量操作、统计、参数和签字。
- `components/photo-cards.js`：共用96px虚线“＋”照片卡片，供措施、安全交底复用；接收交底沿用同一视觉样式。
- `tests/measures-parity.cjs`：确认状态、条件展开、照片预览/移除、三张限制、签字、提交与刷新回读验证。
- 基线观察与明确差异见 `reference/MEASURES-PARITY-2026-10-20.md`。本轮未推送GitHub。

## A4两页作业票（2026-10-21）

`styles/ticket-print.css`限定打印排版，高处票的正文/措施与签字/验收分两页，并保留编号、页码与全部内容。`tests/ticket-print.cjs`使用浏览器真实导出PDF并检查空白票、完整签字票均为两页A4。打印样例位于本地output/pdf，作为生成文件不纳入仓库。发布版本统一更新资源版本号，避免沿用旧缓存。
