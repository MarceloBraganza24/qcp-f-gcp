import { createContext, useState } from "react"

export const InputChangesContext = createContext(null)

export const InputChangesContextComponent = ({children}) => {

    const [inputChanges, setInputChanges] = useState(false);

    const handleInputChanges = () => {
        setInputChanges(true);
    };
    
    return (

        <InputChangesContext.Provider value={{ inputChanges, handleInputChanges }}>
            {children}
        </InputChangesContext.Provider>

    )

}