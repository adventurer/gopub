$(".sureToGo").bind("click",function(e){
    if(confirm("确定提交？")){
        e.commit()
    }
    e.preventDefault();
    console.log(e);
})

$(".taskFiles .fa-window-maximize").bind({
    "click":function(_e){
        that = $(this).parent()
        area = $(this).prev()
        area.attr('rows','18')


        style = that.attr("style")

        if (style == "position:relative;") {
            console.log(1)
            that.attr("style","position:relative;width:60%;height:410px;position:fixed;left:20%;top:30%;z-index:999;")
        } else {
            console.log(2)
            area.attr('rows',2)
            that.attr("style","position:relative;")            
        }
    }
})

