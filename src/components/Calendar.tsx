import { useEffect, useReducer, useRef, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import List from './List';
import { FaPlus } from "react-icons/fa6";
import { Todo } from '../types';

type ActionType =
 | { type: 'INIT', data: Todo[]}
 | { type: 'CREATE', data: Todo }
 | { type: 'UPDATE', targetId: number, data: Todo }
 | { type: 'DELETE', targetId: number }

function reducer(state: Todo[], action: ActionType){
  let nextState = [];

  switch(action.type){
    case 'INIT': {
      return action.data;
    }
    case 'CREATE':{
        nextState = [action.data, ...state];
      break;
    }
    case 'UPDATE':{
      nextState = state.map((item: Todo) => item.id === action.targetId ? {...item, content: action.data.content} : item);
      break;
    }
    case 'DELETE':{
      nextState = state.filter((item: Todo) => item.id !== action.targetId);
      break;
    }
    default:
      return state;
  }

  localStorage.setItem('todo', JSON.stringify(nextState));
  return nextState;
}

export default function Calendar(){
  const [beginTime, setBeginTime] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0, 0).getTime());
  const [endTime, setEndTime] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59).getTime());
  const [selected, setSelected] = useState<Date>();
  const [todos, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  const onCreate = () => {
    let currentDate: number;

    if(!selected){
      currentDate = new Date().getTime();
    }else{
      currentDate = selected.getTime();
    }

    dispatch({
        type: 'CREATE',
        data: {
            id: idRef.current++,
            content: 'New Todo',
            date: currentDate
          },
    });
  }

  const onDelete = (targetId: number) => {
      dispatch({
          type: 'DELETE',
          targetId: targetId
      });
  }

  const onUpdate = ({targetId, content} : { targetId: number, content: string }) => {
      dispatch({
        type: 'UPDATE',
        targetId: targetId,
        data: {
          id: targetId,
          content: content,
          date: new Date().getTime()
        }
      })
  }

  useEffect(() => {
    const storedDate = localStorage.getItem('todo');
    if(!storedDate){
        return;
    }
    const parsedDate = JSON.parse(storedDate);
    if(!Array.isArray(parsedDate)){
        return;
    }

    let maxId = 0;
    parsedDate.forEach((item: Todo) => {
      if(Number(item.id) > maxId){
        maxId = Number(item.id);
      }
    });

    idRef.current = maxId + 1;

    dispatch({
      type: 'INIT',
      data: parsedDate,
    });

  }, []);

  const onSelect = (newSelected: Date | undefined) => {
    if(newSelected){
      setBeginTime(new Date(newSelected.getFullYear(), newSelected.getMonth(), newSelected.getDate(), 0, 0, 0).getTime());
      setEndTime(new Date(newSelected.getFullYear(), newSelected.getMonth(), newSelected.getDate(), 23, 59, 59).getTime());
    }
    setSelected(newSelected);
  }

  return (
    <div className='flex flex-col sm:flex-row h-full'>
        <DayPicker
            mode='single'
            selected={selected}
            onSelect={onSelect}
        />
        <div className='flex flex-col w-[200px]'>
          <div className='flex text-lg p-2 justify-between'>
              <div className='text-center font-bold flex-1'>
                  {selected? `${selected.toLocaleDateString()}`: new Date().toLocaleDateString()}
              </div>
              <button className='text-pink-500' onClick={onCreate}><FaPlus /></button>
          </div>
          <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} beginTime={beginTime} endTime={endTime} />
        </div>
    </div>
  )
}