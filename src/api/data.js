import * as api from './api.js'

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


export function createPointer(user, id) {
    return {
        __type: 'Pointer',
        className: user,
        objectId: id
    }
}
export function addOwner(object) {
    const userId = sessionStorage.getItem('userId')
    const result = Object.assign({}, object)
    result.owner = createPointer('_User', userId)
    return result
}
//Quiz Collection
export async function createQuiz(quiz) {
    const body = addOwner(quiz)
    return await api.post("https://parseapi.back4app.com/classes/Quiz", body)
}

export async function getQuizes() {
    return await api.get("https://parseapi.back4app.com/classes/Quiz")
}
export async function getQuizById(id) {
    return await api.get("https://parseapi.back4app.com/classes/Quiz/" + id + '?include=owner')
}

export async function updateQuiz(id, quiz) {
    return await api.put("https://parseapi.back4app.com/classes/Quiz/" + id, quiz)
}

export async function deleteQuiz(id) {
    return await api.del('https://parseapi.back4app.com/classes/Quiz/' + id)
}

//Question Collection
export async function getQuestionsByQuizId(quizId) {
    const query = JSON.stringify({ quiz: createPointer('Quiz', quizId) })

    const response = await api.get('https://parseapi.back4app.com/classes/Question?where=' + encodeURIComponent(query))
    return response.results
}

export async function createQuestion(quizId, question) {
    const body = addOwner(question)
    body.quiz = createPointer('Quiz', quizId)
    return await api.post('https://parseapi.back4app.com/classes/Question', body)
}

export async function updateQuestion(id, question) {
    return await api.put('https://parseapi.back4app.com/classes/Question/' + id, question)
}

export async function deleteQuestion(id, question) {
    return await api.del('https://parseapi.back4app.com/classes/Question/' + id)

}