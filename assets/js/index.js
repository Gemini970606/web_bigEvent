$(function () {
  getUserinfo()
})
//获取用户基本信息
function getUserinfo() {
  $.ajax({
    method: "get",
    url: "/my/userinfo",
    //请求头配置对象
    headers: {
      Authorization: localStorage.getItem("token") || ''
    },
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg("请求失败")
      } else {
        console.log(res);
        renderAvatar(res.data)
      }
    }
  })
}
function renderAvatar(user) {
  let name = user.nikename||user.username
  $("#welcome").html("欢迎"+name)
  if(!user.user_pic){
    let first = name[0].toUpperCase()
    $(".layui-nav-img").hide()
    $(".text-avatar").html(first).show()
  }else{
    $(".layui-nav-img").attr("src",user.user_pic).show()
    $(".text-avatar").hide()
  }
}