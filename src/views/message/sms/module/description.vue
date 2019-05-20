<template>
  <div>
    <blockquote class="my-blockquote"> 国内短信发送步骤</blockquote>
    <pre class="my-code">
 # 添加签名。
 # 短信签名必须遵循短信签名规范，且经过审核。
 # 添加模板。
 # 短信模板必须遵循短信模板规范，且经过审核
 # 发送短信。
 # 通过群发助手发送短信。
 # 通过短信服务API发送短信</pre>
    <blockquote class="my-blockquote">发送短信</blockquote>
    <pre class="my-code">
import com.aliyuncs.CommonRequest;
import com.aliyuncs.CommonResponse;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.exceptions.ServerException;
import com.aliyuncs.http.MethodType;
import com.aliyuncs.profile.DefaultProfile;
/*
  pom.xml
  com.aliyun
  aliyun-java-sdk-core
*/
public class CommonRpc {
    public static void main(String[] args) {
        DefaultProfile profile = DefaultProfile.getProfile("default", "accessKeyId", "accessSecret");
        IAcsClient client = new DefaultAcsClient(profile);

        CommonRequest request = new CommonRequest();
        //request.setProtocol(ProtocolType.HTTPS);
        request.setMethod(MethodType.POST);
        request.setDomain("dysmsapi.aliyuncs.com");
        request.setVersion("2017-05-25");
        request.setAction("SendSms");

        try {
            CommonResponse response = client.getCommonResponse(request);
            System.out.println(response.getData());
        } catch (ServerException e) {
            e.printStackTrace();
        } catch (ClientException e) {
            e.printStackTrace();
        }
    }
}</pre>
    <blockquote class="my-blockquote">更多帮助</blockquote>
    <pre class="my-code">更多帮助请查看文档：<a style="color:#009688" href="https://help.aliyun.com/product/44282.html?spm=a2c4g.11186623.6.540.544443d7OIBzUw" target="_black">短信服务</a></pre>
  </div>
</template>

<script>
import '@/styles/description.scss'
export default {
  name: 'Description'
}
</script>

<style scoped>
</style>
