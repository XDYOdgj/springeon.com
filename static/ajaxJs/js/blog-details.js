// 博客详情页面JavaScript
import httpRequest from '../common/http.js';

$(document).ready(function () {
    // 获取URL参数中的文章ID
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    if (!articleId) {
        $('#blog-detail').html(
            `<div style="font-size:30px;text-align: center;width: 100%;color: #e74c3c; padding: 50px 0;">The article ID parameter is missing</div>`
        );
        return;
    }

    getBlogDetail(articleId);
});

// 获取文章详情
const getBlogDetail = (id) => {
    $('#blog-detail').html(
        `<div class="loading-placeholder" style="text-align: center; padding: 50px 0; color: #666; font-size: 18px;">
            <i class="fa fa-spinner fa-spin" style="font-size: 24px; margin-right: 10px;"></i>
            Loading blog content...
        </div>`
    );

    // 调用API获取文章详情
    httpRequest('/blog_posts/detail', 'GET', { id: id })
        .then(response => {
            if (response.code === 1) {
                const article = response.data;
                renderBlogDetail(article);
            } else {
                $('#blog-detail').html(
                    `<div style="font-size:24px;text-align: center;width: 100%;color: #e74c3c; padding: 50px 0;">
                        <i class="fa fa-exclamation-triangle" style="margin-right: 10px;"></i>
                        ${response.msg || 'Failed to obtain the details of the article'}
                    </div>`
                );
            }
        })
        .catch(error => {
            console.error('获取文章详情失败:', error);
            $('#blog-detail').html(
                `<div style="font-size:24px;text-align: center;width: 100%;color: #e74c3c; padding: 50px 0;">
                    <i class="fa fa-exclamation-triangle" style="margin-right: 10px;"></i>
                    The network request failed. Please try again later
                </div>`
            );
        });
};

// 渲染博客详情
const renderBlogDetail = (article) => {
    // 构建上一篇和下一篇导航HTML
    let navigationHtml = '<div class="post-navigation" style="display: flex; justify-content: space-between; margin: 40px 0; padding: 20px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef;">';

    // 上一篇文章
    if (article.prev_article) {
        navigationHtml += `
            <div class="prev-post" style="flex: 1; text-align: left; max-width: 48%;">
                <a href="blog-details.html?id=${article.prev_article.id}" class="nav-link" style="text-decoration: none; color: #333; display: block; padding: 15px; background: #fff; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.3s ease;">
                    <i class="fa fa-chevron-left" style="font-size: 16px; margin-right: 8px; color: #667eea;"></i>
                    <span style="font-size: 14px; color: #666; display: block;">Previous Post</span>
                    <h4 style="margin: 5px 0 0 0; font-size: 16px; color: #333; font-weight: 600; line-height: 1.4;">${article.prev_article.title}</h4>
                </a>
            </div>
        `;
    } else {
        navigationHtml += `
            <div class="prev-post disabled" style="flex: 1; text-align: left; max-width: 48%; opacity: 0.5;">
                <span class="nav-link" style="display: block; padding: 15px; background: #f8f9fa; border-radius: 6px; color: #999;">
                    <i class="fa fa-chevron-left" style="font-size: 16px; margin-right: 8px;"></i>
                    <span style="font-size: 14px; display: block;">Previous Post</span>
                    <h4 style="margin: 5px 0 0 0; font-size: 16px; font-weight: 600; line-height: 1.4;">No Previous Post</h4>
                </span>
            </div>
        `;
    }

    // 下一篇文章
    if (article.next_article) {
        navigationHtml += `
            <div class="next-post" style="flex: 1; text-align: right; max-width: 48%;">
                <a href="blog-details.html?id=${article.next_article.id}" class="nav-link" style="text-decoration: none; color: #333; display: block; padding: 15px; background: #fff; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.3s ease;">
                    <span style="font-size: 14px; color: #666; display: block;">Next Post</span>
                    <i class="fa fa-chevron-right" style="font-size: 16px; margin-left: 8px; color: #667eea;"></i>
                    <h4 style="margin: 5px 0 0 0; font-size: 16px; color: #333; font-weight: 600; line-height: 1.4;">${article.next_article.title}</h4>
                </a>
            </div>
        `;
    } else {
        navigationHtml += `
            <div class="next-post disabled" style="flex: 1; text-align: right; max-width: 48%; opacity: 0.5;">
                <span class="nav-link" style="display: block; padding: 15px; background: #f8f9fa; border-radius: 6px; color: #999;">
                    <span style="font-size: 14px; display: block;">Next Post</span>
                    <i class="fa fa-chevron-right" style="font-size: 16px; margin-left: 8px;"></i>
                    <h4 style="margin: 5px 0 0 0; font-size: 16px; font-weight: 600; line-height: 1.4;">No Next Post</h4>
                </span>
            </div>
        `;
    }

    navigationHtml += '</div>';

    // 格式化日期
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    // 构建文章详情HTML
    const html = `
        <article class="blog_single blog-details" style="background: #fff; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden;">
            <header class="entry-header" style="padding: 30px 30px 20px; background: linear-gradient(135deg, #ffb400 0%, #dc5c01 100%); color: white;">
                <div class="post-category" style="margin-bottom: 15px;">
                    ${article.category ? `<span style="background: rgba(255,255,255,0.2); padding: 5px 12px; border-radius: 15px; font-size: 12px; font-weight: 500;">${article.category}</span>` : ''}
                </div>
                <h2 class="entry-title" style="font-size: 2.2rem; font-weight: 700; line-height: 1.3; margin-bottom: 20px; color: white;">${article.title}</h2>
                <div class="post-meta" style="display: flex; align-items: center; gap: 20px; font-size: 14px; opacity: 0.9;">
                    <span class="post-author">
                        <i class="fa fa-user" style="margin-right: 5px;"></i>
                        <span class="post-by">Posts by : </span>${article.author || 'admin'}
                    </span>
                    <span class="post-separator">|</span>
                    <span class="post-date">
                        <i class="fa fa-calendar" style="margin-right: 5px;"></i>
                        On ${formatDate(article.created_at || article.date)}
                    </span>
                    ${article.read_count ? `
                        <span class="post-separator">|</span>
                        <span class="post-views">
                            <i class="fa fa-eye" style="margin-right: 5px;"></i>
                            ${article.read_count} views
                        </span>
                    ` : ''}
                </div>
            </header>
            <div class="postinfo-wrapper" style="padding: 30px;">
                <div class="post-info" style="line-height: 1.8; font-size: 16px; color: #333;">
                    ${article.content ? article.content.replace(/\n/g, '<br>') : 'No content available'}
                </div>
            </div>
        </article>
        
        ${navigationHtml}
    `;

    $('#blog-detail').html(html);

    // 添加导航链接悬停效果
    $('.nav-link').hover(
        function() {
            if (!$(this).parent().hasClass('disabled')) {
                $(this).css({
                    'transform': 'translateY(-2px)',
                    'box-shadow': '0 4px 15px rgba(102, 126, 234, 0.2)'
                });
            }
        },
        function() {
            $(this).css({
                'transform': 'translateY(0)',
                'box-shadow': '0 2px 4px rgba(0,0,0,0.1)'
            });
        }
    );
};

// 导出函数供其他模块使用
window.getBlogDetail = getBlogDetail;
window.renderBlogDetail = renderBlogDetail;
