import React, { useEffect, useState } from 'react'
import {flushSync} from 'react-router-dom'
import './Skill.css'
import { Flipper, Flipped } from 'react-flip-toolkit';
import useSelectSkillStore from '../../Header/Section/useSelectSkillStore';

function Skill() {

    const frontSkill = [
        'HTML & SCSS', 'React', 'React Native', 'JavaScript', 'TypeScript', 'Zustand']
    const backSkill = [
        'Python3', 'DJango', 'DRF (Django Rest Framework)', 'My SQL', 'Docker']
    const devOpsSkill = [
        'IAM - 사용자 권한 관리', 'EC2 - Django/FastAPI 서비스 배포', 'CloudWatch - 서버 로그 & 성능 모니터링']

    const { skill, setSkill, setSkills } = useSelectSkillStore()
    const [selectSkill , setSelectSkill] = useState(null)
    const [selectArray , setSelectArray] = useState({
        front:[],
        back:[],
        devOps:[]
    })
    
    useEffect(() => {
        if(selectSkill){
            setSkills(selectSkill)
        }
    },[selectSkill,setSkills])

    //Array를 사용하여 frontSkill의 배열만큼 만들고 배열에 false를 전부 넣어준다
    //checkedSkill.front[0] = false frontSkill[0] = 'HTML & SCSS' 이런 방식으로 연결되어있움
    const [skillChecked, setSkillChecked] = useState({
        front: frontSkill.map(item => ({ name: item, checked: false })),
        back: backSkill.map(item => ({ name: item, checked: false })),
        devOps: devOpsSkill.map(item => ({ name: item, checked: false })),
    })

    // 기술 선택시 정렬
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
                    const isChecked = skillChecked[category][idx].checked
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
    const getUncheckedItems = (category, skillChecked) => {
        return skillChecked[category].filter(item => item.checked); // ✅ checked가 true 항목만 반환
    };

    //스킬 클릭 이벤트
    const handleClickSkill = (category, index) => {
        setSkillChecked(prev => {
            const currentList = prev[category]; 
            const clickedItem = { ...currentList[index], checked: !currentList[index].checked }; // 클릭한 항목 true/false 변경

            //클릭 항목을 제외한 true값 가져오기
            const checkedItems = currentList.filter(item => item.checked && item.name !== clickedItem.name) //true 반환
            const unCheckedItem = currentList.filter(item => !item.checked && item.name !== clickedItem.name ) //false 반환

                //체크값이 트루인항목 , 클릭한 항목 , 기존리스트에서 현재 가져온 항목과 checked가 false인 값을 삭제
            let newCheckedList;
            
            if (clickedItem.checked) {
                newCheckedList = [...checkedItems, clickedItem, ...unCheckedItem];
            } else {
                newCheckedList = [...checkedItems, clickedItem, ...unCheckedItem];
            }
    
            //
            //중복 제거
            const uniquedCheckList = newCheckedList.filter((item , index,self) => 
                index === self.findIndex(t => t.name === item.name)
            )
           
            // ✅ 상태 변경을 한 번의 `setState`에서 처리
                setOrderSkills(orderPrev => ({
                    ...orderPrev,
                    [category]: uniquedCheckList.map(item => item.name) // 순서 업데이트
                }));
            //[가장먼저 체크한것 , 그다음 체크한것] , [체크 했다가 풀은거] , [체크 안한거]
            return { ...prev, [category]: uniquedCheckList };
        });
    };


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
