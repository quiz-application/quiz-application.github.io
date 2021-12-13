import * as api from './api/data.js'
import {page, render} from './lib.js'
import {editorPage} from './views/editor/editor.js'

window.api = api
const main = document.getElementById('content')
page(decorateContext)
page('/create', editorPage)
page('/edit/:id', editorPage)


page.start()


function decorateContext(ctx, next){
    ctx.render = (content) => render(content, main)
    next()
}