package com.blog.orderserver02.mapper;

import com.blog.orderserver02.pojo.AskExtends;
import com.blog.orderserver02.pojo.AskVo;
import com.blog.orderserver02.pojo.BlogsExtends;
import com.blog.orderserver02.pojo.BlogsVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface BlogMapper {
    /**
     * 主页列表查询
     * @param blogsVo
     * @return
     */
    List<BlogsExtends> selectObjects(@Param("blogsVo") BlogsVo blogsVo);

    /**
     * 悬赏列表查询
     * @param rules
     * @return
     */
    List<AskExtends> selectAskObjects(AskVo askVo);

    /**
     * 查询积分对照表
     * @return
     */
    @Select("select * from ask_money")
    List<AskExtends> selectAskMoneyObjects();

    /**
     * 添加悬赏问题表，返回主键ID
     * @param askExtends
     */
    void insertAsk(AskExtends askExtends);

    /**
     * 添加用户单个问题的分类
     * @param askExtends
     */
    void insertAsk_type(AskExtends askExtends);

}
