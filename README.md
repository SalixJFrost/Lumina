# 🌟 Lumina Reader

<div align="center">

![Lumina Reader](https://img.shields.io/badge/Lumina-Reader-1a8917?style=for-the-badge)
[![GitHub Pages](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](https://salixjfrost.github.io/Lumina/)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

**一个基于 Medium 风格设计的纯前端阅读聚合平台**

集成 Mozilla Readability 技术 | 9 种精美主题 | 多源内容聚合

[在线体验](https://salixjfrost.github.io/Lumina/) · [快速开始](docs/QUICKSTART.md) · [主题指南](docs/THEMES.md) · [功能特性](docs/FEATURES.md)

</div>

---

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

### 在线体验
👉 **[立即访问 Lumina Reader](https://salixjfrost.github.io/Lumina/)**

### 本地运行
```bash
# 克隆项目
git clone https://github.com/SalixJFrost/Lumina.git

# 进入目录
cd Lumina

# 在浏览器中打开 index.html
# 或使用本地服务器
python -m http.server 8000
```

### 部署到 GitHub Pages
1. Fork 本项目
2. 在仓库设置中启用 GitHub Pages
3. 选择 `main` 分支作为源
4. 访问 `https://your-username.github.io/Lumina`

详见 [部署指南](docs/DEPLOY.md)

## 📦 项目结构

```
Lumina/
├── index.html                 # 主页面
├── assets/
│   ├── css/
│   │   └── style.css         # 样式文件（9种主题）
│   └── js/
│       ├── script.js         # 主逻辑
│       └── Readability.js    # Mozilla Readability 库
├── docs/                      # 文档目录
│   ├── QUICKSTART.md         # 快速开始
│   ├── THEMES.md             # 主题指南
│   ├── FEATURES.md           # 功能特性
│   └── DEPLOY.md             # 部署指南
├── package.json              # 项目配置
├── CHANGELOG.md              # 更新日志
└── LICENSE                   # MIT 许可证
```

## 🎨 主题展示

9 种精心设计的阅读主题：

- 📄 **Medium 经典** - 纯净白色，专业阅读
- 🌿 **护眼纸张** - 米黄背景，长时间阅读
- 🌙 **深夜模式** - 真黑背景，夜间护眼
- 📖 **Kindle 风格** - 经典电子书体验
- 🍎 **Apple Books** - iOS 风格，精致优雅
- 🌸 **微信读书** - 温暖色调，移动友好
- 🌊 **柔和渐变** - 紫色渐变，创意氛围
- 🌌 **深空模式** - 深蓝渐变，沉浸体验
- 🌅 **暖阳模式** - 温暖渐变，早晨阅读

详见 [主题指南](docs/THEMES.md)

## 🔧 技术栈

- **纯前端** - HTML + CSS + JavaScript
- **Mozilla Readability** - Firefox Reader View 同款技术
- **无需后端** - 所有 API 都是公开免费的
- **无需 API Key** - 完全免费使用
- **支持跨域** - 使用 CORS 代理

## 📡 数据源

- [Open Library](https://openlibrary.org/) - 书籍搜索
- [Gutendex](https://gutendex.com/) - 公版书籍
- [RSS2JSON](https://rss2json.com/) - RSS 转换
- [Hacker News API](https://github.com/HackerNews/API) - 科技新闻
- [Wikipedia API](https://www.mediawiki.org/wiki/API) - 维基百科
- [AllOrigins](https://allorigins.win/) - CORS 代理
- [Quotable](https://github.com/lukePeavey/quotable) - 每日名言

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 贡献指南
1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## ⭐ Star History

如果这个项目对你有帮助，请给它一个 Star ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=SalixJFrost/Lumina&type=Date)](https://star-history.com/#SalixJFrost/Lumina&Date)

## 📄 许可

MIT License - 详见 [LICENSE](LICENSE)

## 🙏 致谢

- [Mozilla Readability](https://github.com/mozilla/readability) - 内容提取技术
- [Medium](https://medium.com) - 设计灵感
- 所有提供免费 API 的服务

## 📊 项目统计

![GitHub stars](https://img.shields.io/github/stars/SalixJFrost/Lumina?style=social)
![GitHub forks](https://img.shields.io/github/forks/SalixJFrost/Lumina?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/SalixJFrost/Lumina?style=social)

## 📮 联系

如有问题或建议，欢迎：
- 提交 [Issue](https://github.com/SalixJFrost/Lumina/issues)
- 发起 [Discussion](https://github.com/SalixJFrost/Lumina/discussions)

---

<div align="center">

**Made with ❤️ by [SalixJFrost](https://github.com/SalixJFrost)**

**享受阅读！** 📖✨

</div>
