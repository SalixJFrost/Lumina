# 使用示例

## 🌐 网页阅读器示例

### 测试 URL 列表

以下是一些适合测试的网页 URL：

#### 新闻网站
```
https://www.bbc.com/news/world
https://www.theguardian.com/international
https://www.reuters.com/world/
https://apnews.com/
```

#### 技术博客
```
https://medium.com/@username/article-title
https://dev.to/username/article-title
https://blog.cloudflare.com/
https://engineering.fb.com/
```

#### 文档和教程
```
https://developer.mozilla.org/en-US/docs/Web
https://nodejs.org/en/docs/
https://reactjs.org/docs/
```

### 使用步骤

1. **打开网页阅读器**
   - 点击顶部导航的"🌐 网页"标签

2. **输入 URL**
   - 在输入框中粘贴完整的文章 URL
   - 例如：`https://www.bbc.com/news/world-12345678`

3. **点击解析**
   - 点击"解析"按钮
   - 等待内容加载（通常 2-5 秒）

4. **享受阅读**
   - 查看提取的正文内容
   - 使用阅读器功能调整字体和行距
   - 查看文章元数据（作者、来源、字数等）

### 快速访问按钮

点击预设的快速访问按钮可以直接访问热门网站：

- **BBC News** - 国际新闻
- **The Guardian** - 深度报道
- **Medium** - 技术和创意文章
- **Hacker News** - 科技新闻讨论

## 📚 书籍搜索示例

### Open Library 搜索

**搜索示例：**
```
Harry Potter
The Great Gatsby
1984 George Orwell
三体
红楼梦
```

**技巧：**
- 使用书名 + 作者名可以获得更精确的结果
- 支持中英文搜索
- 点击书籍可查看详情和简介

### Gutendex 搜索（可阅读）

**搜索示例：**
```
Pride and Prejudice
Alice in Wonderland
Sherlock Holmes
Moby Dick
```

**特点：**
- 主要是公版书籍（版权过期）
- 可以直接在线阅读完整内容
- 支持多种语言
- 提供多种格式（HTML、纯文本）

### 多源搜索

选择"全部搜索"可以同时搜索 Open Library 和 Gutendex，获得更全面的结果。

## 📰 新闻阅读示例

### RSS 新闻源

**预设新闻源：**
1. **BBC News** - 英国广播公司
2. **New York Times** - 纽约时报
3. **人民网** - 中文新闻

**使用方法：**
- 选择新闻源
- 浏览标题列表
- 点击标题阅读全文

### Hacker News

**特点：**
- 科技新闻热榜
- 显示点赞数和评论数
- 点击标题跳转到原文或讨论页

## 📖 维基百科搜索示例

**搜索示例：**
```
人工智能
Quantum Computing
JavaScript
中国历史
```

**功能：**
- 实时搜索中文维基百科
- 显示文章摘要和缩略图
- 可跳转到完整词条

## 📂 本地阅读示例

### 保存文章

1. **粘贴内容**
   ```
   将任意文本内容粘贴到输入框
   可以是：
   - 复制的文章
   - 自己的笔记
   - 待读的内容
   ```

2. **点击保存**
   - 文章会保存到浏览器本地存储
   - 自动添加保存时间

3. **随时访问**
   - 点击已保存的文章即可阅读
   - 支持离线访问

### 管理文章

- **查看列表** - 显示所有已保存的文章
- **点击阅读** - 打开阅读器
- **清空全部** - 删除所有保存的文章

## 🎨 阅读器功能示例

### 字体调节

```
默认字体大小：21px
调节范围：14px - 32px

操作：
- 点击 A+ 增大字体
- 点击 A- 减小字体
- 每次调整 2px
```

### 行距调节

```
默认行距：1.58
调节范围：1.2 - 2.5

操作：
- 点击"行距+"增加行距
- 点击"行距-"减少行距
- 每次调整 0.1
```

### 其他功能

- **返回按钮** - 返回列表页
- **打印按钮** - 打印或保存为 PDF
- **进度条** - 顶部显示阅读进度
- **平滑滚动** - 自动滚动到顶部

## 🌓 主题切换

点击右上角的 🌙/☀️ 图标：

- **浅色模式** - 白色背景，适合白天
- **深色模式** - 黑色背景，适合夜间
- **自动保存** - 下次访问时保持选择

## 💡 高级技巧

### 1. 批量保存文章

```javascript
// 在浏览器控制台执行
const articles = [
  "文章内容1",
  "文章内容2",
  "文章内容3"
];

articles.forEach(content => {
  const saved = JSON.parse(localStorage.getItem("articles") || "[]");
  saved.push({
    id: Date.now(),
    content,
    date: new Date().toLocaleString()
  });
  localStorage.setItem("articles", JSON.stringify(saved));
});
```

### 2. 导出保存的文章

```javascript
// 导出为 JSON
const articles = localStorage.getItem("articles");
const blob = new Blob([articles], { type: 'application/json' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'purereader-articles.json';
a.click();
```

### 3. 导入文章

```javascript
// 从 JSON 导入
const input = document.createElement('input');
input.type = 'file';
input.accept = 'application/json';
input.onchange = e => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = event => {
    localStorage.setItem("articles", event.target.result);
    location.reload();
  };
  reader.readAsText(file);
};
input.click();
```

### 4. 自定义 RSS 源

编辑 `script.js` 中的 RSS 源列表：

```javascript
<select id="newsSource">
  <option value="http://feeds.bbci.co.uk/news/rss.xml">BBC</option>
  <option value="你的RSS地址">你的新闻源</option>
</select>
```

### 5. 添加快速访问网站

编辑 `script.js` 中的快速访问按钮：

```javascript
<div class="source-tabs">
  <button data-url="https://your-site.com">你的网站</button>
</div>
```

## 🔍 故障排除

### 网页解析失败

**问题：** 点击解析后显示错误

**解决方案：**
1. 检查 URL 是否完整（包含 `https://`）
2. 尝试使用文章页面而不是首页
3. 某些网站可能禁止跨域访问
4. 点击"在新标签页打开"直接访问

### RSS 新闻加载慢

**问题：** 新闻列表加载时间长

**解决方案：**
1. RSS2JSON 免费服务可能有延迟
2. 刷新页面重试
3. 尝试其他新闻源

### 本地文章丢失

**问题：** 保存的文章不见了

**原因：**
- 清除了浏览器数据
- 使用了不同的浏览器
- 使用了隐私/无痕模式

**预防：**
- 定期导出重要文章
- 使用上面的导出功能备份

### 字体显示异常

**问题：** 字体看起来不对

**解决方案：**
1. 检查系统是否安装了 Charter 字体
2. 浏览器会自动降级到 Georgia 或 Times
3. 可以在 `style.css` 中自定义字体

## 📱 移动端使用

### 触摸操作

- **点击** - 选择和打开
- **滑动** - 滚动内容
- **双击** - 放大文字（浏览器功能）
- **捏合** - 缩放页面（浏览器功能）

### 移动端优化

- 响应式布局自动适配
- 字体大小自动调整
- 触摸友好的按钮大小
- 隐藏不必要的元素（如每日名言）

## 🎯 最佳实践

1. **阅读长文** - 使用网页阅读器提取正文
2. **收藏文章** - 保存到本地阅读
3. **调整舒适度** - 自定义字体和行距
4. **深色模式** - 夜间阅读更护眼
5. **打印保存** - 使用打印功能保存 PDF
6. **定期备份** - 导出重要的本地文章

---

**更多问题？** 查看 [README.md](README.md) 或 [QUICKSTART.md](QUICKSTART.md)
