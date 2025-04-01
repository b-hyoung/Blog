import React, { useEffect, useState } from 'react'
import {flushSync} from 'react-router-dom'
import './Skill.css'
import { Flipper, Flipped } from 'react-flip-toolkit';
import useSelectSkillStore from '../../Header/Section/useSelectSkillStore';

function Skill() {

    const frontSkill = [
       'React', 'JavaScript', 'CSS', 'TypeScript', 'Zustand','TailWindCSS' , 'React-Query']
    const backSkill = [
        'Python3', 'DJango', 'DRF (Django Rest Framework)', 'My SQL', 'Docker']
    const devOpsSkill = [
        'IAM - 사용자 권한 관리', 'EC2 - Django/FastAPI 서비스 배포', 'CloudWatch - 서버 로그 & 성능 모니터링']

    const [checkedOnly, setCheckedOnly] = useState([]);
    
    const { skill, setSkill, setSkills } = useSelectSkillStore()
    
    
    
    //Array를 사용하여 frontSkill의 배열만큼 만들고 배열에 false를 전부 넣어준다
    //checkedSkill.front[0] = false frontSkill[0] = 'HTML & SCSS' 이런 방식으로 연결되어있움
    const [skillChecked, setSkillChecked] = useState({
        front: frontSkill.map(item => ({ name: item, checked: false })),
        back: backSkill.map(item => ({ name: item, checked: false })),
        devOps: devOpsSkill.map(item => ({ name: item, checked: false })),
    })
    useEffect(() => {
        if(checkedOnly){
            setSkills(checkedOnly.map(item => ({
                name : item.name,
                checked : item.checked
            })))
        }
    },[checkedOnly])

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
  
    //스킬 클릭 이벤트
    const handleClickSkill = (category, index) => {
        setSkillChecked(prev => {
            const currentList = prev[category]; 
            const clickedItem = { ...currentList[index], checked: !currentList[index].checked }; // 클릭한 항목 true/false 변경
    
            // 클릭한 항목을 제외한 true값 가져오기
            const checkedItems = currentList.filter(item => item.checked && item.name !== clickedItem.name); // true 반환
            const unCheckedItem = currentList.filter(item => !item.checked && item.name !== clickedItem.name ); // false 반환
    
            // 클릭한 항목을 추가하여 새로운 리스트 생성
            let newCheckedList = [...checkedItems, clickedItem, ...unCheckedItem];
    
            // 중복 제거
            const uniquedCheckedList = newCheckedList.filter((item, index, self) => 
                index === self.findIndex(t => t.name === item.name)
            );
    
            // 기존 checkedOnly를 유지하면서 새로운 checked: true 값 추가
            setCheckedOnly(prevCheckedOnly => {
                const updatedCheckedOnly = [...prevCheckedOnly];
    
                if (clickedItem.checked) {
                    // 클릭한 아이템이 체크되었으면 checkedItems 배열을 개별 항목으로 추가
                    updatedCheckedOnly.push(...checkedItems);  // checkedItems 배열을 펼쳐서 추가
                    updatedCheckedOnly.push(clickedItem); // 클릭한 항목도 추가
                } else {
                    // checkedItems에서 clickedItem을 제외하고 업데이트
                    const updatedList = updatedCheckedOnly.filter(item => item.name !== clickedItem.name);
                    return updatedList; // checkedOnly에서 해당 항목 제거
                }
    
                // 중복 제거 (name이 같은 항목은 하나만 남기기)
                return updatedCheckedOnly.filter((item, index, self) => 
                    index === self.findIndex(t => t.name === item.name)
                );
            });
    
            // 상태 업데이트 (orderSkills의 순서 업데이트)
            setOrderSkills(orderPrev => ({
                ...orderPrev,
                [category]: uniquedCheckedList.map(item => item.name) // 순서대로 name만 추출하여 업데이트
            }));
    
            return { ...prev, [category]: uniquedCheckedList }; // 상태 반환
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
