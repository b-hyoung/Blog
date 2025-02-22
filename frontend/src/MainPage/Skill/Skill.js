import React, { useEffect, useState } from 'react'
import './Skill.css'

function Skill() {

    const frontSkill=[
        'HTML & SCSS', 'React', 'React Native', 'JavaScript', 'TypeScript', 'Zustand']
    const backSkill =[
        'Python3', 'DJango', 'DRF (Django Rest Framework)', 'My SQL', 'Docker']
    const devOpsSkill =[
        'IAM - 사용자 권한 관리', 'EC2 - Django/FastAPI 서비스 배포', 'CloudWatch - 서버 로그 & 성능 모니터링']

    const [isChecked , setIsChecked] = useState(false)

    
    const handleClickSkill = ({item}) => {
        if(isChecked === true){
            setIsChecked(false)
        }else{
            setIsChecked(true)
        }
    }
    
    const Skill = ({Skill}) => {
        let skillList = ([Skill])
        let classSkill = Skill+'_Skill'
        
        //기술 이름에 따른 리스트 불러오기
        if(Skill == "front"){
            skillList = frontSkill
        }else if(Skill == "back"){
            skillList = backSkill
        }else{
            skillList = devOpsSkill
        }
        return  <div className={classSkill}>
            {skillList.map((item, index) => {
                return (
                    <div className='Skill_List'>
                        <span>
                            <div className='SkillName' onClick={() => handleClickSkill({item})}>
                                {item}
                            </div>
                            <Checkbox category={Skill}/>
                        </span>
                    </div>
                )
            })}
    </div>
    }

    const Checkbox = ({ category }) => {
        return (
            isChecked === false ?
            <div className={`checkbox ${category}`}></div>
            :
            <div className={`checkbox ${category}-checked`}></div>
        )
    };
    
    const SKillTitle = ({ skillName }) => {
        return <div className={`Skill_title ${skillName}`}>{skillName}</div>;
    }

    return (
        <div className='Skill'>
            <div className='Front_Category'>
            <SKillTitle skillName={"Front End"} />
            <Skill Skill={"front"} />
            </div>
            <div className='Back_Category'>
            <SKillTitle skillName={"Back End"} />
            <Skill Skill={"back"} />
            </div>
            <div className='DevOps_Category'>
            <SKillTitle skillName={"DevOps"} />
            <Skill Skill={"devOps"} />
            </div>
        </div>
    )
}

export default Skill
