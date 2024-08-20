export default function ButtonUnfiled(props) {
    const { name } = props;
    return (
        <button className="button-unfiled">
            {name}
        </button>
    );
}