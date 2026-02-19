# 📁 Lumina Reader 项目结构

## 目录结构

```
Lumina/
├── index.html                      # 主页面入口
├── package.json                    # 项目配置文件
├── LICENSE                         # MIT 许可证
├── README.md                       # 项目简介（根目录）
│
├── .github/                        # GitHub 配置
│   └── workflows/
│       └── deploy.yml             # GitHub Actions 自动部署
│
├── assets/                         # 资源文件目录
│   ├── css/
│   │   └── style.css              # 主样式文件（9种主题）
│   └── js/
│       ├── script.js              # 主要逻辑代码
│       └── Readability.js         # Mozilla Readability 库
│
└── docs/                           # 文档目录
    ├── README.md                   # 详细文档
    ├── QUICKSTART.md              # 快速开始指南
    ├── THEMES.md                  # 主题详细说明
    ├── THEME_COLORS.md            # 主题配色参考
    ├── FEATURES.md                # 功能特性详解
    ├── DEPLOY.md                  # 部署指南
    ├── SCREENSHOTS.md             # 截图说明
    ├── PROJECT_STATUS.md          # 项目状态
    ├── PROJECT_SUMMARY.md         # 项目总结
    ├── EXAMPLES.md                # 使用示例
    └── PROJECT_STRUCTURE.md       # 本文件
```

---

## 文件说明

### 根目录文件

#### `index.html`
- 项目主页面
- 包含完整的 HTML 结构
- 引用 assets 目录下的资源
- 包含主题选择器 UI

#### `package.json`
- 项目配置文件
- 定义项目名称、版本、依赖
- 包含启动脚本
- 配置仓库信息

#### `LICENSE`
- MIT 开源许可证
- 允许自由使用、修改、分发

#### `README.md`
- 项目简介和快速开始
- 链接到详细文档
- 展示项目特性
- 包含徽章和统计

---

### `.github/` 目录

#### `workflows/deploy.yml`
- GitHub Actions 工作流配置
- 自动部署到 GitHub Pages
- 每次推送到 main 分支时触发
- 无需手动配置

---

### `assets/` 目录

#### `assets/css/style.css`
**主样式文件，包含：**
- 9 种阅读主题的 CSS 变量
- Medium 风格的排版系统
- 响应式设计样式
- 动画和过渡效果
- 打印样式优化

**主题系统：**
```css
:root { /* 默认主题 */ }
body.theme-paper { /* 护眼纸张 */ }
body.theme-dark { /* 深夜模式 */ }
body.theme-kindle { /* Kindle 风格 */ }
body.theme-apple { /* Apple Books */ }
body.theme-wechat { /* 微信读书 */ }
body.theme-gradient { /* 柔和渐变 */ }
body.theme-space { /* 深空模式 */ }
body.theme-sunset { /* 暖阳模式 */ }
```

#### `assets/js/script.js`
**主要逻辑代码，包含：**
- 应用状态管理
- API 调用封装
- 视图渲染逻辑
- 主题切换系统
- 阅读器功能
- 事件处理

**主要模块：**
```javascript
- state: 应用状态
- API: API 调用集合
- Views: 视图渲染函数
- 主题系统
- 搜索功能
- 阅读器功能
- 工具函数
```

#### `assets/js/Readability.js`
- Mozilla 官方 Readability 库
- Firefox Reader View 使用的同款技术
- 智能提取网页正文
- 约 2500 行代码
- 无需修改，直接使用

---

### `docs/` 目录

#### `README.md`
- 完整的项目文档
- 详细的功能说明
- API 使用说明
- 技术栈介绍

#### `QUICKSTART.md`
- 快速开始指南
- 功能导览
- 使用技巧
- 常见问题

#### `THEMES.md`
- 9 种主题的详细说明
- 每个主题的设计理念
- 适用场景推荐
- 主题切换方法

#### `THEME_COLORS.md`
- 所有主题的配色方案
- CSS 变量定义
- 创建自定义主题的方法
- 配色建议和工具

#### `FEATURES.md`
- 功能特性详解
- 每个功能的说明
- 使用方法
- 技术实现

#### `DEPLOY.md`
- 部署指南
- GitHub Pages 部署
- 其他平台部署（Vercel、Netlify）
- 自定义域名配置
- 常见问题解答

#### `SCREENSHOTS.md`
- 项目截图说明
- 主题展示
- 功能展示
- 响应式设计展示

#### `PROJECT_STATUS.md`
- 项目完成情况
- 下一步计划
- 质量检查清单
- 已知问题
- 更新日志

#### `PROJECT_SUMMARY.md`
- 项目总结
- 技术选型
- 开发过程
- 经验总结

#### `EXAMPLES.md`
- 使用示例
- 代码示例
- 最佳实践

---

## 代码组织

### HTML 结构
```html
<!DOCTYPE html>
<html>
  <head>
    <!-- Meta 信息 -->
    <!-- CSS 引用 -->
  </head>
  <body>
    <!-- 导航栏 -->
    <header class="navbar">
      <div class="logo">Lumina Reader</div>
      <nav><!-- 导航按钮 --></nav>
      <button id="themeToggle">🎨</button>
    </header>
    
    <!-- 主题选择器 -->
    <div id="themeSelector" class="theme-selector">
      <!-- 9 个主题选项 -->
    </div>
    
    <!-- 主内容区 -->
    <main id="app"></main>
    
    <!-- 每日名言 -->
    <div id="quote" class="daily-quote"></div>
    
    <!-- 阅读进度条 -->
    <div id="progressBar"></div>
    
    <!-- Toast 通知 -->
    <div id="toast" class="toast"></div>
    
    <!-- JavaScript 引用 -->
    <script src="assets/js/Readability.js"></script>
    <script src="assets/js/script.js"></script>
  </body>
</html>
```

### CSS 组织
```css
/* 1. CSS 变量（主题系统） */
:root { /* 默认主题变量 */ }
body.theme-* { /* 各主题变量 */ }

/* 2. 基础样式 */
* { /* 重置样式 */ }
body { /* 全局样式 */ }

/* 3. 布局组件 */
.navbar { /* 导航栏 */ }
#app { /* 主内容区 */ }

/* 4. UI 组件 */
.card { /* 卡片 */ }
.theme-selector { /* 主题选择器 */ }
.reader { /* 阅读器 */ }

/* 5. 响应式设计 */
@media (max-width: 768px) { /* 平板 */ }
@media (max-width: 480px) { /* 手机 */ }

/* 6. 打印样式 */
@media print { /* 打印优化 */ }
```

### JavaScript 组织
```javascript
(function () {
  // 1. DOM 元素引用
  const app = document.getElementById("app");
  // ...
  
  // 2. 应用状态
  const state = { /* ... */ };
  
  // 3. API 封装
  const API = { /* ... */ };
  
  // 4. 视图函数
  const Views = {
    books: () => { /* ... */ },
    news: () => { /* ... */ },
    knowledge: () => { /* ... */ },
    web: () => { /* ... */ },
    local: () => { /* ... */ }
  };
  
  // 5. 业务逻辑函数
  function searchBooks() { /* ... */ }
  function parseWebPage() { /* ... */ }
  // ...
  
  // 6. 工具函数
  function debounce() { /* ... */ }
  function showToast() { /* ... */ }
  // ...
  
  // 7. 主题系统
  function applyTheme() { /* ... */ }
  
  // 8. 事件监听
  document.querySelectorAll("[data-view]").forEach(/* ... */);
  
  // 9. 初始化
  Views.books();
  loadDailyQuote();
})();
```

---

## 开发规范

### 命名规范
- **文件名**: kebab-case（小写短横线）
- **CSS 类名**: kebab-case
- **JavaScript 变量**: camelCase
- **JavaScript 常量**: UPPER_SNAKE_CASE
- **JavaScript 函数**: camelCase

### 代码风格
- 缩进：2 空格
- 引号：单引号（JavaScript）、双引号（HTML）
- 分号：JavaScript 使用分号
- 注释：中文注释，说明关键逻辑

### Git 提交规范
```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式
refactor: 重构
perf: 性能优化
test: 测试
chore: 构建/工具
```

---

## 依赖管理

### 运行时依赖
- 无（纯前端，无需 Node.js 运行时）

### 开发依赖
```json
{
  "@mozilla/readability": "^0.6.0",  // 仅用于参考
  "jsdom": "^28.1.0"                  // 仅用于参考
}
```

### 外部 API
- Open Library API
- Gutendex API
- RSS2JSON
- Hacker News API
- Wikipedia API
- AllOrigins
- Quotable API

---

## 构建和部署

### 无需构建
- 纯静态文件
- 无需编译
- 无需打包
- 直接部署

### 部署方式
1. **GitHub Pages** - 推荐
2. **Vercel** - 一键部署
3. **Netlify** - 一键部署
4. **Cloudflare Pages** - 高性能
5. **任何静态托管** - 通用

---

## 性能优化

### 已实现
- CSS 变量系统（减少重复代码）
- 防抖搜索（减少 API 请求）
- 滚动节流（优化性能）
- localStorage 缓存（主题、文章）
- 懒加载（部分实现）

### 可优化
- 图片懒加载
- 代码分割
- Service Worker（PWA）
- CDN 加速
- 资源压缩

---

## 维护指南

### 添加新主题
1. 在 `style.css` 中添加主题变量
2. 在 `index.html` 中添加主题选项
3. 在 `script.js` 中注册主题
4. 更新 `THEMES.md` 文档

### 添加新功能
1. 在 `Views` 对象中添加视图函数
2. 在导航栏添加按钮
3. 实现业务逻辑
4. 更新文档

### 修复 Bug
1. 定位问题
2. 修复代码
3. 测试验证
4. 提交更改

---

**项目结构清晰，易于维护和扩展！** 📁✨
