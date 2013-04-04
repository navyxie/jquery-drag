var NAVY = NAVY || {};
NAVY.Drag = function(self, targetObj,options){
    self = $(self);
    targetObj =$(targetObj);
    var dragObj = this;
    var defaults = {

    };
    dragObj.jqObj = self;
    dragObj.targetObj = targetObj;
    dragObj.opts = $.extend(defaults, options);
    dragObj.init();
};
NAVY.Drag.prototype = {
    init:function(){
        var targetObj = this.targetObj;
        var jqObj = this.jqObj;
        jqObj.css({cursor:'move'});
        targetObj.css({position:'absolute'});
        this.initEvent();
    },
    initEvent:function(){
        var dragObj = this.jqObj;
        var targetObj = this.targetObj;
        var isDrag = false;
        var startPage = {x:0,y:0};
        var startPos = {left:0,top:0};
        $('body').find(targetObj).find(dragObj).mousedown(function(e){
            isDrag = true;
            startPage.x = e.pageX;
            startPage.y = e.pageY;
            startPos.left = targetObj.position().left;
            startPos.top = targetObj.position().top;
            NAVY.UTIL.Style.setMaxZIndex(targetObj[0]);
            return false;
        });
        $(document).on('mousemove mouseup',function(e){
            switch(e.type){
                case 'mouseup':
                    isDrag = false;
                    return false;
                    break;
                case 'mousemove' :
                    if(isDrag){
                        var curPage = {x:e.pageX,y:e.pageY};
                        var moveValueX = curPage.x - startPage.x;
                        var moveValueY = curPage.y - startPage.y;
                        if(moveValueX % 5 === 0 || moveValueY % 5 === 0){
                            var curLeft = startPos.left + moveValueX;
                            var curTop = startPos.top + moveValueY;
                            curLeft = curLeft <= 0 ? 0 : curLeft;
                            curTop = curTop <= 0 ? 0 : curTop;
                            targetObj.css({left:curLeft,top:curTop}).attr({'left':curLeft,'top':curTop});
                        }
                    }
                    return false;
                    break;
            }
        });
    },
    getStyle:function(){
        var targetObj = this.targetObj;
        return {left:targetObj.css('left'),top:targetObj.css('top'),zIndex:targetObj.css('z-index')};
    },
    unDrag:function(){
        var jqObj = this.jqObj,targetObj = this.targetObj;
        jqObj.css({cursor:'default'}).unbind();
        targetObj.css({position:'',left:'',top:''});
        return false;
    }
};