
export const MyButton = ( props ) => {
    return (
        <button {...props} >
            {props.children}
        </button>
    )
}