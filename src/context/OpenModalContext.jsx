import { createContext, useState } from "react"

export const OpenModalContext = createContext(null)

export const OpenModalContextComponent = ({children}) => {

    const [updateShiftModal, setUpdateShiftModal] = useState(false);
    const [updatePartnerModal, setUpdatePartnerModal] = useState(false);
    const [updateProviderModal, setUpdateProviderModal] = useState(false);
    const [updateProductsModal, setUpdateProductsModal] = useState(false);

    const [menuOptionsModal, setMenuOptionsModal] = useState(false);

    const handleUpdateShiftModal = (boolean) => {
        setUpdateShiftModal(boolean);
    };
    const handleUpdatePartnerModal = (boolean) => {
        setUpdatePartnerModal(boolean);
    };
    const handleUpdateProviderModal = (boolean) => {
        setUpdateProviderModal(boolean);
    };
    const handleUpdateProductModal = (boolean) => {
        setUpdateProductsModal(boolean);
    };

    const handleMenuOptionsModal = (boolean) => {
        setMenuOptionsModal(boolean);
    };
    
    return (

        <OpenModalContext.Provider value={{ updateShiftModal, updatePartnerModal, updateProviderModal, updateProductsModal, menuOptionsModal, handleUpdateShiftModal, handleUpdatePartnerModal, handleUpdateProviderModal, handleUpdateProductModal, handleMenuOptionsModal }}>
            {children}
        </OpenModalContext.Provider>

    )

}