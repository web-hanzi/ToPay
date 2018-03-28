<template>
    <div class="login">
      <h3 style="font-weight: normal;color: #409EFF">欢迎登录</h3>
      <el-form :model="ruleForm"  ref="ruleForm" class="demo-ruleForm loginFrom">
        <el-form-item >
          <el-input placeholder="请输入您的用户名"  v-model="ruleForm.userCode"></el-input>
        </el-form-item>
        <span class="ShowNameerr" v-show="ShowNameerr">* 用户名不能为空且必须汉子</span>
        <el-form-item>
          <el-input type="password" placeholder="请输入您的密码" v-model="ruleForm.userPwd" ></el-input>
        </el-form-item>
        <span class="ShowPsderr" v-show="ShowPsderr">* 密码不能为空且为6~16位英文字母或者数字</span>
        <div style="padding: 1rem 0 2rem 0;" class="clear">
            <span class="lt"><input type="checkbox">记住密码</span>
            <span class="rt" @click="clearCookie" style="cursor: pointer;color: #333333;font-size: 0.75rem;margin-left: 5px;">忘记密码？</span>
        </div>
        <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100%;">登陆</el-button>
      </el-form>
    </div>
</template>

<script>
  import axios from 'axios'
  import { MidPost } from '../assets/MidPost.js'
    export default {
        name: "login",
      data () {
        return {
          checked:'',
          ruleForm: {
            userCode: 'xt001', //用户名
            userPwd: 'test', //密码
          },
          ShowNameerr:false,
          ShowPsderr:false,
          configData: {
            url: 'http://61.183.92.242:8098/Midserver.asq',
            requestJson: "{'userCode':'xt001','userPwd': 'test',}",
            // Aeskey: '17C133AE614211DD',
            postData: {
              service: "manage.userlogin",
              partner: "HBSFYBJY_WX",
              hospitalCode: "000002",
              dataFormat: "JSON",
              inputCharset: "utf-8",
              debug: true,
              requestEncrypted: "b1KyZzyKCZkb6d7oSxH8Dqu9fQgYbID34m+oPTZPMteMsi6KZwpdG0of5S4iGuT3tXpbFWdzQ5UgtxGOsBdzbg==",
              signType: "md5",
              sign: "69382D72F353A77591363E23097DC596"
            }
          },
        }
      },
      methods: {
        //点击登录调用方法
        submitForm(formName) {
          //保存的账号
          var name=this.ruleForm.userCode;
          //保存的密码
          var pass=this.ruleForm.userPwd;

          if(name==''){
            // alert("请输入正确的用户名");
            this.ShowNameerr = true
            return
          }else if(pass==''|| !/\w{3,16}/g.test(pass)) {
            // alert("请输入正确的密码");
            this.ShowPsderr = true
            return
          }

          //判断复选框是否被勾选 勾选则调用配置cookie方法
          if(this.checked=true){
            //传入账号名，密码，和保存天数3个参数
            this.setCookie(name,pass,7);
            console.log()
          }
         // 接口
         //  var url='http://61.183.92.242:8098/Midserver.asq';
         //  this.$http.post(url,this.configData.postData,{emulateJSON:true})
         //    .then(res=>{
         //      if(res.body=="fail"){
         //        alert("用户名或密码错误,请重新输入");
         //        this.ruleForm.userName='';
         //        this.ruleForm.password='';
         //        return
         //      } else{
         //        alert("登录成功")
         //        console.log(res)
         //      //this.$router.push("/loginsuccess")
         //      }
         //    });

            // axios({
            //   url: this.configData.url,
            //   method:'post',
            //   timeout :1500,
            //   dataType: 'JSON',
            //   data: JSON.stringify(this.configData.postData),
            // }).then(res=>{
            //   console.log(res)
            // }).catch(err=>{
            //   console.log(err)
            // })

            var that = this;
            MidPost.postMidserver({success:function(data) {
                console.log(data)
              },
              service:"manage.userlogin",
              requestJson: JSON.stringify(that.configData.requestJson)

            })

          // axios({
          //   url:'/api/Midserver.asq',
          //   // url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1625a10ed8d25739&redirect_uri=https%3A%2F%2Fwww%2E51kangduo%2Ecom%2FYLaccess%2Easq&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect',
          //   method: 'post',
          //   timeout :1500,
          //   dataType: 'JSON',
          //   data: {
          //     "service": "manage.userlogin",
          //     "partner": 'WYFRONTTEST',
          //     "userCode":"xt001",
          //     "userPwd": "test",
          //   }
          // }).then(res=>{
          //   console.log(res)
          // }).catch(err=>{
          //   console.log(err)
          // })

        },


        //设置cookie
        setCookie(c_name,c_pwd,exdays) {
          var exdate=new Date();//获取时间
          exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
          //字符串拼接cookie
          window.document.cookie="userCode"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
          window.document.cookie="userPwd"+"="+c_pwd+";path=/;expires="+exdate.toGMTString();
        },
        //读取cookie
        getCookie:function () {
          if (document.cookie.length>0) {
            var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
            for(var i=0;i<arr.length;i++){
              var arr2=arr[i].split('=');//再次切割
              //判断查找相对应的值
              if(arr2[0]=='userCode'){
                this.ruleForm.userName=arr2[1];//保存到保存数据的地方
              }else if(arr2[0]=='userPwd'){
                this.ruleForm.password=arr2[1];
              }
            }
          }
        },
        //清除cookie
        clearCookie:function () {
          this.setCookie("","",-1);//修改2值都为空，天数为负1天就好了
        }
      },
      //页面加载调用获取cookie值
      mounted(){
        //this.getCookie()
      }
    }
</script>

<style scoped>
  .lt{
    float: left;
    cursor: pointer;
    color: #333333;
    font-size: 0.75rem;
  }
  .lt input{
    vertical-align: middle;
  }
  .rt{
    float: right;
  }
  .ShowNameerr,.ShowPsderr{
    display: inline-block;
    width: 100%;
    font-size: 0.5rem;
    color: red;
    text-align: left;
    text-indent: 1.5em;
  }
  .login{
    margin-top: 60px;
  }
  .loginrex{
    display: inline-block;
    width: 100%;
    text-align: left;
    font-size: 0.8rem;
    color: #333333;
    text-indent: 1em;
  }
</style>
