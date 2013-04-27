/**
 * 基于jquery1.7+的拖动插件
 * author:navy
 * email:navyxie2010@gmail.com
 * qq:951178609
 * version:1.0 beta
 */
var NAVY = NAVY || {};
NAVY.Drag = function(self, targetObj,options){
    this.orignSelf = self;
    this.orignTarget = targetObj;
    if(self === targetObj){
        self = targetObj = $(self);
    }else{
        self = $(self);
        targetObj =$(targetObj);
    }
    var defaults = {
        left:0,//初始化移动对象targetObj的left值
        top:0,//初始化移动对象targetObj的top值
        limitObj:targetObj.offsetParent() || 'body',//限制移动对象移动的父对象，默认是document
        isMoveSpace:{
            x:3,//x方向上移动的步长
            y:3//y方向上移动的步长
        },
        isClearMargin:true
    };
    this.jqObj = self;
    this.targetObj = targetObj;
    this.opts = $.extend(defaults, options);
    var limitObj = $(this.opts.limitObj);
    this.limitObjWidth = limitObj.outerWidth();
    this.limitObjHeight = limitObj.outerHeight();
    if(this.opts.isClearMargin){
        this.targetObj.css('margin','0')
    }   
    this.setMaxvalue();
    this.init();//初始化
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
        var _this = this;
        var targetObj = this.targetObj;
        var options = this.opts;
        var maxMoveX , maxMoveY;//x和y方向最大可移动的距离
        var isDrag = false;//判断当前鼠标是否按下
        var startPage = {x:0,y:0};//记录开始的pageX和pageY值
        var startPos = {left:options.left,top:options.top};//记录目标移动对象targetObj的left和top值
        var limitObj = options.limitObj;
        limitObj.find(_this.orignSelf).mousedown(function(e){
            isDrag = true;
            if(_this.orignSelf === _this.orignTarget){
                targetObj = $(this);
            }else{
                targetObj = $(this).closest(_this.orignTarget);
            }
            _this.limitObjWidth = limitObj.outerWidth();
            _this.limitObjHeight = limitObj.outerHeight();
            _this.setMaxvalue(targetObj);
            maxMoveX = _this.maxMove.x ;
            maxMoveY = _this.maxMove.y;
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
    unDrag:function(jqObj,targetObj){
        jqObj = jqObj || this.jqObj;
        targetObj = targetObj || this.targetObj;
        jqObj.css({cursor:'default'}).unbind();
        targetObj.css({position:'',left:'',top:''});
        return this;
    },
    setMaxvalue:function(targetObj){
        var opts = this.opts;
        targetObj = targetObj || this.targetObj;
        this.maxMove = {
            x:this.limitObjWidth - targetObj.outerWidth(),//x方向上最大的移动距离
            y:this.limitObjHeight - targetObj.outerHeight()//y方向上最大的移动距离
        };
        if(!opts.isClearMargin){
            var marginLeft = targetObj.css('marginLeft'),marginRight = targetObj.css('marginRight'),marginTop = targetObj.css('marginTop'),marginBottom = targetObj.css('marginBottom');
            this.maxMove.x = this.limitObjWidth-targetObj.outerWidth() - parseInt(marginRight) - parseInt(marginLeft);
            this.maxMove.y = this.limitObjHeight - targetObj.outerHeight() - parseInt(marginTop) - parseInt(marginBottom);
        }
    },
    setCursorDefault:function(){
        this.jqObj.css({cursor:'default'});
    },
    setCursorMove:function(){
        this.jqObj.css({cursor:'move'});
    }
};