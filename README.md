jquery-drag
===========
基于jquery的拖动插件

demo:
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
        "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>drag</title>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <script type="text/javascript" src="public/js/jquery.js"></script>
    <script type="text/javascript" src="public/js/navy.util.js"></script>
    <script type="text/javascript" src="public/js/jquery.drag.js"></script>
    <title>navy drag</title>
    <style type="text/css">
        *{
            margin: 0;
            padding: 0;
        }
        ul,li{
            list-style: none;
        }
        #dialogWrapper{
            width: 960px;
            height: 400px;
            border: 1px solid #999;
            position: absolute;
            left: 50%;
            top:50%;
            margin: -200px 0 0 -480px;
        }
        .dragContainer{
            width: 400px;
            text-align: center;
        }
        #dragMe1{
            background: #000;
            color: #fff;
        }
        #dragMe2{
            background: #333;
            color: #000;
        }
    </style>
</head>
<body>
<div id="dialogWrapper">
    <div id="dragMe1" class="dragContainer">
        <h2 class="dragTarget">Drag Me Test1</h2>
        <div class="dragContent">
            <ul>
                <li>温州高官情妇爆料市领导共用情妇 称遭死亡威胁</li>
                <li>温州高官情妇爆料市领导共用情妇 称遭死亡威胁</li>
                <li>温州高官情妇爆料市领导共用情妇 称遭死亡威胁</li>
                <li>温州高官情妇爆料市领导共用情妇 称遭死亡威胁</li>
                <li>温州高官情妇爆料市领导共用情妇 称遭死亡威胁</li>
                <li>温州高官情妇爆料市领导共用情妇 称遭死亡威胁</li>
                <li>温州高官情妇爆料市领导共用情妇 称遭死亡威胁</li>
                <li>温州高官情妇爆料市领导共用情妇 称遭死亡威胁</li>
                <li>温州高官情妇爆料市领导共用情妇 称遭死亡威胁</li>
            </ul>
        </div>
    </div>
</div>
<div id="dragMe2" class="dragContainer">
    <h2 class="dragTarget">Drag Me Test2</h2>
    <div class="dragContent">
        <ul>
            <li>温州高官情妇爆料市领导共用情妇 称遭死亡威胁</li>
            <li>温州高官情妇爆料市领导共用情妇 称遭死亡威胁</li>
            <li>温州高官情妇爆料市领导共用情妇 称遭死亡威胁</li>
            <li>温州高官情妇爆料市领导共用情妇 称遭死亡威胁</li>
            <li>温州高官情妇爆料市领导共用情妇 称遭死亡威胁</li>
            <li>温州高官情妇爆料市领导共用情妇 称遭死亡威胁</li>
            <li>温州高官情妇爆料市领导共用情妇 称遭死亡威胁</li>
            <li>温州高官情妇爆料市领导共用情妇 称遭死亡威胁</li>
            <li>温州高官情妇爆料市领导共用情妇 称遭死亡威胁</li>
        </ul>
    </div>
</div>
<script type="text/javascript">
    var drag1 = new NAVY.Drag($('#dragMe1').find('.dragTarget'),$('#dragMe1'),{left:100,top:100,limitObj:'#dialogWrapper'});
    var drag2 = new NAVY.Drag($('#dragMe2').find('.dragTarget'),$('#dragMe2'));
</script>
</body>
</html>
