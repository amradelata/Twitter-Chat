const input = document.querySelector('.first input');
const API = "http://localhost:3000/chats";
const UL = document.querySelector('.timeline')


input.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        const inputValue = input.value;
        const opj = {
            text: inputValue
        }
        fetch(API, {
            method: 'POST',
            body: JSON.stringify(opj),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }

        })
            .then(res => res.json())
            .then(response => {
                const li = `
                <li>
                <div class="avatar">
                    <img src="http://www.croop.cl/UI/twitter/images/carl.jpg">
                    <div class="hover">
                        <div class="fab fa-twitter"></div>
                    </div>
                </div>
                <div class="bubble-container">
                <input type="text" style="display: none" value="${response.text}" class="input-edit" />
                    <div class="bubble">
                        <h3>${response.text}.</h3>
                </div>
                
                     <div data-id="${ response.id}" class="fas fa-pen"></div>
                    <div data-id="${ response.id}" class="fas fa-trash"></div>
                    <div data-id="${ response.id}" class="fas fa-save" style="display: none"></div>
                
                </div>
            </li>
                        `;
                UL.innerHTML += li;
                input.value = ""
            });
    }
});

fetch(API)
    .then(res => res.json())
    .then(data => {
        data.forEach((chat) => {
            const li = `
            <li>
            <div class="avatar">
                <img src="http://www.croop.cl/UI/twitter/images/carl.jpg">
                <div class="hover">
                    <div class="fab fa-twitter"></div>
                </div>
            </div>

            <div class="bubble-container">
            <input type="text" style="display: none" value="${chat.text}" class="input-edit" />
                <div class="bubble">
                    <h3>${chat.text}.</h3>
                </div>
                
                     <div data-id="${ chat.id}" class="fas fa-pen"></div>
                    <div data-id="${ chat.id}" class="fas fa-trash"></div>
                    <div data-id="${ chat.id}" class="fas fa-save" style="display: none"></div>
                
            </div>
        </li>
                        `;
            UL.innerHTML += li;
        });
    });

UL.addEventListener('click', function (e) {
    if (e.target.classList.contains('fa-trash')) {
        const id = e.target.getAttribute('data-id');
        fetch(API + '/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => res.json())
            .then(data => {
                e.target.parentNode.remove();
            });
    }


    if (e.target.classList.contains('fa-pen')) {
        const parant = e.target.parentNode;
        // console.log(parant)
        parant.querySelector('.fa-trash').style.display = 'none';
        parant.querySelector('.fa-pen').style.display = 'none';
        parant.querySelector('.bubble').style.display = 'none';



        parant.querySelector('input[type="text"]').style.display = 'block';
        parant.querySelector('.fa-save').style.display = 'block';
    }

    if (e.target.classList.contains('fa-save')) {
        const id = e.target.getAttribute('data-id');
        const parant = e.target.parentNode;
        const value = parant.querySelector('input[type="text"]').value //to this worke must be the button the first child to the input field 
        const obj = {
            text: value
        };

        fetch(API + '/' + id, {
            method: 'PATCH',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
            .then(res => res.json())
            .then(data => {
                parant.querySelector('.fa-trash').style.display = 'block';
                parant.querySelector('.fa-pen').style.display = 'block';
                parant.querySelector('.bubble').style.display = 'block';



                parant.querySelector('input[type="text"]').style.display = 'none';
                parant.querySelector('.fa-save').style.display = 'none';
                document.querySelector('h3').innerHTML = value;
            })
    }

});

