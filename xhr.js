const requestCharactersURL = `https://rickandmortyapi.com/api/character`
const requestLokationsURL = `https://rickandmortyapi.com/api/location`

const container = document.querySelector('.container')
const btnAllCharacters = document.querySelector('.btn-allCharacters')
const btnAllLocation = document.querySelector('.btn-allLocation')
const btnAllEpisodes = document.querySelector('.btn-allEpisodes')
const searchInput = document.getElementById('search')
const body = document.querySelector('body')

btnAllCharacters.addEventListener('click', getAllCharacters)
btnAllLocation.addEventListener('click', getAllLokation)

const xhr = new XMLHttpRequest()



const loadingImage = document.querySelector('.img-loading');

function showLoadingImage() {
    loadingImage.style.display = 'block'; // Показываем картинку
}

function hideLoadingImage() {
    loadingImage.style.display = 'none'; // Скрываем картинку
}

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const searchQuery = searchInput.value.trim().toLowerCase();

        if (searchQuery) {
            searchCharacters(searchQuery);
        }
    }
});

function searchCharacters(searchQuery) {
    showLoadingImage();


    container.innerHTML = ''
    const requestURL = `https://rickandmortyapi.com/api/character/?name=${searchQuery}`;

    // Выполнение запроса к API
    fetch(requestURL)
        .then(response => response.json())
        .then(data => {

            const searchResults = data.results;


            if (searchResults.length > 0) {

                searchResults.forEach(character => {
                    const name = character.name;
                    const status = character.status;
                    const gender = character.gender;
                    const species = character.species;
                    const origin = character.origin.name
                    const location = character.location.name
                    const avatar = character.image


                    const characterContainer = document.createElement('div');
                    characterContainer.classList.add('characterContainer');
                 
                    const template = `
            <p><span>Имя:</span> ${name}</p>
            <p><span>Статус:</span> ${status}</p>
            <p><span>Пол:</span> ${gender}</p>
            <p><span>Раса:</span> ${species}</p>
            <p><span>Происхождение:</span> ${origin}</p>
            <p><span>Местонахождения:</span> ${location}</p>
            <img src="${avatar}" alt=""> 
        `;

                    characterContainer.innerHTML = template;
                    container.appendChild(characterContainer);

                    hideLoadingImage();
                });

            }    else {
               
                const errorElement = document.createElement('p');
                errorElement.textContent = 'Нет результатов поиска по персонажам';
                container.appendChild(errorElement);
            
              }
            })
            .catch(error => {
            
              const errorElement = document.createElement('p');
              errorElement.textContent = 'Oooops....В межвселенном пространстве по вашему запросу ничего не найдено';
              errorElement.classList.add('error-message')
              container.appendChild(errorElement);
              console.error("Ошибка при выполнении запроса:", error);
             
            });
}



function getAllCharacters() {
    container.innerHTML = ''
    showLoadingImage();
    xhr.open('GET', requestCharactersURL)

    

    xhr.onload = () => {
        if (xhr >= 400) {
            console.error(xhr);
        }

        else {
            const arr = JSON.parse(xhr.response)

            arr.results.forEach((character) => {
                const name = character.name;
                const status = character.status;
                const gender = character.gender;
                const species = character.species;
                const origin = character.origin.name
                const location = character.location.name
                const avatar = character.image

                const characterContainer = document.createElement('div');
                characterContainer.classList.add('characterContainer');

                const template = `
                <p><span>Имя:</span> ${name}</p>
                <p><span>Статус:</span> ${status}</p>
                <p><span>Пол:</span> ${gender}</p>
                <p><span>Раса:</span> ${species}</p>
                <p><span>Происхождение:</span> ${origin}</p>
                <p><span>Местонахождения:</span> ${location}</p>
                <img src="${avatar}" alt=""> 
            `;

                characterContainer.innerHTML = template;
                container.appendChild(characterContainer);

                hideLoadingImage();
            });


        }
    }
    xhr.send()
}

function getAllLokation() {
    container.innerHTML = '';

    showLoadingImage();

    xhr.open('GET', requestLokationsURL);

    xhr.onload = () => {
        if (xhr >= 400) {
            console.error(xhr);
        } else {
            const arr = JSON.parse(xhr.response);

            arr.results.forEach((character) => {
                const name = character.name;
                const type = character.type;
                const dimension = character.dimension;
                const residents = character.residents;

                const locationContainer = document.createElement('div');
                locationContainer.classList.add('locationContainer');

                const template = `
            <p class="item"><span>Название:</span> ${name}</p>
            <p  class="item"><span>Тип:</span> ${type}</p>
            <p  class="item"><span>Измерение:</span> ${dimension}</p>
          `;


                locationContainer.innerHTML = template;

                if (name === 'Earth (C-137)') {
                    const descr = document.createElement('span')
                     descr.classList.add('description')
                    const earthImg = document.createElement('img')
                   

                    
                    descr.textContent = 'Земля — это планета, на которой проживает человеческая раса, и главное место для персонажей Рика и Морти. Возраст этой Земли более 4,6 миллиардов лет, и она является четвертой планетой от своей звезды.'

                    earthImg.src = 'https://i.ibb.co/H2c3jt0/S2e5-Earth.webp'
                    earthImg.style.width = '100%'
                    earthImg.style.height = 'auto'
                    earthImg.style.marginTop = '20px'
                    earthImg.style.borderRadius = '20px'
                
                    locationContainer.append(descr)
                    locationContainer.append(earthImg)
                }

                if (name === 'Abadango') {
                    const earthImg = document.createElement('img')
                    earthImg.src = 'https://i.ibb.co/Tkb0xDT/No-Image.webp'
                    earthImg.style.width = '100%'
                    earthImg.style.height = 'auto'
                    earthImg.style.marginTop = '20px'
                    earthImg.style.borderRadius = '20px'

                    locationContainer.append(earthImg)
                }


                if (name === 'Citadel of Ricks') {
                    const descr = document.createElement('span')
                     descr.classList.add('description')
                    const earthImg = document.createElement('img')
                    descr.textContent = 'Цитадель Риков (англ. Citadel of Ricks) — секретная штаб-квартира, где собирается Совет Риков. Также является местом отдыха и местом встречи Риков и их Морти из различных вселенных.'
                    earthImg.src = 'https://i.ibb.co/m06jcVr/S3e7-Citadel-reconstruction.webp'
                    earthImg.style.width = '100%'
                    earthImg.style.height = 'auto'
                    earthImg.style.marginTop = '20px'
                    earthImg.style.borderRadius = '20px'

                    locationContainer.append(descr)
                    locationContainer.append(earthImg)
                }

                if (name === "Worldender's lair") {
                    const descr = document.createElement('span')
                     descr.classList.add('description')
                    const earthImg = document.createElement('img')
                    descr.textContent = 'Терранная система — планетарная система, расположенная где-то во Вселенной. Он появляется в эпизоде ​​Vindicators 3: The Return of Worldender, когда Worldender разместил свою цитадель на единственной для системы планете.'
                    earthImg.src = 'https://i.ibb.co/SP1pG8x/S3e4-its-a-party.webp'
                    earthImg.style.width = '100%'
                    earthImg.style.height = 'auto'
                    earthImg.style.marginTop = '20px'
                    earthImg.style.borderRadius = '20px'

                    locationContainer.append(descr)
                    locationContainer.append(earthImg)
                }

                if (name === "Anatomy Park") {
                    const descr = document.createElement('span')
                     descr.classList.add('description')
                    const earthImg = document.createElement('img')
                    descr.textContent = 'Анатомический парк (англ. Anatomy Park) — парк развлечений, который разместили внутри бездомного по имени Рубен, это место было показано в одноименном эпизод'
                    earthImg.src = 'https://i.ibb.co/qs6hRWz/Anatomy-Park-7.webp'
                    earthImg.style.width = '100%'
                    earthImg.style.height = 'auto'
                    earthImg.style.marginTop = '20px'
                    earthImg.style.borderRadius = '20px'

                    locationContainer.append(descr)
                    locationContainer.append(earthImg)
                }
                if (name === "Interdimensional Cable") {
                    const descr = document.createElement('span')
                     descr.classList.add('description')
                    const earthImg = document.createElement('img')
                    descr.textContent = 'Межпространственный кабель — кабельная приставка, изобретенная Риком, которая дает доступ к телевизионным шоу во всех измерениях.'
                    earthImg.src = 'https://i.ibb.co/dDNcCWJ/IMG-1158-JPG.webp'
                    earthImg.style.width = '100%'
                    earthImg.style.height = 'auto'
                    earthImg.style.marginTop = '20px'
                    earthImg.style.borderRadius = '20px'

                    locationContainer.append(descr)
                    locationContainer.append(earthImg)
                }

                if (name === "Immortality Field Resort") {
                    const descr = document.createElement('span')
                     descr.classList.add('description')
                    const earthImg = document.createElement('img')
                    descr.textContent = 'Immortality Field Resort — роскошный курорт, построенный внутри поля бессмертия. Рик привел сюда Джерри в эпизоде ​​«The Whirly Dirly Conspiracy» по просьбе Морти'
                    earthImg.src = 'https://i.ibb.co/bNtBZht/S3e5-resort.webp'
                    earthImg.style.width = '100%'
                    earthImg.style.height = 'auto'
                    earthImg.style.marginTop = '20px'
                    earthImg.style.borderRadius = '20px'

                    locationContainer.append(descr)
                    locationContainer.append(earthImg)
                }

                if (name === "Post-Apocalyptic Earth") {
                    const descr = document.createElement('span')
                     descr.classList.add('description')
                    const earthImg = document.createElement('img')
                    descr.textContent = 'Постапокалиптическое измерение — это постапокалиптическая версия Земли, которую посетили Рик, Морти и Саммер. Впервые он был замечен в эпизоде ​​​​«Рикмантинг камня». Известно, что он населен Кровотечением и Илаем.'
                    earthImg.src = 'https://i.ibb.co/LQZpxhg/S3e2-armathy-flashback3.webp'
                    earthImg.style.width = '100%'
                    earthImg.style.height = 'auto'
                    earthImg.style.marginTop = '20px'
                    earthImg.style.borderRadius = '20px'

                    locationContainer.append(descr)
                    locationContainer.append(earthImg)
                }

                if (name === "Purge Planet") {
                    const descr = document.createElement('span')
                     descr.classList.add('description')
                    const earthImg = document.createElement('img')
                    descr.textContent = 'Планета Судной ночи (англ. Purge Planet) — это планета без определенного названия, которая появилась в девятой серии второго сезона «Судная Ночь».'
                    earthImg.src = 'https://i.ibb.co/4TdFfrF/Purge-Planet.webp'
                    earthImg.style.width = '100%'
                    earthImg.style.height = 'auto'
                    earthImg.style.marginTop = '20px'
                    earthImg.style.borderRadius = '20px'

                    locationContainer.append(descr)
                    locationContainer.append(earthImg)
                }

                if (name === "Venzenulon 7") {
                    const descr = document.createElement('span')
                     descr.classList.add('description')
                    const earthImg = document.createElement('img')
                    descr.textContent = `Вензенулон 7 — планета в планетной системе Вензенулон. Он вращается вокруг своей звезды на расстоянии, которое позволяет ему поддерживать жизнь и воду. Он очень похож на Venzenulon 9, но не испытывает сильного ночного холода, как на Venzenulon 9.
                    На планете обитает раса сине-желтых птиц и большая раса шерстистых существ, одно из которых звали Бибо.`
                    earthImg.src = 'https://i.ibb.co/0BgnXxG/S3-E8-alien-sunset.webp'
                    earthImg.style.width = '100%'
                    earthImg.style.height = 'auto'
                    earthImg.style.marginTop = '20px'
                    earthImg.style.borderRadius = '20px'

                    locationContainer.append(descr)
                    locationContainer.append(earthImg)
                }

                if (name === "Bepis 9") {
                    const descr = document.createElement('span')
                     descr.classList.add('description')
                    const earthImg = document.createElement('img')
                    descr.textContent = 'Беписианцы — инопланетный вид, часто встречающийся по всей Вселенной'
                    earthImg.src = 'https://i.ibb.co/T16c9qJ/Tumblr-inline-ol2fgh-Wy-T11uaefiw-1280.webp'
                    earthImg.style.width = '100%'
                    earthImg.style.height = 'auto'
                    earthImg.style.marginTop = '20px'
                    earthImg.style.borderRadius = '20px'

                    locationContainer.append(descr)
                    locationContainer.append(earthImg)
                }

                if (name === "Cronenberg Earth") {
                    const descr = document.createElement('span')
                     descr.classList.add('description')
                    const earthImg = document.createElement('img')
                    descr.textContent = 'Мир Кроненберга — это Земля в измерении, где люди были естественными Кроненбергами.'
                    earthImg.src = 'https://i.ibb.co/Tkb0xDT/No-Image.webp'
                    earthImg.style.width = '100%'
                    earthImg.style.height = 'auto'
                    earthImg.style.marginTop = '20px'
                    earthImg.style.borderRadius = '20px'

                    locationContainer.append(descr)
                    locationContainer.append(earthImg)
                }

                if (name === "Nuptia 4") {
                    const descr = document.createElement('span')
                     descr.classList.add('description')
                    const earthImg = document.createElement('img')
                    descr.textContent = 'Nuptia 4 — самый успешный в галактике центр консультирования пар. Старшим советником института является Глексо Слим Слом'
                    earthImg.src = 'https://i.ibb.co/kxc5S3C/Nuptia4.webp'
                    earthImg.style.width = '100%'
                    earthImg.style.height = 'auto'
                    earthImg.style.marginTop = '20px'
                    earthImg.style.borderRadius = '20px'

                    locationContainer.append(descr)
                    locationContainer.append(earthImg)
                }

                if (name === "Giant's Town") {
                    const descr = document.createElement('span')
                     descr.classList.add('description')
                    const earthImg = document.createElement('img')
                    descr.textContent = 'Гигантский суд - это суд, в который Рик и Морти попадают в эпизоде ​​​​« Мисикс и Уничтожение» после того, как они «убивают» Дейла, а через несколько минут его жена Роуз вместе с сыном ловит их на месте преступления. С них снимает обвинения адвокат, который представляет интересы мелких людей на том основании, что им не зачитали их права. Судебная система демонстрирует вопиющую дискриминацию по отношению к Рику и Морти, явно ссылаясь на Юг Джима Кроу.'
                    earthImg.src = 'https://i.ibb.co/sJf5pFN/Giant-Court.webp'
                    earthImg.style.width = '100%'
                    earthImg.style.height = 'auto'
                    earthImg.style.marginTop = '20px'
                    earthImg.style.borderRadius = '20px'

                    locationContainer.append(descr)
                    locationContainer.append(earthImg)
                }

                if (name === "Bird World") {
                    const descr = document.createElement('span')
                     descr.classList.add('description')
                    const earthImg = document.createElement('img')
                    descr.textContent = 'Птичий мир — это планета, на которой живет Птицечеловек. Телевизионным сигналам с Земли требуется 20 лет, чтобы достичь этой планеты, то есть она находится в 20 световых годах от Земли.'
                    earthImg.src = 'https://i.ibb.co/zNw1QDN/S2e5-bird-world.webp'
                    earthImg.style.width = '100%'
                    earthImg.style.height = 'auto'
                    earthImg.style.marginTop = '20px'
                    earthImg.style.borderRadius = '20px'

                    locationContainer.append(descr)
                    locationContainer.append(earthImg)
                }

                if (name === "St. Gloopy Noops Hospital") {
                    const descr = document.createElement('span')
                     descr.classList.add('description')
                    const earthImg = document.createElement('img')
                    descr.textContent = 'Больница Сент-Глупи-Нупс, по словам Рика, лучшая больница в галактике, показанная в эпизоде ​​«Межпространственный кабель 2: Искушение судьбы». Это больница, предназначенная для оказания помощи многочисленным инопланетянам, госпитализированным из-за травм или болезней, а также способная лечить людей.'
                    earthImg.src = 'https://i.ibb.co/rs4xhGj/S3e1-St-Gloopy-Noops-Hospital.webp'
                    earthImg.style.width = '100%'
                    earthImg.style.height = 'auto'
                    earthImg.style.marginTop = '20px'
                    earthImg.style.borderRadius = '20px'

                    locationContainer.append(descr)
                    locationContainer.append(earthImg)
                }

                if (name === 'Earth (5-126)') {
                    const earthImg = document.createElement('img')
                    earthImg.src = 'https://i.ibb.co/Tkb0xDT/No-Image.webp'
                    earthImg.style.width = '100%'
                    earthImg.style.height = 'auto'
                    earthImg.style.marginTop = '20px'
                    earthImg.style.borderRadius = '20px'

                    locationContainer.append(earthImg)
                }

                if (name === "Mr. Goldenfold's dream") {
                    const descr = document.createElement('span')
                     descr.classList.add('description')
                    const earthImg = document.createElement('img')
                    descr.textContent = 'Саммер Смит (Сон Голденфолда) - это воображаемая версия Саммер, которая существует во сне миссис Панкейкс во сне мистера Голденфолда.'
                    earthImg.src = 'https://i.ibb.co/BBm1S16/S1e2-summer-crawl.webp'
                    earthImg.style.width = '100%'
                    earthImg.style.height = 'auto'
                    earthImg.style.marginTop = '20px'
                    earthImg.style.borderRadius = '20px'

                    locationContainer.append(descr)
                    locationContainer.append(earthImg)
                }

                if (name === "Gromflom Prime") {
                    const descr = document.createElement('span')
                     descr.classList.add('description')
                    const earthImg = document.createElement('img')
                    descr.textContent = 'Громфлом Прайм — родная планета Громфломитов.'
                    earthImg.src = 'https://i.ibb.co/Np095pD/Gromflom-Open.webp'
                    earthImg.style.width = '100%'
                    earthImg.style.height = 'auto'
                    earthImg.style.marginTop = '20px'
                    earthImg.style.borderRadius = '20px'

                    locationContainer.append(descr)
                    locationContainer.append(earthImg)
                }




                const residentsContainer = document.createElement('div');
                residentsContainer.textContent = 'Обитатели:';
                residentsContainer.classList.add('residentsContainer');

                residents.forEach((residentUrl, index) => {
                    fetch(residentUrl)
                        .then(response => response.json())
                        .then(residentData => {
                            const residentName = residentData.name;
                            const residentStatus = residentData.status;

                            const residentElement = document.createElement('p');
                            residentElement.textContent = `${residentName} (${residentStatus})`;
                            residentElement.classList.add('residents');

                            if (index > 2) {
                                residentElement.classList.add('display-none');
                            }

                            residentsContainer.appendChild(residentElement);
                        })
                        .catch(error => {
                            console.error(`Ошибка при запросе резидента: ${error}`);
                        });
                });

                locationContainer.appendChild(residentsContainer);

                if (residents.length > 3) {
                    const showAllButton = document.createElement('button');
                    showAllButton.textContent = 'Показать всех';
                    showAllButton.classList.add('btn')

                    showAllButton.addEventListener('click', () => {
                        const residentElements = residentsContainer.querySelectorAll('.residents');

                        residentElements.forEach((residentElement, index) => {
                            if (index > 2) {
                                residentElement.classList.toggle('display-none');
                            }
                        });

                        if (showAllButton.textContent === 'Показать всех') {
                            showAllButton.textContent = 'Свернуть';
                        } else {
                            showAllButton.textContent = 'Показать всех';
                        }
                    });

                    showAllButton.classList.add('showAllButton')
                    residentsContainer.after(showAllButton);
                }

                container.appendChild(locationContainer);
                hideLoadingImage();
            });


        }
    };

    xhr.send();
}

