/**
 * 基于jquery1.7+的拖动插件
 * author:navy
 * email:navyxie2010@gmail.com
 * qq:951178609
 * version:1.0 beta
 */
var NAVY = NAVY || {};
NAVY.Drag = function(self, targetObj,options){
    if(self === targetObj){
        self = targetObj = $(self);
    }else{
        self = $(self);
        targetObj =$(targetObj);
    }
    var dragObj = this;
    var defaults = {
        left:0,//初始化移动对象targetObj的left值
        top:0,//初始化移动对象targetObj的top值
        limitObj:targetObj.offsetParent(),//限制移动对象移动的父对象，默认是document
        isMoveSpace:{
            x:3,//x方向上移动的步长
            y:3//y方向上移动的步长
        },
        isClearMargin:true
    };
    dragObj.jqObj = self;
    dragObj.targetObj = targetObj;
    dragObj.opts = $.extend(defaults, options);
    var limitObj = $(dragObj.opts.limitObj);
    dragObj.maxMove = {
        x:limitObj.outerWidth()-targetObj.outerWidth(),//x方向上最大的移动距离
        y:limitObj.outerHeight() - targetObj.outerHeight()//y方向上最大的移动距离
    };
    if(dragObj.opts.isClearMargin){
        dragObj.targetObj.css('margin','0')
    }else{
        var marginLeft = targetObj.css('marginLeft'),marginRight = targetObj.css('marginRight'),marginTop = targetObj.css('marginTop'),marginBottom = targetObj.css('marginBottom');
        console.log('1:'+marginLeft+'2:'+marginRight+'3:'+marginTop+'4:'+marginBottom);
        dragObj.maxMove.x = limitObj.outerWidth()-targetObj.outerWidth() - parseInt(marginRight) - parseInt(marginLeft);
        dragObj.maxMove.y = limitObj.outerHeight() - targetObj.outerHeight() - parseInt(marginTop) - parseInt(marginBottom);
    }
    dragObj.init();//初始化
};
NAVY.Drag.prototype = {
    init:function(){
        var targetObj = this.targetObj;
        var jqObj = this.jqObj;
        var options = this.opts;
        jqObj.css({cursor:'move'});
        targetObj.css({position:'absolute',left:options.left,top:options.top});//初始化目标移动对象的left和top值
        this.initEvent();
        return this;
    },
    initEvent:function(){
        var dragObj = this.jqObj;
        var targetObj = this.targetObj;
        var options = this.opts;
        var maxMoveX = this.maxMove.x,maxMoveY = this.maxMove.y;//x和y方向最大可移动的距离
        var isDrag = false;//判断当前鼠标是否按下
        var startPage = {x:0,y:0};//记录开始的pageX和pageY值
        var startPos = {left:options.left,top:options.top};//记录目标移动对象targetObj的left和top值
        $('body').find(dragObj).mousedown(function(e){
            isDrag = true;
            startPage.x = e.pageX;
            startPage.y = e.pageY;
            startPos.left = targetObj.position().left;
            startPos.top = targetObj.position().top;
            NAVY.UTIL.Style.setMaxZIndex(targetObj[0]);//设置targetObj的z-index属性值为最大，效率低下。
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
                        var curPage = {x:e.pageX,y:e.pageY};//当前pageX和pageY值
                        var moveValueX = curPage.x - startPage.x;//当前鼠标移动的x方向上的值
                        var moveValueY = curPage.y - startPage.y;//当前鼠标移动的y方向上的值
                        if(moveValueX % options.isMoveSpace.x === 0 || moveValueY % options.isMoveSpace.y === 0){
                            var curLeft = startPos.left + moveValueX;
                            var curTop = startPos.top + moveValueY;
                            curLeft = curLeft <= 0 ? 0 : curLeft > maxMoveX ? maxMoveX :curLeft;
                            curTop = curTop <= 0 ? 0 : curTop > maxMoveY ? maxMoveY : curTop;
                            targetObj.css({left:curLeft,top:curTop});
                        }
                    }
                    return false;
                    break;
            }
        });
        return this;
    },
    /**
     * 获取目标移动对象targetObj的css的left,top,z-index值
     * @return {Object}
     */
    getStyle:function(){
        var targetObj = this.targetObj;
        return {left:targetObj.css('left'),top:targetObj.css('top'),zIndex:targetObj.css('z-index')};
    },
    /**
     * 取消绑定移动对象
     * @return {Boolean}
     */
    unDrag:function(){
        var jqObj = this.jqObj,targetObj = this.targetObj;
        jqObj.css({cursor:'default'}).unbind();
        targetObj.css({position:'',left:'',top:''});
        return this;
    }
};