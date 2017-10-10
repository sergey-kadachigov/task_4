jQuery(function () {
    initSortText();
});

function initSortText() {
    jQuery('#sort').textSort({});
};


//initOpenPanel
;(function ($) {
    function TextSort(options) {
        this.options = $.extend({
            text: '.text',
            oneItemWrap: 'li',
            btn: '.btn',
            activeClass: 'active',
            asc:'asc',
            desc:'desc',
            setEvent: 'click'
        }, options);
        this.init();
    };
    TextSort.prototype = {
        init: function () {
            if (this.options.holder) {
                this.findElements();
                this.attachEvents();
            }
        },
        findElements: function () {
            this.holder = $(this.options.holder);
            this.textWrap = $(this.holder.find(this.options.text));
            this.items = this.textWrap.text().replace(/\s{2,}/g, ' ').trim().split(' ');
            this.btns = this.holder.find((this.options.btn));
        },
        attachEvents: function () {
            var self = this;
            console.log(this.btn);
            this.btns.on(self.options.setEvent, function () {
                self.btns.removeClass(self.options.activeClass);
                $(this).addClass(self.options.activeClass);
                ($(this).data('sort') === self.options.asc) ? self.sortAsc() : ($(this).data('sort') === self.options.desc) ? self.sortDesc() : 0;
            });

        },
        sortAsc: function () {
            this.items.sort();
            this.textWrap.html(this.addWrap());
        },
        sortDesc: function () {
            this.items.sort().reverse();
            this.textWrap.html(this.addWrap());
        },
        addWrap: function () {
            var self = this;
            var result = [];
            $(this.items).each(function (index) {
                result[index] = '<' + self.options.oneItemWrap + '>' + this + '<' + self.options.oneItemWrap + '>';
            });
            return result;
        },
        myCallback: function (name) {
            if (typeof this.options[name] === 'function') {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                this.options[name].apply(this, args);
            }
        },
        destroy: function () {
            this.btns.off('click');
        }
    };
    // jquery plugin
    $.fn.textSort = function (opt) {
        return this.each(function () {
            $(this).data('TextSort', new TextSort($.extend({
                holder: this
            }, opt)));
        });
    };
}(jQuery));

