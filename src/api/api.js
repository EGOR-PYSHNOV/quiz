const url = 'https://react-quiz-69a4d.firebaseio.com/';
const key = 'AIzaSyBeUQLbJ2JjJlzHITGOLCVZZVyIATRH3Ow';
export const QuizApiFireBase = {
  async getResource(type) {
    const response = await fetch(`${url}${type}`);
    return await response.json();
  },

  getFetchQuizes() {
    return QuizApiFireBase.getResource('quizes.json/');
  },
  getFetchQuizById(id) {
    return QuizApiFireBase.getResource(`quizes/${id}.json`);
  },

  async AddQuiz(quiz) {
    const QuizRes = await fetch(`${url}quizes.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quiz),
    });

    return await QuizRes.json();
  },

  async AuthQuiz(authData) {
    console.log(authData);
    const { login, password, isLogin } = authData;
    const AuthData = {
      email: login,
      password: password,
      returnSecureToken: true,
    };

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;

    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
    }
    const AuthRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(AuthData),
    });

    return await AuthRes.json();
  },
};
