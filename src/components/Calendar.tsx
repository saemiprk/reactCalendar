import { useReducer, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import List from './List';
import { FaPlus } from "react-icons/fa6";
import { Todo } from '../types';
import Editor from './Editor';

type ActionType =
 | { type: 'INIT', data: Todo[] }
 | { type: 'CREATE', data: Todo }
 | { type: 'UPDATE', targetId: number, data: Todo }
 | { type: 'DELETE', targetId: number };

function reducer(state: Todo[], action: ActionType){
  let nextState;

  switch(action.type){
    case 'INIT': 
      return action.data;
    case 'CREATE':{
        nextState = [action.data, ...state];
      break;
    }
    case 'UPDATE':{
      nextState = state.map((item: Todo) => item.id === action.targetId ? {...item, isCheck: action.data.isCheck, content: action.data.content, date: action.data.date} : item);
      break;
    }
    case 'DELETE':{
      nextState = state.filter((item: Todo) => item.id !== action.targetId);
      break;
    }      
    default:
      return state;
  }

  localStorage.setItem("todo", JSON.stringify(nextState));
  return nextState;
}

export default function Calendar(){
    const [content, setContent] = useState('');
    const [selected, setSelected] = useState<Date>();
    const [todos, dispatch] = useReducer(reducer, []);
    const idRef = useRef(0);

    const onCreate = (content: string) => {
        dispatch({
            type: 'CREATE',
            data: {
                id: idRef.current++,
                isCheck: false,
                content: 'New Todo',
                date: new Date().getTime(),
              },
        })
    }

    const onDelete = (targetId: number) => {
        dispatch({
            type: 'DELETE',
            targetId: targetId
        });
    }

    const onUpdate = ({targetId, content, isCheck} : { targetId: number, content: string, isCheck: boolean}) => {
        dispatch({
          type: 'UPDATE',
          targetId: targetId,
          data: {
            id: targetId,
            content: content,
            isCheck: isCheck,
            date: new Date().getTime(),
          }
        })
    }

    const onClickAdd = ({selected, onCreate}: {
      selected: Date,
      onCreate: () => void,
    }) => {
      return (
        <Editor selected={selected} onCreate={onCreate} />
      )
    }

    return (
        <div className='grid md:grid-cols-2'>
            <DayPicker
                mode='single'
                selected={selected}
                onSelect={setSelected}
            />
            <div className=''>
                <div className='flex text-lg p-2 justify-between'>
                    <div className='text-center font-bold flex-1'>
                        {selected? `${selected.toLocaleDateString()}`: new Date().toLocaleDateString()}
                    </div>
                    <button className='text-pink-500' onClick={onClickAdd}><FaPlus /></button>
                </div>
                <List />
            </div>
        </div>
    )
}