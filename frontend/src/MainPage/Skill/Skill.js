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

    return (
        <div className='Skill'>
            <div className='Front_Category'>
                <div className='Skill_title'>Front End</div>
                <div className='Front_Skill'>
                    {frontSkill.map((item, index) => {
                        return (
                            <div className='Skill_List'>
                                <Checkbox category={"front"} />
                                <span>{item}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='Back_Category'>
                <div className='Skill_title'>Back End</div>
                <div className='Back_Skill'>
                    {backSkill.map((item, index) => {
                        return (
                            <div className='Skill_List'>
                                <Checkbox category={"back"} />
                                <span>{item}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='DevOps_Category'>
                <div className='Skill_title'>DevOps</div>
                <div className='DevOps_Skill'>
                    {devOpsSkill.map((item, index) => {
                        return (
                            <div className='Skill_List'>
                                <Checkbox category={"DevOps"}/>
                                <span>{item}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Skill
