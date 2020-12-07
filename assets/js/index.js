$(function () {
  getUserinfo()
  $("#btnLogout").on("click", function () {
    //提示用户是否退出
    let layer = layui.layer
    layer.confirm('确定是否退出', { icon: 3, title: '提示' },
      function (index) {
        //清空本地存储的token,为了防止每次登录的时候都加入了一个token本地存储
        localStorage.removeItem("token")
        //使用replace阻止浏览器记录历史记录
        location.replace("/login.html")
        //当没有代码执行的时候无法关闭提示窗口
        layer.close(index);
      });
  })
})
//获取用户基本信息
function getUserinfo() {
  $.ajax({
    method: "get",
    url: "/my/userinfo",
    //请求头配置对象
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg("请求失败")
      } else {
        renderAvatar(res.data)
      }
    },
 
  })
}
function renderAvatar(user) {
  let name = user.nikename || user.username
  $("#welcome").html("欢迎" + name)
  if (!user.user_pic) {
    let first = name[0].toUpperCase()
    $(".layui-nav-img").hide()
    $(".text-avatar").html(first).show()
  } else {
    $(".layui-nav-img").attr("src", user.user_pic).show()
    $(".text-avatar").hide()
  }
}