# 部署指南

## 🚀 GitHub Pages 部署

### 方式 1: 通过 GitHub 网页界面

1. **创建 GitHub 仓库**
   - 登录 GitHub
   - 点击右上角的 "+" → "New repository"
   - 输入仓库名称（如 `purereader`）
   - 选择 Public
   - 点击 "Create repository"

2. **上传文件**
   - 在仓库页面点击 "uploading an existing file"
   - 拖拽以下文件到上传区：
     ```
     index.html
     style.css
     script.js
     Readability.js
     README.md
     QUICKSTART.md
     EXAMPLES.md
     ```
   - 点击 "Commit changes"

3. **启用 GitHub Pages**
   - 进入仓库的 Settings
   - 左侧菜单找到 "Pages"
   - Source 选择 "Deploy from a branch"
   - Branch 选择 "main" 和 "/ (root)"
   - 点击 "Save"

4. **访问网站**
   - 等待 1-2 分钟
   - 访问 `https://your-username.github.io/purereader`

### 方式 2: 通过 Git 命令行

```bash
# 1. 初始化 Git 仓库
git init

# 2. 添加文件
git add index.html style.css script.js Readability.js
git add README.md QUICKSTART.md EXAMPLES.md DEPLOY.md
git add .gitignore package.json

# 3. 提交
git commit -m "Initial commit: PureReader v1.0"

# 4. 添加远程仓库
git remote add origin https://github.com/your-username/purereader.git

# 5. 推送到 GitHub
git branch -M main
git push -u origin main

# 6. 在 GitHub 网页上启用 Pages（参考方式 1 的第 3 步）
```

## 🌐 其他部署平台

### Netlify

1. **通过拖拽部署**
   - 访问 [Netlify Drop](https://app.netlify.com/drop)
   - 将项目文件夹拖拽到页面
   - 自动部署完成

2. **通过 Git 部署**
   - 连接 GitHub 仓库
   - 选择分支（main）
   - 构建命令：留空
   - 发布目录：留空（根目录）
   - 点击 "Deploy"

### Vercel

1. **导入项目**
   - 访问 [Vercel](https://vercel.com)
   - 点击 "New Project"
   - 导入 GitHub 仓库

2. **配置**
   - Framework Preset: Other
   - Build Command: 留空
   - Output Directory: 留空
   - 点击 "Deploy"

### Cloudflare Pages

1. **创建项目**
   - 访问 [Cloudflare Pages](https://pages.cloudflare.com)
   - 连接 GitHub 账号
   - 选择仓库

2. **构建设置**
   - Framework preset: None
   - Build command: 留空
   - Build output directory: /
   - 点击 "Save and Deploy"

## 📦 自托管部署

### 使用 Nginx

1. **安装 Nginx**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install nginx
   
   # CentOS/RHEL
   sudo yum install nginx
   ```

2. **配置站点**
   ```nginx
   # /etc/nginx/sites-available/purereader
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/purereader;
       index index.html;
       
       location / {
           try_files $uri $uri/ =404;
       }
       
       # 启用 gzip 压缩
       gzip on;
       gzip_types text/css application/javascript;
   }
   ```

3. **部署文件**
   ```bash
   sudo mkdir -p /var/www/purereader
   sudo cp -r * /var/www/purereader/
   sudo chown -R www-data:www-data /var/www/purereader
   ```

4. **启用站点**
   ```bash
   sudo ln -s /etc/nginx/sites-available/purereader /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### 使用 Apache

1. **安装 Apache**
   ```bash
   # Ubuntu/Debian
   sudo apt install apache2
   
   # CentOS/RHEL
   sudo yum install httpd
   ```

2. **配置虚拟主机**
   ```apache
   # /etc/apache2/sites-available/purereader.conf
   <VirtualHost *:80>
       ServerName your-domain.com
       DocumentRoot /var/www/purereader
       
       <Directory /var/www/purereader>
           Options Indexes FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>
       
       # 启用压缩
       <IfModule mod_deflate.c>
           AddOutputFilterByType DEFLATE text/html text/css application/javascript
       </IfModule>
   </VirtualHost>
   ```

3. **部署和启用**
   ```bash
   sudo mkdir -p /var/www/purereader
   sudo cp -r * /var/www/purereader/
   sudo a2ensite purereader
   sudo systemctl reload apache2
   ```

## 🔒 HTTPS 配置

### 使用 Let's Encrypt (免费)

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书（Nginx）
sudo certbot --nginx -d your-domain.com

# 获取证书（Apache）
sudo certbot --apache -d your-domain.com

# 自动续期
sudo certbot renew --dry-run
```

## 🎯 部署检查清单

部署前确保：

- [ ] 所有文件都已上传
- [ ] `Readability.js` 文件存在
- [ ] `index.html` 正确引用了所有资源
- [ ] 没有硬编码的本地路径
- [ ] 测试所有功能是否正常

部署后测试：

- [ ] 页面能正常加载
- [ ] 所有标签页都能切换
- [ ] 书籍搜索功能正常
- [ ] 新闻加载正常
- [ ] 网页阅读器能解析 URL
- [ ] 本地保存功能正常
- [ ] 深色模式切换正常
- [ ] 移动端显示正常

## 🔧 常见部署问题

### 问题 1: 404 错误

**原因：** 文件路径不正确

**解决：**
```html
<!-- 确保使用相对路径 -->
<script src="./Readability.js"></script>
<script src="./script.js"></script>
<link rel="stylesheet" href="./style.css" />
```

### 问题 2: CORS 错误

**原因：** 跨域资源访问被阻止

**解决：**
- GitHub Pages 自动支持 CORS
- 自托管需要配置 CORS 头：
  ```nginx
  add_header Access-Control-Allow-Origin *;
  ```

### 问题 3: 资源加载失败

**原因：** CDN 或外部资源不可用

**解决：**
- 确保 `Readability.js` 在本地
- 检查网络连接
- 查看浏览器控制台错误

### 问题 4: 功能不工作

**原因：** JavaScript 错误

**解决：**
1. 打开浏览器开发者工具（F12）
2. 查看 Console 标签的错误信息
3. 确保所有脚本都正确加载

## 📊 性能优化

### 1. 启用压缩

**Nginx:**
```nginx
gzip on;
gzip_types text/css application/javascript text/html;
gzip_min_length 1000;
```

**Apache:**
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

### 2. 浏览器缓存

**Nginx:**
```nginx
location ~* \.(js|css|html)$ {
    expires 7d;
    add_header Cache-Control "public, immutable";
}
```

**Apache:**
```apache
<FilesMatch "\.(js|css|html)$">
    Header set Cache-Control "max-age=604800, public"
</FilesMatch>
```

### 3. CDN 加速

可以使用 CDN 服务加速访问：
- Cloudflare（免费）
- jsDelivr（免费）
- Fastly

## 🔄 更新部署

### GitHub Pages

```bash
# 修改文件后
git add .
git commit -m "Update: 描述更新内容"
git push origin main

# GitHub Pages 会自动重新部署
```

### 其他平台

大多数平台会自动检测 Git 推送并重新部署。

### 手动更新

```bash
# 连接到服务器
ssh user@your-server.com

# 进入项目目录
cd /var/www/purereader

# 拉取最新代码
git pull origin main

# 或手动上传文件
scp -r * user@your-server.com:/var/www/purereader/
```

## 📱 PWA 部署（可选）

如果想让应用可以"安装"到手机：

1. **创建 manifest.json**
   ```json
   {
     "name": "PureReader",
     "short_name": "PureReader",
     "start_url": "/",
     "display": "standalone",
     "background_color": "#ffffff",
     "theme_color": "#1a8917",
     "icons": [
       {
         "src": "icon-192.png",
         "sizes": "192x192",
         "type": "image/png"
       }
     ]
   }
   ```

2. **在 index.html 中引用**
   ```html
   <link rel="manifest" href="manifest.json">
   ```

3. **创建 Service Worker**（可选，用于离线支持）

## 🎉 部署完成

部署成功后，你可以：

1. 分享链接给朋友
2. 添加到浏览器书签
3. 在手机上添加到主屏幕
4. 开始享受阅读！

---

**需要帮助？** 查看 [README.md](README.md) 或提交 Issue
