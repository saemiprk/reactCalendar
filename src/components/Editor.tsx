type EditorProps = {
    selected: Date;
    onCreate: () => void;
}
export default function Editor({selected, onCreate}: EditorProps){
    return (
        <div>
            <h1>{selected.toLocaleString()}</h1>
            <button onClick={onCreate}>추가하기</button>
        </div>
    )
}