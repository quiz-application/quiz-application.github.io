
async function request(url, options) {
    try {
        const response = await fetch(url, options)
        if (response.ok == false) {
            const error = await response.json()
            throw new Error(error.message)
        }
        try{
            return await response.json()
        }catch(err){
            return response
        }
    } catch (err) {
        alert(err.message)
        throw err

    }
}

function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {
            'X-Parse-Application-Id': 'FGMqzVurejNw6EuPB793VfuD6Z8OO45P04okwpzO',
            'X-Parse-REST-API-Key': '1sNLPQ1Dvf0686Qii4bg4syJdC4EqGoK4N66VX2F'
        },
    };
    
    const token = sessionStorage.getItem('authToken')
    if (token != null){
        options.headers['X-Parse-Session-Token'] = token
    }
    
    if (data){
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data)
    }

    return options
}

export async function get(url) {
    return request(url, createOptions());
}

export async function post(url, data) {
    return request(url, createOptions('post', data));
}

export async function put(url, data) {
    return request(url, createOptions('put', data));
}

export async function del(url) {
    return request(url, createOptions('delete'));
}

export async function login(username, password) {
    const result = await post('https://parseapi.back4app.com/login', { username, password })

    sessionStorage.setItem('username', username)
    sessionStorage.setItem('authToken', result.sessionToken)
    sessionStorage.setItem('userId', result.objectId)

    return result

}

export async function register(email,username, password) {
    const result = await post('https://parseapi.back4app.com/users', {email, username, password})

    sessionStorage.setItem('username', username)
    sessionStorage.setItem('authToken', result.sessionToken)
    sessionStorage.setItem('userId', result.objectId)

    return result
}

export async function logout() {
    const result = await post('https://parseapi.back4app.com/logout', {})

    sessionStorage.removeItem('username')
    sessionStorage.removeItem('authToken')
    sessionStorage.removeItem('userId')

    return result

}