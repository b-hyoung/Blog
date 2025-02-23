import React, { useEffect, useState } from 'react'
import './Skill.css'
import { Flipper, Flipped } from 'react-flip-toolkit';

function Skill() {

    const frontSkill = [
        'HTML & SCSS', 'React', 'React Native', 'JavaScript', 'TypeScript', 'Zustand']
    const backSkill = [
        'Python3', 'DJango', 'DRF (Django Rest Framework)', 'My SQL', 'Docker']
    const devOpsSkill = [
        'IAM - 사용자 권한 관리', 'EC2 - Django/FastAPI 서비스 배포', 'CloudWatch - 서버 로그 & 성능 모니터링']

    //Array를 사용하여 frontSkill의 배열만큼 만들고 배열에 false를 전부 넣어준다
    //checkedSkill.front[0] = false frontSkill[0] = 'HTML & SCSS' 이런 방식으로 연결되어있움
    const [checkedSkill, setCheckedSkill] = useState({
        front: Array(frontSkill.length).fill(false),
        back: Array(backSkill.length).fill(false),
        devOps: Array(devOpsSkill.length).fill(false)
    })

    const [orderSkills, setOrderSkills] = useState({
        front: frontSkill,
        back: backSkill,
        devOps: devOpsSkill
    })

    const SkillCategory = ({ category }) => {
        const skillList = orderSkills[category];

        return <div className={category + '_Skill'}>
            <Flipper className='animation' flipKey={skillList.join('')}>
                {skillList.map((item, idx) => {
                    const isChecked = checkedSkill[category][idx]
                    return (
                        <Flipped key={item} flipId={item}>
                            <div className='Skill_List' key={idx}>
                                <span onClick={() => handleClickSkill(category, idx)}>
                                    <div className='SkillName'>{item}</div>
                                    {/* ischecked(frontend 0번째의 ischecked가 true 면 checked를 반환) 
                                onclick시 handleEvenv로 해당 카테고리 인덱스값을 true로 변경하여 className을 변경해준다.
                                */}
                                    <div className={`checkbox ${isChecked ? `${category}-checked` : category}`}>
                                    </div>
                                </span>
                            </div>
                        </Flipped>
                    )
                })}
            </Flipper>
        </div>
    }

    //스킬 클릭 이벤트
    const handleClickSkill = (category, index) => {
        //선택한 상태를 제외한 나머지값은 그대로 두기 위해 prev값을 사용하기
        setCheckedSkill(prev => ({
            ...prev,
            [category]: prev[category].map((item, idx) =>
                idx === index ? !item : item //
            ),
        }))
        setCheckedSkill(prev => {
            const currentCheckList = prev[category]
            const ClickCheckList = currentCheckList[index]
            const newList = [ClickCheckList,...currentCheckList.filter((item , i) => i !== index)]
            return {...prev,[category]:newList}
        })
        setOrderSkills(prev => {
            const currentList = prev[category];
            //클릭 항목 추출
            const clickedItem = currentList[index]
            //클릭 항목을 첫번째로 나머지 그대로 이어붙임
            const newList = [clickedItem, ...currentList.filter((item, i) => i !== index)]
            return { ...prev, [category]: newList }
        })
    }

    /*
    1. isChecked가 바뀌며 모든 className이 바뀐다 (아땋게 해야 해당 )
    2. 내가 클릭한 index값이 기존에 있는 index값과 같다면 체크드
    3. 그럼 ischecked를 3개를 만들어야하 하는가?(front , backend , devOps)

    여긴 클릭 했을 때 이벤트가아닌 처음 시작과 동시에 열리는 곳이라는것도 감안
     */
    // const Checkbox = ({Skill,index,idx}) => {
    //     let temp = idx
    //     /* return으로 div를 만드는것을 handleClickcategory에서 사용해 볼 것*/
    //     return (
    //         isChecked === true &&  index === temp && Skill === Skill?
    //             <div className={`checkbox ${Skill}-checked`} onClick={() => handleClickSkill(Skill,index)}> {console.log("Checked : " +Skill)}</div>
    //              :
    //             <div className={`checkbox ${Skill}`} onClick={() => handleClickSkill(Skill,index)}> {console.log("Do Not Check : "+Skill)}</div>
    //     )
    // };

    const SKillTitle = ({ skillName }) => {
        return <div className={`Skill_title ${skillName}`}>{skillName}</div>;
    }



    return (
        <div className='Skill'>
            <div className='Front_Category'>
                <SKillTitle skillName={"Front End"} />
                <SkillCategory category={"front"} />
            </div>
            <div className='Back_Category'>
                <SKillTitle skillName={"Back End"} />
                <SkillCategory category={"back"} />
            </div>
            <div className='DevOps_Category'>
                <SKillTitle skillName={"DevOps"} />
                <SkillCategory category={"devOps"} />
            </div>
        </div>
    )
}

export default Skill
