// 格式化日期函数
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day} ${getMonthName(month)} ${year}`;
}

function getMonthName(month) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return months[parseInt(month) - 1] || '';
}

// 获取URL参数
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// HTTP请求函数
function httpRequest(url, method, params) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: method,
            data: params,
            success: function(response) {
                resolve(response);
            },
            error: function(error) {
                reject(error);
            }
        });
    });
}

// 获取博客详情
async function getBlogDetail(id) {
    if (!id) {
        showError('未指定博客文章ID', '#495057');
        return;
    }

    $('#blog-details-loading').show();
    $('#blog-details-content').hide();

    try {
        const response = await httpRequest('/blog_posts/detail', 'GET', { id: id });

        if (response.code === 1 && response.data) {
            renderBlogDetail(response.data);
            // 获取相关文章
            getRelatedPosts(response.data.category_id, id);
        } else {
            showError('博客文章未找到', '#495057');
        }
    } catch (error) {
        console.error('请求失败:', error);
        showError('加载博客详情失败，请稍后重试', '#495057');
    } finally {
        $('#blog-details-loading').hide();
    }
}

// 渲染博客详情
function renderBlogDetail(blog) {
    // 更新页面标题
    document.title = blog.title;

    // 更新面包屑
    const breadcrumbTitle = document.querySelector('.page-banner h2');
    if (breadcrumbTitle) {
        breadcrumbTitle.textContent = '博客详情';
    }

    // 格式化内容，处理换行
    let formattedContent = blog.content;
    if (formattedContent) {
        // 将\n替换为<br>
        formattedContent = formattedContent.replace(/\n/g, '<br>');

        // 将连续的<br><br>替换为<p></p>
        formattedContent = formattedContent.replace(/(<br>){2,}/g, '</p><p>');

        // 确保内容被包裹在段落标签中
        if (!formattedContent.startsWith('<p>')) {
            formattedContent = '<p>' + formattedContent;
        }
        if (!formattedContent.endsWith('</p>')) {
            formattedContent = formattedContent + '</p>';
        }
    }

    // 构建博客详情HTML
    const blogDetailHtml = `
        <article class="blog_single">
            <header class="entry-header">
                <div class="post-category">
                    ${blog.categories ? blog.categories.map(cat => `<a href="#">${cat}</a>`).join('') : '<a href="#">未分类</a>'}
                </div>
                <h1 class="entry-title">${blog.title}</h1>
                <div class="entry-meta">
                    <div class="meta-content">
                        <span class="post-author"><i class="fa fa-user"></i> ${blog.author || 'admin'}</span>
                        <span class="post-date"><i class="fa fa-calendar"></i> ${formatDate(blog.created_at)}</span>
                        ${blog.view_count ? `<span class="post-view"><i class="fa fa-eye"></i> ${blog.view_count} 次阅读</span>` : ''}
                    </div>
                </div>
            </header>
            
            <div class="entry-content">
                <div class="entry-summary">
                    ${formattedContent || '<p>暂无内容</p>'}
                </div>
            </div>
            
            <footer class="entry-footer">
                <div class="single-post-tag">
                    ${blog.tags && blog.tags.length > 0 ? 
                        `<div class="tag-label"><i class="fa fa-tags"></i> 标签:</div>
                         <div class="tag-links">
                            ${blog.tags.map(tag => `<a href="#">${tag}</a>`).join('')}
                         </div>` : 
                        ''}
                </div>
                
                <div class="social-sharing">
                    <div class="share-label"><i class="fa fa-share-alt"></i> 分享:</div>
                    <div class="share-links">
                        <a href="javascript:void(0)" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href), '_blank')" class="facebook"><i class="fa fa-facebook"></i></a>
                        <a href="javascript:void(0)" onclick="window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(window.location.href) + '&text=' + encodeURIComponent(document.title), '_blank')" class="twitter"><i class="fa fa-twitter"></i></a>
                        <a href="javascript:void(0)" onclick="window.open('https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(window.location.href) + '&title=' + encodeURIComponent(document.title), '_blank')" class="linkedin"><i class="fa fa-linkedin"></i></a>
                    </div>
                </div>
                
                <div class="post-navigation">
                    <a href="blog.html" class="btn-back-to-blog"><i class="fa fa-long-arrow-left"></i> 返回博客列表</a>
                </div>
            </footer>
        </article>
        
        <div class="related-posts-section">
            <h3 class="related-title"><span>相关文章</span></h3>
            <div class="row" id="related-posts-container">
                <!-- 相关文章将通过JavaScript动态加载 -->
            </div>
        </div>
    `;

    // 更新页面内容
    $('#blog-details-content').html(blogDetailHtml).fadeIn(500);
}

// 获取相关文章
async function getRelatedPosts(categoryId, currentId) {
    try {
        const response = await httpRequest('/blog_posts/detail', 'GET', {
            category_id: categoryId,
            exclude_id: currentId,
            limit: 3
        });

        if (response.code === 1 && response.data && response.data.length > 0) {
            renderRelatedPosts(response.data);
        } else {
            $('#related-posts-container').html('<div class="col-12"><p class="text-center">暂无相关文章</p></div>');
        }
    } catch (error) {
        console.error('获取相关文章失败:', error);
    }
}

// 渲染相关文章
function renderRelatedPosts(posts) {
    if (!posts || posts.length === 0) {
        $('#related-posts-container').html('<div class="col-12"><p class="no-related-posts">暂无相关文章</p></div>');
        return;
    }

    const relatedPostsHtml = posts.map(post => `
        <div class="col-md-4 col-sm-6">
            <div class="related-post-card">
                <div class="related-post-inner">
                    <h4 class="related-post-title">
                        <a href="blog-details.html?id=${post.id}">${post.title}</a>
                    </h4>
                    <div class="related-post-meta">
                        <span class="related-post-date"><i class="fa fa-calendar"></i> ${formatDate(post.created_at)}</span>
                    </div>
                    <div class="related-post-excerpt">
                        ${post.excerpt || (post.content ? post.content.substring(0, 100) + '...' : '暂无摘要')}
                    </div>
                    <a href="blog-details.html?id=${post.id}" class="read-more">阅读更多 <i class="fa fa-angle-right"></i></a>
                </div>
            </div>
        </div>
    `).join('');

    $('#related-posts-container').html(relatedPostsHtml);

    // 添加鼠标悬停效果
    $('.related-post-card').hover(
        function() {
            $(this).addClass('hover');
        },
        function() {
            $(this).removeClass('hover');
        }
    );
}

// 显示错误信息
function showError(message, color = '#cf9163') {
    const errorHtml = `
        <div class="error-message">
            <div class="error-icon">
                <i class="fa fa-exclamation-triangle"></i>
            </div>
            <h3 class="error-title">出错了</h3>
            <p class="error-text">${message}</p>
            <div class="error-action">
                <a href="blog.html" class="btn-back-to-blog">
                    <i class="fa fa-long-arrow-left"></i> 返回博客列表
                </a>
            </div>
        </div>
    `;

    $('#blog-details-content').html(errorHtml).fadeIn(500);
}

// 页面加载完成后执行
$(document).ready(function() {
    // 获取博客ID
    const blogId = getUrlParameter('id');

    // 加载博客详情
    getBlogDetail(blogId);
});
