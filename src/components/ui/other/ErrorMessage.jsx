export default function ErrorMessage(props){
    const { errors } = props;
    if(errors){
        return (
            <p className="err-text">{errors.message}</p>
        );
    }
}