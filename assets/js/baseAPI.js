$.ajaxPrefilter(function (options) {
  options.url = "http://ajax.frontend.itheima.net" + options.url
  if ((options.url).includes("/my/")) {
    options.headers = {
      Authorization: localStorage.getItem("token") || ''
    }
  }
  //无论请求成功与否，都会执行complete属性
  //complete是为了防止未登录的情况下可以访问index页面
  options.complete = function (res) {
    if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
      localStorage.removeItem("token")
      location.replace('/login.html')
    }
  }
})