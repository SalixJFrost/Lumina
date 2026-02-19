# 🚀 部署指南

## GitHub Pages 部署（推荐）

### 方式 1: 自动部署（已配置）

本项目已配置 GitHub Actions 自动部署，每次推送到 `main` 分支时会自动部署。

**启用步骤：**

1. 进入仓库设置：`Settings` → `Pages`
2. Source 选择：`GitHub Actions`
3. 等待 Actions 运行完成
4. 访问：`https://salixjfrost.github.io/Lumina/`

### 方式 2: 手动部署

1. 进入仓库设置：`Settings` → `Pages`
2. Source 选择：`Deploy from a branch`
3. Branch 选择：`main` / `(root)`
4. 点击 Save
5. 等待几分钟后访问：`https://salixjfrost.github.io/Lumina/`

### Fork 后部署

1. Fork 本仓库到你的账号
2. 进入你的仓库设置：`Settings` → `Pages`
3. 启用 GitHub Pages（选择 `main` 分支）
4. 访问：`https://你的用户名.github.io/Lumina/`

---

## 其他部署方式

### Vercel 部署

1. 访问 [Vercel](https://vercel.com)
2. 导入 GitHub 仓库
3. 无需配置，直接部署
4. 获得自定义域名

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SalixJFrost/Lumina)

### Netlify 部署

1. 访问 [Netlify](https://netlify.com)
2. 导入 GitHub 仓库
3. 无需配置，直接部署
4. 获得自定义域名

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/SalixJFrost/Lumina)

### Cloudflare Pages 部署

1. 访问 [Cloudflare Pages](https://pages.cloudflare.com)
2. 连接 GitHub 仓库
3. 构建设置：
   - Build command: 留空
   - Build output directory: `/`
4. 部署完成

---

## 本地开发

### 使用 npm
```bash
npm start
# 访问 http://localhost:3000
```

### 使用 Python
```bash
python -m http.server 8000
# 访问 http://localhost:8000
```

### 使用 PHP
```bash
php -S localhost:8000
# 访问 http://localhost:8000
```

---

## 自定义域名

### GitHub Pages

1. 在仓库根目录创建 `CNAME` 文件
2. 写入你的域名：`lumina.yourdomain.com`
3. 在域名 DNS 设置中添加 CNAME 记录：
   ```
   lumina.yourdomain.com → salixjfrost.github.io
   ```
4. 等待 DNS 生效（可能需要几小时）

### Vercel / Netlify

在平台设置中直接添加自定义域名，平台会自动配置 SSL 证书。

---

## 环境要求

### 浏览器支持
- Chrome / Edge 90+
- Firefox 88+
- Safari 14+
- 移动端浏览器

### 无需服务器
- 纯静态文件
- 无需 Node.js 运行时
- 无需数据库
- 可部署到任何静态托管服务

---

## 部署检查清单

- [ ] 代码已推送到 GitHub
- [ ] GitHub Pages 已启用
- [ ] Actions 工作流运行成功
- [ ] 网站可以正常访问
- [ ] 所有功能正常工作
- [ ] 主题切换正常
- [ ] API 调用成功

---

## 常见问题

### Q: GitHub Pages 显示 404？
A: 
1. 检查 Pages 设置是否正确
2. 确认分支选择为 `main`
3. 等待几分钟让部署生效
4. 清除浏览器缓存

### Q: Actions 部署失败？
A:
1. 检查 Actions 权限：`Settings` → `Actions` → `General`
2. 启用 "Read and write permissions"
3. 重新运行工作流

### Q: 自定义域名不生效？
A:
1. 检查 CNAME 文件是否正确
2. 确认 DNS 记录已添加
3. 等待 DNS 传播（最多 48 小时）
4. 使用 `dig` 或 `nslookup` 检查 DNS

### Q: API 调用失败？
A:
1. 检查浏览器控制台错误
2. 确认网络连接正常
3. 某些 API 可能有限流
4. 尝试使用 VPN

---

**部署成功后，记得在 README 中更新在线演示链接！** 🎉
