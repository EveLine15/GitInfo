// Задание 3

// По адресу `https://api.github.com/users/${userName}` можно получить информацию о пользователе github.
// 1.Запросите информацию о себе и оформите страничку с данными:
// - аватар
// - имя пользователя
// - ссылка на страницу на github
// - дата регистрации на github
// - количество репозиториев.
// 2. Измените приложение так, чтобы имя пользователя можно было вводить в поле и после нажатия на кнопку отрисовывалась информация о нем.

const box = document.querySelector('.info-box');
const form = document.querySelector('form');
const input = document.querySelector('input')

form.addEventListener('submit', () => {
    console.log(input.value)
    getGitInfo(input.value)
});

const getGitInfo = async(userName) => {
    try{
        const response = await fetch(`https://api.github.com/users/${userName}`);

        if(!response.ok){
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        
        let data = await response.json();

        box.innerHTML = `
            <div class="avatar-block">
            <img src="${data.avatar_url}" alt="avatar">
            </div>
    
            <div class="text-block">
                <p>Hi! I am <span>${data.name}</span></p>
                <a href="${data.html_url}" target="_blank" rel="noopener noreferrer">Link to my github</a>
                <p>My profile was created <span>${data.created_at.slice(0, 10)}</span></p>
                <p>I have <span>${data.public_repos}</span> repositories</p>
            </div>`
        
        console.log(data)
    }

    catch{
        box.innerHTML = `
        <p class="error-message">Sorry, but there is no users with such username</p>
        `
    }
}
