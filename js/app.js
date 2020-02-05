document.addEventListener('DOMContentLoaded', function() {




                        /*Drop-Down Menu*/

    const DropDownMenu = () => {
        let mainList = document.querySelector('.nav ul').children;

        for (let i = 0; i < mainList.length; i++) {
            let ulChildren = mainList[i].querySelector('ul');
            mainList[i].addEventListener('mouseover', function () {
                if (ulChildren != null){
                    ulChildren.style.display = 'block';
                }
            });

            mainList[i].addEventListener('mouseout', function () {
                if (ulChildren != null){
                    ulChildren.style.display = 'none';
                }
            })
        }
    };

DropDownMenu();



                    /*Slider (without Fullscreen)*/

    const Slider = () => {

    let prev = document.querySelector('#prevPicture');
    let next = document.querySelector('#nextPicture');
    let list = document.querySelector('.slider ul').children;
    let index = 0;

    list[index].classList.add('visible');

    prev.addEventListener('click', function () {
        list[index].classList.remove('visible');
        index--;
        if (index < 0) {
            index = list.length-1;
        }
        list[index].classList.add('visible');

    });
    next.addEventListener('click', function () {
        list[index].classList.remove('visible');

        index++;
        if (index >= list.length) {
            index = 0;
        }
        list[index].classList.add('visible');

    });
};

Slider();




                            /*Fullscreen to Slider*/

    const Fullscreen = () => {
        const body = document.querySelector('.container');
        const list = document.querySelector('.slider ul').children;
        const fullScreen = document.createElement('div');
        const imgSrc = document.createElement('img');
        const button = document.createElement('button');
        for (let i = 0; i < list.length; i++) {
            list[i].addEventListener('click',function () {
                fullScreen.classList.add('fullScreen');
                body.appendChild(fullScreen);
                fullScreen.appendChild(imgSrc);
                imgSrc.setAttribute('src', `images/${i+1}.jpg`);
                fullScreen.appendChild(button);
                button.classList.add('close');
                button.innerText = 'X';
                button.addEventListener('click', function () {
                    fullScreen.parentElement.removeChild(fullScreen);
                })
            })
        }
    };

Fullscreen();





                        /*Filter by Tags */

    const filterByTags = () => {
        let images = document.querySelector('#gallery').children;
        let show = document.querySelector('#showButton');
        let hide = document.querySelector('#hideButton');
        let input = document.querySelector('#tagInput');

        show.addEventListener('click', function () {
            let textInput = input.value.toLowerCase();
            input.value = '';
            if (textInput.length > 0){
                for (let i = 0; i < images.length; i++) {
                    let tags = images[i].dataset.tag.split(',');
                    if (tags.indexOf(textInput) > -1){
                        images[i].classList.remove('invisible');
                    } else {
                        images[i].classList.add('invisible');
                    }
                }
            }
        });

        hide.addEventListener('click', function () {
            let textInput = input.value.toLowerCase();
            input.value = '';

            for (let i = 0; i < images.length; i++) {
                let tags = images[i].dataset.tag.split(',');
                if (tags.indexOf(textInput) > -1){
                    images[i].classList.add('invisible');
                } else {
                    images[i].classList.remove('invisible');
                }
            }
        });
    };

filterByTags();




                            /*Tooltips*/

    const tooltips = () => {
        let tooltipClass = document.querySelectorAll('.tooltip');
        let createSpan = document.createElement('span');

        for (let i = 0; i < tooltipClass.length; i++) {
            tooltipClass[i].addEventListener('mouseenter', function () {
                let tooltipText = tooltipClass[i].dataset.text;
                createSpan.classList.add('tooltipText');
                createSpan.innerText = tooltipText;
                tooltipClass[i].appendChild(createSpan);
            });

            tooltipClass[i].addEventListener('mouseout', function () {
                tooltipClass[i].removeChild(createSpan);
            })
        }
    };

tooltips();





                            /*TODO List*/

    const todoList = () => {
        let inputTask = document.querySelector('#taskInput');
        let buttonAdd = document.querySelector('#addTaskButton');
        let ulTaskList = document.querySelector('#taskList');
        let ulTaskListChild = ulTaskList.children;
        let buttonDelAll = document.querySelector('#removeFinishedTasksButton');
        let counterFinish = document.querySelector('#counter');
        let counter = 0;
        counterFinish.innerText = counter;

        buttonAdd.addEventListener('click', function () {
            let inputValue = inputTask.value;
            inputTask.value = '';

            let li = document.createElement('li');
            let h1 = document.createElement('h1');
            let buttonDel = document.createElement('button');
            let buttonCom = document.createElement('button');

            if (inputValue.length > 0 && inputValue.length < 100){
                ulTaskList.appendChild(li);
                counter++;
                counterFinish.innerText = counter;
            }

            li.appendChild(h1);
            h1.innerText = inputValue;
            li.appendChild(buttonDel);
            buttonDel.innerText = 'Delete';
            li.appendChild(buttonCom);
            buttonCom.innerText = 'Complete';

            buttonDel.addEventListener('click', function () {
                let elementClass = li.getAttribute('class');
                ulTaskList.removeChild(li);

                if (counter <= 0) {
                    counter = 0;
                } else if (elementClass !== 'done'){
                    counter--;
                    counterFinish.innerText = counter;
                }
            });

            buttonCom.addEventListener('click', function () {
                if (li.className === 'done'){
                    li.classList.remove('done');
                    counter++;
                    counterFinish.innerText = counter;
                }
                else {
                    li.classList.add('done');
                    if (counter !== 0) {
                        counter--;
                    }
                    counterFinish.innerText = counter;
                }
            });

            buttonDelAll.addEventListener('click', function (){
                for (let i = 0; i < ulTaskListChild.length; i++) {
                    if (ulTaskListChild[i].className === 'done')
                        ulTaskListChild[i].parentElement.removeChild(ulTaskListChild[i]);
                }
            })
        })
    };
todoList();


});

