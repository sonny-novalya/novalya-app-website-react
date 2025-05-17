import { useEffect, useRef } from "react";
import CreateMessage from "./createMessage";
import FbVisibilitySelector from "./fbVisibilitySelector";
import IgVisibilitySelector from "./IgVisibilitySelector";
import MessagePlatformSelector from "./messagePlatformSelector";
import MessageSelector from "./messageSelector";
import PreviewMessage from "./previewMessage";
import TempList from "./tempList";
import UpdateMessage from "./updateMessage";




const MessageTempIndex = ({step,selectedPlatform,setIsMessage}) => {
  const containerRef = useRef(null)
  const handleClickOutside = (event) => {
    if (containerRef.current &&!containerRef.current.contains(event.target)) {
      setIsMessage(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const selectStep = ()=>{
    switch(step){
      case 1:
        return <MessageSelector containerRef={containerRef} />;
        case 2:
          return <MessagePlatformSelector containerRef={containerRef}  />;  
          case 3:
           
            if(selectedPlatform){
              return <IgVisibilitySelector containerRef={containerRef} />
            }
            return <FbVisibilitySelector containerRef={containerRef} />;
            case 4:
              return <CreateMessage containerRef={containerRef} />
               case 5:
                return <PreviewMessage containerRef={containerRef}  />
                case 6:
                  return <TempList containerRef={containerRef} />
                  case 7:
                  return <UpdateMessage containerRef={containerRef} />
        
      default:
        return <MessageSelector containerRef={containerRef}  />;
    }
  }

    return (
     <>
    {selectStep()}
     </>
    );
  };
  
  
  
  export default MessageTempIndex;
  