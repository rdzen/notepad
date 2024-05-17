import React, { useState } from 'react';
import { nanoid } from 'nanoid';

function App() {
    //это стейт для значения textArea
    const [textAreaValue, setValue] = useState('Введите новую задачу');

    //это переменная с текущим СТАТУСОМ ТЕКСТАРЕА для КНОПКИ СОХРАНЕНИЯ
    //let mode = 'create';

    const [elemInArea, setElem] = useState(0);

    //здесь создается стейт с массивом объектов задач
    const [taskBase, setTaskBase] = useState([]);

    function buttonClick() {
        if(elemInArea === 0) {
            addTask();
            console.log('создаем');
        } else if(elemInArea !== 0) {
            updateTask();
            setValue('');
            setElem(0);
        };
    }

    //это функция ДОБАВЛЕНИЯ НОВОЙ задачи в массив объектов ИЛИ ОБНОВЛЕНИЯ СТАРОЙ задачи
    function addTask() {    
        let copys = Object.assign([], taskBase);

        console.log('создаем новую задачу, т.к. elemInArea равен ' + elemInArea);
            //создаем новый элемент - объект с задачей
		let newTask = {
			id:  nanoid(), //ID задачи
			value: textAreaValue,  //текст задачи	
            status: false //статус задачи
					};
			
		//вставляем новый элемент в массив объектов С ЗАДАЧАМИ
		    copys.push(newTask);
            console.log(copys);
            //обновляем стейт с массивом объектов ЗАДАЧ
            setTaskBase(copys);

            //очищаем текстовое поле
            setValue('Введите новую задачу');

            console.log('сохранили');
            //console.log(newTask.value);
    //заканчиваем функцию сохранения
    }

//функция ОБНОВЛЕНИЯ задачи 
    function updateTask() {
        let copys = Object.assign([], taskBase);
        if (elemInArea !== 0) {
            for(let elem of copys) {
                if(elem.id === elemInArea) {
                    elem.value = textAreaValue;
                    setTaskBase(copys);
                    break;
                }
            }
            console.log('обновили');
        };
    }


    function editTask(item) {
        setElem(item.id);
        setValue(item.value);
    }

    //функция изменения стейта СОДЕРЖИМОЕ TEXTAREA
    function handleChange(event) {
        setValue(event.target.value);
    }

    //функция удаления задачи
    function delTask(id) {
        let copys = Object.assign([], taskBase);
        let resArr = copys.filter((elem) => elem.id !== id);
        setTaskBase(resArr);
    }

    //функция на чекбоксе - статус задачи
    function changeTaskStatus(id, status) {
        let copys = Object.assign([], taskBase);
        for (let elem of copys) {
            if (elem.id === id) {
                elem.status = !status;
                console.log(elem.status);
                break;
            }
        }
        setTaskBase(copys);
    }

    //функция для последующего ОТОБРАЖЕНИЕ ТЕКСТА ЗАДАЧИ в зависимости от статуса элемента
    let result;
	function func(item) {
		
		if (item.status) {
			result = <span><s>{item.value}</s></span>
			console.log(item.value);
		} 
        else {
				result = <span onClick={() => editTask(item)}>{item.value}</span>
		}	
		return result;
	};

    let copys = Object.assign([], taskBase);
    const res = copys.map(function (item, index) {
        return (
            <p key={item.id}>
                <input
                    type='checkbox'
                    checked={taskBase[index].status}
                    onChange={() => changeTaskStatus(item.id, item.status)}
                />
                {func(item)}&nbsp;&nbsp;&nbsp;
                <button
                    onClick={() => {
                        delTask(item.id);
                    }}
                >
                    DelTask
                </button>
            </p>
        );
    });

    return (
        <div>
            <br />
            {<textarea value={textAreaValue} onChange={handleChange} />}
            <br />
            <button onClick={() => buttonClick()}>SaveTask</button>

            {res}
        </div>
    );
}

export default App;