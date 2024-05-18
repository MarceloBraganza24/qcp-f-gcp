import { createContext, useState } from "react"

export const OpenModalContext = createContext(null)

export const OpenModalContextComponent = ({children}) => {

    const [isOpen, setIsOpen] = useState(false);

    const handleModal = () => {
        setIsOpen(true);
    };
    
    return (

        <OpenModalContext.Provider value={{ isOpen, handleModal }}>
            {children}
        </OpenModalContext.Provider>

    )

}