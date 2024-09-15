export enum ErrDesc {
  OK__SUCCESS = 'SUCCESS', // "성공"
  BAD_REQUEST__WRONG_PARAMETER = 'WRONG_PARAMETER', // "잘못된 요청 매개변수 입니다",
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR', //  "예상되지 않은 서버 오류입니다",
  NOT_BOARD_WRITER = 'NOT_BOARD_WRITER', //  "작성자가 아닙니다.",
  NOT_BOARD_PASSWORD = 'NOT_BOARD_PASSWORD', //  "비밀번호가 다릅니다.",
  NOT_CONTENTS = 'NOT_CONTENTS', //  "비밀번호가 다릅니다.",
  NOT_IMPLEMENTED = 'NOT_IMPLEMENTED', //  "미구현입니다.",
}
