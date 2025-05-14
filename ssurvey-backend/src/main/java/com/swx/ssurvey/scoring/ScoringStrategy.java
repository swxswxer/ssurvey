package com.swx.ssurvey.scoring;

import com.swx.ssurvey.model.entity.App;
import com.swx.ssurvey.model.entity.UserAnswer;

import java.util.List;

/**
 * 评分策略
 *
 * @author   swxswx
 * @from <a href="https://www.code-nav.cn">编程导航学习圈</a>
 */
public interface ScoringStrategy {

    /**
     * 执行评分
     *
     * @param choices
     * @param app
     * @return
     * @throws Exception
     */
    UserAnswer doScore(List<String> choices, App app) throws Exception;
}