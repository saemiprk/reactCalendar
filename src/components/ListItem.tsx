import { ChangeEvent, useState } from 'react';
import { Todo } from '../types';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { IoMdCheckmark } from 'react-icons/io';

interface ListItemProps extends Todo {
    onUpdate: ({targetId, content} : {
        targetId: number,
        content: string,
    }) => void;
    onDelete: (targetId: number) => void;
}

export default function ListItem(props: ListItemProps){
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(props.content);

    const onClickCheck = () => {
        setIsEditing(false);

        props.onUpdate({
            targetId: props.id,
            content: content,
        });
    }

    const onChangeContent = (e: ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
    }

    const onClickDelete = () => {
        props.onDelete(props.id);
    }
    
    return (
        <div className='flex justify-between items-center'>
            {isEditing? (
                <input type='text' value={content} onChange={onChangeContent}
                    className='border w-[140px]'
                />
            ): (
            <div className='text-ellipsis overflow-hidden whitespace-nowrap flex-1'>{content}</div>
            )}


            <div className='flex gap-2'>
                {isEditing? (
                    <button onClick={onClickCheck}><IoMdCheckmark /></button>
                ): (
                    <button onClick={() => setIsEditing(true)}><MdModeEdit /></button>
                )}
                
                <button onClick={onClickDelete}><MdDelete /></button>
            </div>
        </div>
    )
}