import { html } from "../../lib.js"
import { createList } from "./list.js";
import { createQuiz, updateQuiz, getQuizById, getQuestionsByQuizId } from '../../api/data.js'


const template = (quiz, onSave) => html`
<section id="editor">

    <header class="pad-large">
        <h1>${quiz ? 'Edit Quiz' : 'New quiz'}</h1>
    </header>

    <div class="pad-large alt-page">
        <form @submit=${onSave}>
            <label class="editor-label layout">
                <span class="label-col">Title:</span>
                <input class="input i-med" type="text" name="title" .value=${quiz ? quiz.title : ''}></label>
            <label class="editor-label layout">
                <span class="label-col">Topic:</span>
                <select class="input i-med" name="topic" .value=${quiz ? quiz.topic : '0'}>
                    <option value="0"><span class="quiz-meta">--Select Category--</span></option>
                    <option value="it">Languages</option>
                    <option value="hardware"> Hardware</option>
                    <option value="software">Tools and Software</option>
                </select>
                <label class="editor-label layout">
                    <span class="label-col">Description:</span>
                    <textarea class="input" name="description" .value=${quiz ? quiz.description : ''}></textarea>
                </label>
                <input class="input submit action" type="submit" value="Save">
        </form>
    </div>


    ${quiz ? createList(quiz.questions) : ''}

</section>`;

// const questions = [
//     {
//         text: "is this the first question?",
//         answers: [
//             "Yes",
//             "no"
//         ],
//         correctIndex: 0


//     },
//     {
//         text: "is this the second question?",
//         answers: [
//             "No",
//             "Yes"
//         ],
//         correctIndex: 1


// //     }
// ];

export async function editorPage(ctx) {
    const quizId = ctx.params.id
    let quiz = null
    let questions = []
    if (quizId) {
        [quiz, questions] = await Promise.all([
            getQuizById(quizId),
            getQuestionsByQuizId(quizId)
        ])
        quiz.questions = questions
    }
    ctx.render(template(quiz, onSave))

    async function onSave(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const title = formData.get('title')
        const topic = formData.get('topic')
        const description = formData.get('description')

        const data = {
            title,
            topic,
            description,
            questionCount: questions.length
        }
        if (quizId) {
            await updateQuiz(quizId, data)
        } else {
            const result = await createQuiz(data)
            ctx.page.redirect('/edit/' + result.objectId)
        }
    }
}