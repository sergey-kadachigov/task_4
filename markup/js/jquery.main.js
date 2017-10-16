jQuery(function () {
    initSortText();
});

function initSortText() {
    jQuery('#sort').textSort();
};

//initOpenPanel
;(function ($) {
    function TextSort(options) {
        this.options = $.extend({
            text: '.text',
            oneItemWrap: 'li',
            activeClass: 'active',
            asc: 'asc',
            desc: 'desc',
            setEvent: 'click'
        }, options);
        this.init();
    }

    TextSort.prototype = {
        init: function () {
            if (this.options.holder) {
                this.findElements();
                this.attachEvents();
            }
        },
        findElements: function () {
            this.holder = $(this.options.holder);
            this.btnAsc = $('.' + this.options.asc);
            this.btnDesc = $('.' + this.options.desc);
            this.items = this.getItems();
            this.textWrap = this.holder.find(this.options.text).find(this.options.oneItemWrap);
        },
        attachEvents: function () {
            var self = this;
            this.btnAsc.on(self.options.setEvent, function () {
                $(this).addClass(self.options.activeClass);
                self.btnDesc.removeClass(self.options.activeClass);
                self.sortAsc();
            });
            this.btnDesc.on(self.options.setEvent, function () {
                $(this).addClass(self.options.activeClass);
                self.btnAsc.removeClass(self.options.activeClass);
                self.sortDesc();
            });
        },
        sortAsc: function () {
            this.items.sort();
            this.returnItems();
        },
        sortDesc: function () {
            var self = this, length = this.items.length - 1;
            this.items = this.items.sort().map(function (i) {
                return self.items[length - i];
            });
            this.returnItems();
        },
        getItems: function () {
            return this.holder.find(this.options.text).find(this.options.oneItemWrap).map(function (i, el) {
                    return $(el).text();
                }
            );
        },
        returnItems: function () {
            var self = this;
            this.items.each(function (i, el) {
                $(self.textWrap.get(i)).text(el);
            })
        },
        myCallback: function (name) {
            if (typeof this.options[name] === 'function') {
                var args = Array.prototype.slice.call(arguments);
                args.shift();
                this.options[name].apply(this, args);
            }
        },
        destroy: function () {
            this.asc.off(this.options.setEvent);
            this.desc.off(this.options.setEvent);
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

