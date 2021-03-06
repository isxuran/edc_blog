package com.blog.orderserver01.service.impl;

import com.blog.orderserver01.mapper.BlogMapper;
import com.blog.orderserver01.pojo.*;
import com.blog.orderserver01.service.BlogService;
import com.blog.orderserver01.utils.Md5Util;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class BlogServiceImpl implements BlogService {

    @Resource
    private BlogMapper blogMapper;

    @Resource
    RedisTemplate<String,UsersVo> redisTemplate;

    @Override
    public List<BlogsExtends> selectObjects(BlogsVo blogsVo) {
        List<BlogsExtends> list = blogMapper.selectObjects(blogsVo);
        //手动缩略文章内容
        for (BlogsExtends blog:list) {
            if(blog.getContent().length()>=60){
                String content_list = blog.getContent().substring(0, 60)+"...";
                blog.setContent(content_list);
            }
        }
        return list;
    }

    @Override
    public List<AskExtends> selectAskObjects(AskVo askVo) {
        return blogMapper.selectAskObjects(askVo);
    }

    @Override
    public List<AskExtends> selectAskMoneyObjects() {
        return blogMapper.selectAskMoneyObjects();
    }

    @Override
    public void insertAsk(AskExtends askExtends) throws Exception{
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        String time = format.format(new Date());
        askExtends.setDate(time);
        String ask_types = askExtends.getAsk_types();
        StringBuffer askType = new StringBuffer();
        StringBuffer realTypes = new StringBuffer();
        String[] types = ask_types.trim().split(" ");
        for (int i = 0; i < types.length; i++) {
            if(types[i].length()>0){
                realTypes.append(types[i]+" ");
            }
        }
        String[] realTypesArray = realTypes.toString().trim().split(" ");
        askExtends.setAsk_typesArray(realTypesArray);
        blogMapper.insertAsk(askExtends);
        blogMapper.insertAsk_type(askExtends);
    }

    @Override
    public UsersVo checkInfo(UsersVo usersVo) {
        //前台传过来的字符进行拼接
        String pwd = usersVo.getUsername()+usersVo.getPassword();
        System.out.println("ooo+++—————————————————————————— 前台的字符串值 ——————————————————————————\n"+pwd);
        //把hashCode值进行普通MD5加密
        String pwdMd5 = Md5Util.MD5(pwd);
        System.out.println("ooo+++—————————————————————————— 字符串的Md5值 ——————————————————————————\n"+pwdMd5);
        int hashCode = pwdMd5.hashCode();
        System.out.println("ooo+++—————————————————————————— 取字符串的hashCode值 ——————————————————————————\n"+hashCode);
        //转成字符串
        String hashPwd = String.valueOf(hashCode);
        //把hashCode值再一次进行普通MD5加密
        String userMd5 = Md5Util.MD5(hashPwd);
        System.out.println("ooo+++—————————————————————————— 再次Md5加密 ——————————————————————————\n"+userMd5);

        //注册时用
        //动态盐加密MD5，存入数据库
        String dynamicSaltMd5 = Md5Util.generateDynamicSaltMd5(userMd5);
        System.out.println("ooo+++—————————————————————————— hashCode值进行动态盐加密 ——————————————————————————\n"+dynamicSaltMd5);

        String userDynamicSaltMd5 = blogMapper.selectPwdByName(usersVo);
        System.out.println("ooo+++—————————————————————————— 用户动态盐MD5 ——————————————————————————\n"+userDynamicSaltMd5);

        if(userDynamicSaltMd5!=null){
            //校验密码，md5追溯到最开始是用户输入的密码，dynamicSaltMd5从数据库查取
            boolean verify = Md5Util.verify(userMd5, userDynamicSaltMd5);
            System.out.println("ooo+++—————————————————————————— 校验密码true为正确 ——————————————————————————\n"+verify);
            if(verify){
                usersVo.setPassword(userDynamicSaltMd5);
                return usersVo;
            }
            return null;
        }else{
            return null;
        }

    }

    @Override
    public String selectPwdByName(UsersVo usersVo) {
        return blogMapper.selectPwdByName(usersVo);
    }

    @Override
    public Boolean registerUser(Users users) {

        Boolean flag = true;
        try {
            //前台传过来的字符进行拼接
            String pwd = users.getUsername()+users.getPassword();
            System.out.println("<<<+++—————————————————————————— 前台的字符串值 ——————————————————————————\n"+pwd);
            //把hashCode值进行普通MD5加密
            String pwdMd5 = Md5Util.MD5(pwd);
            System.out.println("<<<+++—————————————————————————— 字符串的Md5值 ——————————————————————————\n"+pwdMd5);
            int hashCode = pwdMd5.hashCode();
            System.out.println("<<<+++—————————————————————————— 取字符串的hashCode值 ——————————————————————————\n"+hashCode);
            //转成字符串
            String hashPwd = String.valueOf(hashCode);
            //把hashCode值再一次进行普通MD5加密
            String userMd5 = Md5Util.MD5(hashPwd);
            System.out.println("<<<+++—————————————————————————— 再次Md5加密 ——————————————————————————\n"+userMd5);

            //动态盐加密MD5，存入数据库
            String dynamicSaltMd5 = Md5Util.generateDynamicSaltMd5(userMd5);
            System.out.println("<<<+++—————————————————————————— hashCode值进行动态盐加密 ——————————————————————————\n"+dynamicSaltMd5);
            users.setPassword(dynamicSaltMd5);

            blogMapper.registerUser(users);
        } catch (Exception e) {
            flag = false;
            e.printStackTrace();
        }

        return flag;
    }

    @Override
    public Users selectUser(String user_uuid) {
        if(user_uuid==null){
            return null;
        }
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(UsersVo.class));
        UsersVo usersVo = redisTemplate.opsForValue().get(user_uuid);

        if(usersVo!=null){
            Users users = blogMapper.selectUserByNameAndPwd(usersVo);
            return users;
        }

        return null;
    }
}
