/**
 * @Description:窗口适配
 * @author:Howe
 * @param
 * @return
 * @createTime: 2024-11-04 15:31:38
 * @Copyright by 红逸
 */


/**
 * @Description: 根据窗口批量适应图片的高度
 * @author:Howe
 * @param  selector_  选择器
 *  @param  ratio   宽高比例值
 * @return 
 * @createTime: 2024-11-04 15:40:34
 * @Copyright by 红逸
 */
const adaptImgHeight = (selector_, ratio) => {
	adjustImageSize();
	$(window).on('resize', adjustImageSize);

	function adjustImageSize () {
		$(selector_).each(function () {
			var $this = $(this);
			// var originalWidth = $this.attr('data-original-width') || $this.width();
			// var originalHeight = $this.attr('data-original-height') || $this.height(); 
			console.log($this.parent().width())

			$this.width('auto'); // Reset the width to maintain aspect ratio
			$this.height('auto'); // Reset the height to maintain aspect ratio
			$this.width($this.parent().width()); // Set the new width
			$this.height($this.width() * ratio); // Calculate and set new height
			// Store original dimensions for future resizing
			// $this.attr('data-original-width', originalWidth);
			// $this.attr('data-original-height', originalHeight);
		});
	}

}


export default {
	adaptImgHeight
}