import React from 'react'
import {create} from 'zustand'


const useSelectSkillStore = create((set) => (
{
        skill : '',
        setSkill : (selectValue) => set(
            {skill : selectValue}),
        skills:[],
        setSkills : (newSelectSkill) =>
            set((prev) => ({
                skills : [...prev.skills,newSelectSkill],
            })),
    }))

export default useSelectSkillStore;