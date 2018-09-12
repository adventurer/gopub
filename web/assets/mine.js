$(".sureToGo").bind("click",function(e){
    if(confirm("确定提交？")){
        e.commit()
    }
    e.preventDefault();
    console.log(e);
})
