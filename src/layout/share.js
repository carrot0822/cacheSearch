export class share{
   // url是自己的url
 constructor(title,url,picurl){
    this.Sina = 'http://v.t.sina.com.cn/share/share.php?title='+title+'&url='+url+'&content=utf-8&sourceUrl='+url+'&pic='+picurl
    this.QQZone =  'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary='+title+'&url='+url+'&pics='+picurl
    this.douban = 'http://shuo.douban.com/!service/share?href=' + url + '&name=' + title + '&image=' + picurl
    this.QQ = 'http://connect.qq.com/widget/shareqq/index.html?url=' + url + '&title=' + title  + '&pics=' + picurl
 }
 shareSina(){
    window.open(this.Sina,'newwindow','height=400,width=400,top=100,left=100')
 }
 shareQQZone(){
    window.open(this.QQZone,'newwindow','height=400,width=400,top=100,left=100')
 }
 shareDouban(){
     window.open(this.douban,'newwindow','height=400,width=400,top=100,left=100')
 }
 shareQQ(){
     window.open(this.QQ,'newwindow','height=400,width=400,top=100,left=100')
 }
}

export class shop{
   constructor(title){
      this.ding = 'http://search.dangdang.com/?key=' + title
      this.amazon = 'https://www.amazon.cn/s?k=' + title
      this.dogDong = `https://search.jd.com/Search?keyword=${title}&enc=utf-8`
   }
   shopDing(){
      window.open(this.ding,'newwindow','height=400,width=400,top=100,left=100')
   }
   shopAmazon(){
      window.open(this.amazon,'newwindow','height=400,width=400,top=100,left=100')
   }
   shopJing(){
      window.open(this.dogDong,'newwindow','height=400,width=400,top=100,left=100')
   }
}
 