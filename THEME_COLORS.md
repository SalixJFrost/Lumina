# 主题配色参考

快速查看所有主题的配色方案，方便自定义和扩展。

## 📄 Medium 经典
```css
--bg: #ffffff
--text: rgba(41, 41, 41, 1)
--text-secondary: rgba(117, 117, 117, 1)
--border: rgba(230, 230, 230, 1)
--accent: #1a8917
```

## 🌿 护眼纸张
```css
--bg: #F5F1E8
--text: #2E2E2E
--text-secondary: #6B6B6B
--border: rgba(46, 46, 46, 0.1)
--accent: #8B7355
```

## 🌙 深夜模式
```css
--bg: #121212
--text: rgba(255, 255, 255, 0.92)
--text-secondary: rgba(255, 255, 255, 0.54)
--border: rgba(255, 255, 255, 0.15)
--accent: #5cb85c
```

## 🌊 柔和渐变
```css
--bg: #ffffff
--text: #2E2E2E
--text-secondary: #6B6B6B
--border: rgba(46, 46, 46, 0.1)
--accent: #7B68EE
background: radial-gradient(circle at 30% 30%, #f3e7ff, #ffffff)
```

## 📖 Kindle 风格
```css
--bg: #FBF8F1
--text: #3C3C3C
--text-secondary: #7A7A7A
--border: rgba(60, 60, 60, 0.1)
--accent: #A0826D
```

## 🍎 Apple Books
```css
--bg: #FAFAFA
--text: #1D1D1F
--text-secondary: #86868B
--border: rgba(0, 0, 0, 0.08)
--accent: #007AFF
```

## 🌸 微信读书
```css
--bg: #F6F1E7
--text: #333333
--text-secondary: #999999
--border: rgba(51, 51, 51, 0.1)
--accent: #FF6B35
```

## 🌌 深空模式
```css
--bg: #0A0E27
--text: #E8E8E8
--text-secondary: #A0A0A0
--border: rgba(232, 232, 232, 0.1)
--accent: #64B5F6
background: linear-gradient(135deg, #0A0E27 0%, #1A1F3A 100%)
```

## 🌅 暖阳模式
```css
--bg: #FFF9F0
--text: #4A4A4A
--text-secondary: #8A8A8A
--border: rgba(74, 74, 74, 0.1)
--accent: #FF8C42
background: linear-gradient(180deg, #FFF9F0 0%, #FFE8D6 100%)
```

---

## 使用方法

### 在代码中使用
```css
.my-element {
    background: var(--bg);
    color: var(--text);
    border: 1px solid var(--border);
}

.my-button {
    background: var(--accent);
    color: white;
}

.my-button:hover {
    background: var(--accent-hover);
}
```

### 创建新主题
1. 在 `style.css` 中添加新主题类：
```css
body.theme-mytheme {
    --bg: #你的背景色;
    --text: #你的文字色;
    --text-secondary: #你的次要文字色;
    --border: #你的边框色;
    --card-hover: #你的悬停色;
    --accent: #你的强调色;
    --accent-hover: #你的强调悬停色;
}
```

2. 在 `script.js` 中注册主题：
```javascript
const themes = {
    // ... 其他主题
    mytheme: { name: '我的主题', icon: '✨' }
};
```

3. 在 `index.html` 中添加选项：
```html
<div class="theme-option" data-theme="mytheme">
    <span>✨</span> 我的主题
</div>
```

## 配色建议

### 对比度
- 文字与背景对比度应 ≥ 4.5:1 (WCAG AA)
- 大号文字对比度应 ≥ 3:1

### 色彩搭配
- **浅色主题**: 背景 #F0-#FF，文字 #20-#40
- **深色主题**: 背景 #00-#20，文字 #E0-#FF
- **强调色**: 与背景形成鲜明对比

### 工具推荐
- [Coolors](https://coolors.co/) - 配色方案生成
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - 对比度检查
- [Adobe Color](https://color.adobe.com/) - 色轮工具

## 主题设计原则

1. **可读性优先** - 确保文字清晰易读
2. **眼睛舒适** - 避免过高对比度
3. **情感传达** - 色彩符合使用场景
4. **一致性** - 保持设计语言统一
5. **可访问性** - 满足无障碍标准

---

**开始创建你的专属主题吧！** 🎨
