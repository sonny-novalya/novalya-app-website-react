import CreateMessage from "./createMessage";
import FbVisibilitySelector from "./fbVisibilitySelector";
import IgVisibilitySelector from "./IgVisibilitySelector";
import MessagePlatformSelector from "./messagePlatformSelector";
import MessageSelector from "./messageSelector";
import PreviewMessage from "./previewMessage";



const MessageTempIndex = ({step,selectedPlatform}) => {


  const selectStep = ()=>{
    switch(step){
      case 1:
        return <MessageSelector />;
        case 2:
          return <MessagePlatformSelector />;  
          case 3:
           
            if(selectedPlatform){
              return <IgVisibilitySelector/>
            }
            return <FbVisibilitySelector/>;
            case 4:
              return <CreateMessage/>
               case 5:
                return <PreviewMessage/>
        
      default:
        return <MessageSelector />;
    }
  }

    return (
     <>
    {selectStep()}
     </>
    );
  };
  
  
  
  export default MessageTempIndex;
  