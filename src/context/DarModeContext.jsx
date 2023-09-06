import { createContext, useContext, useEffect} from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import useEditCabin from "../features/cabins/useEditCabin";

const DarkModeContext = createContext();

 function useDarkModeContext() {
    const { isDarkMode, darkModeToggle } = useContext(DarkModeContext);

    return { isDarkMode, darkModeToggle }
        ;
}



  function DarkModeProvider({ children }) {
    const [isDarkMode, setDarkMode] = useLocalStorageState(false, 'isDarkMode');
    useEffect(()=>{
        if(isDarkMode){
            document.documentElement.classList.add('dark-mode');
            document.documentElement.classList.remove('light-mode');

        }else{
            document.documentElement.classList.add('light-mode');
            document.documentElement.classList.remove('dark-mode');
        }
    })
    function darkModeToggle() {
        setDarkMode(!isDarkMode);
    }
        return (
            <DarkModeContext.Provider value={{ isDarkMode, darkModeToggle }}>
                {children}
            </DarkModeContext.Provider>
        )
    }


export {DarkModeProvider, useDarkModeContext}