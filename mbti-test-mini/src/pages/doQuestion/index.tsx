import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";

import { AtButton, AtRadio } from "taro-ui";
import questions from "../../data/questions.json";
import "./index.scss";
import GlobalFooter from "../../components/GlobalFooter";

export default () => {
  //当前题号
  const [current, setCurrent] = useState<number>(1);

  //当前题目
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);

  const questionOptions = currentQuestion.options.map((option) => {
    return { label: `${option.key}.${option.value}`, value: option.key };
  });
  //当前答案
  const [currentAnswer, setCurrentAnswer] = useState<String>();
  //回答列表
  const [answerList] = useState<String[]>([]);

  //序号变化时切换当前题目和当前题目选项
  useEffect(() => {
    setCurrentQuestion(questions[current - 1]);
    setCurrentAnswer(answerList[current - 1]);
  }, [current]);

  return (
    <View className="doQuestionPage">
      <View className="at-article__h2 title">
        {current}、{currentQuestion.title}
      </View>
      <view className="options-wrapper">
        <AtRadio
          options={questionOptions}
          value={currentAnswer}
          onClick={(value) => {
            //设置当前回答
            setCurrentAnswer(value);
            //记录回答
            answerList[current - 1] = value;
          }}
        />
      </view>
      {current < questions.length && (
        <AtButton
          type="primary"
          circle
          className="controlBtn"
          disabled={!currentAnswer}
          onClick={() => setCurrent(current + 1)}
        >
          下一题
        </AtButton>
      )}
      {current == questions.length && (
        <AtButton
          type="primary"
          circle
          className="controlBtn"
          disabled={!currentAnswer}
          onClick={() => {
            //存储答案List
            Taro.setStorageSync("answerList", answerList);
            //跳转到结果页面
            Taro.navigateTo({
              url: "/pages/result/index",
            });
          }}
        >
          查看结果
        </AtButton>
      )}
      {current > 1 && (
        <AtButton
          circle
          className="controlBtn"
          onClick={() => setCurrent(current - 1)}
        >
          上一题
        </AtButton>
      )}
      <GlobalFooter></GlobalFooter>
    </View>
  );
};
