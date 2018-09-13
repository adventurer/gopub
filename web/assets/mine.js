$(".sureToGo").bind("click",function(e){
    if(confirm("确定提交？")){
        e.commit()
    }
    e.preventDefault();
    console.log(e);
})

$(".taskFiles").bind({
    "click":function(_e){
        style = $(this).attr("style")
        console.log(style)
        if (typeof(style) == "undefined" || style == "") {
            $(this).attr("style","width:60%;height:400px;position:fixed;left:20%;top:30%;z-index:999;")
        } else {
            $(this).attr("style","")            
        }
    }
})

