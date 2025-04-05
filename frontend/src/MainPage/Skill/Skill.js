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
        'IAM - 사용자 권한 관리', 'EC2 - Django/DRF 서비스 배포', 'CloudWatch - 서버 로그 & 성능 모니터링' , 'S3 - React']

    const [checkedOnly, setCheckedOnly] = useState([]);
    
    const { skill, setSkill, setSkills } = useSelectSkillStore()
    
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

    const [orderSkills, setOrderSkills] = useState({
        front: frontSkill,
        back: backSkill,
        devOps: devOpsSkill
    })

    const SkillCategory = ({ category }) => {
        const skillList = orderSkills[category];
        const [hoverIndex, setHoverIndex] = useState(null);

        return <div className={category + '_Skill'}>
            <Flipper className='animation' flipKey={skillList.join('')}>
                {skillList.map((item, idx) => {
                    const isChecked = skillChecked[category][idx].checked
                    return (
                        <Flipped key={item} flipId={item}>
                            <div className='Skill_List' key={idx}>
                                <span
                                    className={isChecked ? 'checked' : ''}
                                    onMouseEnter={() => setHoverIndex(idx)}
                                    onMouseLeave={() => setHoverIndex(null)}
                                    onClick={() => handleClickSkill(category, idx)}
                                >
                                    <div className='SkillName'>{item}</div>
                                    <div className={`checkbox ${isChecked ? `${category}-checked` : category}`} >
                                      {!isChecked && hoverIndex === idx && (
                                      <span className="checkmark">✓</span>
                                      )}
                                    </div>
                                </span>
                            </div>
                        </Flipped>
                    )
                })}
            </Flipper>
        </div>
    }
  
    const handleClickSkill = (category, index) => {
        setSkillChecked(prev => {
            const currentList = prev[category]; 
            const clickedItem = { ...currentList[index], checked: !currentList[index].checked }; 

            const checkedItems = currentList.filter(item => item.checked && item.name !== clickedItem.name); 
            const unCheckedItem = currentList.filter(item => !item.checked && item.name !== clickedItem.name ); 

            let newCheckedList = [...checkedItems, clickedItem, ...unCheckedItem];

            const uniquedCheckedList = newCheckedList.filter((item, index, self) => 
                index === self.findIndex(t => t.name === item.name)
            );

            setCheckedOnly(prevCheckedOnly => {
                const updatedCheckedOnly = [...prevCheckedOnly];

                if (clickedItem.checked) {
                    updatedCheckedOnly.push(...checkedItems);  
                    updatedCheckedOnly.push(clickedItem); 
                } else {
                    const updatedList = updatedCheckedOnly.filter(item => item.name !== clickedItem.name);
                    return updatedList; 
                }

                return updatedCheckedOnly.filter((item, index, self) => 
                    index === self.findIndex(t => t.name === item.name)
                );
            });

            setOrderSkills(orderPrev => ({
                ...orderPrev,
                [category]: uniquedCheckedList.map(item => item.name) 
            }));

            return { ...prev, [category]: uniquedCheckedList }; 
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
