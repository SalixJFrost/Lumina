(function () {
  const app = document.getElementById("app");
  const themeToggle = document.getElementById("themeToggle");
  const themeSelector = document.getElementById("themeSelector");
  const progressBar = document.getElementById("progressBar");
  const quoteEl = document.getElementById("quote");
  const toastEl = document.getElementById("toast");

  const state = {
    currentView: "books",
    fontSize: 21,
    lineHeight: 1.8,
    currentSource: "openlibrary",
    currentTheme: "default"
  };

  // 显示提示消息
  function showToast(msg, duration = 2000) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    setTimeout(() => toastEl.classList.remove("show"), duration);
  }

  // API 集合
  const API = {
    // Open Library - 书籍搜索
    searchOpenLibrary: async (q) => {
      const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=20`);
      return res.json();
    },
    
    // Gutendex - 可阅读的公版书
    searchGutendex: async (q) => {
      const res = await fetch(`https://gutendex.com/books/?search=${encodeURIComponent(q)}`);
      return res.json();
    },
    
    getGutendexBook: async (id) => {
      const res = await fetch(`https://gutendex.com/books/${id}`);
      return res.json();
    },

    // 获取书籍详情
    getBookDetail: async (key) => {
      const res = await fetch(`https://openlibrary.org${key}.json`);
      return res.json();
    },
    
    // RSS 新闻
    fetchRSS: async (url) => {
      const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;
      const res = await fetch(api);
      return res.json();
    },
    
    // Hacker News
    getHNTopStories: async () => {
      const res = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
      const ids = await res.json();
      const stories = await Promise.all(
        ids.slice(0, 20).map(id => 
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r => r.json())
        )
      );
      return stories;
    },
    
    // Wikipedia
    searchWikipedia: async (q) => {
      const res = await fetch(
        `https://zh.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q)}`
      );
      return res.json();
    },
    
    // 每日名言
    getDailyQuote: async () => {
      const res = await fetch("https://api.quotable.io/random");
      return res.json();
    }
  };

  // 视图集合
  const Views = {
    books: () => {
      app.innerHTML = `
        <h2>📚 书籍搜索</h2>
        <div class="source-tabs">
          <button data-source="openlibrary" class="active">Open Library</button>
          <button data-source="gutendex">Gutendex (可阅读)</button>
          <button data-source="all">全部搜索</button>
        </div>
        <input id="searchInput" placeholder="输入书名、作者或关键词..." />
        <div id="results"></div>
      `;

      // 切换数据源
      document.querySelectorAll("[data-source]").forEach(btn => {
        btn.onclick = () => {
          document.querySelectorAll("[data-source]").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          state.currentSource = btn.dataset.source;
        };
      });

      // 搜索
      document.getElementById("searchInput").addEventListener("input", debounce(async (e) => {
        const query = e.target.value.trim();
        if (!query) return;
        
        const results = document.getElementById("results");
        results.innerHTML = '<div class="loading">搜索中...</div>';

        try {
          if (state.currentSource === "openlibrary") {
            await searchOpenLibraryBooks(query);
          } else if (state.currentSource === "gutendex") {
            await searchGutendexBooks(query);
          } else {
            await searchAllBooks(query);
          }
        } catch (err) {
          results.innerHTML = `<div class="error">搜索失败: ${err.message}</div>`;
        }
      }, 500));
    },

    news: () => {
      app.innerHTML = `
        <h2>📰 新闻阅读</h2>
        <div class="source-tabs">
          <button data-news="rss" class="active">RSS 新闻</button>
          <button data-news="hn">Hacker News</button>
        </div>
        <div id="newsContent"></div>
      `;

      document.querySelectorAll("[data-news]").forEach(btn => {
        btn.onclick = () => {
          document.querySelectorAll("[data-news]").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          if (btn.dataset.news === "rss") loadRSSNews();
          else loadHackerNews();
        };
      });

      loadRSSNews();
    },

    knowledge: () => {
      app.innerHTML = `
        <h2>📖 知识百科</h2>
        <input id="wikiSearch" placeholder="搜索维基百科..." />
        <div id="wikiResults"></div>
      `;

      document.getElementById("wikiSearch").addEventListener("input", debounce(async (e) => {
        const query = e.target.value.trim();
        if (!query) return;

        const results = document.getElementById("wikiResults");
        results.innerHTML = '<div class="loading">搜索中...</div>';

        try {
          const data = await API.searchWikipedia(query);
          results.innerHTML = `
            <div class="card">
              ${data.thumbnail ? `<img src="${data.thumbnail.source}" class="book-cover" />` : ''}
              <h3>${data.title}</h3>
              <p>${data.extract}</p>
              <button onclick="window.open('${data.content_urls.desktop.page}', '_blank')">
                查看完整词条
              </button>
            </div>
          `;
        } catch (err) {
          results.innerHTML = `<div class="error">搜索失败，请尝试其他关键词</div>`;
        }
      }, 500));
    },

    local: () => {
      const saved = JSON.parse(localStorage.getItem("articles") || "[]");

      app.innerHTML = `
        <h2>📂 本地阅读</h2>
        <textarea id="articleContent" placeholder="粘贴文本内容..." rows="6"></textarea>
        <div class="controls">
          <button id="saveArticle">💾 保存</button>
          <button id="clearAll">🗑️ 清空全部</button>
        </div>
        <div id="articleList"></div>
      `;

      document.getElementById("saveArticle").onclick = () => {
        const content = document.getElementById("articleContent").value.trim();
        if (!content) return showToast("内容不能为空");
        
        saved.unshift({ id: Date.now(), content, date: new Date().toLocaleString() });
        localStorage.setItem("articles", JSON.stringify(saved));
        showToast("保存成功");
        Views.local();
      };

      document.getElementById("clearAll").onclick = () => {
        if (confirm("确定清空所有本地文章？")) {
          localStorage.removeItem("articles");
          Views.local();
        }
      };

      const list = document.getElementById("articleList");
      if (saved.length === 0) {
        list.innerHTML = `
          <div class="empty-state">
            <p>暂无保存的文章</p>
            <small>在上方输入框粘贴内容并保存</small>
          </div>
        `;
        return;
      }

      saved.forEach(a => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
          <strong>${a.content.substring(0, 50)}...</strong><br/>
          <small style="color: #999;">${a.date}</small>
        `;
        div.onclick = () => openReader(a.content);
        list.appendChild(div);
      });
    },

    web: () => {
      app.innerHTML = `
        <h2>🌐 网页阅读器</h2>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">
          输入任意网页 URL，使用 Readability 技术提取正文内容
        </p>
        <div style="display: flex; gap: 8px; margin-bottom: 24px;">
          <input id="urlInput" placeholder="输入网页 URL (例如: https://example.com/article)" style="flex: 1;" />
          <button id="parseBtn" style="padding: 12px 24px; background: var(--accent); color: white; border: none; border-radius: 24px; cursor: pointer; white-space: nowrap;">解析</button>
        </div>
        <div id="parseResult"></div>
        
        <div style="margin-top: 40px; padding-top: 40px; border-top: 1px solid var(--border);">
          <h3>快速访问</h3>
          <div class="source-tabs">
            <button data-url="https://www.bbc.com/news">BBC News</button>
            <button data-url="https://www.theguardian.com">The Guardian</button>
            <button data-url="https://medium.com">Medium</button>
            <button data-url="https://news.ycombinator.com">Hacker News</button>
          </div>
        </div>
      `;

      const urlInput = document.getElementById("urlInput");
      const parseBtn = document.getElementById("parseBtn");

      // 解析按钮
      parseBtn.onclick = async () => {
        const url = urlInput.value.trim();
        if (!url) {
          showToast("请输入 URL");
          return;
        }

        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          showToast("URL 必须以 http:// 或 https:// 开头");
          return;
        }

        await parseWebPage(url);
      };

      // 回车键解析
      urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          parseBtn.click();
        }
      });

      // 快速访问按钮
      document.querySelectorAll('[data-url]').forEach(btn => {
        btn.onclick = () => {
          urlInput.value = btn.dataset.url;
          parseBtn.click();
        };
      });
    }
  };

  // 解析网页内容（使用官方 Mozilla Readability）
  async function parseWebPage(url) {
    const parseResult = document.getElementById("parseResult");
    parseResult.innerHTML = '<div class="loading">正在获取网页内容</div>';

    try {
      // 使用 CORS 代理获取网页内容
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        throw new Error('无法获取网页内容');
      }

      const html = await response.text();
      
      // 创建 DOM 解析器
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // 设置文档的 URL（用于解析相对路径）
      const base = doc.createElement('base');
      base.href = url;
      doc.head.insertBefore(base, doc.head.firstChild);
      
      // 使用官方 Readability 解析
      const reader = new Readability(doc, {
        charThreshold: 100,
        keepClasses: false
      });
      
      const article = reader.parse();
      
      if (!article) {
        parseResult.innerHTML = `
          <div class="error">
            <p>无法提取文章内容</p>
            <p>该网页可能不包含文章格式的内容，或者内容被保护</p>
            <button onclick="window.open('${url}', '_blank')" style="margin-top: 16px; padding: 8px 16px; background: var(--accent); color: white; border: none; border-radius: 24px; cursor: pointer;">
              在新标签页打开原网页
            </button>
          </div>
        `;
        return;
      }

      // 显示解析结果
      const content = `
        <h2>${article.title}</h2>
        ${article.byline ? `<p style="color: var(--text-secondary); font-size: 16px;">作者: ${article.byline}</p>` : ''}
        ${article.siteName ? `<p style="color: var(--text-secondary); font-size: 14px;">来源: ${article.siteName}</p>` : ''}
        ${article.publishedTime ? `<p style="color: var(--text-secondary); font-size: 14px;">发布时间: ${new Date(article.publishedTime).toLocaleString()}</p>` : ''}
        <p style="color: var(--text-secondary); font-size: 14px; margin-bottom: 32px;">
          <a href="${url}" target="_blank" style="color: var(--accent);">查看原文</a> | 
          字数: ${article.length} | 
          预计阅读: ${Math.ceil(article.length / 400)} 分钟
        </p>
        ${article.excerpt ? `<p style="font-style: italic; color: var(--text-secondary); padding: 16px; background: var(--card-hover); border-left: 3px solid var(--accent); margin-bottom: 32px;">${article.excerpt}</p>` : ''}
        <hr style="border: none; border-top: 1px solid var(--border); margin: 32px 0;" />
        ${article.content}
      `;

      openReader(content);
      showToast("解析成功！");
    } catch (err) {
      parseResult.innerHTML = `
        <div class="error">
          <p>解析失败: ${err.message}</p>
          <p>可能原因：</p>
          <ul style="margin: 16px 0; padding-left: 24px;">
            <li>网站禁止跨域访问</li>
            <li>网页内容需要登录</li>
            <li>URL 格式不正确</li>
            <li>CORS 代理服务暂时不可用</li>
          </ul>
          <button onclick="window.open('${url}', '_blank')" style="margin-top: 16px; padding: 8px 16px; background: var(--accent); color: white; border: none; border-radius: 24px; cursor: pointer;">
            在新标签页打开原网页
          </button>
        </div>
      `;
    }
  }

  // Open Library 搜索
  async function searchOpenLibraryBooks(query) {
    const data = await API.searchOpenLibrary(query);
    const results = document.getElementById("results");
    results.innerHTML = "";

    if (!data.docs || data.docs.length === 0) {
      results.innerHTML = `
        <div class="empty-state">
          <p>未找到相关书籍</p>
          <small>尝试使用不同的关键词</small>
        </div>
      `;
      return;
    }

    data.docs.slice(0, 15).forEach(book => {
      const coverId = book.cover_i;
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        ${coverId ? `<img src="https://covers.openlibrary.org/b/id/${coverId}-M.jpg" class="book-cover" alt="${book.title}" />` : ''}
        <div>
          <strong>${book.title}</strong><br/>
          <small>作者: ${book.author_name?.join(", ") || "未知"}</small><br/>
          <small>出版: ${book.first_publish_year || "未知"}</small>
        </div>
      `;
      div.onclick = () => showBookDetail(book);
      results.appendChild(div);
    });
  }

  // Gutendex 搜索（可阅读）
  async function searchGutendexBooks(query) {
    const data = await API.searchGutendex(query);
    const results = document.getElementById("results");
    results.innerHTML = "";

    if (!data.results || data.results.length === 0) {
      results.innerHTML = `
        <div class="empty-state">
          <p>未找到相关书籍</p>
          <small>Gutendex 主要收录公版书籍</small>
        </div>
      `;
      return;
    }

    data.results.forEach(book => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        ${book.formats['image/jpeg'] ? `<img src="${book.formats['image/jpeg']}" class="book-cover" alt="${book.title}" />` : ''}
        <div>
          <strong>${book.title}</strong><br/>
          <small>作者: ${book.authors.map(a => a.name).join(", ") || "未知"}</small><br/>
          <small>语言: ${book.languages.join(", ")}</small><br/>
          <small style="color: var(--accent);">✓ 可在线阅读</small>
        </div>
      `;
      div.onclick = () => readGutendexBook(book);
      results.appendChild(div);
    });
  }

  // 全部搜索
  async function searchAllBooks(query) {
    const results = document.getElementById("results");
    results.innerHTML = '<div class="loading">正在搜索多个数据源...</div>';

    try {
      const [openLib, gutendex] = await Promise.all([
        API.searchOpenLibrary(query).catch(() => ({ docs: [] })),
        API.searchGutendex(query).catch(() => ({ results: [] }))
      ]);

      results.innerHTML = "";

      if (openLib.docs.length === 0 && gutendex.results.length === 0) {
        results.innerHTML = '<div class="error">未找到相关书籍</div>';
        return;
      }

      if (gutendex.results.length > 0) {
        results.innerHTML += '<h3>📖 可在线阅读 (Gutendex)</h3>';
        gutendex.results.slice(0, 5).forEach(book => {
          const div = document.createElement("div");
          div.className = "card";
          div.innerHTML = `
            <strong>${book.title}</strong><br/>
            <small>作者: ${book.authors.map(a => a.name).join(", ")}</small>
          `;
          div.onclick = () => readGutendexBook(book);
          results.appendChild(div);
        });
      }

      if (openLib.docs.length > 0) {
        results.innerHTML += '<h3>📚 更多书籍 (Open Library)</h3>';
        openLib.docs.slice(0, 10).forEach(book => {
          const div = document.createElement("div");
          div.className = "card";
          div.innerHTML = `
            <strong>${book.title}</strong><br/>
            <small>作者: ${book.author_name?.join(", ") || "未知"}</small>
          `;
          div.onclick = () => showBookDetail(book);
          results.appendChild(div);
        });
      }
    } catch (err) {
      results.innerHTML = `<div class="error">搜索失败: ${err.message}</div>`;
    }
  }

  // 显示书籍详情
  async function showBookDetail(book) {
    app.innerHTML = '<div class="loading">加载书籍详情</div>';
    try {
      const detail = await API.getBookDetail(book.key);
      const description = detail.description?.value || detail.description || "暂无简介";
      const coverId = book.cover_i;
      
      const content = `
        ${coverId ? `<img src="https://covers.openlibrary.org/b/id/${coverId}-L.jpg" alt="${book.title}" style="max-width: 300px; margin: 0 auto 32px; display: block; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />` : ''}
        <h2>${book.title}</h2>
        ${book.author_name ? `<p style="color: var(--text-secondary); font-size: 18px; margin-bottom: 32px;">作者: ${book.author_name.join(", ")}</p>` : ''}
        <hr style="border: none; border-top: 1px solid var(--border); margin: 32px 0;" />
        <div>${description}</div>
      `;
      
      openReader(content);
    } catch (err) {
      showToast("加载失败，请稍后重试");
      Views.books();
    }
  }

  // 阅读 Gutendex 书籍
  async function readGutendexBook(book) {
    const textUrl = book.formats['text/html'] || book.formats['text/plain; charset=utf-8'];
    
    if (!textUrl) {
      showToast("该书籍暂无可读文本");
      return;
    }

    app.innerHTML = '<div class="loading">正在加载书籍内容</div>';

    try {
      const res = await fetch(textUrl);
      const text = await res.text();
      
      const content = `
        <h2>${book.title}</h2>
        ${book.authors.length > 0 ? `<p style="color: var(--text-secondary); font-size: 18px; margin-bottom: 32px;">作者: ${book.authors.map(a => a.name).join(", ")}</p>` : ''}
        <hr style="border: none; border-top: 1px solid var(--border); margin: 32px 0;" />
        ${text}
      `;
      
      openReader(content);
    } catch (err) {
      app.innerHTML = `
        <div class="error">
          <p>无法直接加载该书籍内容（可能存在跨域限制）</p>
          <p>您可以访问以下链接阅读：</p>
          <a href="${textUrl}" target="_blank" style="color: var(--accent); word-break: break-all;">${textUrl}</a>
        </div>
        <button onclick="history.back()" style="margin-top: 24px; padding: 12px 24px; background: var(--accent); color: white; border: none; border-radius: 24px; cursor: pointer;">返回</button>
      `;
    }
  }

  // RSS 新闻
  async function loadRSSNews() {
    const content = document.getElementById("newsContent");
    content.innerHTML = `
      <select id="newsSource">
        <option value="http://feeds.bbci.co.uk/news/rss.xml">BBC News</option>
        <option value="https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml">New York Times</option>
        <option value="http://www.people.com.cn/rss/world.xml">人民网 - 国际</option>
      </select>
      <div id="newsList" class="loading">加载中...</div>
    `;

    document.getElementById("newsSource").addEventListener("change", loadRSSFeed);
    loadRSSFeed();
  }

  async function loadRSSFeed() {
    const url = document.getElementById("newsSource").value;
    const list = document.getElementById("newsList");
    list.innerHTML = '<div class="loading">加载中...</div>';

    try {
      const data = await API.fetchRSS(url);
      list.innerHTML = "";

      if (!data.items || data.items.length === 0) {
        list.innerHTML = '<div class="error">暂无新闻</div>';
        return;
      }

      data.items.slice(0, 15).forEach(item => {
        const div = document.createElement("div");
        div.className = "card";
        const pubDate = new Date(item.pubDate);
        const timeAgo = getTimeAgo(pubDate);
        
        div.innerHTML = `
          <div>
            <strong>${item.title}</strong><br/>
            <small style="color: var(--text-secondary);">${timeAgo}</small>
          </div>
        `;
        div.onclick = () => {
          const content = `
            <h2>${item.title}</h2>
            <p style="color: var(--text-secondary); font-size: 16px; margin-bottom: 32px;">${pubDate.toLocaleString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <hr style="border: none; border-top: 1px solid var(--border); margin: 32px 0;" />
            ${item.content || item.description}
          `;
          openReader(content);
        };
        list.appendChild(div);
      });
    } catch (err) {
      list.innerHTML = '<div class="error">加载失败，RSS 服务可能暂时不可用</div>';
    }
  }

  // Hacker News
  async function loadHackerNews() {
    const content = document.getElementById("newsContent");
    content.innerHTML = '<div id="newsList" class="loading">加载 Hacker News...</div>';

    try {
      const stories = await API.getHNTopStories();
      const list = document.getElementById("newsList");
      list.innerHTML = "";

      stories.forEach((story, i) => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `
          <strong>${i + 1}. ${story.title}</strong><br/>
          <small>👍 ${story.score} | 💬 ${story.descendants || 0} 评论</small>
        `;
        div.onclick = () => {
          if (story.url) window.open(story.url, '_blank');
          else window.open(`https://news.ycombinator.com/item?id=${story.id}`, '_blank');
        };
        list.appendChild(div);
      });
    } catch (err) {
      document.getElementById("newsList").innerHTML = '<div class="error">加载失败</div>';
    }
  }

  // 阅读器
  function openReader(content) {
    // 清理和格式化内容
    const cleanContent = sanitizeContent(content);
    
    app.innerHTML = `
      <div class="controls">
        <button id="backBtn">← 返回</button>
        <button id="fontInc">A+</button>
        <button id="fontDec">A-</button>
        <button id="lineInc">行距+</button>
        <button id="lineDec">行距-</button>
        <button id="printBtn">🖨️ 打印</button>
      </div>
      <article class="reader" id="reader">${cleanContent}</article>
    `;

    const reader = document.getElementById("reader");
    reader.style.fontSize = state.fontSize + "px";
    reader.style.lineHeight = state.lineHeight;

    document.getElementById("backBtn").onclick = () => {
      window.scrollTo(0, 0);
      Views[state.currentView]();
    };
    
    document.getElementById("fontInc").onclick = () => {
      state.fontSize = Math.min(32, state.fontSize + 2);
      reader.style.fontSize = state.fontSize + "px";
      showToast(`字体大小: ${state.fontSize}px`);
    };
    
    document.getElementById("fontDec").onclick = () => {
      state.fontSize = Math.max(14, state.fontSize - 2);
      reader.style.fontSize = state.fontSize + "px";
      showToast(`字体大小: ${state.fontSize}px`);
    };
    
    document.getElementById("lineInc").onclick = () => {
      state.lineHeight = Math.min(2.5, state.lineHeight + 0.1);
      reader.style.lineHeight = state.lineHeight;
      showToast(`行距: ${state.lineHeight.toFixed(1)}`);
    };
    
    document.getElementById("lineDec").onclick = () => {
      state.lineHeight = Math.max(1.2, state.lineHeight - 0.1);
      reader.style.lineHeight = state.lineHeight;
      showToast(`行距: ${state.lineHeight.toFixed(1)}`);
    };
    
    document.getElementById("printBtn").onclick = () => {
      window.print();
    };

    // 阅读进度
    let ticking = false;
    window.onscroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scroll = window.scrollY;
          const height = document.body.scrollHeight - window.innerHeight;
          const progress = Math.min(100, (scroll / height) * 100);
          progressBar.style.width = progress + "%";
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // 平滑滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 内容清理函数
  function sanitizeContent(html) {
    // 简单的 HTML 清理
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // 移除脚本和样式
    const scripts = doc.querySelectorAll('script, style, noscript');
    scripts.forEach(el => el.remove());
    
    // 移除事件属性
    const allElements = doc.querySelectorAll('*');
    allElements.forEach(el => {
      const attrs = Array.from(el.attributes);
      attrs.forEach(attr => {
        if (attr.name.startsWith('on')) {
          el.removeAttribute(attr.name);
        }
      });
    });
    
    return doc.body.innerHTML;
  }

  // 防抖函数
  function debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  // 时间格式化
  function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    const intervals = {
      年: 31536000,
      月: 2592000,
      周: 604800,
      天: 86400,
      小时: 3600,
      分钟: 60
    };
    
    for (const [name, secondsInInterval] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInInterval);
      if (interval >= 1) {
        return `${interval} ${name}前`;
      }
    }
    
    return '刚刚';
  }

  // 加载每日名言
  async function loadDailyQuote() {
    try {
      const quote = await API.getDailyQuote();
      quoteEl.innerHTML = `"${quote.content}"<br/><small>— ${quote.author}</small>`;
    } catch (err) {
      quoteEl.style.display = "none";
    }
  }

  // 初始化
  document.querySelectorAll("[data-view]").forEach(btn => {
    btn.onclick = () => {
      // 更新导航状态
      document.querySelectorAll("[data-view]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      state.currentView = btn.dataset.view;
      Views[state.currentView]();
    };
  });

  // 设置初始激活状态
  document.querySelector("[data-view='books']").classList.add("active");

  // 主题切换系统
  const themes = {
    default: { name: 'Medium 经典', icon: '📄' },
    paper: { name: '护眼纸张', icon: '🌿' },
    dark: { name: '深夜模式', icon: '🌙' },
    kindle: { name: 'Kindle 风格', icon: '📖' },
    apple: { name: 'Apple Books', icon: '🍎' },
    wechat: { name: '微信读书', icon: '🌸' },
    gradient: { name: '柔和渐变', icon: '🌊' },
    space: { name: '深空模式', icon: '🌌' },
    sunset: { name: '暖阳模式', icon: '🌅' }
  };

  // 应用主题
  function applyTheme(themeName) {
    // 移除所有主题类
    Object.keys(themes).forEach(theme => {
      document.body.classList.remove(`theme-${theme}`);
    });
    
    // 应用新主题
    if (themeName !== 'default') {
      document.body.classList.add(`theme-${themeName}`);
    }
    
    state.currentTheme = themeName;
    localStorage.setItem('readerTheme', themeName);
    
    // 更新激活状态
    document.querySelectorAll('.theme-option').forEach(option => {
      option.classList.remove('active');
      if (option.dataset.theme === themeName) {
        option.classList.add('active');
      }
    });
    
    showToast(`已切换到 ${themes[themeName].name}`);
  }

  // 主题切换按钮
  themeToggle.onclick = (e) => {
    e.stopPropagation();
    themeSelector.classList.toggle('show');
  };

  // 点击外部关闭主题选择器
  document.addEventListener('click', (e) => {
    if (!themeSelector.contains(e.target) && e.target !== themeToggle) {
      themeSelector.classList.remove('show');
    }
  });

  // 主题选项点击
  document.querySelectorAll('.theme-option').forEach(option => {
    option.onclick = () => {
      applyTheme(option.dataset.theme);
      themeSelector.classList.remove('show');
    };
  });

  // 恢复保存的主题
  const savedTheme = localStorage.getItem('readerTheme') || 'default';
  applyTheme(savedTheme);

  // 启动
  Views.books();
  loadDailyQuote();
})();