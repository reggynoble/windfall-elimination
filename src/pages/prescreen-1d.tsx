import React from "react";
import styled from "@emotion/styled";
import DatePicker from "react-datepicker";
import { colors } from "../constants";
import dayjs from "dayjs";
import {
  Card,
  QuestionText,
  SEO,
  RadioButton,
  AnswerBox,
  LabelText,
  H2,
  Glossary,
  TextBlock,
  FileUpload,
  WarningBox,
  AnswerInputDiscouragePlaceholder
} from "../components";
import { FutureAwiPredictionEnum, PiaTypeOfBenefitIncreaseAssumption, EarningsEnum, useUserState, UserState } from '../library/user-state-context';
import { useUserStateActions, UserStateActions } from '../library/user-state-actions-context'
const StyledDatePicker = styled(DatePicker)`
  border: 2px solid ${colors.purple};
  height: 60px;
  font-size: 25px;
  min-width: 230px;
  border-radius: 3px;
  padding-left: 10px;
  &::placeholder {
    font-size: 18px;
    font-family: 'Montserrat',sans-serif;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
 
`;

const CardGlossaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: auto 0;
  
  @media (max-width: 767px){
    display: block;
  }
`;

const TopQuestionAndTitle = styled.div`
width: 70%;
margin-bottom: 75px;
@media (max-width: 767px){
  width: 100%;
}
`;

const HowToContainer = styled.div`
  display: block;
`;

const Link = styled.a`
  color: black;
  font-weight: 600;
  overflow-wrap: break-word;
`;

///////
///////

interface Prescreen1dProps {
  userState: UserState
  userStateActions: UserStateActions
}

class Prescreen1d extends React.Component<Prescreen1dProps> {
  handleSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      userStateActions: {
        setExpectedLastEarningYear,
        setAwiTrendOrManualPrediction,
        setAwiTrendSelection,
        setExpectedPercentageWageIncrease
      }
    } = this.props
    const selectValueString = e.target.value;
    switch (e.target.name) {
      case "expectedLastEarningYear":
        setExpectedLastEarningYear(parseInt(selectValueString, 10))
        break;
      case "awiTrendSelection":
        setAwiTrendSelection(parseInt(selectValueString, 10) as PiaTypeOfBenefitIncreaseAssumption)
        break;
      case "awiTrendOrManualPrediction":
        setAwiTrendOrManualPrediction(selectValueString as FutureAwiPredictionEnum)
        break;
      case "expectedPercentageWageIncrease":
        setExpectedPercentageWageIncrease(parseFloat(selectValueString))
    }
  }

  render() {
    const {
      userState: {
        pensionDateAwarded,
        pensionAmount,
        expectedLastEarningYear,
        awiTrendOrManualPrediction,
        awiTrendSelection,
        expectedPercentageWageIncrease,
        isManual
      }
    } = this.props
    return (
      <React.Fragment>
        <SEO
          title="Prescreen 1D"
          keywords={[`gatsby`, `application`, `react`]}
        />
        <ContentContainer>
          <CardGlossaryContainer>
            <TopQuestionAndTitle><H2>Your Earnings In the Years Ahead</H2>
              <Card>
                <label>
                  <QuestionText>
                    Please enter the last year you expect to earn.
                  </QuestionText>
                  <AnswerInputDiscouragePlaceholder
                    name="expectedLastEarningYear"
                    defaultValue={expectedLastEarningYear ?? undefined}
                    placeholder={'2020'}
                    onChange={this.handleSelection}
                  ></AnswerInputDiscouragePlaceholder>
                </label>
                <WarningBox>
                  The year must be {dayjs().year()} or above. 
                </WarningBox>
              </Card>
              <Card>
                <QuestionText>
                  How would you like to estimate your future earnings?
              </QuestionText>
                <AnswerBox>
                  <RadioButton
                    type="radio"
                    name="awiTrendOrManualPrediction"
                    value={FutureAwiPredictionEnum.PERCENTAGE}
                    onChange={this.handleSelection}
                    checked={awiTrendOrManualPrediction === FutureAwiPredictionEnum.PERCENTAGE}
                  />
                  <LabelText>Use Percentage Only</LabelText>
                </AnswerBox>
                <AnswerBox>
                  <RadioButton
                    type="radio"
                    name="awiTrendOrManualPrediction"
                    value={FutureAwiPredictionEnum.TREND}
                    onChange={this.handleSelection}
                    checked={awiTrendOrManualPrediction === FutureAwiPredictionEnum.TREND}
                  />
                  <LabelText>Use Percentage plus<br /> Economic Trends</LabelText>
                </AnswerBox>
                <AnswerBox>
                  <RadioButton
                    type="radio"
                    name="awiTrendOrManualPrediction"
                    value={FutureAwiPredictionEnum.MANUAL}
                    onChange={this.handleSelection}
                    checked={awiTrendOrManualPrediction === FutureAwiPredictionEnum.MANUAL}
                  />
                  <LabelText>Predict it myself</LabelText>
                </AnswerBox>
              </Card>
            </TopQuestionAndTitle>
            <Glossary
              title="WHAT EARNINGS WOULD NOT BE ON MY SOCIAL SECURITY EARNINGS RECORD?"
              link="http://www.ncsssa.org/statessadminmenu.html"
              linkText=""
            >
              For example, you may have worked for a state or local government, like
              a city or town or school system. In many states, state and local jobs
              do not pay into Social Security, which means earnings from these jobs
              will not show up on a Social Security record.
        </Glossary>
          </CardGlossaryContainer>
          {(awiTrendOrManualPrediction === FutureAwiPredictionEnum.PERCENTAGE || awiTrendOrManualPrediction === FutureAwiPredictionEnum.TREND) && (
            <CardGlossaryContainer>
              <Card>
                <QuestionText>
                  Percent wage increase
                  </QuestionText>
                <AnswerInputDiscouragePlaceholder
                  name="expectedPercentageWageIncrease"
                  defaultValue={expectedPercentageWageIncrease ?? undefined}
                  placeholder={'0.01'}
                  onChange={this.handleSelection}
                >
                </AnswerInputDiscouragePlaceholder>
              </Card>
            </CardGlossaryContainer>
          )}
          {awiTrendOrManualPrediction && awiTrendOrManualPrediction === FutureAwiPredictionEnum.TREND && (
            <CardGlossaryContainer>
              <Card>
                <QuestionText>
                  Which trend would you like to use to predict your future earnings?
                </QuestionText>
                <AnswerBox>
                  <RadioButton type="radio" name="awiTrendSelection" value={PiaTypeOfBenefitIncreaseAssumption.alternative2Intermediate} onChange={this.handleSelection} checked={awiTrendSelection === PiaTypeOfBenefitIncreaseAssumption.alternative2Intermediate} />
                  <LabelText>Intermediate <br />(Between Low and High)</LabelText>
                </AnswerBox>
                <AnswerBox>
                  <RadioButton type="radio" name="awiTrendSelection" value={PiaTypeOfBenefitIncreaseAssumption.alternative3Pessimistic} onChange={this.handleSelection} checked={awiTrendSelection === PiaTypeOfBenefitIncreaseAssumption.alternative3Pessimistic} />
                  <LabelText>Low (Economy doesn’t go well)</LabelText>
                </AnswerBox>
                <AnswerBox>
                  <RadioButton type="radio" name="awiTrendSelection" value={PiaTypeOfBenefitIncreaseAssumption.alternative1Optimistic} onChange={this.handleSelection} checked={awiTrendSelection === PiaTypeOfBenefitIncreaseAssumption.alternative1Optimistic} />
                  <LabelText>High (Economy goes well)</LabelText>
                </AnswerBox>
              </Card>
              <Glossary
                title="Average Wage Earnings projections from SSA"
                linkText=""
              >
                The Social Security Administration updates their expectations
                for average wages
                in the USA economy about once a year, offering three projections:
                low, intermediate, and high. <strong>Your choice will be used for predicting
                earnings into the future.</strong>
                </Glossary>
            </CardGlossaryContainer>
          )}
          {//TODO: Maybe we want to display the earnings that the
            // projections that the Detailed Calculator makes
            // but we don't have that until the results page right now, 
            // when the AnyPIAJS WASM code is run.
          }
          {awiTrendOrManualPrediction === FutureAwiPredictionEnum.MANUAL && (
            <>
              <Card>
                <label>
                  <QuestionText>
                    Future Earnings
                  </QuestionText>
                </label>
                <FileUpload manual={false} hideUploadButton={true} />
              </Card>
            </>
          )}
        </ContentContainer>
      </React.Fragment>
    );
  }
}

export default function Prescreen1dWrapper(): JSX.Element {
  const userState = useUserState()
  const userStateActions = useUserStateActions()
  return <Prescreen1d userState={userState} userStateActions={userStateActions} />
}