export default function CustomMenuButton(props){
    const { chapter, setChapter, name } = props;
    return (
        <button 
            className={"menu-item" + (chapter === name ? " selected" : "")}
            onClick={() => setChapter(name)}
        >
            {name}
        </button>
    );
}