import { createMessaegIconArr, previeMessageIconArr ,tempMessageIconArr} from "./messageIconData"

export const CreateMessageIcon = ({index}) => {
return (createMessaegIconArr?.[index])    
}

export const PreviewMessageIcon = ({index}) => {
    return (previeMessageIconArr?.[index])       
}
 
export const TempMessageIcon =({index}) => {
    return (tempMessageIconArr?.[index])       
}