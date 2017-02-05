(function ($) {
   //функція буде приймати опції
   $.fn.slider = function (options) {
      //стилі по замовчуванню
      var defaults = {
         heightSlider: '25em'
         , widthSlider: '45em'
         , bcgSlider: '#ff9898'
         , images: ['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg']
         , step: '1000'
      };
      var settings = $.extend(defaults, options);
      // той елемент який нам передадуть
      var $link = this;

      var $slider = $('.slider')
      var $slide = $('.slide');
      //лічильник для радіобатонів
      var i = 0;

      function init() {
         creatingSlider();
         bindEvents();
      }
      //для показу вікна
      function creatingSlider() {
         getImg();
         $slider.css({
            height: settings.heightSlider
            , width: settings.widthSlider
         })
         $slide.wrapAll('<div class="slider-inner"></div>');
         $slide.css({
            height: settings.heightSlider
            , width: settings.widthSlider
         })
         var widthSlInner = $slide.width() * $slide.length;
         $('.slider-inner').css({
            height: '100%'
            , width: widthSlInner
            , position: 'relative'
         })
         addArrows();
         addRadioBtn();
         clickRadBtn();
         $('.tab-box').eq(i).addClass('tab-active');
      };
      //в цій функції використаємо цикл яким заповнимо слайди картинками
      function getImg() {
         for (var i = 0; i < $slide.length; i++) {
            $('<img src="img/' + settings.images[i] + '"class="slide-img">').appendTo($slide[i])
         }
      }
      //radiobutton створення та стилізація
      function addRadioBtn() {
         var allRB = $('<div/>', {
            class: 'tab'
         });
         //       
         allRB.appendTo($slider);
         for (var i = 0; i < $slide.length; i++) {
            var radioBtn = $('<div/>', {
               class: 'tab-box'
            });
            allRB.append(radioBtn);
         };
      };
      //вставка та стилізація стрілок
      function addArrows() {
         var bcgNextArr = 'url(arrow_right.png)';
         var bcgPrevArr = 'url(arrow_left.png)';
         var prevArrow = $('<div/>', {
            class: "arrow prev-arrow"
         });
         var nextArrow = $('<div/>', {
            class: "arrow next-arrow"
         });
         //        
         $slider.append(nextArrow);
         $slider.append(prevArrow);
      }
      //гортання вперед
      function nextSlide() {
         i++;
         if (i <= $slide.length - 1) {
            $('.slider-inner').animate({
               left: '-=' + $slide.width()
            }, settings.step);
         }
         else {
            $('.slider-inner').animate({
               left: 0
            }, 500);
            i = 0;
         }
         console.log('next ' + i);
         activeBox();
      }
      //гортання назад
      function prevSlide() {
         i--;
         if (i >= 0) {
            $('.slider-inner').animate({
               left: '+=' + $slide.width()
            }, settings.step);
         }
         else {
            i = $slide.length - 1;
            $('.slider-inner').animate({
               left: '-=' + $slide.width() * i
            }, 500);
         }
         activeBox();
      }

      function bindEvents() {
         $('.next-arrow').on('click', nextSlide);
         $('.prev-arrow').on('click', prevSlide);
      }
      //буде додавати класи активності при відповідному слайді а з попередніх забирати його
      function activeBox() {
         $('.tab-box').removeClass('tab-active');
         $('.tab-box').eq(i).addClass('tab-active');
      }
      //кліки по radio-button
      function clickRadBtn() {
         $('.tab-box').each(function (index, elem) {
            $(elem).on('click', function () {
               $('.slider-inner').animate({
                  left: -$slide.width() * index
               })
               i = index;
               activeBox();
            })
         })
      }
      init();
      //щоб не ломати ланцюг
      return this;
   }
})(jQuery);