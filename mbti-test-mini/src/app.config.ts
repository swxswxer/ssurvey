export default defineAppConfig({
  pages: [
    'pages/index/index', //主页
    'pages/doQuestion/index',
    'pages/result/index', //结果页
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'MBTI性格测试',
    navigationBarTextStyle: 'black'
  }
})
