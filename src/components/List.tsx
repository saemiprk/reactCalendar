import { Todo } from "../types";
import ListItem from "./ListItem";

type ListProps = {
    todos: Todo[];
    beginTime: number;
    endTime: number;
    onUpdate: ({targetId, content} : {
        targetId: number,
        content: string,
    }) => void;
    onDelete: (targetId: number) => void;
}

export default function List({ todos, beginTime, endTime, onUpdate, onDelete }: ListProps){
    const currentTodos: Todo[] = todos.filter(
        (item) => beginTime <= item.date && item.date <= endTime
    );

    return (
        <div className='flex flex-col p-2 gap-2 max-h-[300px] overflow-y-scroll'>
            {currentTodos?.map((todo) => (
                <ListItem key={todo.id} {...todo} onUpdate={onUpdate} onDelete={onDelete} />
            ))}
        </div>
    )
}