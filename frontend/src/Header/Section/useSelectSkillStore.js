import React from 'react';
import { create } from 'zustand';

const useSelectSkillStore = create((set) => ({
  skill: '',
  setSkill: (selectValue) => set({ skill: selectValue }),
  skills: [],
  setSkills: (newSelectSkill) =>
    set((prev) => {
      // 중복을 제거하려면 name과 checked 값을 기준으로 비교해야 함
      const updatedSkills = newSelectSkill
        ? [
            ...(Array.isArray(newSelectSkill)
              ? newSelectSkill
              : [newSelectSkill]),
          ].filter(
            (item, index, self) =>
              index ===
              self.findIndex(
                (t) => t.name === item.name && t.checked === item.checked
              )
          )
        : prev.skills

      return { skills: updatedSkills };
    }),
}));

export default useSelectSkillStore;
