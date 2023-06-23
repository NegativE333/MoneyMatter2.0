'use client';

import AddExpModal from "@/components/AddExpModal";
import AuthModal from "@/components/AuthModal";
import AddReminderModal from "@/components/AddReminderModal";
import AddMoneyModal from "@/components/AddMoneyModal";
import { useEffect, useState } from "react";
import DeleteExpModal from "@/components/DeleteExpModal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if(!isMounted){
        return null;
    }

    return(
        <>
            <AddMoneyModal />
            <AuthModal />
            <AddExpModal />
            <AddReminderModal />
            <DeleteExpModal />
        </>
    )
}

export default ModalProvider;