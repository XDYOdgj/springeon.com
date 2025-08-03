import httpRequest from '../common/http.js';

// 格式化日期函数
function formatDate(dateString) {
    if (!dateString) return '';
    // 将时间戳转换为Date对象
    const date = new Date(parseInt(dateString) * 1000);
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

let currentPage = 1;
let totalPages = 1;
let totalItems = 0;
let itemsPerPage = 6;
let isLoading = false;

$(document).ready(function() {
    getBlogList(1);
    initPagination();
});

function getBlogList(page = 1) {
    if (isLoading) return;

    isLoading = true;
    currentPage = page;

    const params = {
        page: page,
        limit: itemsPerPage
    };

    httpRequest('/blog_posts/index', 'GET', params)
        .then(response => {
            if (response.code === 1) {
                renderBlogList(response.data.list || response.data);
                // 从API返回的数据结构中正确获取分页信息
                if (response.data.pagination) {
                    totalPages = response.data.pagination.total_pages || 1;
                    totalItems = response.data.pagination.total || 0;
                } else if (response.data.total) {
                    totalItems = response.data.total;
                    totalPages = Math.ceil(totalItems / params.limit);
                } else {
                    totalPages = response.data.pages || 1;
                    totalItems = totalPages * params.limit; // 估算
                }
                console.log('Total pages:', totalPages, 'Current page:', currentPage, 'Total items:', totalItems);
                updatePagination();
                updatePaginationInfo();
            } else {
                console.error('Failed to get blog list:', response.msg);
                showEmptyState();
            }
        })
        .catch(error => {
            console.error('Request failed:', error);
            showEmptyState();
        })
        .finally(() => {
            isLoading = false;
        });
}

function renderBlogList(blogList) {
    const container = $('.col-lg-12 .row').first();
    container.empty();

    if (!blogList || blogList.length === 0) {
        container.html(`
            <div class="col-12">
                <div class="no-blogs-message">
                    <i class="fa fa-file-text-o no-blogs-icon"></i>
                    <h4>No Blog Articles</h4>
                    <p>No articles have been published yet, please check back later.</p>
                </div>
            </div>
        `);
        return;
    }

    blogList.forEach(blog => {
        const excerpt = blog.excerpt || (blog.content ? blog.content.substring(0, 120) + '...' : 'No summary available');
        const readCount = blog.view_count || 0;

        const blogHtml = `
            <div class="col-lg-4 col-md-6 col-sm-6" style="padding-bottom: 20px;">
                <div class="blog-wrap mb-30 blog-card-enhanced">
                    <div class="blog-content">
                        <div class="blog-meta">
                            <span class="author">
                                <i class="fa fa-user"></i> ${blog.author || 'admin'}
                            </span>
                            <span class="date">
                                <i class="fa fa-calendar"></i> ${formatDate(blog.createtime)}
                            </span>
                            <span class="read-count">
                                <i class="fa fa-eye"></i> ${readCount}
                            </span>
                        </div>
                        <h3 class="blog-title">
                            <a href="blog-details.html?id=${blog.id}">${blog.title}</a>
                        </h3>
                        <p class="blog-excerpt">${excerpt}</p>
                        <div class="blog-footer">
                            <a href="blog-details.html?id=${blog.id}" class="blog-btn">
                                Read More <i class="fa fa-long-arrow-right"></i>
                            </a>
                            <div class="blog-category">
                                ${blog.category ? `<span class="category-tag">${blog.category}</span>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.append(blogHtml);
    });

    // 添加悬停效果
    $('.blog-card-enhanced').hover(
        function() {
            $(this).addClass('hover-effect');
        },
        function() {
            $(this).removeClass('hover-effect');
        }
    );
}

function updatePagination() {
    const paginationContainer = $('#pagination-container');
    paginationContainer.empty();

    if (totalPages <= 1) {
        paginationContainer.hide();
        return;
    }

    paginationContainer.show();

    // 首页按钮
    if (currentPage > 1) {
        paginationContainer.append(`<li><a href="#" data-page="1" title="First Page"><i class="fa fa-angle-double-left"></i></a></li>`);
    }

    // 上一页按钮
    if (currentPage > 1) {
        paginationContainer.append(`<li><a href="#" data-page="${currentPage - 1}" title="Previous Page"><i class="fa fa-angle-left"></i></a></li>`);
    }

    // 页码逻辑
    const maxVisiblePages = 5; // 最多显示5个页码
    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
        // 如果总页数小于等于最大显示页数，显示所有页码
        startPage = 1;
        endPage = totalPages;
    } else {
        // 计算显示范围
        const halfVisible = Math.floor(maxVisiblePages / 2);

        if (currentPage <= halfVisible) {
            startPage = 1;
            endPage = maxVisiblePages;
        } else if (currentPage + halfVisible >= totalPages) {
            startPage = totalPages - maxVisiblePages + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - halfVisible;
            endPage = currentPage + halfVisible;
        }
    }

    // 添加省略号（如果需要）
    if (startPage > 1) {
        paginationContainer.append(`<li><a href="#" data-page="1">1</a></li>`);
        if (startPage > 2) {
            paginationContainer.append(`<li class="pagination-ellipsis"><span>...</span></li>`);
        }
    }

    // 添加页码
    for (let i = startPage; i <= endPage; i++) {
        const activeClass = i === currentPage ? 'active' : '';
        paginationContainer.append(`<li class="${activeClass}"><a href="#" data-page="${i}">${i}</a></li>`);
    }

    // 添加省略号（如果需要）
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationContainer.append(`<li class="pagination-ellipsis"><span>...</span></li>`);
        }
        paginationContainer.append(`<li><a href="#" data-page="${totalPages}">${totalPages}</a></li>`);
    }

    // 下一页按钮
    if (currentPage < totalPages) {
        paginationContainer.append(`<li><a href="#" data-page="${currentPage + 1}" title="Next Page"><i class="fa fa-angle-right"></i></a></li>`);
    }

    // 末页按钮
    if (currentPage < totalPages) {
        paginationContainer.append(`<li><a href="#" data-page="${totalPages}" title="Last Page"><i class="fa fa-angle-double-right"></i></a></li>`);
    }

    // 添加页面跳转输入框
    if (totalPages > 5) {
        paginationContainer.append(`
            <li class="page-jump">
                <span>Go to</span>
                <input type="number" id="page-jump-input" min="1" max="${totalPages}" value="${currentPage}" />
                <button id="page-jump-btn" title="Jump to page">Go</button>
            </li>
        `);
    }
}

function updatePaginationInfo() {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    const infoText = totalItems > 0
        ? `Showing ${startItem}-${endItem} of ${totalItems} articles`
        : 'No articles found';
    $('#pagination-info-text').text(infoText);
}

function showEmptyState() {
    const container = $('.col-lg-12 .row');
    container.html(`
        <div class="col-12">
            <div class="no-blogs-message">
                <i class="fa fa-file-text-o no-blogs-icon"></i>
                <h4>No Blog Articles</h4>
                <p>No articles have been published yet, please check back later.</p>
            </div>
        </div>
    `);
    $('#pagination-container').hide();
    $('#pagination-info-text').text('No articles found');
}

function initPagination() {
    // 分页点击事件
    $(document).on('click', '#pagination-container a', function(e) {
        e.preventDefault();
        const page = parseInt($(this).data('page'));
        if (page && page !== currentPage && page >= 1 && page <= totalPages) {
            getBlogList(page);
            // 滚动到顶部
            $('html, body').animate({
                scrollTop: $('.blog-section').offset().top - 100
            }, 500);
        }
    });

    // 页面跳转功能
    $(document).on('click', '#page-jump-btn', function() {
        const targetPage = parseInt($('#page-jump-input').val());
        if (targetPage && targetPage >= 1 && targetPage <= totalPages && targetPage !== currentPage) {
            getBlogList(targetPage);
            $('html, body').animate({
                scrollTop: $('.blog-section').offset().top - 100
            }, 500);
        }
    });

    // 回车键跳转
    $(document).on('keypress', '#page-jump-input', function(e) {
        if (e.which === 13) {
            $('#page-jump-btn').click();
        }
    });

    // 输入框验证
    $(document).on('input', '#page-jump-input', function() {
        const value = parseInt($(this).val());
        const btn = $('#page-jump-btn');
        if (value >= 1 && value <= totalPages) {
            btn.prop('disabled', false).removeClass('disabled');
        } else {
            btn.prop('disabled', true).addClass('disabled');
        }
    });
}

// 导出函数供其他模块使用
window.blogModule = {
    getBlogList,
    renderBlogList,
    updatePagination
};
