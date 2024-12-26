import {Toast, CloseButton, ToastBody} from 'reactstrap'

export const ToastItem = ({message, setMessage}) => {
    return (
        <Toast fade={false} className="position-relative">
            <ToastBody className="bg-success-subtle rounded position-relative">
                {message}
            </ToastBody>
            <CloseButton 
                className="position-absolute p-2 top-0 end-0"
                onClick={()=>{setMessage('')}}
            />
        </Toast>
    )
}
