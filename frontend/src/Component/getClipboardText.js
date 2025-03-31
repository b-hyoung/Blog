// 클립보드에서 텍스트를 읽어오는 함수
export const getClipboardText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    alert("클립보드에 복사되었습니다! 📋");
  } catch (error) {
    console.error("클립보드에 복사할 수 없습니다.", error);
  }
};

