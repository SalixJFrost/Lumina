# PureReader - 纯前端在线阅读器

一个基于 Medium 风格设计的纯前端阅读聚合平台，集成了 Mozilla Readability 技术，支持多种内容源。

## ✨ 特性

### 📚 书籍模块
- **Open Library** - 搜索全球书籍，查看封面和详情
- **Gutendex** - 阅读公版书籍完整内容
- **多源搜索** - 同时搜索多个数据源

### 📰 新闻模块
- **RSS 新闻** - BBC、NYT、人民网等主流媒体
- **Hacker News** - 科技新闻热榜

### 📖 知识模块
- **维基百科** - 中文维基百科搜索

### 🌐 网页阅读器
- **Readability 技术** - 智能提取网页正文
- **跨域支持** - 使用 CORS 代理访问任意网页
- **内容清理** - 移除广告、导航等干扰元素
- **优雅排版** - Medium 风格的阅读体验

### 📂 本地阅读
- 保存文章到本地存储
- 支持离线阅读

### 🎨 阅读体验
- **Medium 风格设计** - 优雅的排版和配色
- **9 种阅读主题** - 护眼纸张、深夜模式、Kindle、Apple Books 等
- **动态渐变背景** - 柔和渐变、深空、暖阳等特效主题
- **主题自动保存** - 记住你的偏好设置
- **字体调节** - 自定义字体大小和行距
- **阅读进度** - 实时显示阅读进度
- **每日名言** - 右下角显示每日名言
- **打印支持** - 优化的打印样式

## 🚀 快速开始

### 直接使用
1. 克隆或下载本项目
2. 在浏览器中打开 `index.html`
3. 开始阅读！

### 部署到 GitHub Pages
1. Fork 本项目
2. 在仓库设置中启用 GitHub Pages
3. 选择 `main` 分支作为源
4. 访问 `https://your-username.github.io/repository-name`

## 📦 项目结构

```
PureReader/
├── index.html              # 主页面
├── style.css               # Medium 风格样式
├── script.js               # 主要逻辑
├── Readability.js          # Mozilla 官方 Readability 库
├── package.json            # 依赖配置
├── README.md               # 说明文档
└── QUICKSTART.md           # 快速启动指南
```

## 🔧 技术栈

- **纯前端** - HTML + CSS + JavaScript
- **Mozilla Readability** - 官方 Firefox Reader View 使用的库
- **无需后端** - 所有 API 都是公开免费的
- **无需 API Key** - 完全免费使用
- **支持跨域** - 使用 CORS 代理

## 📡 使用的 API

### 书籍
- [Open Library API](https://openlibrary.org/developers/api) - 书籍搜索和详情
- [Gutendex API](https://gutendex.com) - 公版书籍阅读

### 新闻
- [RSS2JSON](https://rss2json.com) - RSS 转 JSON
- [Hacker News API](https://github.com/HackerNews/API) - 科技新闻

### 知识
- [Wikipedia API](https://www.mediawiki.org/wiki/API) - 维基百科搜索

### 网页解析
- [AllOrigins](https://allorigins.win) - CORS 代理
- [Mozilla Readability](https://github.com/mozilla/readability) - Firefox Reader View 使用的内容提取库

### 其他
- [Quotable API](https://github.com/lukePeavey/quotable) - 每日名言

## 🎯 核心功能

### 🎨 多主题阅读系统
9 种精心设计的阅读主题，适应不同场景：
- 📄 **Medium 经典** - 纯净白色，专业阅读
- 🌿 **护眼纸张** - 米黄背景，长时间阅读
- 🌙 **深夜模式** - 真黑背景，夜间护眼
- 📖 **Kindle 风格** - 经典电子书体验
- 🍎 **Apple Books** - iOS 风格，精致优雅
- 🌸 **微信读书** - 温暖色调，移动友好
- 🌊 **柔和渐变** - 紫色渐变，创意氛围
- 🌌 **深空模式** - 深蓝渐变，沉浸体验
- 🌅 **暖阳模式** - 温暖渐变，早晨阅读

详见 [主题指南](THEMES.md)

### Mozilla Readability 集成
使用 Firefox Reader View 同款技术：
- 智能内容提取
- 元数据解析（标题、作者、摘要、发布时间）
- 内容评分算法
- HTML 清理和格式化
- 相对 URL 转绝对 URL

### 阅读器功能
- 字体大小调节（14px - 32px）
- 行距调节（1.2 - 2.5）
- 阅读进度条
- 平滑滚动
- 打印优化

## 🌟 设计理念

### Medium 风格
- Charter 衬线字体用于正文
- 系统字体用于界面
- 21px 字体，1.58 行距
- 680px 最佳阅读宽度
- 优雅的留白和间距

### Readability 原则
- 移除干扰元素
- 保留核心内容
- 优化排版
- 提升可读性

## 🔒 隐私和安全

- **无数据收集** - 所有数据存储在本地
- **无追踪** - 不使用任何分析工具
- **开源** - 代码完全公开
- **安全** - 移除所有脚本和事件处理器

## 📝 使用限制

### CORS 限制
某些网站可能禁止跨域访问，导致网页解析失败。解决方案：
1. 使用提供的 CORS 代理
2. 直接在新标签页打开原网页
3. 使用浏览器扩展禁用 CORS（仅开发环境）

### API 限流
免费 API 可能有请求限制：
- RSS2JSON: 每小时 10,000 次
- AllOrigins: 无明确限制
- 其他 API: 通常无限制

## 🛠️ 开发

### 本地开发
```bash
# 克隆项目
git clone https://github.com/your-username/purereader.git

# 进入目录
cd purereader

# 使用任意 HTTP 服务器
# 方式 1: Python
python -m http.server 8000

# 方式 2: Node.js
npx serve

# 访问 http://localhost:8000
```

### 自定义
- 修改 `style.css` 调整样式
- 修改 `script.js` 添加新功能
- 修改 `readability-parser.js` 优化解析算法

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可

MIT License

## 🙏 致谢

- [Mozilla Readability](https://github.com/mozilla/readability) - 内容提取灵感
- [Medium](https://medium.com) - 设计灵感
- 所有提供免费 API 的服务

## 📮 联系

如有问题或建议，欢迎提交 Issue。

---

**享受阅读！** 📖✨
