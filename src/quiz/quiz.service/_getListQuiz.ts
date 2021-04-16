import { Repository } from "typeorm";
import { QuizEntity } from "../quiz.entity";
import { GetListQuizInputType, KindGetListQuiz } from "../quiz.input-type";


async function _getListQuiz(
  getListQuizInputType:GetListQuizInputType,
  quizRepository: Repository<QuizEntity>,
): Promise<QuizEntity[]> {
  
  const { 
    kind, idUser, listRecordQuizOfUser,
  } = getListQuizInputType;


  const listIdQuizInRecordFailedSorted = listRecordQuizOfUser
    .filter(e=>e.result === false)
    .sort((a,b)=> a.date - b.date) // 더 옛날일수록 앞에
    .map(e=>e.idQuiz);

  const listIdQuizInRecordSolvedSorted = listRecordQuizOfUser
    .filter(e=>e.result === true)
    .sort((a,b)=> a.date - b.date) // 더 옛날일수록 앞에
    .map(e=>e.idQuiz);


  const listIdQuizInRecordSorted = [...listIdQuizInRecordFailedSorted, ...listIdQuizInRecordSolvedSorted ]

  
  if (kind === KindGetListQuiz.myQuizByRecord){
    // 내 퀴즈들중  A(아직 시도해보지 않은 것들) + B(전에 틀린 것들 + 전에 맞은 것들)

    const result = await quizRepository.find({ idUser });

    // A. 아직 시도해보지 않은 퀴즈들
    const listQuizNotInRecord = result.filter(e=>!listIdQuizInRecordSorted.includes(e.id));
    
    // 멤버 기록에 존재하는 퀴즈와, 실제로 존재하는 퀴즈들의 교집합
    const listIdQuizInRecordSortedExisting = listIdQuizInRecordSorted.filter(e=>{
      const index = result.findIndex(e=>listIdQuizInRecordSorted.includes(e.id));
      return index===-1 ? false : true;
    });

    // B. (전에 틀린 것들 + 전에 맞은 것들)
    const listQuizInRecord = listIdQuizInRecordSortedExisting.map(idEach=>{
      // 실제로도 존재하는 퀴즈들 중, 멤버 기록에도 있는 것들
      return result.find(e => e.id === idEach);
    })

    return [...listQuizNotInRecord, ...listQuizInRecord];
  }


  else if (kind === KindGetListQuiz.publicQuizByRecord){
    // 전체 공개 퀴즈들중  A(아직 시도해보지 않은 것들) + B(전에 틀린 것들 + 전에 맞은 것들)
    const result = await quizRepository.find({ isPublic: true });
    
    // A. 아직 시도해보지 않은 퀴즈들
    const listQuizNotInRecord = result.filter(e=>!listIdQuizInRecordSorted.includes(e.id));
    
    // 멤버 기록에 존재하는 퀴즈와, 실제로 존재하는 퀴즈들의 교집합
    const listIdQuizInRecordSortedExisting = listIdQuizInRecordSorted.filter(e=>{
      const index = result.findIndex(e=>listIdQuizInRecordSorted.includes(e.id));
      return index===-1 ? false : true;
    });

    // B. (전에 틀린 것들 + 전에 맞은 것들)
    const listQuizInRecord = listIdQuizInRecordSortedExisting.map(idEach=>{
      // 실제로도 존재하는 퀴즈들 중, 멤버 기록에도 있는 것들
      return result.find(e => e.id === idEach);
    })

    return [...listQuizNotInRecord, ...listQuizInRecord];
  }


  else { // kind === KindGetListQuiz.publicQuiz
    const result = await quizRepository.find({ isPublic: true });
    return result;
  }
  
}


export default _getListQuiz