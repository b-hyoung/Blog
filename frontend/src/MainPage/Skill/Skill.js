import React, { useState } from 'react'
import './Skill.css'

function Skill() {

    const [frontSkill, setFrontSkill] = useState([
        'HTML & SCSS', 'React', 'React Native', 'JavaScript', 'TypeScript', 'Zustand'
    ])
    const [backSkill, setBackSkill] = useState([
        'Python3', 'DJango', 'DRF (Django Rest Framework)', 'My SQL', 'Docker'
    ])
    const [devOpsSkill, setDevOpsSkill] = useState([
        'IAM - 사용자 권한 관리', 'EC2 - Django/FastAPI 서비스 배포', 'CloudWatch - 서버 로그 & 성능 모니터링'
    ])


    const Checkbox = ({ category }) => {
        return <div className={`checkbox ${category}`}></div>;
    };
    
    const Skill = ({Skill}) => {
        let skillList = ([])
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
                            <div className='SkillName'>
                                {item}
                            </div>
                            <Checkbox category={Skill}/>
                        </span>
                    </div>
                )
            })}
    </div>
    }

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
