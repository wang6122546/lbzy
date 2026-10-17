# lbzy · 安全作业管理前端原型

基于用户授权测试系统的只读遍历制作，已增量修正主要列表、申请和操作链路。当前不是全量1:1验收完成版；准确覆盖及差异见 [最新观察](reference/OBSERVATIONS-2026-10-16.md)。

外网访问：[打开原型](https://wang6122546.github.io/lbzy/)；[高处作业票](https://wang6122546.github.io/lbzy/pages/ticket.html?id=job-high-0)。

通过 GitHub Pages 从 `main` 分支根目录发布，无需构建。直接访问各独立 HTML 页面。数据使用浏览器 IndexedDB，访问者之间相互独立；接收交底照片和签字保存在各自浏览器中。

本地启动：

```bash
cd lbzy
python3 serve.py
```

打开 http://localhost:8769 。使用原生HTML、CSS、ES Modules，无前端运行依赖和CDN。36个独立页面；13类申请使用 apply.html?type=fire 等类型参数。

- 抬头与账户按用户指定的来宾项目参考统一。
- IndexedDB统一保存虚构任务、流程记录、措施、气体、监护与出入登记；版本5增量补充缺失样例，保留原有用户记录。
- BroadcastChannel通知其他查看页面刷新；申请和处理表单不被后台通知重绘。
- 作业票独立预览并使用浏览器打印；真实票据各类型细节仍有待核对。
- 一般附件目前记录文件名；接收交底照片与签字保存在当前浏览器中。没有写入真实系统。
- 侧栏“重置演示数据”恢复初始样例，操作前会确认。

项目结构见 PROJECT_MAP.md；最新验证见 tests/ACCEPTANCE-2026-10-16.md 与 tests/2026-10-16/results.json。
