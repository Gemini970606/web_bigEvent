$(function () {
  //注册按钮
  $("#link_reg").on('click', function () {
    $(".login-box").hide()
    $(".reg-box").show()
  })
  //登录按钮
  $("#link_login").on('click', function () {
    $(".login-box").show()
    $(".reg-box").hide()
  })
  //从layui中获取对象
  var form = layui.form
  var layer = layui.layer
  form.verify({
    pwd: [/^[\S]{6,12}$/,
      '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
      /* 通过形参拿到的是确认密码框中的值,去比较两个密码框中的值是否相等,然后进行判断 */
      var pwd = $(".reg-box [name=password]").val()
      if (pwd !== value) {
        return ("两次密码不一致")
      }
    }
  })
  /* 监听注册表单的提交事件 */
  $("#form_reg").on("submit", function (e) {
    e.preventDefault()
    let data = {
      username: $("#form_reg [name=username]").val(),
      password: $("#form_reg [name=password").val()
    };
    $.post('/api/reguser', data
      , function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        } else {
          layer.msg("注册成功")
          $("#link_login").click()
        }
      }
    )
  })
  /* 监听登陆表单的提交事件 */
  $("#form_login").on("submit", function (e) {
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'post',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("登录失败");
        } else {
          layer.msg("登录成功");
          //登录成功后将token和值存储到本地存储中
          localStorage.setItem("token", res.token)
          //登录成功后将页面跳转到index页面
        /*    window.location.href = '/index.html'  */
        }
      }
    })
  })
})